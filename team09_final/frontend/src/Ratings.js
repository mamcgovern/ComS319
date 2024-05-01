import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import starFilled from './images/star-fill.png';
import starOutline from './images/star-outline.png';
import thumbsUp from './images/thumbs-up.png'
import thumbsDown from './images/thumbs-down.png'

function Ratings() {
    /*
     * 0: Courses
     * 1: One Course
     * 2: Students
     */
    const [view, setView] = useState(0);
    /*
     * 0: Ratings
     * 1: Questions
     * 2: Tips
     */
    const [courseView, setCourseView] = useState(0);

    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState([]);
    const [id, setInput] = useState();
    const [ratings, setRatings] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [tips, setTips] = useState([]);

    /*
     * This method updates the courses array.
     */
    useEffect(() => {
        fetch("http://localhost:8081/courses/")
            .then(response => response.json())
            .then(courses => {
                setCourses(courses);
            })
    }, []);

    /*
     * This is the frontend method for getting one class by ID
     * (get request)
     */
    function getOneCourse(id) {
        setCourseView(0);
        setInput(id);
        fetch("http://localhost:8081/courses/" + id)
            .then(response => response.json())
            .then(course => { setCourse(course) });

        // get course ratings
        fetch("http://localhost:8081/ratings/" + id)
            .then(response => response.json())
            .then(ratings => { setRatings(ratings) });
        setView(1);
    }

    /*
     * This is the frontend method for liking a rating
     * (put request)
     */
    function addHelpful(ratingID, helpfulCount) {
        console.log(ratingID);
        fetch(`http://localhost:8081/ratings/helpful/${ratingID}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(
                {
                    "helpful": helpfulCount
                }
            )
        })
            .then(response => response.json())
    }

    /*
     * This is the frontend method for disliking a rating
     * (put request)
     */
    function addUnhelpful(ratingID, unhelpfulCount) {
        console.log(ratingID);
        fetch(`http://localhost:8081/ratings/unhelpful/${ratingID}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(
                {
                    "unhelpful": unhelpfulCount
                }
            )
        })
            .then(response => response.json())
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
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => setView(0)}>Home</button>
                                    </li>
                                    <li class="nav-item" style={{ margin: '5px' }}>
                                        <button class="btn btn-primary rounded-pill px-3" onClick={() => setView(2)}>About</button>
                                    </li>
                                </ul>
                                <input type="text" placeholder="Enter Course ID" onChange={(e) => setInput(e.target.value)} />
                                <button className="btn btn-primary" type="button" variant="light" onClick={() => getOneCourse(id)}>Find Course</button>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        )
    }

    /*
     * This view functions as the homepage.
     * It lists all of the courses in the database.
     */
    function viewCourses() {
        const allCourses = courses.map((el) => (
            <div class="subforum-row">
                <div class="subforum-column pic-div center">
                    <img src={el.imageURL} alt="..." style={{ width: '100%' }} />
                </div>
                <div class="subforum-description subforum-column">
                    <h1>{el.id}: <button type="button" onClick={() => getOneCourse(el.id)}>{el.courseCode}</button></h1>
                    <p class="title"><strong>{el.title}</strong></p>
                    <p>{el.description}</p>
                </div>
            </div>
        ));
        return (
            <div>
                {navbar()}
                <div class="container subforum">
                    <div class="subforum-title">
                        <h1>ISU Classes</h1>
                    </div>
                    <div>
                        {allCourses}
                    </div>
                </div>
            </div>
        )
    }

    /*
     * This function allows us to view one course.
     * it uses viewRatings, viewTips, and viewQuestions 
     * to finish filling out the page.
     */
    function viewOneCourse() {
        function subsection() {
            if (courseView === 0) {
                return viewRatings();
            } else if (courseView === 1) {
                return viewQuestions();
            } else if (courseView === 2) {
                return viewTips();
            }
        }

        return (
            <div>
                {navbar()}
                <div class="subforum-container">
                    <div class="subforum" id="subforum">
                        <div class="subforum-title" id="classTitle">
                            <h1>{course.courseCode}</h1>
                        </div>
                        <div class="subforum-full-row" id="classDescription">
                            <div class="subforum-description subforum-column">
                                <img src={course.imageURL} alt="..." style={{ width: '200px' }} />
                                <h1>{course.title}</h1>
                                <p>{course.description}</p>
                            </div>
                        </div>
                        <div class="subforum-subtitle">
                            <button type="button" id="ratings-link" onclick={() => setCourseView(0)}><h1>Ratings</h1></button>
                            <button type="button" id="questions-link" onclick={() => setCourseView(1)}><h1>Questions</h1></button>
                            <button type="button" id="tips-link" onclick={() => setCourseView(2)}><h1>Tips</h1></button>
                        </div>
                        {subsection()}
                    </div>
                </div>

            </div>
        )
    }

    /*
     * This subview shows the ratings for a selected course.
     */
    function viewRatings() {
        function stars(numStars) {
            if (numStars === 0) {
                return (
                    <div>
                        <img src={starOutline} style={{ width: '25px' }} />
                        <img src={starOutline} style={{ width: '25px' }} />
                        <img src={starOutline} style={{ width: '25px' }} />
                        <img src={starOutline} style={{ width: '25px' }} />
                        <img src={starOutline} style={{ width: '25px' }} />
                    </div>
                )
            } else if (numStars === 1) {
                return (
                    <div>
                        <img src={starFilled} style={{ width: '25px' }} />
                        <img src={starOutline} style={{ width: '25px' }} />
                        <img src={starOutline} style={{ width: '25px' }} />
                        <img src={starOutline} style={{ width: '25px' }} />
                        <img src={starOutline} style={{ width: '25px' }} />
                    </div>
                )
            } else if (numStars === 2) {
                return (
                    <div>
                        <img src={starFilled} style={{ width: '25px' }} />
                        <img src={starFilled} style={{ width: '25px' }} />
                        <img src={starOutline} style={{ width: '25px' }} />
                        <img src={starOutline} style={{ width: '25px' }} />
                        <img src={starOutline} style={{ width: '25px' }} />
                    </div>
                )
            } else if (numStars === 3) {
                return (
                    <div>
                        <img src={starFilled} style={{ width: '25px' }} />
                        <img src={starFilled} style={{ width: '25px' }} />
                        <img src={starFilled} style={{ width: '25px' }} />
                        <img src={starOutline} style={{ width: '25px' }} />
                        <img src={starOutline} style={{ width: '25px' }} />
                    </div>
                )
            } else if (numStars === 4) {
                return (
                    <div>
                        <img src={starFilled} style={{ width: '25px' }} />
                        <img src={starFilled} style={{ width: '25px' }} />
                        <img src={starFilled} style={{ width: '25px' }} />
                        <img src={starFilled} style={{ width: '25px' }} />
                        <img src={starOutline} style={{ width: '25px' }} />
                    </div>
                )
            } else if (numStars === 5) {
                return (
                    <div>
                        <img src={starFilled} style={{ width: '25px' }} />
                        <img src={starFilled} style={{ width: '25px' }} />
                        <img src={starFilled} style={{ width: '25px' }} />
                        <img src={starFilled} style={{ width: '25px' }} />
                        <img src={starFilled} style={{ width: '25px' }} />
                    </div>
                )
            }
        }
        const allRatings = ratings.map((el) => (
            <div id="ratings" class="subforum-full-row">
                <div class="subforum-description subforum-column">
                    <div class="ratings-row">
                        <div class="ratings-column">
                            <p><strong>Semester:</strong> {el.semester} </p>
                        </div>
                        <div class="ratings-column" style={{ textAlign: 'right' }}>
                            <p class="date">{el.date}</p>
                        </div>
                    </div>
                    <div class="ratings-row">
                        <div class="ratings-column">
                            <p><strong>Instructor:</strong> {el.professor}</p>
                        </div>
                        <div class="ratings-column" style={{ textAlign: 'right' }}>
                            {stars(el.stars)}
                        </div>
                    </div>
                    <div class="ratings-full-row">
                        <div class="ratings-column">
                            <p>{el.comment}</p>
                        </div>
                    </div>
                    <div class="ratings-full-row">
                        <div class="ratings-column">
                            <p><button onClick={() => addHelpful(el.id, el.helpful + 1)}><img src={thumbsUp} style={{ width: '25px' }} /> </button> {el.helpful}     <button onClick={() => addUnhelpful(el.id, el.unhelpful + 1)}><img src={thumbsDown} style={{ width: '25px' }} /></button> {el.unhelpful}</p>
                        </div>
                    </div>
                </div>
            </div>
        ));

        return (
            <div>
                {allRatings}
            </div>
        )
    }

    /*
     * This subview shows the questions for a selected course.
     */
    function viewQuestions() {
        return (
            <div>
                <h1>Questions</h1>
            </div>
        )
    }

    /*
     * This subview shows the tips for a selected course.
     */
    function viewTips() {
        return (
            <div>
                <h1>Tips</h1>
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
                    <div class="container subforum">
                        <div class="subforum-title">
                            <h1>About</h1>
                        </div>
                        <div>
                            <div class="subforum-full-row">
                                <div class="subforum-column">
                                    <h2>Class Information</h2>
                                    <p>Com S 319: Construction of User Interfaces</p>
                                    <p>Professor Ali Jannesari</p>
                                    <p>April 27, 2024</p>
                                </div>
                            </div>
                            <div class="subforum-full-row">
                                <div class="subforum-column">
                                    <h2>Project Description</h2>
                                    <p class="title">Final Project</p>
                                    {/* TODO add description */}
                                    <p>Description goes here</p>
                                </div>
                            </div>
                            <div class="subforum-row-thirds">
                                <div class="subforum-column">
                                    <h3>Maddelynne McGovern</h3>
                                    <p class="title">mrm4@iastate.edu</p>
                                </div>
                                <div class="subforum-column">
                                    <h3>Jennifer Hua</h3>
                                    <p class="title">jthua@iastate.edu</p>
                                </div>
                                <div class="subforum-column">
                                    <h3>Sagnik Dey</h3>
                                    <p class="title">sdey@iastate.edu</p>
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
        return viewOneCourse();
    } else if (view === 2) {
        return viewStudents();
    } else {
        return (<div>
            <button onClick={() => setView(0)}>All Products</button>
            <button onClick={() => setView(2)}>About</button>
        </div>);
    }
}

export default Ratings;