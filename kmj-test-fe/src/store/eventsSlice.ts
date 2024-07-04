import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_STATE, getAllEventsAsync } from './api';
import { RootState } from './store';

interface eventsState {
    events : any[];
    getAllEventsState : API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR;
}
const initialState: eventsState = {
    events: [],
    getAllEventsState: API_STATE.IDLE,
};

export const getAllEvents = createAsyncThunk(
    'products/getAllEvents',
    async (thunkAPI) => {
      const response = await getAllEventsAsync();
      return response;
    },
  );
  

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getAllEvents.fulfilled, (state, action) => {
            state.getAllEventsState = API_STATE.IDLE;
            state.events = action.payload.data;
          },
        );
    
        builder.addCase(
            getAllEvents.pending, (state) => {
            state.getAllEventsState = API_STATE.LOADING;
          },
        );

        builder.addCase(
            getAllEvents.rejected, (state) => {
            state.getAllEventsState = API_STATE.ERROR;
          },
        );
    },
    
});

export default eventsSlice.reducer;
export const eventsSelector = (state: RootState) => state.events;