import axios from 'axios';
import { browserHistory } from 'react-router'; 
import { 
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR 
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
    return function(dispatch) {
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                // Save the JWT token
                localStorage.setItem('token', response.data.token);
                // Redirect to /feature page
                browserHistory.push('/feature');
            })
            .catch(() => {
                // Show an error to the user
                dispatch(authError('Bad Login Info'));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    localStorage.removeItem('token');

    return { type: UNAUTH_USER }
}