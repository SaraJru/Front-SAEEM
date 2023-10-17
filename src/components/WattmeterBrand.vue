<script>

import axios from 'axios'

export default {
    name: 'WattmeterBrand',
    data() {
        return {
            fields: ['id', 'brand_name', 'insert_date', 'update_date'],
            id: "",
            brand_name: "",
            insert_date: "",
            update_date: "",
            listwattmeterBrand: [],
        }
    },
    methods: {
        limpiar(){
            this.brand_name = "";
        },
        createwattmeterBrand(){
            axios.post('catalog/wattmeterBrand/', {
                brand_name: this.brand_name
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
            axios.get('catalog/wattmeterBrand/')
                .then(response => {
                    this.listwattmeterBrand = response.data;
                    console.log(this.listwattmeterBrand);
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

        <h2 style="color: white;">MARCAS DE CONTADORES</h2>
        <div class="table-responsive small">
            <table class="table table-striped table-sm" :items="listwattmeterBrand" :fields="fields">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre de la marca</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Fecha de actualización</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="lw in listwattmeterBrand" v-bind:key="lw.id">
                <td>{{lw.id}}</td>
                <td>{{lw.brand_name}}</td>
                <td>{{lw.insert_date}}</td>
                <td>{{lw.update_date}}</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div>
            <div class="mb-3">
                <label for="brandName" class="form-label">Email address</label>
                <input type="text" class="form-control" id="brandName" placeholder="Nombre de la marca" v-model="brand_name">
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-primary mb-3" @click="createwattmeterBrand">Crear</button>
            </div>
        </div>
    </main>
</template>