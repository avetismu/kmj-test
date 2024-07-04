import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_STATE, postEventAsync } from './api';
import { RootState } from './store';
import { error } from 'console';

interface addEvent {
    form : {
        title : string;
        description : string;
        start : string;
        end : string;
        timezone : string;
    },
    postEventState : API_STATE.SUCCESS | API_STATE.IDLE | API_STATE.LOADING | API_STATE.ERROR;
    postEventError : string;
}


const initialState: addEvent = {
    form : {
        title : '',
        description : '',
        start : new Date().toDateString(),
        end : new Date().toDateString(),
        timezone : '',
    },
    postEventState : API_STATE.IDLE,
    postEventError : ''
};

export const createEvent = createAsyncThunk(
    'addEvent/createEvent',
    async (form : any, thunkAPI) => {
        const response = await postEventAsync(form);
        return response
    },
  )

const addEventSlice = createSlice({
    name: 'addEvent',
    initialState: initialState,
    reducers: {
        resetAddNewEventForm : ()=> initialState,
        setAddNewEventForm: (state, action) => {
          console.log('action', action)
            return {
              ...state,
              form: {
                ...state.form,
                ...action.payload
              }
            }
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(createEvent.pending, (state) => {
            state.postEventState = API_STATE.LOADING;
          })
          .addCase(createEvent.fulfilled, (state) => {
            state.postEventState = API_STATE.SUCCESS;
          })
          .addCase(createEvent.rejected, (state, action) => {
            state.postEventState = API_STATE.ERROR;
            state.postEventError = action.payload as string|| 'An error occurred'; 
          });
      },
});

export default addEventSlice.reducer;
export const { setAddNewEventForm, resetAddNewEventForm } = addEventSlice.actions; 
export const addEventSelector = (state : RootState) => state.addEvent