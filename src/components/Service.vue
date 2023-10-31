<script>

import axios from 'axios'

export default {
    name: 'Service',
    data() {
        return {
            fields: ['id', 'service_name', 'insert_date', 'update_date'],
            id: "",
            service_name: "",
            insert_date: "",
            update_date: "",
            listService: [],
            editServiceName: "",
            editServiceIndex: -1,
        }
    },
    methods: {
        limpiar(){
            this.service_name = '';
            this.editServiceName = '';
            this.service_name = "";
        },
        limpiarUpdate(){
            location.reload();
        },
        createService(){
            axios.post('catalog/service/', {
                service_name: this.service_name
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
            axios.patch(`catalog/service/${this.id}/`, {
                service_name: this.editServiceName
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
            axios.get('catalog/service/')
                .then(response => {
                    this.listService = response.data;
                    console.log(this.listService);
                })
                .catch(function (error){
                    console.log(error)
                })
                .finally(function(){
                })
        },
        openEditModal(i) {
            this.editServiceIndex = i;
            this.editServiceName = this.listService[i].service_name;
            this.id = this.listService[i].id;
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
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalCreacionStatus">
                Crear nuevo servicio
                </button>

                <!-- Modal -->
                <div class="modal fade" id="ModalCreacionStatus" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Creación de servicios</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <label for="serviceName" class="form-label">Nombre del servicio</label>
                                <input type="text" class="form-control" id="serviceName" placeholder="Nombre del servicio" v-model="service_name">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="limpiar">Cerrar</button>
                                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="createService">Crear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>

        <h2 style="color: white;">SERVICIOS</h2>
        <div class="table-responsive small" style="max-height: 300px; overflow-y: auto;">
            <table class="table table-striped table-sm" :items="listService" :fields="fields">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre de servicio</th>
                <th scope="col">Fecha de creación</th>
                <th scope="col">Fecha de actualización</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(ls, i) in listService" v-bind:key="ls.id">
                <td>{{ls.id}}</td>
                <td>{{ls.service_name}}</td>
                <td>{{ls.insert_date}}</td>
                <td>{{ls.update_date}}</td>
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
                                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Actualización del servicio</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <label for="actualServiceName" class="form-label">Nombre del servicio</label>
                                            <input type="text" class="form-control" id="actualServiceName" placeholder="" v-model="editServiceName">
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