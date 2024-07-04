import React from 'react';
import { render, screen } from '@testing-library/react';
import EventsAddPage from '../pages/EventsAddPage';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('EventsAddPage', () => {
    const initialState = {
        addEvent : {
            form : 
        {
            title : '', 
            description : '', 
            start : '', 
            end : '', 
            timezone : '',
        },
        postEventState : 'IDLE',
        postEventError : ''
        }
    };
    const mockStore = configureStore();
    let store;

    it('renders without crashing', () => {
        store = mockStore(initialState);
        render(
            <Provider store={store}>
                <EventsAddPage />
            </Provider>
        );

        expect(screen.getByText('Créer')).toBeInTheDocument();

    });


});