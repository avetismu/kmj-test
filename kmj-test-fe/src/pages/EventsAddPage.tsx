import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import EventsAddComponent from '../components/EventsAddComponent';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { resetAddNewEventForm } from '../store/addEventSlice';
import { useDispatch } from 'react-redux';

const EventsAddPage: React.FC = () => {

    const dispatch = useDispatch();


    return (
        <Container>
            <Typography variant="h5" align="left" gutterBottom>
            <IconButton aria-label="back-button" href='/' onClick={() => {dispatch(resetAddNewEventForm())}}>
                <ArrowBackIcon />
            </IconButton>
                Créer un Événement
            </Typography>
            <Grid container sx={{marginTop : 2}}>
                <EventsAddComponent/>
            </Grid>
        </Container>
    );
};

export default EventsAddPage;