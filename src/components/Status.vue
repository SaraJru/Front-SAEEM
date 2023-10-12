<script>

import axios from 'axios'

export default {
    name: 'Status',
    data() {
        return {
            fields: ['id', 'status_name', 'insert_date', 'update_date'],
            id: "",
            status_name: "",
            insert_date: "",
            update_date: "",
            listarStatus: [],
        }
    },
    methods: {
        createStatus(){
            axios.post('catalog/status/', {
                status_name: this.status_name
            })
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },
    mounted() {
        axios.get('catalog/status/')
            .then(response => {
                this.listarStatus = response.data;
                console.log(this.listarStatus);
            })
            .catch(function (error){
                console.log(error)
            })
            .finally(function(){

            })
    },
}
</script>

<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
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

        <h2 style="color: white;">ESTADOS</h2>
        <div class="table-responsive small">
            <table class="table table-striped table-sm" :items="listarStatus" :fields="fields">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre de estado</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Fecha de actualización</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ls in listarStatus" v-bind:key="ls.id">
                <td>{{ls.id}}</td>
                <td>{{ls.status_name}}</td>
                <td>{{ls.insert_date}}</td>
                <td>{{ls.update_date}}</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div>
            <div class="mb-3">
                <label for="statusName" class="form-label">Email address</label>
                <input type="text" class="form-control" id="statusName" placeholder="Nombre de status" v-model="status_name">
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-primary mb-3" @click="createStatus">Crear</button>
            </div>
        </div>
    </main>
</template>