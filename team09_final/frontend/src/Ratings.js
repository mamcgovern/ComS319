import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";

function Ratings() {
    /*
     * 0: Courses
     * 1: Ratings
     * 2: Questions
     * 3: Tips
     * 4: Students
     */
    const [view, setView] = useState(4);

    /*
     * This method allows us to change our view.
     */
    function handleClick(input) {
        setView(input);
    };

    /*
     * This is the frontend method for getting one class by ID
     * (get request)
     */
    function getOneCourse(id) {

    }

    /*
     * This creates the navbar for each view so it doesn't have to be retyped.
     */
    function navbar() {
        return (
            <div>
                <header data-bs-theme="dark">
                    <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Navbar">
                        <div class="container-fluid">
                            <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                                <a class="navbar-brand col-lg-3 me-0" href="#">CourseRater</a>
                                <ul class="navbar-nav col-lg-6 justify-content-lg-center">
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(0)}>Home</button>
                                    </li>
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(4)}>About</button>
                                    </li>
                                </ul>
                                <input type="text" placeholder="Enter Course ID" onChange={(e) => getOneCourse(e.target.value)} />
                                <button className="btn btn-primary" type="button" variant="light" onClick={() => handleClick(1)}>Find Course</button>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        )
    }

    /*
     * This function returns an inner view that shows the course info,
     * which can be used in the Ratings, Questions, and Tips views.
     */
    function courseInfo() {
        return (
            <div>
                {navbar()}
                <div class="container">
                    <h1>Course Info</h1>
                </div>
            </div>
        )
    }

    /*
     * This view functions as the homepage.
     * It lists all of the courses in the database.
     */
    function viewCourses() {
        return (
            <div>
                {navbar()}
                <div class="container">
                    <h1>Home</h1>
                </div>
            </div>
        )
    }

    /*
     * This view shows the ratings for a selected course.
     */
    function viewRatings() {
        return (
            <div>
                {navbar()}
                <div class="container">
                    <h1>Ratings</h1>
                </div>
            </div>
        )
    }

    /*
     * This view shows the questions for a selected course.
     */
    function viewQuestions() {
        return (
            <div>
                {navbar()}
                <div class="container">
                    <h1>Questions</h1>
                </div>
            </div>
        )
    }

    /*
     * This view shows the tips for a selected course.
     */
    function viewTips() {
        return (
            <div>
                {navbar()}
                <div class="container">
                    <h1>Tips</h1>
                </div>
            </div>
        )
    }

    /*
     * This view shows the about page, 
     * including information about the course, students, and assignment.
     */
    function viewStudents() {
        return (
            <div>
                {/* Header */}
                {navbar()}
                <div class="container">
                    {/* Title */}
                    <h1>About</h1>
                    {/* Content */}
                    <section>
                        <div>
                            <h2>Class Information</h2>
                            <p>Com S 319: Construction of User Interfaces</p>
                            <p>Professor Ali Jannesari</p>
                            <p>April 27, 2024</p>
                        </div>
                    </section>
                    <section>
                        <div>
                            <h2>Project Description</h2>
                            <p class="title">Final Project</p>
                            {/* TODO add description */}
                            <p>Description goes here</p>
                        </div>
                    </section>
                    <div class="album py-5 bg-body-tertiary">
                        <h2>Developers:</h2>
                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            <div class="col">
                                <div class="card shadow-sm">
                                    <div class="card-body">
                                        <h3>Maddelynne McGovern</h3>
                                        <p class="title">mrm4@iastate.edu</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card shadow-sm">
                                    <div class="card-body">
                                        <h3>Jennifer Hua</h3>
                                        <p class="title">jthua@iastate.edu</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card shadow-sm">
                                    <div class="card-body">
                                        <h3>Sagnik Dey</h3>
                                        <p class="title">sdey@iastate.edu</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /*
     * 1: Courses
     * 2: Ratings
     * 3: Questions
     * 4: Tips
     * 5: Students
     */

    /*
     * This if/else statement sets the view.
     */
    if (view === 0) {
        return viewCourses();
    } else if (view === 1) {
        return viewRatings();
    } else if (view === 2) {
        return viewQuestions();
    } else if (view === 3) {
        return viewTips();
    } else if (view === 4) {
        return viewStudents();
    } else {
        return (<div>
            <button onClick={() => handleClick(0)}>All Products</button>
            <button onClick={() => handleClick(2)}>About</button>
        </div>);
    }
}

export default Ratings;