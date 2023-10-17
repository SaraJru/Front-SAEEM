<script>

import axios from 'axios'

export default {
    name: 'Roles',
    data() {
        return {
            fields: ['id', 'rol_name', 'insert_date', 'update_date'],
            id: "",
            rol_name: "",
            insert_date: "",
            update_date: "",
            listRoles: [],
        }
    },
    methods: {
        limpiar(){
            this.rol_name = "";
        },
        createRol(){
            axios.post('catalog/roles/', {
                rol_name: this.rol_name
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
            axios.get('catalog/roles/')
                .then(response => {
                    this.listRoles = response.data;
                    console.log(this.listRoles);
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
    <main class="col-md-9 ms-sm-auto col-lg-9 px-md-4">
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

        <h2 style="color: white;">ROLES</h2>
        <div class="table-responsive small">
            <table class="table table-striped table-sm" :items="listRoles" :fields="fields">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre del rol</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Fecha de actualización</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="lr in listRoles" v-bind:key="lr.id">
                <td>{{lr.id}}</td>
                <td>{{lr.rol_name}}</td>
                <td>{{lr.insert_date}}</td>
                <td>{{lr.update_date}}</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div>
            <div class="mb-3">
                <label for="rolName" class="form-label">Email address</label>
                <input type="text" class="form-control" id="rolName" placeholder="Nombre del rol" v-model="rol_name">
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-primary mb-3" @click="createRol">Crear</button>
            </div>
        </div>
    </main>
</template>