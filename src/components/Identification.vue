<script>

import axios from 'axios'
import router from '../router';

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
            editIdentificationName: "",
            editIdentificationIndex: -1
        }
    },
    methods: {
        limpiar(){
            this.identification_name = "";
            router.push('/identificationType')
        },
        limpiarUpdate(){
            location.reload();
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
        updateVillage(){
            axios.patch(`catalog/identificationType/${this.id}/`, {
                identification_name: this.editIdentificationName
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
        },
        openEditModal(i){
            this.editIdentificationIndex = i;
            this.editIdentificationName = this.listIdentifications[i].identification_name;
            this.id = this.listIdentifications[i].id;
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
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalCreationID">
                    Registrar nuevo tipo de identificación
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="ModalCreationID" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Registro de Tipos de Identificación</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <label for="identificationName" class="form-label">Tipo de Identificación</label>
                                    <input type="text" class="form-control" id="identificationName" placeholder="Tipo de identificación" v-model="identification_name">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="limpiar">Cerrar</button>
                                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="createIdentificationType">Crear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(li, i) in listIdentifications" v-bind:key="li.id">
                <td>{{li.id}}</td>
                <td>{{li.identification_name}}</td>
                <td>{{li.insert_date}}</td>
                <td>{{li.update_date}}</td>
                <td>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModelUpdateID" @click="openEditModal(i)">
                        Editar
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="ModelUpdateID" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Actualización de Localidades</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <label for="actualIDname" class="form-label">Nombre de la Localidad</label>
                                    <input type="text" class="form-control" id="actualIDname" placeholder="" v-model="editIdentificationName">
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