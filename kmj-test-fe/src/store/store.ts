import { configureStore } from '@reduxjs/toolkit'
import eventsSlice from './eventsSlice';
import addEventSlice from './addEventSlice';


const store = configureStore({
    reducer: {
      events : eventsSlice,
      addEvent : addEventSlice
    },
      
  })
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
  
  
  export default store;