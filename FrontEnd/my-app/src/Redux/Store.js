import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from './Slices/AuthSlice'

const Store = configureStore({
    reducer:{
        auth: AuthSlice,
    }
})

export default Store