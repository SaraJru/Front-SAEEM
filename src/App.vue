<script setup>
import { watchEffect } from 'vue'
import store from './store'
import router from './router';

const logueado = store.state.token;

watchEffect(() => {
    if (!store.state.token) {
        // Redirige a la página de login o realiza alguna acción específica
        // Puedes usar Vue Router para la navegación programática
        router.push('/login');
    }
});

const salir = () => {
    store.dispatch('salir');
}

if (store.state.autoLoginExecuted){
    store.dispatch('autoLogin');
}
</script>

<template>
    <div style="position:relative; top: 20px; left: 35px">
        <img src="/EEM-Logo.png" width="200" height="125" />
    </div>
    <div>
        <div>
            <div class="container-fluid">
                <div class="row">
                    <div class="sidebar border border-right col-md-3 col-lg-2 bg-body-tertiary" v-if="store.state.token">
                    <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel" style="min-height: 80vh;">
                        <div class="offcanvas-body d-md-flex flex-column pt-lg-2 overflow-y-auto">
                            
                            <ul class="nav flex-column">
                                <li class="nav-item dropdown">
                                    <h6 class="nav-link dropdown-toggle sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                        Catálogos Principales
                                    </h6>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <router-link class="dropdown-item" to="/status">Estados</router-link>
                                        </li>
                                        <li>
                                            <router-link class="dropdown-item" to="/service">Servicios</router-link>
                                        </li>
                                        <li>
                                            <router-link class="dropdown-item" to="/roles">Roles</router-link>
                                        </li>
                                        <li>
                                            <router-link class="dropdown-item" to="/departments">Departamentos</router-link>
                                        </li>
                                        <li>
                                            <router-link class="dropdown-item" to="/village">Aldeas / Caserío</router-link>
                                        </li>
                                        <li>
                                            <router-link class="dropdown-item" to="/identificationType">Tipos de identificación</router-link>
                                        </li>
                                        <li>
                                            <router-link class="dropdown-item" to="/wattmeterBrand">Marcas de Contadores</router-link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <!-- Contadores -->
                            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                                <span>Contadores</span>
                            </h6>
                            <ul class="nav flex-column mb-auto">
                                <li class="nav-item">
                                    <router-link class="nav-link d-flex align-items-center gap-2" to="/wattmeter">Listado de Contadores</router-link>
                                </li>
                            </ul>
                            <!-- Usuarios -->
                            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                                <span>Usuarios</span>
                            </h6>
                            <ul class="nav flex-column mb-auto">
                                <li class="nav-item">
                                    <router-link class="nav-link d-flex align-items-center gap-2" to="/users">Administrar Usuarios</router-link>
                                </li>
                            </ul>
                            <!-- Dashboard de Cuentas -->
                            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                                <span>Cuentas de Clientes</span>
                            </h6>
                            <ul class="nav flex-column mb-auto">
                                <li class="nav-item">
                                    <router-link to="/clients" class="nav-link d-flex align-items-center gap-2"> Administrar Clientes </router-link>
                                </li>
                            </ul>
                            <ul class="nav flex-column mb-auto">
                                <li class="nav-item">
                                    <router-link class="nav-link d-flex align-items-center gap-2" to="/listAccounts">Administrar Cuentas</router-link>
                                </li>
                            </ul>
                            <hr class="my-3">
                            <button type="button" class="btn btn-outline-secondary" @click="salir" v-if="store.state.token">Logout</button>
                        </div>
                    </div>
                </div>
                <!-- Contenido -->
                <router-view></router-view>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped></style>