import { configureStore } from '@reduxjs/toolkit'
import cars from '../models/cars.model';
export const store = configureStore({
    reducer: {
        cars
    }
})