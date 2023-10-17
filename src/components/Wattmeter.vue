<script>

import axios from 'axios'

export default {
    name: 'Wattmeter',
    data() {
        return {
            fields: ['id', 'wattmeter_number', 'wattmeter_brand', 'insert_date', 'update_date'],
            fieldsWB: ['id', 'brand_name', 'insert_date', 'update_date'],
            id: "",
            wattmeter_number: "",
            wattmeter_brand: "",
            insert_date: "",
            update_date: "",
            listWattmeter: [],
            listwattmeterBrand: [],
        }
    },
    methods: {
        async limpiar(){
            this.wattmeter_brand = "";
            this.wattmeter_number = "";
            location.reload();
        },
        async createWattmeter(){
            axios.post('wattmeter/', {
                wattmeter_number: this.wattmeter_number,
                wattmeter_brand: this.wattmeter_brand
            })
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
            this.listar();
            this.listarMarcas();
            this.limpiar();
        },
        async listar(){
            axios.get('wattmeter/')
                .then(response => {
                    this.listWattmeter = response.data;
                    console.log(this.listWattmeter);
                })
                .catch(function (error){
                    console.log(error)
                })
                .finally(function(){
                })
        },
        async listarMarcas(){
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
    async mounted() {
        await this.listar();
        await this.listarMarcas();
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

        <h2 style="color: white;">CONTADORES</h2>
        <div class="table-responsive small">
            <table class="table table-striped table-sm" :items="listWattmeter" :fields="fields">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Número de Contador</th>
                <th scope="col">Marca de Contador</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Fecha de actualización</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="lw in listWattmeter" v-bind:key="lw.id">
                <td>{{lw.id}}</td>
                <td>{{lw.wattmeter_number}}</td>
                <td>{{lw.wattmeter_brand['brand_name']}}</td>
                <td>{{lw.insert_date}}</td>
                <td>{{lw.update_date}}</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div>
            <div class="mb-3">
                <label for="wattmeter_number" class="form-label">Número de Contador</label>
                <input type="text" class="form-control" id="wattmeter_number" placeholder="Número de Contador" v-model="wattmeter_number">
                <label for="wattmeter_brand" class="form-label">Marca de Contador</label>
                <select id="wattmeter_brand" class="form-select" :items="listwattmeterBrand" :fields="fieldsWB" v-model="wattmeter_brand">
                    <option selected>Selecciona marca de contador</option>
                    <option v-for="lwb in listwattmeterBrand" v-bind:key="lwb.id" v-bind:value="lwb.id">{{ lwb.brand_name }}</option>
                </select>
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-primary mb-3" @click="createWattmeter">Crear</button>
            </div>
        </div>
    </main>
</template>