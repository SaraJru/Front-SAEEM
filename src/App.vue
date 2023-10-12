<script setup>

</script>

<template>
  
  <div>
    <div style="position: fixed; top: 20px; left: 35px">
      <img src="EEM-Logo.png" width="200" height="125" />
    </div>
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
                    <li class="nav-item">
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

            <!-- Contenido -->
            <router-view></router-view>
        </div>
        </div>
    </div>
  </div>
</template>

<style scoped></style>