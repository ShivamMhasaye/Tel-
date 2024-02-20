import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
    

<nav class="navbar navbar-expand-lg bg-info navbar-dark">
    
    <div class="container-fluid">
        
        <a class="navbar-brand" href="#">Brand</a>

     
        <ul class="navbar-nav d-flex flex-row me-1">
            <li class="nav-item me-3 me-lg-0">
                <a class="nav-link text-white" href="#"><i class="fas fa-envelope mx-1"></i> Contact</a>
            </li>
            <li class="nav-item me-3 me-lg-0">
                <a class="nav-link text-white" href="#"><i class="fas fa-cog mx-1"></i> Settings</a>
            </li>
            <li class="nav-item me-3 me-lg-0">
                  
               
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li>
                        <a class="dropdown-item" href="#">My account</a>
                    </li>

                    <li>
                        <a class="dropdown-item" href="#">Log out</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>

    
</nav>

</>
    
  )
}

export default Header