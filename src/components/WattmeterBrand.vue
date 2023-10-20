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
            editBrandName: "",
            editBrandNameIndex: -1
        }
    },
    methods: {
        limpiar(){
            this.brand_name = "";
            router.push('/wattmeterBrand')
        },
        limpiarUpdate(){
            location.reload();
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
        updateWattmeterBrand(){
            axios.patch(`catalog/wattmeterBrand/${this.id}/`, {
                brand_name: this.editBrandName
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
        },
        openEditModal(i){
            this.editBrandNameIndex = i;
            this.editBrandName = this.listwattmeterBrand[i].brand_name;
            this.id = this.listwattmeterBrand[i].id;
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
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalCreationBrand">
                    Registrar nueva marca de contador
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="ModalCreationBrand" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Registro de Tipos de Identificación</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <label for="brandName" class="form-label">Nombre de marca</label>
                                    <input type="text" class="form-control" id="brandName" placeholder="Nombre de la marca" v-model="brand_name">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="limpiar">Cerrar</button>
                                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="createwattmeterBrand">Crear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <h2 style="color: white;">MARCAS DE CONTADORES</h2>
        <div class="table-responsive small table-responsive" >
            <table class="table table-striped table-sm" :items="listwattmeterBrand" :fields="fields">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre de la marca</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Fecha de actualización</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(lw, i) in listwattmeterBrand" v-bind:key="lw.id">
                <td>{{lw.id}}</td>
                <td>{{lw.brand_name}}</td>
                <td>{{lw.insert_date}}</td>
                <td>{{lw.update_date}}</td>
                <td>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModelUpdateBrand" @click="openEditModal(i)">
                        Editar
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="ModelUpdateBrand" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Actualización de Marcas</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <label for="actualBrandName" class="form-label">Nombre de la marca</label>
                                    <input type="text" class="form-control" id="actualBrandName" placeholder="" v-model="editBrandName">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateWattmeterBrand">Guardar</button>
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