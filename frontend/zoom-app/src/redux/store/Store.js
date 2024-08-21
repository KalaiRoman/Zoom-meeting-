import { configureStore } from '@reduxjs/toolkit'
import ConfigureStoreAllReducers from '../ConfigProviderreducers/ConfigProvider'

const store=configureStore({
    reducer:ConfigureStoreAllReducers
})

export default store;