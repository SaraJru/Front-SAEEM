<script>

import axios from 'axios'
import router from '../router';

export default {
    name: 'Departments',
    data() {
        return {
            fields: ['id', 'department_name', 'insert_date', 'update_date'],
            id: "",
            department_name: "",
            insert_date: "",
            update_date: "",
            listDepartments: [],
            editDepartmentName: "",
            editDepartmenIndex: -1,
        }
    },
    methods: {
        limpiar(){
            this.department_name = '';
            this.editDepartmentName = '';
            router.push('/departments');
        },
        limpiarUpdate(){
            location.reload();
        },
        createDepartment(){
            axios.post('catalog/departments/', {
                department_name: this.department_name
            })
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
            this.limpiar();
            this.listar();
        },
        updateRol(){
            axios.patch(`catalog/departments/${this.id}/`, {
                department_name: this.editDepartmentName
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
            axios.get('catalog/departments/')
                .then(response => {
                    this.listDepartments = response.data;
                    console.log(this.listDepartments);
                })
                .catch(function (error){
                    console.log(error)
                })
        },
        openEditModal(i){
            this.editDepartmenIndex = i;
            this.editDepartmentName = this.listDepartments[i].department_name;
            this.id = this.listDepartments[i].id;
        }
    },
    mounted() {
        this.listar();
    },
}    
</script>

<template>
    <main class="col-md-9 ms-sm-auto col-lg-9 px-md-4">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Dashboard</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group me-2">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalCreacionDep">
                Crear nuevo Departamento
                </button>

                <!-- Modal -->
                <div class="modal fade" id="ModalCreacionDep" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Creación de Departamentos</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <label for="departmentName" class="form-label">Nombre del Departamento Nuevo</label>
                                <input type="text" class="form-control" id="departmentName" placeholder="Nombre del departamento" v-model="department_name">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="limpiar">Cerrar</button>
                                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="createDepartment">Crear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>

        <h2 style="color: white;">DEPARTAMENTOS</h2>
        <div class="table-responsive small">
            <table class="table table-striped table-sm" :items="listDepartments" :fields="fields">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre del departamento</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Fecha de actualización</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(ld, i) in listDepartments" v-bind:key="ld.id">
                    <td>{{ld.id}}</td>
                    <td>{{ld.department_name}}</td>
                    <td>{{ld.insert_date}}</td>
                    <td>{{ld.update_date}}</td>
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
                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Actualización de Departamentos</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <label for="actualDeptoName" class="form-label">Nombre del Departamento</label>
                                        <input type="text" class="form-control" id="actualDeptoName" placeholder="" v-model="editDepartmentName">
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="limpiar">Cerrar</button>
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateRol">Guardar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
        <div>
            <div class="mb-3">
                
            </div>
            <div class="col-auto">

            </div>
        </div>
    </main>
</template>