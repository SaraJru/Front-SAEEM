import Vuex from 'vuex';
import router from './router';

const store = new Vuex.Store({
    state: {
        token: null,
        usuario: null,
        autoLoginExecuted: localStorage.getItem('autoLoginExecuted') === 'true' // Obtener el valor almacenado en localStorage
    },
    mutations: {
        setToken(state, token){
            state.token = token;
        },
        setAutoLoginExecuted(state, value) {
            state.autoLoginExecuted = value;
        }
    },
    actions: {
        guardarToken({commit}, token){
            commit('setToken', token);
            localStorage.setItem('token', token);
        },
        autoLogin({commit, state}){
            if (!state.autoLoginExecuted) { // Verifica si autoLogin ya se ha ejecutado
                let token = localStorage.getItem('token');
                if (token){
                    commit('setToken', token);
                    commit('setAutoLoginExecuted', true); // Marca autoLogin como ejecutado
                    localStorage.setItem('autoLoginExecuted', 'true');
                    router.push('/listAccounts');
                }
                else{
                    commit('setAutoLoginExecuted', false); // Marca autoLogin como ejecutado
                    localStorage.setItem('autoLoginExecuted', 'false');
                    router.push('/');
                }
            }
        },
        salir({commit}){
            commit('setToken', null);
            localStorage.removeItem('token');
            router.push('/');
        }
    },
    modules: {},
    getters: {
        getToken: state => state.token
    }
});


export default store;