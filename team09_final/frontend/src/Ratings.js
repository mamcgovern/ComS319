import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import starFilled from './images/star-fill.png';
import starOutline from './images/star-outline.png';
import thumbsUp from './images/thumbs-up.png'
import thumbsDown from './images/thumbs-down.png'
import trash from './images/trash.png';

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
    const [rating, setRating] = useState(0);
    const { register, handleSubmit, formState: { errors }, unregister } = useForm();
    const formRef = useRef(null);

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
            .then(() => {
                // Fetch updated ratings after updating unhelpful count
                fetch(`http://localhost:8081/ratings/${id}`)
                    .then(response => response.json())
                    .then(ratings => {
                        setRatings(ratings);
                    });
            });
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
            .then(() => {
                fetch(`http://localhost:8081/ratings/${id}`)
                    .then(response => response.json())
                    .then(ratings => {
                        setRatings(ratings);
                    });
            });
    }


    /*
     * This function deletes a rating by ID
     */
    function deleteRating(ratingID) {
        const confirmed = window.confirm("Are you sure you want to delete this rating: " + ratingID);
        if (confirmed) {
            console.log('Confirmed');
            fetch(`http://localhost:8081/ratings/${ratingID}`, {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(
                    { "id": ratingID }
                )
            })
                .then(response => response.json())
                .then(() => {
                    fetch(`http://localhost:8081/ratings/${id}`)
                        .then(response => response.json())
                        .then(ratings => {
                            setRatings(ratings);
                        });
                });
        } else {
            console.log('Canceled');
        }
    }

    /*
     * This function updates the number of stars
     */
    const handleRatingChange = (newRating) => {
        setRating(newRating); // Update the rating state with the new rating
    };

    /*
     * This function is for submitting the rating info.
     * It includes a post request.
     */
    const onSubmit = (data, event) => {
        event.preventDefault(); // Prevent default form submission behavior
        console.log(data); // log all data

        const ratingData = {
            courseID: id,
            username: data.username,
            date: data.date,
            semester: data.semester,
            professor: data.professor,
            stars: rating,
            comment: data.comment
        };

        fetch('http://localhost:8081/ratings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ratingData)
        })
            .then(response => response.json())
            .then(responseData => {
                console.log('Success:', responseData);
            })
            .then(() => {
                // Fetch updated ratings after posting a new rating
                fetch(`http://localhost:8081/ratings/${id}`)
                    .then(response => response.json())
                    .then(ratings => {
                        setRatings(ratings);
                    });
            })
            .catch(error => console.error('Error fetching product data:', error));

        // Reset the form fields after a short delay
        setTimeout(() => {
            event.target.reset();
            setRating(0);
        }, 100);
    };

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
                                <button class="button-like-text navbar-brand col-lg-3 me-0" onClick={() => setView(0)}>CourseRater</button>
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
                    <h1>{el.id}: <button class="button-like-text" type="button" onClick={() => getOneCourse(el.id)}>{el.courseCode}</button></h1>
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
            const stars = [];
            for (let i = 1; i <= 5; i++) {
                if (i <= numStars) {
                    stars.push(<img key={i} src={starFilled} style={{ width: '25px', cursor: 'pointer' }} alt="star filled" />);
                } else {
                    stars.push(<img key={i} src={starOutline} style={{ width: '25px', cursor: 'pointer' }} alt="star outline" />);
                }
            }
            return stars;
        }
        const renderStars = () => {
            const stars = [];
            for (let i = 1; i <= 5; i++) {
                if (i <= rating) {
                    stars.push(<img key={i} src={starFilled} style={{ width: '25px', cursor: 'pointer' }} alt="star filled" onClick={() => handleRatingChange(i)} />);
                } else {
                    stars.push(<img key={i} src={starOutline} style={{ width: '25px', cursor: 'pointer' }} alt="star outline" onClick={() => handleRatingChange(i)} />);
                }
            }
            return stars;
        };
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
                    <div class="ratings-row">
                        <div class="ratings-column">
                            <button class="button-like-text" onClick={() => addHelpful(el.id, el.helpful + 1)}><img src={thumbsUp} style={{ width: '25px' }} alt="thumbs up" /> </button> {el.helpful}
                            <button class="button-like-text" onClick={() => addUnhelpful(el.id, el.unhelpful + 1)}><img src={thumbsDown} style={{ width: '25px' }} alt="thumbs down" /></button> {el.unhelpful}
                        </div>
                        <div class="ratings-column" style={{ textAlign: 'right' }}>
                            <button class="button-like-text" onClick={() => deleteRating(el.id)}><img src={trash} style={{ width: '25px' }} alt="trash" /></button>
                        </div>
                    </div>
                </div>
            </div>
        ));

        return (
            <div>
                <div class="subforum-full-row">
                    <div class="subforum-column">
                        <div class="row g-3">
                            <div class="col">
                                <form class="needs-validation" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                                    {/* Shipping Information */}
                                    <div class="row g-3 mb-3">
                                        <div class="col-sm-6">
                                            <div className="form-group">
                                                <input {...register("username", { required: true })} placeholder="Username" className="form-control" />
                                                {errors.username && <p className="text-danger">Username is required.</p>}
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div className="form-group">
                                                <input {...register("date", { required: true, pattern: /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/ })} placeholder="MM/DD/YYYY" className="form-control" />
                                                {errors.date && <p className="text-danger">Date must be in form MM/DD/YYYY.</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row g-3 mb-3">
                                        <div class="col-md-5">
                                            <div className="form-group">
                                                <input {...register("professor", { required: true })} placeholder="Instructor" className="form-control" />
                                                {errors.professor && <p className="text-danger">Instructor name is required.</p>}
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div className="form-group">
                                                <input {...register("semester", { required: true, pattern: /^(Spring|Summer|Fall|Winter)\s\d{4}$/ })} placeholder="Semester YYYY" className="form-control" />
                                                {errors.semester && <p className="text-danger">Semester is required.</p>}
                                            </div>
                                        </div>
                                        <div class="col-md-3 ">
                                            <div className="form-group" style={{ textAlign: 'right' }}>
                                                {renderStars()}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row g-3 mb-3">
                                        <div class="col">
                                            <textarea
                                                {...register("comment", { required: true })}
                                                placeholder="Enter your comment here"
                                                className="form-control"
                                                style={{ width: '100%', minHeight: '100px', resize: 'both' }}
                                            />
                                            {errors.comment && <p className="text-danger">Comment is required.</p>}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div class="row g-3 mb-3">
                                        <div class="col">
                                            <button class="w-100 btn btn-primary btn-lg" type="submit">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
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