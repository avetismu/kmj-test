import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('With React Testing Library', () => {
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
    });
});