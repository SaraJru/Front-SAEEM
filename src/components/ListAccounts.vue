<script>

import axios from 'axios'

export default {
    name: 'ListAccounts',
    data() {
        return {
            fields: ['id', 'id_wattmeter','opening_date','id_client','id_home_information','id_read_user', 'id_services', 'visit_date', 'id_user','contract_number', 'insert_date', 'update_date'],
            id: "",
            first_name: "",
            last_name: "",
            username:"",
            password:"",
            status:1,
            rol:0,
            department: 0,
            insert_date: "",
            update_date: "",
            listAccounts: [],
        }
    },
    methods: {
        async limpiar(){
            location.reload();
        },
        async listar(){
            axios.get('accountData/')
                .then(response => {
                    this.listAccounts = response.data;
                    console.log(this.listAccounts);
                })
                .catch(function (error){
                    console.log(error)
                })
                .finally(function(){
                })
        },
    },
    async mounted() {
        await this.listar();
    },
}
</script>

<template>
    <main class="col-md-9 ms-sm-auto col-lg-9 px-md-4 overflow-auto">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Dashboard</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group me-2">
                <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
            </div>
            <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
                This week
            </button>
            </div>
        </div>

        <h2 style="color: white;">Cuentas</h2>
        <div class="table-responsive small">
            <table class="table table-striped table-sm" :items="listAccounts" :fields="fields">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre de cliente</th>
                <th scope="col">Contador</th>
                <th scope="col">Fecha de apertura</th>
                <th scope="col">Dirección</th>
                <th scope="col">Servicio</th>
                <th scope="col">Número de contrato</th>
                <th scope="col">Creador de la cuenta</th>
                <th scope="col">Técnico asignado</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Fecha de actualización</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="la in listAccounts" v-bind:key="la.id">
                <td>{{la.id}}</td>
                <td>{{la.id_client['first_name']}} {{la.id_client['middle_name']}} {{la.id_client['first_lastname']}} {{ la.id_client['second_lastname']}}</td>
                <td>{{la.id_wattmeter['wattmeter_number']}}</td>
                <td>{{la.opening_date}}</td>
                <td>{{la.id_home_information['addres']}}, zona {{la.id_home_information['zone_number']}}, {{la.id_home_information['id_village']['village_name']}}</td>
                <td>{{la.id_services['service_name']}}</td>
                <td>{{la.contract_number}}</td>
                <td>{{la.id_user['first_name']}} {{la.id_user['last_name']}}</td>
                <td>{{la.id_read_user['first_name']}} {{la.id_read_user['last_name']}}</td>
                <td>{{la.insert_date}}</td>
                <td>{{la.update_date}}</td>
                </tr>
            </tbody>
            </table>
        </div>
    </main>
</template>