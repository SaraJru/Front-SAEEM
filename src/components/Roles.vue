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
            editRolName: "",
            editRolIndex: -1,
        }
    },
    methods: {
        limpiar(){
            this.rol_name = "";
            this.editRolName = '';
            this.rol_name = "";
        },
        limpiarUpdate(){
            location.reload();
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
        updateRol() {
            axios.patch(`catalog/roles/${this.id}/`, {
                rol_name: this.editRolName
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
        },
        openEditModal(i) {
            this.editRolIndex = i;
            this.editRolName = this.listRoles[i].rol_name;
            this.id = this.listRoles[i].id;
        }
    },
    mounted() {
        this.listar()
    },
}
</script>

<template>
    <main class="col-md-9 ms-sm-auto col-lg-9 px-md-4">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Dashboard</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group me-2">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#ModalCreacionRoles">
                        Crear nuevo rol
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="ModalCreacionRoles" data-bs-backdrop="static" data-bs-keyboard="false"
                        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Creación de roles</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <label for="rolName" class="form-label">Nombre del rol</label>
                                    <input type="text" class="form-control" id="rolName" placeholder="Nombre del rol"
                                        v-model="rol_name">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                        @click="limpiar">Cerrar</button>
                                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal"
                                        @click="createRol">Crear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <h2 style="color: white;">ROLES</h2>
        <div class="table-responsive small" style="max-height: 300px; overflow-y: auto;">
            <table class="table table-striped table-sm" :items="listRoles" :fields="fields">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre del rol</th>
                        <th scope="col">Fecha de creación</th>
                        <th scope="col">Fecha de actualización</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(lr, i) in listRoles" v-bind:key="lr.id">
                        <td>{{ lr.id }}</td>
                        <td>{{ lr.rol_name }}</td>
                        <td>{{ lr.insert_date }}</td>
                        <td>{{ lr.update_date }}</td>
                        <td>
                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop" @click="openEditModal(i)">
                                Editar
                            </button>

                            <!-- Modal -->
                            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                                tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Actualización del rol</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <label for="actualRolName" class="form-label">Nombre del rol</label>
                                            <input type="text" class="form-control" id="actualRolName" placeholder=""
                                                v-model="editRolName">
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                                @click="limpiar">Cerrar</button>
                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                            @click="updateRol">Guardar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</main></template>