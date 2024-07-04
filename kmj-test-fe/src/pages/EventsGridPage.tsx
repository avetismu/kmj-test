import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import EventsGridComponent from '../components/EventsGridComponent';

const EventsGridPage: React.FC = () => {
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
                                    <Button variant="outlined" onClick={() => {}}>Créer un Évènement</Button>
                            </Grid>
                    </Grid>
            </Grid>
            <EventsGridComponent/>
        </Container>
    );
};

export default EventsGridPage;