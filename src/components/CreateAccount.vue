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
                municipality_name: "",
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
            id_status: 0,
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
            id_user: 0
        }
    },
    methods: {
        async limpiar(){
            location.reload();
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
    },
    async mounted() {
        await this.listar();
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
                        <form>
                            <!-- Aquí colocas los campos del formulario de la primera columna -->
                            <div class="mb-3">
                            <label for="campo1" class="form-label">Campo 1</label>
                            <input type="text" class="form-control" id="campo1" name="campo1">
                            </div>
                            <div class="mb-3">
                            <label for="campo2" class="form-label">Campo 2</label>
                            <input type="text" class="form-control" id="campo2" name="campo2">
                            </div>
                            <!-- Agrega más campos aquí -->
                        </form>
                    </div>
                    <div class="col-md-6">
                        <!-- Columna 2 -->
                        <form>
                            <!-- Aquí colocas los campos del formulario de la segunda columna -->
                            <div class="mb-3">
                            <label for="campo3" class="form-label">Campo 3</label>
                            <input type="text" class="form-control" id="campo3" name="campo3">
                            </div>
                            <div class="mb-3">
                            <label for="campo4" class="form-label">Campo 4</label>
                            <input type="text" class="form-control" id="campo4" name="campo4">
                            </div>
                            <!-- Agrega más campos aquí -->
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </main>
</template>