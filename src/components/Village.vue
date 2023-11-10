<script>

import axios from 'axios'
import router from '../router';

export default {
    name: 'Village',
    data() {
        return {
            fields: ['id', 'village_name', 'insert_date', 'update_date'],
            id: "",
            village_name: "",
            insert_date: "",
            update_date: "",
            listVillage: [],
            editVillageName: "",
            editVillageIndex: -1
        }
    },
    methods: {
        limpiar(){
            this.village_name = "";
            router.push('/village');
        },
        limpiarUpdate(){
            location.reload();
        },
        createVillage(){
            axios.post('catalog/village/', {
                village_name: this.village_name
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
        updateVillage(){
            axios.patch(`catalog/village/${this.id}/`, {
                village_name: this.editVillageName
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
            axios.get('catalog/village/')
                .then(response => {
                    this.listVillage = response.data;
                    console.log(this.listVillage);
                })
                .catch(function (error){
                    console.log(error)
                })
                .finally(function(){
                })
        },
        openEditModal(i){
            this.editVillageIndex = i;
            this.editVillageName = this.listVillage[i].village_name;
            this.id = this.listVillage[i].id;
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
            <h1 class="h2" style="color: white;" >Dashboard</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group me-2">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalCreacionVillage">
                    Registrar nueva Aldea, Caserío o Cantón
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="ModalCreacionVillage" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Registro de Localidades</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <label for="villageName" class="form-label">Nombre de la Localidad</label>
                                    <input type="text" class="form-control" id="villageName" placeholder="Nombre de la aldea, caserío o cantón" v-model="village_name">       
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="limpiar">Cerrar</button>
                                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="createVillage">Crear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <h2 style="color: white;">LOCALIDADES</h2>
        <div class="table-responsive small" style="max-height: 300px; overflow-y: auto;">
            <table class="table table-striped table-sm" :items="listVillage" :fields="fields">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre de la aldea</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Fecha de actualización</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(lv, i) in listVillage" v-bind:key="lv.id">
                <td>{{lv.id}}</td>
                <td>{{lv.village_name}}</td>
                <td>{{lv.insert_date}}</td>
                <td>{{lv.update_date}}</td>
                <td>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModelUpdateVillage" @click="openEditModal(i)">
                        Editar
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="ModelUpdateVillage" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Actualización de Localidades</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <label for="actualVillageName" class="form-label">Nombre de la Localidad</label>
                                    <input type="text" class="form-control" id="actualVillageName" placeholder="" v-model="editVillageName">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateVillage">Guardar</button>
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