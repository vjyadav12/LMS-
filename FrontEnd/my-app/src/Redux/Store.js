import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from './Slices/AuthSlice'
import CoursesSlice from './Slices/CoursesSlice'

const Store = configureStore({
    reducer:{
        auth: AuthSlice,
       
})

export default Store