<script>

import axios from 'axios'
import router from '../router';

export default {
    name: 'ListAccounts',
    data() {
        return {
            fields: ['id', 'id_wattmeter','opening_date','id_client','id_home_information','id_read_user', 'id_services', 'visit_date', 'id_user','contract_number', 'insert_date', 'update_date'],
            id: "",
            first_name: "",
            last_name: "",
            username:"",
            password:"",
            status:1,
            rol:0,
            department: 0,
            id_read_user: 0,
            visit_date: null,
            opening_date: null,
            insert_date: "",
            update_date: "",
            listAccounts: [],
            fieldsUser: ['id', 'first_name', 'last_name', 'username', 'status', 'rol', 'department','insert_date', 'update_date'],
            listUser: [],
            editAccountIndex: -1
        }
    },
    methods: {
        async limpiarUpdate(){
            location.reload();
        },
        async cambiarStatusActivo(){
            this.status = 3;
            this.opening_date = new Date();
        },
        async cambiarStatusPendiente(){
            this.status = 2;
            this.updateAccount();
        },
        async updateAccount(){

            axios.patch(`accountData/${this.id}/`, {
                id_status: this.status,
                id_read_user: this.id_read_user,
                visit_date: this.visit_date,
                opening_date: this.opening_date,
                update_date: new Date()
            })
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
            this.listar();
            // this.limpiarUpdate();
        },
        async listar(){
            axios.get('accountData/')
                .then(response => {
                    this.listAccounts = response.data;
                    console.log(this.listAccounts);
                })
                .catch(function (error){
                    console.log(error)
                })
                .finally(function(){
                })
        },
        async listarUser(){
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
        async redirectCreate(){
            router.push('/createAccounts')
        },
        openEditModal(i) {
            this.editAccountIndex = i;
            this.id = this.listAccounts[i].id;
            this.status = this.listAccounts[i].id_status['id'];
            this.visit_date = this.listAccounts[i].visit_date;
            this.opening_date = this.listAccounts[i].opening_date;
            this.id_read_user = this.listAccounts[i].id_read_user['id'];
        }
    },
    async mounted() {
        await this.listar();
        await this.listarUser();
    },
}
</script>

<template>
    <main class="col-md-9 ms-sm-auto col-lg-9 px-md-4 overflow-auto">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Dashboard</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group me-2">
                <button type="button" class="btn btn-primary" @click="redirectCreate">Crear cuenta</button>
            </div>

            </div>
        </div>

        <h2 style="color: white;">Cuentas</h2>
        <div class="table-responsive small" style="max-height: 600px; overflow-y: auto;">
            <table class="table table-striped table-sm" :items="listAccounts" :fields="fields">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Estado de la cuenta</th>
                <th scope="col">Nombre de cliente</th>
                <th scope="col">Contador</th>
                <th scope="col">Fecha de apertura</th>
                <th scope="col">Fecha de visita</th>
                <th scope="col">Dirección</th>
                <th scope="col">Servicio</th>
                <th scope="col">Número de contrato</th>
                <th scope="col">Creador de la cuenta</th>
                <th scope="col">Técnico asignado</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Fecha de actualización</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(la, i) in listAccounts" v-bind:key="la.id">
                <td>{{la.id}}</td>

                <td v-if="la.id_status['id'] == 1">
                    <span class="badge rounded-pill text-bg-primary">Creado</span>
                </td>
                <td v-else-if="la.id_status['id'] == 2">
                    <span class="badge rounded-pill text-bg-warning">En Espera</span>
                </td>
                <td v-else-if="la.id_status['id'] == 3">
                    <span class="badge rounded-pill text-bg-success">Activa</span>
                </td>

                <td>{{la.id_client['first_name']}} {{la.id_client['middle_name']}} {{la.id_client['first_lastname']}} {{ la.id_client['second_lastname']}}</td>
                <td>{{la.id_wattmeter['wattmeter_number']}}</td>
                <td v-if="la.opening_date != null">{{la.opening_date}}</td>
                <td v-else>No Asignado</td>

                <td v-if="la.visit_date != null">{{la.visit_date}}</td>
                <td v-else>No Asignado</td>

                <td>{{la.id_home_information['addres']}}, zona {{la.id_home_information['zone_number']}}, {{la.id_home_information['id_village']['village_name']}}</td>
                <td>{{la.id_services['service_name']}}</td>
                <td>{{la.contract_number}}</td>
                <td>{{la.id_user['first_name']}} {{la.id_user['last_name']}}</td>
                <td>{{la.id_read_user['first_name']}} {{la.id_read_user['last_name']}}</td>
                <td>{{la.insert_date}}</td>
                <td>{{la.update_date}}</td>
                <td>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="openEditModal(i)">
                    Editar
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Actualización del servicio</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div v-if="status == 1">
                                        <div class="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100" style="height: 1px">
                                            <div class="progress-bar" style="width: 33%"></div>
                                        </div>
                                        <br>
                                        <div class="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100" style="height: 20px">
                                            <div class="progress-bar bg-info" style="width: 33%">Cuenta creada</div>
                                        </div>
                                    </div>
                                    <div v-if="status == 2">
                                        <div class="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100" style="height: 1px">
                                            <div class="progress-bar" style="width: 66%"></div>
                                        </div>
                                        <br>
                                        <div class="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100" style="height: 20px">
                                            <div class="progress-bar bg-warning" style="width: 66%">En progreso de visita</div>
                                        </div>
                                    </div>
                                    <div v-if="status == 3">
                                        <div class="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="height: 1px">
                                            <div class="progress-bar" style="width: 100%"></div>
                                        </div>
                                        <br>
                                        <div class="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="height: 20px">
                                            <div class="progress-bar bg-success" style="width: 100%">Cuenta activada</div>
                                        </div>
                                    </div>
                                    <br>
                                    <label for="id_read_user" class="form-label">Usuario Lector</label>
                                    <select id="id_read_user" class="form-select mb-3" :items="listUser" :fields="fieldsUser" v-model="id_read_user">
                                        <option selected>Selecciona al usuario lector</option>
                                        <option v-for="lu in listUser" v-bind:key="lu.id" v-bind:value="lu.id">{{lu.first_name}} {{ lu.last_name }} - ({{lu.username}})</option>
                                    </select>
                                    
                                    <div v-if="visit_date == null && status == 1">
                                        <label for="visit_date">Primera fecha de visita</label>
                                        <br>
                                    </div>
                                    <div v-else-if="visit_date != null && status == 1">
                                        <label for="visit_date">Siguiente fecha de visita</label>
                                        <br>
                                    </div>
                                    <div v-if="status == 1">
                                        <input type="date" id="visit_date"  name="visit_date"  class="sm-form-control" v-model="visit_date">
                                        <br>
                                        <button type="button" class="btn btn-primary" @click="cambiarStatusPendiente">Asignar fecha de visita</button>
                                    </div>

                                    <br>

                                    <div class="mb-3" v-if="status == 2">
                                        <div class="accordion accordion-flush" id="accordionFlushExample">
                                            <div class="accordion-item">
                                                <h2 class="accordion-header">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                    Acuerdo para activación de cuenta
                                                </button>
                                                </h2>
                                                <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                    <div class="accordion-body">
                                                        <strong>Es importante considerar </strong> 
                                                        Que llegado a este punto, ya es posible activar la cuenta del cliente 
                                                        {{la.id_client['first_name']}} {{la.id_client['middle_name']}} {{ la.id_client['third_name']}} {{la.id_client['first_lastname']}} {{ la.id_client['second_lastname']}} {{ la.id_client['married_name']}}
                                                        con NIT {{ la.id_client['nit']}} .
                                                        ¿Ya se cumplen con todos los requisitos? ¿Se ha validado que toda la documentación, fuera de este sistema, es correcta?
                                                        Si ese es el caso, entonces puede proceder a activar la cuenta.
                                                        Este paso es irreversible.
                                                        <br>
                                                        <button type="button" class="btn btn-success" @click="cambiarStatusActivo">Activar Cuenta</button>
                                                        <div class="alert alert-warning" role="alert">
                                                            Después de presionar el botón "Activar Cuenta", presione el botón "Guardar" para aplicar la activación de la cuenta.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="limpiarUpdate">Cerrar</button>
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateAccount">Guardar</button>
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