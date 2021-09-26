import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCarById, rentCar } from '../models/cars.model';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Config from '../config/default';
const { s3_url } = Config;
const SingleCar = ({ history, match: { params: { id } } }) => {
    const [msg, setMsg] = useState('');
    const [showMsg, setShowMsg] = useState(false);
    const [msgClass, setMsgClass] = useState('warning');
    const [name, setName] = useState('');
    const [days, setDays] = useState(0);
    const [price, setPrice] = useState(0);
    const dispatch = useDispatch();
    const singleCar = useSelector(state => state.cars.singleCar);
    const in_stock = singleCar?.inventory?.in_stock;
    useEffect(() => {
        dispatch(getCarById(id));
    }, [dispatch]);
    const calcPrice = (e) => {
        const days = e.target.value;
        let carPrice = 0;
        if (days > 0) {
            if (singleCar.body_type === "Suv") {
                carPrice = 1000 * days;
            }
            else if (singleCar.body_type === "Sedan") {
                if (days > 3) {
                    carPrice = 500 + 500 * (days - 3);
                }
                else carPrice = 500;
            }
            else {
                if (days > 5) {
                    carPrice = 500 + 500 * (days - 5);
                }
                else carPrice = 500;
            }
            setPrice(carPrice);
            setDays(days);
        }
        else {
            setPrice(0);
            setDays(days);
        }
    }
    const handleSubmit = () => {
        if (name.length === 0) {
            setShowMsg(true);
            setMsg("Name Cannot be empty !");
            setMsgClass('warning');
        }
        else if (days === 0) {
            setShowMsg(true);
            setMsg("Minimum should be 1 day");
            setMsgClass('warning');
        }
        else {
            dispatch(rentCar(singleCar));
            setShowMsg(true);
            setMsg('Car rented successfully !!');
            setMsgClass('success');
        }
    }
    return (
        <div className="container">
            <div className="row p-3">
                <div className="card">
                    <div className="card-body row">
                        <div className="col col-md-6">
                            <Carousel>
                                {
                                    singleCar?.galleries && singleCar.galleries.map((img, i) =>
                                        <img src={`${s3_url}/${img}`} alt={img} />
                                    )
                                }
                            </Carousel>
                        </div>
                        <div className="col col-md-6">

                            <div className="row justify-content-center align-items-center">
                                <div className="col col-md-6 justify-content-center align-items-center">

                                    <div className="card shadow h-100">
                                        <div className="card-header">
                                            <h2 className="text-center"> Car Details </h2>
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <label><b>Model</b></label>
                                                <span>{singleCar.model}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <label><b>Body</b></label>
                                                <span>{singleCar.body_type}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <label><b>In Stock</b></label>
                                                {singleCar?.inventory?.in_stock > 0 ? <span className="text-success">{singleCar?.inventory?.in_stock}</span> : <span className="text-danger">Out of Stock</span>}
                                            </div>
                                            <button type="button" disabled={in_stock < 1 ? true : false} className="btn btn-dark w-100 mt-3" data-toggle="modal" data-target="#carModal">
                                                {in_stock < 1 ? 'Not Available' : 'Rent'}
                                            </button>

                                            <div className="modal fade" id="carModal">

                                                <div className="modal-dialog">

                                                    <div className="modal-content">
                                                        {
                                                            showMsg &&
                                                            <div className={`alert alert-${msgClass} alert-dismissible fade show`} role="alert">
                                                                <div className="d-flex justify-content-between">
                                                                    <span> {msg} </span>
                                                                    <button type="button" onClick={() => setShowMsg(false)} className="btn btn-white" class="close" data-dismiss="alert" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        }
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="carModal">Rent Car</h5>
                                                            <button type="button" className="close btn btn-light" data-dismiss="modal">
                                                                x
                                                            </button>
                                                        </div>
                                                        <div className="modal-body px-4">
                                                            <form>
                                                                <div className="form-group">
                                                                    <label>
                                                                        Name:
                                                                    </label>
                                                                    <input className="form-control" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" />
                                                                </div>
                                                                <div className="form-group mt-2">
                                                                    <label>
                                                                        No of Days:
                                                                    </label>
                                                                    <input className="form-control" type="number" name="days" onChange={(e) => calcPrice(e)} placeholder="Enter No of days for rent" />
                                                                </div>
                                                                <div className="form-group mt-2">
                                                                    <label>
                                                                        Price in Rs:
                                                                    </label>
                                                                    <input className="form-control" type="number" name="price" value={price} placeholder="Enter No of days for rent" />
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" onClick={() => msgClass === "success" ? history.push('/') : ''} className={`btn btn-${msgClass === "success" ? "success" : "secondary"}`} data-dismiss="modal">{msgClass === "success" ? 'Shop More' : 'Cancel'}</button>
                                                            <button type="button" onClick={handleSubmit} disabled={msgClass === "success" ? true : false} className="btn btn-dark">{msgClass === "success" ? 'Car Rented' : 'Rent Now'}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleCar
