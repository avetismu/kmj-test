import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { addEventSelector, createEvent, setAddNewEventForm } from '../store/addEventSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { API_STATE } from '../store/api';

const EventsAddComponent: React.FC = () => {

    const selector = useSelector(addEventSelector);
    const dispatch = useDispatch();
    const appDispatch = useDispatch<AppDispatch>();

    
    function isFormInvalid(): boolean  {
        if(selector.form.title.length > 32 || selector.form.title.length == 0){
            return true;
        }

        if(selector.form.description.length == 0){
            return true;
        }

        if(selector.form.start.length == 0){
            return true;
        }

        if(selector.form.end.length == 0){
            return true;
        }

        if(selector.form.timezone.length == 0){ 
            return true;
        }

        return false;
    }

    return (
        <Grid container>
            {selector.postEventState === API_STATE.SUCCESS && 
            <Grid sx={{width : "100%"}}>
                    <Alert className="modal-alert" severity="success">Creation d'Événement Réussi!</Alert>
            </Grid>}
            {selector.postEventState === API_STATE.ERROR && 
            <Grid sx={{width : "100%"}}>
                    <Alert className="modal-alert" severity="error">selector.postEventError</Alert>
            </Grid>}
            <Grid container className="form-row">
                <Grid md={6}>
                    <TextField
                        label="Nom"
                        sx={{width : "95%", float : "left"}}
                        onChange={(value) => {
                            dispatch(setAddNewEventForm({title : value.target.value}));
                        }}
                        placeholder='Test Event'
                        value={selector.form.title}
                        error={selector.form.title.length > 32}
                    />
                </Grid>
                <Grid md={6}>
                    <TextField
                        label="Description"
                        sx={{width : "95%",  float : "left"}}
                        onChange={(value) => {
                            dispatch(setAddNewEventForm({description : value.target.value}));
                        }}
                        placeholder='Description'
                        multiline
                        value={selector.form.description}
                    />
                </Grid>
            </Grid>
            <Grid container className="form-row">
                <Grid md={4}>
                    <TextField
                        label="Début"
                        sx={{width : "95%",  float : "left"}}
                        onChange={(value) => {
                            dispatch(setAddNewEventForm({start : value.target.value}));
                        }}
                        type="datetime-local"
                        value={selector.form.start}
                    />
                </Grid>
                <Grid md={4}>
                    <TextField
                        label="Fin"
                        sx={{width : "95%",  float : "left"}}
                        onChange={(value) => {
                          dispatch(setAddNewEventForm({end : value.target.value}));  
                        }}
                        type="datetime-local"
                        value={selector.form.end}
                    />
                </Grid>

                <Grid md={4}>
                    <FormControl fullWidth sx={{maxWidth:'85%',  float : "left"}}>
                        <InputLabel id="timezone-label">Fuseau Horaire</InputLabel>
                        <Select
                            labelId="timezone-label"
                            id="timezone-select"
                            label="Fuseau Horaire"
                            onChange={(value)=>{
                                dispatch(setAddNewEventForm({timezone : value.target.value}));
                            }}
                            value={selector.form.timezone}
                        >
                            <MenuItem value='GMT+1'>GMT+1</MenuItem>
                            <MenuItem value='GMT+2'>GMT+2</MenuItem>
                            <MenuItem value='GMT+3'>GMT+3</MenuItem>
                            <MenuItem value='GMT+4'>GMT+4</MenuItem>
                            <MenuItem value='GMT+5'>GMT+5</MenuItem>
                            <MenuItem value='GMT+6'>GMT+6</MenuItem>
                            <MenuItem value='GMT+7'>GMT+7</MenuItem>
                            <MenuItem value='GMT+8'>GMT+8</MenuItem>
                            <MenuItem value='GMT+9'>GMT+9</MenuItem>
                            <MenuItem value='GMT+10'>GMT+10</MenuItem>
                            <MenuItem value='GMT+11'>GMT+11</MenuItem>
                            <MenuItem value='GMT+12'>GMT+12</MenuItem>
                            <MenuItem value='GMT-1'>GMT-1</MenuItem>
                            <MenuItem value='GMT-2'>GMT-2</MenuItem>
                            <MenuItem value='GMT-3'>GMT-3</MenuItem>
                            <MenuItem value='GMT-4'>GMT-4</MenuItem>
                            <MenuItem value='GMT-5'>GMT-5</MenuItem>
                            <MenuItem value='GMT-6'>GMT-6</MenuItem>
                            <MenuItem value='GMT-7'>GMT-7</MenuItem>
                            <MenuItem value='GMT-8'>GMT-8</MenuItem>
                            <MenuItem value='GMT-9'>GMT-9</MenuItem>
                            <MenuItem value='GMT-10'>GMT-10</MenuItem>
                            <MenuItem value='GMT-11'>GMT-11</MenuItem>
                            <MenuItem value='GMT-12'>GMT-12</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" className="form-row">
                <Button variant="contained" onClick={() => {appDispatch(createEvent(selector.form))}} disabled={isFormInvalid()}>Créer</Button>
            </Grid>
        </Grid>
    );
};

export default EventsAddComponent;