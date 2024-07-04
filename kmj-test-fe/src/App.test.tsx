import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('Ensure Rendering Correctly', () => {
    const initialState = {events : {events : []}};
    const mockStore = configureStore();
    let store;

    it('Trivial', () => {
        store = mockStore(initialState);
        const { getByText } = render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(getByText('Gestionnaire d\'Évènement Kumojin')).toBeInTheDocument

        expect(getByText('Évènements')).toBeInTheDocument

        expect(getByText('Créer un Évènement')).toBeInTheDocument
    });

    it('Grid Header Tests', () => {
        store = mockStore(initialState);
        const { getByText } = render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(getByText('Titre')).toBeInTheDocument

        expect(getByText('Description')).toBeInTheDocument

        expect(getByText('Début')).toBeInTheDocument

        expect(getByText('Fin')).toBeInTheDocument

        expect(getByText('Fuseau Horaire')).toBeInTheDocument
    });
});