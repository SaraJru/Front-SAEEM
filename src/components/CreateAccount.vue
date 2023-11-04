<script>

import axios from 'axios'
import router from '../router';

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
                zone_number: 0,
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
            this.id_wattmeter = "";
            this.id_home_information = "";
            this.reading_order = "";
            this.custom_mark = 0;
            this.id_services = "";
            this.id_client = "";
            this.volts_requested = "";
            this.cumulative_reading = "";
            this.id_status = "";
            this.id_read_user = "";
            this.watts_hired = "";
            this.exent_iva = "";
            this.electric_transformer = "";
            this.phase = "";
            this.ap_amount = "";
            this.installation_invoice = "";
            this.contract_number = "";
            this.pay_docs = "";
            this.central_number = "";
            this.net_type = "";
            this.pole_meters = "";
            this.pay_amount = "";
            this.id_user = "";
        },
        createAccount(){
            axios.post('accountData/', {
                id_wattmeter: this.id_wattmeter,
                id_home_information: this.id_home_information,
                reading_order: this.reading_order,
                custom_mark: this.custom_mark,
                id_services: this.id_services,
                id_client: this.id_client,
                volts_requested: this.volts_requested,
                cumulative_reading: this.cumulative_reading,
                id_status: 1,
                id_read_user: this.id_read_user,
                watts_hired: this.watts_hired,
                exent_iva: this.exent_iva,
                electric_transformer: this.electric_transformer,
                phase: this.phase,
                ap_amount: this.ap_amount,
                installation_invoice: this.installation_invoice,
                contract_number: this.contract_number,
                pay_docs: this.pay_docs,
                central_number: this.central_number,
                net_type: this.net_type,
                pole_meters: this.pole_meters,
                pay_amount: this.pay_amount,
                id_user: this.id_user,
            })
            .then(response => {
                console.log(response);
                router.push('/listAccounts');
            })
            .catch((error) => {
                console.log(error);
            })
            this.limpiar();
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
                                <label for="first_name" class="form-label">Primer Nombre</label>
                                <input type="text" class="form-control mb-3" id="first_name" name="first_name" v-model="id_client.first_name">

                                <label for="second_name" class="form-label">Segundo Nombre</label>
                                <input type="text" class="form-control mb-3" id="second_name" name="second_name" v-model="id_client.second_name">
                                
                                <label for="third_name" class="form-label">Tercer Nombre (si aplica)</label>
                                <input type="text" class="form-control mb-3" id="third_name" name="third_name" v-model="id_client.third_name">

                                <label for="first_lastname" class="form-label">Primer Apellido</label>
                                <input type="text" class="form-control mb-3" id="first_lastname" name="first_lastname" v-model="id_client.first_lastname">

                                <label for="second_lastname" class="form-label">Segundo Apellido</label>
                                <input type="text" class="form-control mb-3" id="second_lastname" name="second_lastname" v-model="id_client.second_lastname">

                                <label for="married_name" class="form-label">Apellido de casada (si aplica)</label>
                                <input type="text" class="form-control mb-3" id="married_name" name="married_name" v-model="id_client.married_name">
                                
                                <label for="nit" class="form-label">NIT</label>
                                <input type="text" class="form-control mb-3" id="nit" name="nit" v-model="id_client.nit">

                                <label for="email" class="form-label">Correo electrónico</label>
                                <input type="email" class="form-control mb-3" id="email" name="email" v-model="id_client.email">
                                
                                <label for="phone_number" class="form-label">Número de teléfono (sin guión)</label>
                                <input type="phone" class="form-control mb-3" id="phone_number" name="phone_number" v-model="id_client.phone_number">
                                
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
                                <label for="addres" class="form-label">Dirección (sin zona)</label>
                                <input type="address" class="form-control mb-3" id="addres" name="addres" v-model="id_home_information.addres">

                                <label for="zone_number" class="form-label">Zona</label>
                                <input type="number" class="form-control mb-3" id="zone_number" name="zone_number" v-model="id_home_information.zone_number">
                                
                                <label for="reference" class="form-label">Referencia</label>
                                <input type="text" class="form-control mb-3" id="reference" name="reference" v-model="id_home_information.reference">
                                
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
                                <input type="number" class="form-control mb-3" id="custom_mark" name="custom_mark" v-model="custom_mark">
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
                                
                                <label for="volts_requested" class="form-label">Voltios Solicitados</label>
                                <input type="text" class="form-control mb-3" id="volts_requested" name="volts_requested" v-model="volts_requested">

                                <label for="watts_hired" class="form-label">Watts Contratados</label>
                                <input type="text" class="form-control mb-3" id="watts_hired" name="watts_hired" v-model="watts_hired">
                                
                                <label for="cumulative_reading" class="form-label">Lectura acumulada</label>
                                <input type="text" class="form-control mb-3" id="cumulative_reading" name="cumulative_reading" v-model="cumulative_reading">
                                
                                <label for="id_village" class="form-label">Usuario Lector</label>
                                <select id="id_village" class="form-select mb-3" :items="listUser" :fields="fieldsUser" v-model="id_read_user">
                                    <option selected>Selecciona al usuario lector</option>
                                    <option v-for="lu in listUser" v-bind:key="lu.id" v-bind:value="lu.id">{{lu.first_name}} {{ lu.last_name }} - ({{lu.username}})</option>
                                </select>
                                
                                <label for="electric_transformer" class="form-label">Transformador eléctrico</label>
                                <input type="text" class="form-control mb-3" id="electric_transformer" name="electric_transformer" v-model="electric_transformer">
                                
                                <label for="phase" class="form-label">Fase</label>
                                <input type="number" class="form-control mb-3" id="phase" name="phase" v-model="phase">

                                <label for="ap_amount" class="form-label">Monto de alumbrado público</label>
                                <input type="number" class="form-control mb-3" id="ap_amount" name="ap_amount" v-model="ap_amount">

                                <label for="net_type" class="form-label">Tipo de Red</label>
                                <input type="number" class="form-control mb-3" id="net_type" name="net_type" v-model="net_type">

                                <label for="pole_meters" class="form-label">Metros de Poste</label>
                                <input type="number" class="form-control mb-3" id="pole_meters" name="pole_meters" v-model="pole_meters">
                                
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <!-- Columna Datos de Cuenta 2 -->
                        <h4 style="color: white;">-----------</h4>
                        <form>
                            <!-- Aquí colocas los campos del formulario de la segunda columna -->
                            <div class="mb-3">
                                <label for="reading_order" class="form-label">Orden de Lectura</label>
                                <input type="text" class="form-control mb-3" id="reading_order" name="reading_order" v-model="reading_order">

                                <label for="installation_invoice" class="form-label">Recibo de Instalación</label>
                                <input type="text" class="form-control mb-3" id="installation_invoice" name="installation_invoice" v-model="installation_invoice">
                                
                                <label for="contract_number" class="form-label">Número de Contrato</label>
                                <input type="text" class="form-control mb-3" id="contract_number" name="contract_number" v-model="contract_number">

                                <label for="pay_docs" class="form-label">Documento de Pago</label>
                                <input type="text" class="form-control mb-3" id="pay_docs" name="pay_docs" v-model="pay_docs">

                                <label for="central_number" class="form-label">Número de Central</label>
                                <input type="text" class="form-control mb-3" id="central_number" name="central_number" v-model="central_number">
                                
                                <label for="id_village" class="form-label">Usuario quien crea esta cuenta</label>
                                <select id="id_village" class="form-select mb-3" :items="listUser" :fields="fieldsUser" v-model="id_user">
                                    <option selected>Selecciona al usuario creador</option>
                                    <option v-for="lu in listUser" v-bind:key="lu.id" v-bind:value="lu.id">{{lu.first_name}} {{ lu.last_name }} - ({{lu.username}})</option>
                                </select>

                                <label for="pay_amount" class="form-label">Monto a pagar (Quetzales)</label>
                                <input type="text" class="form-control mb-3" id="pay_amount" name="pay_amount" v-model="pay_amount">
                                
                                <div class="mb-3">
                                    <input class="form-check-input" type="checkbox" value="1" id="exent_iva" v-model="exent_iva">
                                    <label class="form-check-label" for="exent_iva"> Exento de IVA </label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary col-lg-12" @click="createAccount">Crear</button>
        </div>
    </main>
</template>

<style>
    label{
        color: white;
    }
</style>