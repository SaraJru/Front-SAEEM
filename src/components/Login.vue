<script>
import axios from 'axios';
import router from '../router'
import store from '../store'
import { jwtDecode } from "jwt-decode";

export default {
    name: 'Login',
    data() {
        return{
            username: "",
            password: "",
            errorM: null
        }
    },
    methods: {
        ingresar(){
            axios.post('api/token/', {
                username: this.username,
                password: this.password
            })
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                store.dispatch('guardarToken', data.access);
                const logueado = jwtDecode(data.access);

                axios.get(`users/${logueado.user_id}/`)
                .then(response => {
                    store.dispatch('guardarRol', response.data.rol);
                })
                .catch((error) => {
                    console.log(error);
                })

                router.push({name: 'ListAccounts'});
            })
            .catch((error) => {
                console.log(error);
                this.errorM = null;
                if(error.response.status == 400){
                    this.errorM = 'No existe el usuario o las credenciales son incorrectas';
                } else {
                    this.errorM = 'Ocurrió un error con el servidor';
                }
            })
        }
    }
}

</script>

<template>
    <div class="wrapper">
            <div class="user-logo">
                <i class='bx bxs-user-badge'></i>
            </div>
            <div class="input">
                <input type="text" placeholder="Username" required v-model="username" color="accent">
            </div>
            <div class="input">
                <input type="password" placeholder="Password" required v-model="password" color="accent">
            </div>
            <div class="red--text" v-if="errorM">
                {{errorM}}
            </div>
            <br>
            <div>
                <button type="submit" class="btn-login" @click="ingresar">Login</button>
            </div>
        
    </div>
</template>
