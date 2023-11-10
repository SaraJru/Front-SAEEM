<script>

import axios from 'axios'
import router from '../router';

export default {
    name: 'Wattmeter',
    data() {
        return {
            fields: ['id', 'wattmeter_number', 'wattmeter_brand', 'insert_date', 'update_date'],
            fieldsWB: ['id', 'brand_name', 'insert_date', 'update_date'],
            id: "",
            wattmeter_number: "",
            wattmeter_brand: "",
            editWattmeter_number: "",
            editWattmeter_brand: "",
            insert_date: "",
            update_date: "",
            listWattmeter: [],
            listwattmeterBrand: [],
            editWattmeterIndex: -1,
        }
    },
    methods: {
        async limpiar(){
            this.wattmeter_brand = "";
            this.wattmeter_number = "";
            this.editWattmeter_brand = "";
            this.editWattmeter_number = "";
            router.push('/wattmeter');
        },
        async limpiarUpdate(){
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
        updateWattmeter() {
            axios.patch(`wattmeter/${this.id}/`, {
                wattmeter_number: this.editWattmeter_number,
                wattmeter_brand: this.editWattmeter_brand
            })
                .then(response => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
            this.listar();
            this.limpiarUpdate();
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
        },
        openEditModal(i) {
            this.editWattmeterIndex = i;
            this.editWattmeter_number = this.listWattmeter[i].wattmeter_number;
            this.editWattmeter_brand = this.listWattmeter[i].wattmeter_brand;
            this.id = this.listWattmeter[i].id;
        }
    },
    async mounted() {
        await this.listar();
        await this.listarMarcas();
    },
}
</script>

<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 overflow-auto">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2" style="color: white;" >Dashboard</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group me-2">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalCreacionContador">
                Ingresar nuevo contador
                </button>

                <!-- Modal -->
                <div class="modal fade" id="ModalCreacionContador" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Ingreso de Contador</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <label for="wattmeter_number" class="form-label">Número de Contador</label>
                                <input type="text" class="form-control" id="wattmeter_number" placeholder="Número de Contador" v-model="wattmeter_number">
                                <label for="wattmeter_brand" class="form-label">Marca de Contador</label>
                                <select id="wattmeter_brand" class="form-select" :items="listwattmeterBrand" :fields="fieldsWB" v-model="wattmeter_brand">
                                    <option selected>Selecciona marca de contador</option>
                                    <option v-for="lwb in listwattmeterBrand" v-bind:key="lwb.id" v-bind:value="lwb.id">{{ lwb.brand_name }}</option>
                                </select>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="limpiar">Cerrar</button>
                                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="createWattmeter">Crear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>

        <h2 style="color: white;">CONTADORES</h2>
        <table class="table table-striped table-sm" :items="listWattmeter" :fields="fields">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Número de Contador</th>
            <th scope="col">Marca de Contador</th>
            <th scope="col">Fecha de creación</th>
            <th scope="col">Fecha de actualización</th>
            <th scope="col">Acciones</th>
            </tr>
        </thead>
        </table>
        <div class="table-responsive small" style="max-height: 300px; overflow-y: auto;">
            <table class="table table-striped table-sm" :items="listWattmeter" :fields="fields">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Número de Contador</th>
                <th scope="col">Marca de Contador</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Fecha de actualización</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(lw, i) in listWattmeter" v-bind:key="lw.id">
                <td>{{lw.id}}</td>
                <td>{{lw.wattmeter_number}}</td>
                <td>{{lw.wattmeter_brand['brand_name']}}</td>
                <td>{{lw.insert_date}}</td>
                <td>{{lw.update_date}}</td>
                <td>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="openEditModal(i)">
                        Editar
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Actualización del contador</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <label for="actualWattmeterNumber" class="form-label">Número de Contador</label>
                                    <input type="text" class="form-control" id="actualWattmeterNumber" placeholder="" v-model="editWattmeter_number">
                                    <select id="wattmeter_brand" class="form-select" :items="listwattmeterBrand" :fields="fieldsWB" v-model="editWattmeter_brand">
                                        <option selected>Selecciona marca de contador</option>
                                        <option v-for="lwb in listwattmeterBrand" v-bind:key="lwb.id" v-bind:value="lwb.id">{{ lwb.brand_name }}</option>
                                    </select>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="limpiar">Cerrar</button>
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateWattmeter">Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
    </main>
</template>