<script>

import axios from 'axios'

export default {
    name: 'CreateAccounts',
    data() {
        return {
            id_wattmeter: {
                wattmeter_number: 0,
                wattmeter_brand: 0
            },
            id_home_information: {
                municipality_name: "San Pedro Sac.",
                addres: "",
                zone_numbe: 0,
                reference: "",
                id_village: 0
            },
            reading_order: 0,
            custom_mark: 0,
            id_services: 0,
            id_client: {
                first_name: "",
                second_name: "",
                third_name: "",
                first_lastname: "",
                second_lastname: "",
                married_name: "",
                nit: "",
                email: "",
                phone_number: 0,
                identification: 0
            },
            volts_requested: 0,
            cumulative_reading: 0,
            id_status: 1,
            id_read_user: 0,
            watts_hired: 0,
            exent_iva: 0,
            electric_transformer: "",
            phase: 0,
            ap_amount: 0,
            installation_invoice: "",
            contract_number: "",
            pay_docs: "",
            central_number: "",
            net_type: 0,
            pole_meters: 0,
            pay_amount: 0,
            id_user: 0,
            listIDs: [],
            fieldsID: ['id', 'identification_name', 'insert_date', 'update_date'],
            listVillage: [],
            fieldsVillage: ['id', 'village_name', 'insert_date', 'update_date'],
            listwattmeterBrand: [],
            fieldsWB: ['id', 'brand_name', 'insert_date', 'update_date'],
            listService: [],
            fieldsService: ['id', 'service_name', 'insert_date', 'update_date'],
            listUser: [],
            fieldsUser: ['id', 'first_name', 'last_name', 'username', 'status', 'rol', 'department','insert_date', 'update_date'],
        }
    },
    methods: {
        async limpiar(){
            location.reload();
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
        async listarVillage(){
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
        async listarServices(){
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
        
    },
    async mounted() {
        await this.listarVillage();
        await this.listarID();
        await this.listarMarcas();
        await this.listarServices();
        await this.listarUser();
    },
}
</script>

<template>
    <main class="col-md-9 ms-sm-auto col-lg-9 px-md-4 overflow-auto">
        
        <h2 style="color: white;">Creación de Cuentas</h2>
        <div class="table-responsive small" style="max-height: 500px; overflow-y: auto;">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <!-- Columna 1 -->
                        <h4 style="color: white;">Información del Cliente</h4>
                        <form>
                            <!-- Aquí colocas los campos del formulario de la primera columna -->
                            <div class="mb-3">
                                <label for="campo1" class="form-label">Primer Nombre</label>
                                <input type="text" class="form-control mb-3" id="campo1" name="campo1">

                                <label for="campo2" class="form-label">Segundo Nombre</label>
                                <input type="text" class="form-control mb-3" id="campo2" name="campo2">
                                
                                <label for="campo2" class="form-label">Tercer Nombre (si aplica)</label>
                                <input type="text" class="form-control mb-3" id="campo2" name="campo2">

                                <label for="campo2" class="form-label">Primer Apellido</label>
                                <input type="text" class="form-control mb-3" id="campo2" name="campo2">

                                <label for="campo2" class="form-label">Segundo Apellido</label>
                                <input type="text" class="form-control mb-3" id="campo2" name="campo2">

                                <label for="campo2" class="form-label">Apellido de casada (si aplica)</label>
                                <input type="text" class="form-control mb-3" id="campo2" name="campo2">
                                
                                <label for="campo2" class="form-label">NIT</label>
                                <input type="text" class="form-control mb-3" id="campo2" name="campo2">

                                <label for="campo2" class="form-label">Correo electrónico</label>
                                <input type="email" class="form-control mb-3" id="campo2" name="campo2">
                                
                                <label for="campo2" class="form-label">Número de teléfono (sin guión)</label>
                                <input type="phone" class="form-control mb-3" id="campo2" name="campo2">
                                
                                <label for="id_type" class="form-label">Tipo de Identificación</label>
                                <select id="id_type" class="form-select" :items="listIDs" :fields="fieldsID" v-model="id_client.identification">
                                    <option selected>Selecciona el tipo de identificación</option>
                                    <option v-for="lid in listIDs" v-bind:key="lid.id" v-bind:value="lid.id">{{ lid.identification_name }}</option>
                                </select>
                            </div>
                            <!-- <div class="mb-3">
                            </div> -->
                            <!-- Agrega más campos aquí -->
                        </form>
                    </div>
                    <div class="col-md-6">
                        <!-- Columna 2 -->
                        <h4 style="color: white;">Dirección</h4>
                        <form>
                            <!-- Aquí colocas los campos del formulario de la segunda columna -->
                            <div class="mb-3">
                                <label for="campo3" class="form-label">Dirección (sin zona)</label>
                                <input type="address" class="form-control mb-3" id="campo3" name="campo3">

                                <label for="campo3" class="form-label">Zona</label>
                                <input type="number" class="form-control mb-3" id="campo3" name="campo3">
                                
                                <label for="campo3" class="form-label">Referencia</label>
                                <input type="text" class="form-control mb-3" id="campo3" name="campo3">
                                
                                <label for="id_village" class="form-label">Aldea / Cantón</label>
                                <select id="id_village" class="form-select" :items="listVillage" :fields="fieldsVillage" v-model="id_home_information.id_village">
                                    <option selected>Selecciona la aldea o cantón</option>
                                    <option v-for="lvill in listVillage" v-bind:key="lvill.id" v-bind:value="lvill.id">{{ lvill.village_name }}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <h4 style="color: white;">Contador</h4>
                                <label for="wattmeter_number" class="form-label">Número de Contador</label>
                                <input type="text" class="form-control mb-3" id="wattmeter_number" placeholder="Número de Contador" v-model="id_wattmeter.wattmeter_number">

                                <label for="wattmeter_brand" class="form-label">Marca de Contador</label>
                                <select id="wattmeter_brand" class="form-select" :items="listwattmeterBrand" :fields="fieldsWB" v-model="id_wattmeter.wattmeter_brand">
                                    <option selected>Selecciona marca de contador</option>
                                    <option v-for="lwb in listwattmeterBrand" v-bind:key="lwb.id" v-bind:value="lwb.id">{{ lwb.brand_name }}</option>
                                </select>

                                <label for="custom_mark" class="form-label">Márchamo</label>
                                <input type="text" class="form-control mb-3" id="custom_mark" placeholder="Número de Contador">
                            </div>
                            <!-- Agrega más campos aquí -->
                        </form>
                    </div>
                    <div class="col-md-6">
                        <!-- Columna Datos de Cuenta 1 -->
                        <h4 style="color: white;">Datos de la Cuenta</h4>
                        <form>
                            <div class="mb-3">
                                <label for="id_village" class="form-label">Tipo de Servicio</label>
                                <select id="id_village" class="form-select mb-3" :items="listService" :fields="fieldsService" v-model="id_services">
                                    <option selected>Selecciona la aldea o cantón</option>
                                    <option v-for="ls in listService" v-bind:key="ls.id" v-bind:value="ls.id">{{ ls.service_name }}</option>
                                </select>
                                
                                <label for="campo3" class="form-label">Voltios Solicitados</label>
                                <input type="text" class="form-control mb-3" id="campo3" name="campo3">

                                <label for="campo3" class="form-label">Watts Contratados</label>
                                <input type="text" class="form-control mb-3" id="campo3" name="campo3">
                                
                                <label for="campo3" class="form-label">Lectura acumulada</label>
                                <input type="text" class="form-control mb-3" id="campo3" name="campo3">
                                
                                <label for="id_village" class="form-label">Usuario Lector</label>
                                <select id="id_village" class="form-select mb-3" :items="listUser" :fields="fieldsUser" v-model="id_read_user">
                                    <option selected>Selecciona al usuario lector</option>
                                    <option v-for="lu in listUser" v-bind:key="lu.id" v-bind:value="lu.id">{{lu.first_name}} {{ lu.last_name }} - ({{lu.username}})</option>
                                </select>
                                
                                <label for="campo3" class="form-label">Transformador eléctrico</label>
                                <input type="text" class="form-control mb-3" id="campo3" name="campo3">
                                
                                <label for="campo3" class="form-label">Fase</label>
                                <input type="number" class="form-control mb-3" id="campo3" name="campo3">

                                <label for="campo3" class="form-label">Monto de alumbrado público</label>
                                <input type="number" class="form-control mb-3" id="campo3" name="campo3">

                                <label for="campo3" class="form-label">Tipo de Red</label>
                                <input type="number" class="form-control mb-3" id="campo3" name="campo3">

                                <label for="campo3" class="form-label">Metros de Poste</label>
                                <input type="number" class="form-control mb-3" id="campo3" name="campo3">
                                
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <!-- Columna Datos de Cuenta 2 -->
                        <h4 style="color: white;">-----------</h4>
                        <form>
                            <!-- Aquí colocas los campos del formulario de la segunda columna -->
                            <div class="mb-3">
                                <label for="campo3" class="form-label">Orden de Lectura</label>
                                <input type="address" class="form-control mb-3" id="campo3" name="campo3">

                                <label for="campo3" class="form-label">Recibo de Instalación</label>
                                <input type="text" class="form-control mb-3" id="campo3" name="campo3">
                                
                                <label for="campo3" class="form-label">Número de Contrato</label>
                                <input type="text" class="form-control mb-3" id="campo3" name="campo3">

                                <label for="campo3" class="form-label">Documento de Pago</label>
                                <input type="text" class="form-control mb-3" id="campo3" name="campo3">

                                <label for="campo3" class="form-label">Número de Central</label>
                                <input type="text" class="form-control mb-3" id="campo3" name="campo3">
                                
                                <label for="id_village" class="form-label">Usuario quien crea esta cuenta</label>
                                <select id="id_village" class="form-select mb-3" :items="listUser" :fields="fieldsUser" v-model="id_read_user">
                                    <option selected>Selecciona al usuario creador</option>
                                    <option v-for="lu in listUser" v-bind:key="lu.id" v-bind:value="lu.id">{{lu.first_name}} {{ lu.last_name }} - ({{lu.username}})</option>
                                </select>

                                <label for="campo3" class="form-label">Monto a pagar</label>
                                <input type="text" class="form-control mb-3" id="campo3" name="campo3">
                                
                                <div class="mb-3">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault"> Exento de IVA </label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </main>
</template>

<style>
    label{
        color: white;
    }
</style>