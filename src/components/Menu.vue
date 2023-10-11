<script>

import axios from 'axios'

export default {
    name: 'Menu',
    data() {
        return {
            fields: ['id', 'status_name', 'insert_date', 'update_date'],
            id: "",
            status_name: "",
            insert_date: "",
            update_date: "",
            listarStatus: [],
        }
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/catalog/status/')
            .then(response => {
                this.listarStatus = response.data;
                console.log(this.listarStatus);
            })
            .catch(function (error){
                console.log(error)
            })
            .finally(function(){

            })
    },
}
</script>

<template>
    <div style="padding-top: 10%;">
        <header class="navbar bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
            <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" >Company name</a>
        </header>

        <div class="container-fluid">
        <div class="row">
            <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
            <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                <ul class="nav flex-column">
                    <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2 active" aria-current="page" >
                        Dashboard
                    </a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" >
                        
                        Orders
                    </a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" >
                        
                        Products
                    </a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" >
                        
                        Customers
                    </a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" >
                        
                        Reports
                    </a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" >
                        
                        Integrations
                    </a>
                    </li>
                </ul>

                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                    <span>Saved reports</span>
                    <a class="link-secondary"  aria-label="Add a new report">
                    
                    </a>
                </h6>
                <ul class="nav flex-column mb-auto">
                    <li class="nav-item">npm ru
                    <a class="nav-link d-flex align-items-center gap-2" >
                        
                        Current month
                    </a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" >
                        
                        Last quarter
                    </a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" >
                        
                        Social engagement
                    </a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" >
                        
                        Year-end sale
                    </a>
                    </li>
                </ul>

                <hr class="my-3">

                <ul class="nav flex-column mb-auto">
                    <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" >
                        
                        Settings
                    </a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" >
                        
                        Sign out
                    </a>
                    </li>
                </ul>
                </div>
            </div>
            </div>

            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Dashboard</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group me-2">
                    <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
                </div>
                <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
                    This week
                </button>
                </div>
            </div>

            

            <h2>Section title</h2>
            <div class="table-responsive small">
                <table class="table table-striped table-sm" :items="listarStatus" :fields="fields">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre de estado</th>
                    <th scope="col">Fecha de creación</th>
                    <th scope="col">Fecha de actualización</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ls in listarStatus" v-bind:key="ls.id">
                    <td>{{ls.id}}</td>
                    <td>{{ls.status_name}}</td>
                    <td>{{ls.insert_date}}</td>
                    <td>{{ls.update_date}}</td>
                    </tr>
                </tbody>
                </table>
            </div>
            </main>
        </div>
        </div>
    </div>
</template>