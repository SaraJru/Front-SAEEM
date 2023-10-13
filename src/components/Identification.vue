<script>

import axios from 'axios'

export default {
    name: 'Identification',
    data() {
        return {
            fields: ['id', 'identification_name', 'insert_date', 'update_date'],
            id: "",
            identification_name: "",
            insert_date: "",
            update_date: "",
            listIdentifications: [],
        }
    },
    methods: {
        limpiar(){
            this.identification_name = "";
        },
        createIdentificationType(){
            axios.post('catalog/identificationType/', {
                identification_name: this.identification_name
            })
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
            this.listar();
            this.limpiar();
        },
        listar(){
            axios.get('catalog/identificationType/')
                .then(response => {
                    this.listIdentifications = response.data;
                    console.log(this.listIdentifications);
                })
                .catch(function (error){
                    console.log(error)
                })
                .finally(function(){
                })
        }
    },
    mounted() {
        this.listar()
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

        <h2 style="color: white;">Tipos de identificación</h2>
        <div class="table-responsive small">
            <table class="table table-striped table-sm" :items="listIdentifications" :fields="fields">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Tipo de identificación</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Fecha de actualización</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="li in listIdentifications" v-bind:key="li.id">
                <td>{{li.id}}</td>
                <td>{{li.identification_name}}</td>
                <td>{{li.insert_date}}</td>
                <td>{{li.update_date}}</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div>
            <div class="mb-3">
                <label for="identificationName" class="form-label">Email address</label>
                <input type="text" class="form-control" id="identificationName" placeholder="Tipo de identificación" v-model="identification_name">
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-primary mb-3" @click="createIdentificationType">Crear</button>
            </div>
        </div>
    </main>
</template>