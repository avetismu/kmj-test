import { Alert, Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import EventsGridComponent from '../components/EventsGridComponent';
import { useSelector } from 'react-redux';
import { eventsSelector } from '../store/eventsSlice';
import { API_STATE } from '../store/api';

const EventsGridPage: React.FC = () => {

        const selector = useSelector(eventsSelector);
        return (
                <Container>
                        <Typography variant="h5" align="left" gutterBottom>
                                Évènements
                        </Typography>
                        <Grid container sx={{marginBottom : 2}}>
                                <Grid md={6}>
                                </Grid>
                                <Grid md={6}>
                                        <Grid container justifyContent="end" >
                                                <Button variant="outlined" href="/new">Créer un Évènement</Button>
                                        </Grid>
                                </Grid>
                        </Grid>
                        {selector.getAllEventsState === API_STATE.ERROR && 
                        <Grid sx={{marginBottom : 2}}>
                                <Alert className="modal-alert" severity="error">Une erreur est survenu lors du chargement des Évènements</Alert>
                        </Grid>}

                        <EventsGridComponent/>
                </Container>
        );
};

export default EventsGridPage;