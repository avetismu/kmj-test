import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';

const EventsGridPage: React.FC = () => {
    return (
        <Container>
            <Typography variant="h5" align="left" gutterBottom>
                    Évènements
            </Typography>
            <Grid container>
                    <Grid md={6}>
                    </Grid>
                    <Grid md={6}>
                            <Grid container justifyContent="end">
                                    <Button variant="outlined" onClick={() => {}}>Créer un Évènement</Button>
                            </Grid>
                    </Grid>
            </Grid>
        </Container>
    );
};

export default EventsGridPage;