import 'urls.js';
import axios from 'axios';
import Cookies from 'js-cookie';

class UserRequests {
    static signUp (email, password, passwordConfirmation) {
        return axios.post(this.Url + 'auth', {
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
            confirm_success_url: ''
        }).then((response) => {
            if (response.status === 200) {
                return Promise.resolve(response);
            }
        }).catch(function (error) {
            return Promise.resolve(error);
        });
    }

    static signIn (email, password) {
        return axios.post(this.Url + 'auth/sign_in', {email: email, password: password})
            .then((response) => {
                if (response.status === 200) {
                    Cookies.set('auth_token', JSON.stringify({
                        'access-token': response.headers['access-token'],
                        'client': response.headers['client'],
                        'uid': response.headers['uid']
                    }));
                    return Promise.resolve(response);
                }
            })
            .catch(function (error) {
                return Promise.resolve(error);
            });
    }

    static signOut () {
        return axios.delete(this.Url + 'auth/sign_out', {headers: this.getCredentials()})
            .then((response) => {
                if (response.status === 200) {
                    Cookies.remove('auth_token');
                    return Promise.resolve(response);
                }
            })
            .catch(function (error) {
                return Promise.resolve(error);
            });
    }
}