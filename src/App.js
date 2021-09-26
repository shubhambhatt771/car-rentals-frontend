import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { getCars, rentCar } from './models/cars.model';
import Card from './components/Card';
import { Link } from 'react-router-dom';
function App() {
  const dispatch = useDispatch();
  const cars = useSelector(state => state.cars.cars);
  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);
  return (
    <div className="container">
      <div className="row mt-3">
        {
          cars && cars.map((car, i) => (
            <div className="col col-md-4">
              <Link style={{ textDecoration: 'none', color: 'black' }} to={`/car/${car._id}`}>
                <Card car={car} />
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
