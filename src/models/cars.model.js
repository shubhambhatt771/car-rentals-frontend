import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Config from "../config/default";
import axios from 'axios';
const initialState = {
    cars: [],
    singleCar: []
}
const { baseURL } = Config;
export const getCars = createAsyncThunk("cars/getData", async () => {
    const { data } = await axios.get(`${baseURL}/cars/get`);
    return data;
});

export const getCarById = createAsyncThunk("cars/getCarById", async (id) => {
    const { data } = await axios.get(`${baseURL}/cars/${id}`);
    return data;
})

export const rentCar = createAsyncThunk("cars/rentCar", async ({ _id, inventory: { in_stock } }, { dispatch }) => {
    const payload = {
        model: _id,
        in_stock: --in_stock
    };
    await axios.post(`${baseURL}/cars/rent`, payload);
    dispatch(getCars());
});

const carsReducer = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        calculatePrice: (state, action) => {
            state.data = "calculating price"
        }
    },
    extraReducers: {
        [getCars.fulfilled]: (state, action) => {
            state.cars = action.payload;
        },
        [getCarById.fulfilled]: (state, action) => {
            state.singleCar = action.payload
        }
    }
});

export default carsReducer.reducer;