import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";


const Products = () => {
    /*
     * 0: browse view
     * 1: update view
     * 2: delete view
     * 3: student view
     */
    const [products, setProducts] = useState([]);
    const [view, setView] = useState(0);

    useEffect(() => {
  fetch("http://localhost:8081/listProducts")
  .then(response => response.json())
  .then(products => {
    setProducts(products);
  })
}, []);
    function showAllProducts() {
        const allProducts = products.map((el) => (
    <div class="row border-top border-bottom" key={el.id}>
    <div class="row main align-items-center">
        <div class="col-2">
            <img class="img-fluid" src={el.image} width='150px'/>
        </div>
        <div class="col">
            <div class="row text-muted">{el.title}</div>
            <div class="row">{el.category}</div>
            <div class="row">{el.price}</div>
        </div>
    </div>
</div>
));
        return (
            <div>
                {/* Header */}
                <header data-bs-theme="dark">
                    <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Navbar">
                        <div class="container-fluid">
                            <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                                <a class="navbar-brand col-lg-3 me-0" href="#">Store</a>
                                <ul class="navbar-nav col-lg-6 justify-content-lg-center">
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(0)}>Products</button>
                                    </li>
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(1)}>Update Item</button>
                                    </li>
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(2)}>Delete Item</button>
                                    </li>
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(3)}>About</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
                
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="display-4">Products</h1>
                        </div>
                        <div>
                           <div>{allProducts}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function viewUpdate() {
        return (
            <div>
                {/* Header */}
                <header data-bs-theme="dark">
                    <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Navbar">
                        <div class="container-fluid">
                            <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                                <a class="navbar-brand col-lg-3 me-0" href="#">Store</a>
                                <ul class="navbar-nav col-lg-6 justify-content-lg-center">
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(0)}>Browse</button>
                                    </li>
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(1)}>Update Item</button>
                                    </li>
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(2)}>Delete Item</button>
                                    </li>
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(3)}>About</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>

                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="display-4">Update</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function viewDelete() {
        return (
            <div>
                {/* Header */}
                <header data-bs-theme="dark">
                    <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Navbar">
                        <div class="container-fluid">
                            <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                                <a class="navbar-brand col-lg-3 me-0" href="#">Store</a>
                                <ul class="navbar-nav col-lg-6 justify-content-lg-center">
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(0)}>Browse</button>
                                    </li>
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(1)}>Update Item</button>
                                    </li>
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(2)}>Delete Item</button>
                                    </li>
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(3)}>About</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>

                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="display-4">Delete</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function viewStudents() {
        return (
            <div>
                {/* Header */}
                <header data-bs-theme="dark">
                    <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Navbar">
                        <div class="container-fluid">
                            <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                                <a class="navbar-brand col-lg-3 me-0" href="#">Store</a>
                                <ul class="navbar-nav col-lg-6 justify-content-lg-center">
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(0)}>Browse</button>
                                    </li>
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(1)}>Update Item</button>
                                    </li>
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(2)}>Delete Item</button>
                                    </li>
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(3)}>About</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>

                {/* Title */}
                <section>
                    <h1 style={{ textAlign: 'center' }}>About</h1>
                </section>

                {/* Content */}
                <section>
                    <div class="container">
                        <h2>Class Information</h2>
                        <p>Com S 319: Construction of User Interfaces</p>
                        <p>Professor Ali Jannesari</p>
                        <p>April 27, 2024</p>
                    </div>
                </section>

                <section>
                    <div class="container">
                        <h2>Project Description</h2>
                        <p class="title">Assignment 3</p>
                        {/* TODO add description */}
                        <p>Description goes here</p>
                    </div>
                </section>

                <div class="album py-5 bg-body-tertiary">
                    <div class="container">
                        <h2>Developers:</h2>
                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            <div class="col">
                                <div class="card shadow-sm">
                                    <div class="card-body">
                                        <h3>Maddelynne McGovern</h3>
                                        <p class="title">mrm4@iastate.edu</p>
                                        <p class="card-text">I am a senior double majoring in computer science and political science at Iowa State University.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col">
                                <div class="card shadow-sm">
                                    <div class="card-body">
                                        <h3>Jennifer Hua</h3>
                                        <p class="title">jthua@iastate.edu</p>
                                        <p class="card-text">I am a sophomore majoring in Computer Science and minoring in Cyber Security at Iowa State University.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col">
                                <div class="card shadow-sm">
                                    <div class="card-body">
                                        <h3>Sagnik Dey</h3>
                                        <p class="title">sdey@iastate.edu</p>
                                        {/* TODO add description */}
                                        <p class="card-text">Description</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // function to change the view
    const handleClick = (input) => {
        setView(input);
    };

    // return statements based on which view we want
    if (view === 0) {
        return showAllProducts();
    } else if (view === 1) {
        return viewUpdate();
    } else if (view === 2) {
        return viewDelete();
    } else if (view === 3) {
        return viewStudents();
    } else {
        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="error-container">
                                <h1 class="display-4">404</h1>
                                <p class="lead">Page Not Found</p>
                                <p>Sorry, the page you are looking for does not exist.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default Products;
