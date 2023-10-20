<script setup>

import store from './store'

const logueado = store.state.token;

const salir = () => {
    store.dispatch('salir');
}

if (store.state.autoLoginExecuted){
    store.dispatch('autoLogin');
}
</script>

<template>
    <div style="position: fixed; top: 20px; left: 35px">
        <img src="/EEM-Logo.png" width="200" height="125" />
    </div>
    <div>
        <div style="padding-top: 10%;">
            <header class="navbar bg-dark flex-md-nowrap shadow" data-bs-theme="dark">
                <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" >Company name</a>
            </header>

            <div class="container-fluid">
                <div class="row">
                    <div class="sidebar border border-right col-md-3 col-lg-3 bg-body-tertiary">
                    <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                        <div class="offcanvas-body d-md-flex flex-column pt-lg-3 overflow-y-auto">
                            
                            <ul class="nav flex-column">
                                <li class="nav-item dropdown">
                                    <h6 class="nav-link dropdown-toggle sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                        Catálogos Principales
                                    </h6>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <a class="dropdown-item" href="/status">Estados</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="/service">Servicios</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="/roles">Roles</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="/departments">Departamentos</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="/village">Aldeas / Caserío</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="/identificationType">Tipos de identificación</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="/wattmeterBrand">Marcas de Contadores</a>
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
                                    <a class="nav-link d-flex align-items-center gap-2" href="/wattmeter">Listado de Contadores</a>
                                </li>
                            </ul>
                            <!-- Usuarios -->
                            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                                <span>Usuarios</span>
                            </h6>
                            <ul class="nav flex-column mb-auto">
                                <li class="nav-item">
                                    <a class="nav-link d-flex align-items-center gap-2" href="/users">Administrar Usuarios</a>
                                </li>
                            </ul>
                            <!-- Dashboard de Cuentas -->
                            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                                <span>Cuentas de Clientes</span>
                            </h6>
                            <ul class="nav flex-column mb-auto">
                                <li class="nav-item">
                                    <a class="nav-link d-flex align-items-center gap-2" href="/listAccounts">Administrar Cuentas</a>
                                </li>
                            </ul>
                            <hr class="my-3">
                            <button type="button" class="btn btn-outline-secondary" @click="salir" v-if="logueado == null">Logout</button>
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