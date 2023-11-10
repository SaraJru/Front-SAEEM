<script>

import axios from 'axios'
import router from '../router';

export default {
    name: 'Clients',
    data() {
        return {
            fields: ['id', 'first_name', 'middle_name', 'third_name', 'first_lastname', 'second_lastname','married_name', 'nit','email', 'phone_number', 'identification',
                    'insert_date','update_date'],
            id: "",
            first_name: "",
            middle_name: "",
            third_name: "",
            first_lastname: "",
            second_lastname: "",
            married_name: "",
            nit: 0,
            email: "",
            phone_number: 0,
            identification: 0,
            editfirst_name: "",
            editmiddle_name: "",
            editthird_name: "",
            editfirst_lastname: "",
            editsecond_lastname: "",
            editmarried_name: "",
            editnit: 0,
            editemail: "",
            editphone_number: 0,
            editidentification: 0,
            insert_date: "",
            update_date: "",
            listClient: [],
            listIDs: [],
            fieldsID: ['id', 'identification_name', 'insert_date', 'update_date'],
            editServiceName: "",
            editClientIndex: -1,
        }
    },
    methods: {
        limpiar(){
            this.first_name = "";
            this.middle_name = "";
            this.third_name = "";
            this.first_lastname = "";
            this.second_lastname = "";
            this.married_name = "";
            this.nit = "";
            this.email = "";
            this.phone_number = "";
            this.identification = "";
        },
        limpiarUpdate(){
            router.push('/clients')
        },
        createClient(){
            axios.post('client/', {
                first_name: this.first_name,
                middle_name: this.middle_name,
                third_name: this.third_name,
                first_lastname: this.first_lastname,
                second_lastname: this.second_lastname,
                married_name: this.married_name,
                nit: this.nit,
                email: this.email,
                phone_number: this.phone_number,
                identification: this.identification,
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
        updateService(){
            axios.patch(`client/${this.id}/`, {
                first_name: this.editfirst_name,
                middle_name: this.editmiddle_name,
                third_name: this.editthird_name,
                first_lastname: this.editfirst_lastname,
                second_lastname: this.editsecond_lastname,
                married_name: this.editmarried_name,
                nit: this.editnit,
                email: this.editemail,
                phone_number: this.editphone_number,
                identification: this.editidentification,
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
            axios.get('client/')
                .then(response => {
                    this.listClient = response.data;
                    console.log(this.listClient);
                })
                .catch(function (error){
                    console.log(error)
                })
                .finally(function(){
                })
        },
        async listarID(){
            axios.get('catalog/identificationType/')
                .then(response => {
                    this.listIDs = response.data;
                    console.log(this.listIDs);
                })
                .catch(function (error){
                    console.log(error)
                })
                .finally(function(){
                })
        },
        openEditModal(i) {
            this.editClientIndex = i;
            this.id = this.listClient[i].id;
            this.editfirst_name = this.listClient[i].first_name;
            this.editmiddle_name = this.listClient[i].middle_name;
            this.editthird_name = this.listClient[i].third_name;
            this.editfirst_lastname = this.listClient[i].first_lastname;
            this.editsecond_lastname = this.listClient[i].second_lastname;
            this.editmarried_name = this.listClient[i].married_name;
            this.editnit = this.listClient[i].nit;
            this.editemail = this.listClient[i].email;
            this.editphone_number = this.listClient[i].phone_number;
            this.editidentification = this.listClient[i].identification;
        }
    },
    mounted() {
        this.listar();
        this.listarID();
    },
}
</script>

<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2" style="color: white;" >Dashboard</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group me-2">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalCreacionStatus">
                    Ingresar nuevo cliente
                </button>

                <!-- Modal -->
                <div class="modal fade" id="ModalCreacionStatus" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Ingreso de cliente</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <label for="first_name" class="form-label">Primer Nombre</label>
                                <input type="text" class="form-control mb-3" id="first_name" name="first_name" v-model="first_name">

                                <label for="middle_name" class="form-label">Segundo Nombre</label>
                                <input type="text" class="form-control mb-3" id="middle_name" name="middle_name" v-model="middle_name">
                                
                                <label for="third_name" class="form-label">Tercer Nombre (si aplica)</label>
                                <input type="text" class="form-control mb-3" id="third_name" name="third_name" v-model="third_name">

                                <label for="first_lastname" class="form-label">Primer Apellido</label>
                                <input type="text" class="form-control mb-3" id="first_lastname" name="first_lastname" v-model="first_lastname">

                                <label for="second_lastname" class="form-label">Segundo Apellido</label>
                                <input type="text" class="form-control mb-3" id="second_lastname" name="second_lastname" v-model="second_lastname">

                                <label for="married_name" class="form-label">Apellido de casada (si aplica)</label>
                                <input type="text" class="form-control mb-3" id="married_name" name="married_name" v-model="married_name">
                                
                                <label for="nit" class="form-label">NIT</label>
                                <input type="text" class="form-control mb-3" id="nit" name="nit" v-model="nit">

                                <label for="email" class="form-label">Correo electrónico</label>
                                <input type="email" class="form-control mb-3" id="email" name="email" v-model="email">
                                
                                <label for="phone_number" class="form-label">Número de teléfono (sin guión)</label>
                                <input type="phone" class="form-control mb-3" id="phone_number" name="phone_number" v-model="phone_number">
                                
                                <label for="id_type" class="form-label">Tipo de Identificación</label>
                                <select id="id_type" class="form-select" :items="listIDs" :fields="fieldsID" v-model="identification">
                                    <option selected>Selecciona el tipo de identificación</option>
                                    <option v-for="lid in listIDs" v-bind:key="lid.id" v-bind:value="lid.id">{{ lid.identification_name }}</option>
                                </select>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="limpiar">Cerrar</button>
                                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="createClient">Crear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>

        <h2 style="color: white;">CLIENTES</h2>
        <div class="table-responsive small" style="max-height: 300px; overflow-y: auto;">
            <table class="table table-striped table-sm" :items="listClient" :fields="fields">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre completo</th>
                <th scope="col">NIT</th>
                <th scope="col">Correo electrónico</th>
                <th scope="col">Número de teléfono</th>
                <th scope="col">Tipo de Identificación</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Fecha de actualización</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(lc, i) in listClient" v-bind:key="lc.id">
                <td>{{lc.id}}</td>
                <td>{{lc.first_name}} {{lc.middle_name}} {{lc.third_name}} {{lc.first_lastname}} {{lc.second_lastname}} {{lc.married_name}}</td>
                <td>{{lc.nit}}</td>
                <td>{{lc.email}}</td>
                <td>{{lc.phone_number}}</td>
                <td>{{lc.identification['identification_name']}}</td>
                <td>{{lc.insert_date}}</td>
                <td>{{lc.update_date}}</td>
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
                                        <label for="editfirst_name" class="form-label">Primer Nombre</label>
                                        <input type="text" class="form-control mb-3" id="editfirst_name" name="editfirst_name" v-model="editfirst_name">

                                        <label for="middle_name" class="form-label">Segundo Nombre</label>
                                        <input type="text" class="form-control mb-3" id="middle_name" name="middle_name" v-model="editmiddle_name">
                                        
                                        <label for="editthird_name" class="form-label">Tercer Nombre (si aplica)</label>
                                        <input type="text" class="form-control mb-3" id="editthird_name" name="editthird_name" v-model="editthird_name">

                                        <label for="editfirst_lastname" class="form-label">Primer Apellido</label>
                                        <input type="text" class="form-control mb-3" id="editfirst_lastname" name="editfirst_lastname" v-model="editfirst_lastname">

                                        <label for="editsecond_lastname" class="form-label">Segundo Apellido</label>
                                        <input type="text" class="form-control mb-3" id="editsecond_lastname" name="editsecond_lastname" v-model="editsecond_lastname">

                                        <label for="editmarried_name" class="form-label">Apellido de casada (si aplica)</label>
                                        <input type="text" class="form-control mb-3" id="editmarried_name" name="editmarried_name" v-model="editmarried_name">
                                        
                                        <label for="editnit" class="form-label">NIT</label>
                                        <input type="text" class="form-control mb-3" id="editnit" name="editnit" v-model="editnit">

                                        <label for="editemail" class="form-label">Correo electrónico</label>
                                        <input type="email" class="form-control mb-3" id="editemail" name="editemail" v-model="editemail">
                                        
                                        <label for="editphone_number" class="form-label">Número de teléfono (sin guión)</label>
                                        <input type="phone" class="form-control mb-3" id="editphone_number" name="editphone_number" v-model="editphone_number">
                                        
                                        <label for="editid_type" class="form-label">Tipo de Identificación</label>
                                        <select id="editid_type" class="form-select" :items="listIDs" :fields="fieldsID" v-model="editidentification">
                                            <option selected>Selecciona el tipo de identificación</option>
                                            <option v-for="lid in listIDs" v-bind:key="lid.id" v-bind:value="lid.id">{{ lid.identification_name }}</option>
                                        </select>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="limpiar">Cerrar</button>
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateService">Guardar</button>
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