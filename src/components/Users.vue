<script>

import axios from 'axios'
import router from '../router';

export default {
    name: 'Users',
    data() {
        return {
            fields: ['id', 'first_name', 'last_name', 'username', 'status', 'rol', 'department','insert_date', 'update_date'],
            fieldsRol: ['id', 'rol_name', 'insert_date', 'update_date'],
            fieldsDep: ['id', 'department_name', 'insert_date', 'update_date'],
            id: "",
            first_name: "",
            last_name: "",
            username:"",
            password:"",
            status:1,
            rol: 0,
            department: 0,
            insert_date: "",
            update_date: "",
            listUser: [],
            listRol: [],
            listDep: [],
            editFirstname: "",
            editLastname: "",
            editUsername: "",
            editStatus: "",
            editRol: "",
            editPassword: "",
            editDepartment: "",
            editUserIndex: -1,
        }
    },
    methods: {
        async limpiar(){
            this.first_name = '';
            this.editFirstname = '';
            this.last_name = '';
            this.editLastname = '';
            this.username = '';
            this.editUsername = '';
            this.status = '';
            this.editStatus = '';
            this.rol = '';
            this.editRol = '';
            this.editPassword = '';
            this.editDepartment = '';
        },
        async limpiarUpdate(){
            router.push('/users');
        },
        async createUser(){
            axios.post('users/', {
                first_name: this.first_name,
                last_name: this.last_name,
                username: this.username,
                password: this.password,
                status: this.status,
                rol: this.rol,
                department: this.department
            })
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
            this.listar();
            this.listarRol();
            this.listarDepto();
            this.limpiar();
        },
        async updateUsers(){
            axios.patch(`users/${this.id}/`, {
                first_name: this.editFirstname,
                last_name: this.editLastname,
                username: this.editUsername,
                status: this.editStatus,
                rol: this.editRol,
                department: this.editDepartment,
                update_date: new Date()
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
            axios.get('users/')
                .then(response => {
                    this.listUser = response.data;
                    console.log(this.listUser);
                })
                .catch(function (error){
                    console.log(error)
                })
                .finally(function(){
                })
        },
        openEditModal(i){
            this.editUserIndex = i;
            this.editFirstname = this.listUser[i].first_name;
            this.editLastname = this.listUser[i].last_name;
            this.editUsername = this.listUser[i].username;
            // this.editPassword = this.listUser[i].password;
            this.editStatus = this.listUser[i].status;
            this.editRol = this.listUser[i].rol;
            this.editDepartment = this.listUser[i].department;
            this.id = this.listUser[i]. id;
        },
        async listarRol(){
            axios.get('catalog/roles/')
                .then(response => {
                    this.listRol = response.data;
                    console.log(this.listRol);
                })
                .catch(function (error){
                    console.log(error)
                })
                .finally(function(){
                })
        },
        async listarDepto(){
            axios.get('catalog/departments/')
                .then(response => {
                    this.listDep = response.data;
                    console.log(this.listDep);
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
        await this.listarRol();
        await this.listarDepto();
    },
}
</script>

<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 overflow-auto">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2" style="color: white;" >Dashboard</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group me-2">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalCreacionDep">
                    Crear nuevo usuario
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="ModalCreacionDep" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Creación del usuario</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <label for="first_name" class="form-label">Primer Nombre</label>
                                    <input type="text" class="form-control" id="first_name" placeholder="Primer Nombre" v-model="first_name">
                                    <label for="last_name" class="form-label">Primer Apellido</label>
                                    <input type="text" class="form-control" id="last_name" placeholder="Primer Apellido" v-model="last_name">
                                    <label for="username" class="form-label">Username</label>
                                    <input type="text" class="form-control" id="username" placeholder="Username" v-model="username">
                                    <label for="password" class="form-label">Contraseña</label>
                                    <input type="password" class="form-control" id="password" placeholder="Contraseña" v-model="password">
                                    <label for="rol" class="form-label">Rol de Usuario</label>
                                    <select id="rol" class="form-select" :items="listRol" :fields="fieldsRol" v-model="rol">
                                        <option selected>Selecciona rol de usuario</option>
                                        <option v-for="lr in listRol" v-bind:key="lr.id" v-bind:value="lr.id">{{ lr.rol_name }}</option>
                                    </select>
                                    <label for="department" class="form-label">Departamento</label>
                                    <select id="department" class="form-select" :items="listDep" :fields="fieldsDep" v-model="department">
                                        <option selected>Selecciona departamento asignado</option>
                                        <option v-for="ld in listDep" v-bind:key="ld.id" v-bind:value="ld.id">{{ ld.department_name }}</option>
                                    </select>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="limpiar">Cerrar</button>
                                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="createUser">Crear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>

        <h2 style="color: white;">Usuarios</h2>
        <div class="table-responsive small" style="max-height: 300px; overflow-y: auto;">
            <table class="table table-striped table-sm" :items="listUser" :fields="fields">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre de Usuario</th>
                <th scope="col">Username</th>
                <th scope="col">Estado</th>
                <th scope="col">Rol</th>
                <th scope="col">Departamento</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Fecha de actualización</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(lu, i) in listUser" v-bind:key="lu.id">
                <td>{{lu.id}}</td>
                <td>{{lu.first_name}} {{lu.last_name}}</td>
                <td>{{lu.username}}</td>
                <td v-if="lu.status == 1">
                    <span class="badge text-bg-success">ACTIVO</span>
                </td>
                <td v-else>
                    <span class="badge text-bg-danger">INACTIVO</span>
                </td>
                <td>{{lu.rol['rol_name']}}</td>
                <td>{{lu.department['department_name']}}</td>
                <td>{{lu.insert_date}}</td>
                <td>{{lu.update_date}}</td>
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
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Actualización de datos</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <label class="form-label">Primer Nombre</label>
                                    <input type="text" class="form-control" id="editFirtsName" placeholder="" v-model="editFirstname">

                                    <label for="editLastName" class="form-label">Primer Apellido</label>
                                    <input type="text" class="form-control" id="editLastName" placeholder="" v-model="editLastname">

                                    <label for="editUsername" class="form-label">Username</label>
                                    <input type="text" class="form-control" id="editUsername" placeholder="" v-model="editUsername">
                                    
                                    <label for="editRol" class="form-label">Rol</label>
                                    <select id="editRol" class="form-select" :items="listRol" :fields="fieldsRol" v-model="editRol">
                                        <option selected>Selecciona rol de usuario</option>
                                        <option v-for="lr in listRol" v-bind:key="lr.id" v-bind:value="lr.id">{{ lr.rol_name }}</option>
                                    </select>
                                    
                                    <label for="editDepartment" class="form-label">Departamento</label>
                                    <select id="editDepartment" class="form-select" :items="listDep" :fields="fieldsDep" v-model="editDepartment">
                                        <option selected>Selecciona departamento asignado</option>
                                        <option v-for="ld in listDep" v-bind:key="ld.id" v-bind:value="ld.id">{{ ld.department_name }}</option>
                                    </select>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="limpiar">Cerrar</button>
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateUsers">Guardar</button>
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