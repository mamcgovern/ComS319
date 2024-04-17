import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";


const Shop = () => {
    /*
     * 0: browse view
     * 1: update view
     * 2: delete view
     * 3: student view
     */
    const [view, setView] = useState(0);

    function viewBrowse() {
        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="display-4">Browse</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function viewUpdate() {
        return (
            <div>
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
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="display-4">Students</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    // return statements based on which view we want
    if (view === 0) {
        return viewBrowse();
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
export default Shop;
