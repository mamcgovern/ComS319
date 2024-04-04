import React, { useState, useEffect } from "react";
import items from "./Products.json";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";

// TODO Create video

const Shop = () => {
    /*
     * 0: browse view
     * 1: cart view
     * 2: confirmation view
     */
    const [view, setView] = useState(0);

    // search info
    const [ProductsCategory, setProductsCategory] = useState(items);
    const [query, setQuery] = useState("");

    // cart info
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartSubtotal, setCartSubtotal] = useState(0);
    const [cartTax, setCartTax] = useState(0);
    const [checkoutCart, setCheckoutCart] = useState([]);

    // user info
    const [dataF, setDataF] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();



    // plus button function
    const addToCart = (el) => {
        setCart([...cart, el]);
        if (!checkoutCart.includes(el)) {
            setCheckoutCart([...checkoutCart, el]);
        }
    };

    //minus button function
    const removeFromCart = (el) => {
        let itemFound = false;
        const updatedCart = cart.filter((cartItem) => {
            if (cartItem.id === el.id && !itemFound) {
                itemFound = true;
                return false;
            }
            return true;
        });
        if (itemFound) {
            setCart(updatedCart);
        }
    };

    const handleChange = (e) => {
        let empty = false;
        setQuery(e.target.value);
        const results = items.filter((eachProduct) => {
            if (e.target.value === "") {
                empty = true
                return ProductsCategory;
            }
            return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setProductsCategory(results);
    };

    /*
     * The "Browse" view shows the items available for purchase.
     * Each item has an image, name, size, and price. The items also have
     * a plus or minus button for adding items to the cart, with the 
     * quantity of items in the cart visable, as well.
     * The "Browse" view also has a functional search bar and a button to
     * reach the "Cart" view.
     */
    function viewBrowse() {
        // generates each items HTML
        const listItems = ProductsCategory.map((el) => (
            <div class="col">
                <div class="card shadow-sm">
                    <img class="img-fluid" src={el.image} width='180px' />
                    <div class="card-body">
                        <div class="col">
                            <div><strong>{el.title}</strong><br /> {el.category}</div><br />
                            <div>${el.price}</div><br />
                        </div>
                        <p class="card-text">{el.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button class="btn btn-secondary" type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
                                <button class="btn btn-primary" type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                            </div>
                            &ensp;&#10005;{howManyofThis(el.id)}
                        </div>
                    </div>
                </div>
            </div>
        ));



        // Browse view HTML
        return (
            <div>
                {/* Header */}
                <header class="p-3 navbar1 navigation bg-dark">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-end">
                        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" action="searchResults.html">
                            <input type="search" value={query} onChange={handleChange} class="form-control form-control-light text-bg-light" placeholder="Search..." aria-label="Search" name="info" id="info" />
                        </form>
                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(1)}>Cart</button>
                    </div>
                </header>
                {/* Contents */}
                <div class="container">
                    <h1>Squishmallows</h1>
                    <div class="album py-5 bg-body-tertiary">
                        <div class="container">
                            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                {listItems}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    /*
     * The "Cart" view shows the items in the cart, along with a form for
     * the user to checkout. This form asks for shipping and payment information,
     * which is validated before submission.
     * The item information includes the title, size, and price. 
     * Following the items, the user can find their subtotal, tax, and total cost.
     */
    function viewCart() {
        // generates each item's HTML
        const cartItems = checkoutCart.map((el) => (
            <div class="row border-top border-bottom" key={el.id}>
                <div class="row main align-items-center">
                    <div class="col-2">
                        <img class="img-fluid" src={el.image} width='150px' />
                    </div>
                    <div class="col">
                        <div class="row text-muted">{el.title}</div>
                        <div class="row">{el.category}</div>
                    </div>
                    <div class="col">
                        ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
                    </div>
                </div>
            </div>
        ));

        const onSubmit = data => {
            console.log(data); // log all data
            console.log(data.fullName); // log only fullname
            // update hooks
            setDataF(data)
            setView(2);
        }

        // Cart view HTML
        return (<div>
            {/* Header */}
            <header class="p-3 navbar1 navigation bg-dark">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <button class="btn btn-primary rounded-pill px-3" onClick={() => continueBrowsing()}>Return</button>
                    </ul>
                </div>
            </header>
            {/* Content */}
            <div class="container">
                <div class="row g-5">
                    {/* Cost Information */}
                    <div class="col-md-5 col-lg-4 order-md-last">
                        <h4 class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-primary">Your cart</span>
                        </h4>
                        <ul class="list-group mb-3">
                            <div>{cartItems}</div>
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Subtotal</span>
                                <strong>{cartSubtotal}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Tax</span>
                                <strong>{cartTax}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span><strong>Total</strong></span>
                                <strong>{cartTotal}</strong>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-7 col-lg-8">
                        <form class="needs-validation" onSubmit={handleSubmit(onSubmit)}>
                            {/* Shipping Information */}
                            <h4 class="mb-3">Shipping address</h4>
                            <div class="row g-3">
                                <div class="col-sm-6">
                                    <div className="form-group">
                                        <input {...register("firstName", { required: true })} placeholder="First Name" className="form-control" />
                                        {errors.firstName && <p className="text-danger">First Name is required.</p>}
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div className="form-group">
                                        <input {...register("lastName", { required: true })} placeholder="Last Name" className="form-control" />
                                        {errors.lastName && <p className="text-danger">Last Name is required.</p>}
                                    </div>
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col-12">
                                    <div className="form-group">
                                        <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" className="form-control" />
                                        {errors.email && <p className="text-danger">Email is required.</p>}
                                    </div>
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col-12">
                                    <div className="form-group">
                                        <input {...register("address", { required: true })} placeholder="Address" className="form-control" />
                                        {errors.address && <p className="text-danger">Address is required.</p>}
                                    </div>
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col-12">
                                    <div className="form-group">
                                        <input {...register("address2")} placeholder="Address 2" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col-md-5">
                                    <div className="form-group">
                                        <input {...register("city", { required: true })} placeholder="City" className="form-control" />
                                        {errors.city && <p className="text-danger">City is required.</p>}
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div className="form-group">
                                        <input {...register("state", { required: true })} placeholder="State" className="form-control" />
                                        {errors.state && <p className="text-danger">State is required.</p>}
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div className="form-group">
                                        <input {...register("zip", { required: true, pattern: /^[0-9]{5}$/ })} placeholder="Zip" className="form-control" />
                                        {errors.zip && <p className="text-danger">Zip is required.</p>}
                                    </div>
                                </div>
                            </div>
                            {/* Payment Information */}
                            <h4 class="mb-3">Payment Information</h4>
                            <div class="row g-3">
                                <div class="col-12">
                                    <div className="form-group">
                                        <input {...register("creditCard", { required: true,  pattern: /^\d{4}-\d{4}-\d{4}-\d{4}$/})} placeholder="" className="form-control" />
                                        {errors.creditCard && <p className="text-danger">Credit card number is required and must be in form xxxx-xxxx-xxxx-xxxx.</p>}
                                    </div>
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col-md-3">
                                    <div className="form-group">
                                        <input {...register("expiration", { required: true, pattern: /^(0[1-9]|1[0-2])\/\d{2}$/ })} placeholder="MM/DD" className="form-control" />
                                        {errors.expiration && <p className="text-danger">Expiration date must be in form MM/DD.</p>}
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div className="form-group">
                                        <input {...register("cvv", { required: true, pattern: /^[0-9]+$/ })} placeholder="CVV" className="form-control" />
                                        {errors.cvv && <p className="text-danger">CVV is required and can only be numbers.</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div class="row g-3">
                                <button class="w-100 btn btn-primary btn-lg" type="submit">Order</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>);
    };

    /*
     * The "Confirmation" view shows a summary of the user's purchase.
     * The view starts with a thank you to the user for making the purchase,
     * followed by the shipping address, a redacted version of the payment information,
     * a list of the purchased items, and the cost information. 
     * Finally, there is a button to continue browsing.
     */
    function viewConfirmation() {
        // generates each item's HTML
        const cartItems = checkoutCart.map((el) => (
            <div class="row border-top border-bottom" key={el.id}>
                <div class="row main align-items-center">
                    <div class="col-2">
                        <img class="img-fluid" src={el.image} width='150px' />
                    </div>
                    <div class="col">
                        <div class="row text-muted">{el.title}</div>
                        <div class="row">{el.category}</div>
                    </div>
                    <div class="col">
                        ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
                    </div>
                </div>
            </div>
        ));

        // function to redact the first 12 digist of the card number
        const redactedCardNumber = () => {
            return "XXXX-XXXX-XXXX-" + dataF.creditCard.slice(-4);
        };

        // Confirmation view HTML
        return (
            <div>
                {/* Header */}
                <header class="p-3 navbar1 navigation bg-dark">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <button class="btn btn-primary rounded-pill px-3" onClick={() => continueBrowsing()}>Browse</button>
                        </ul>
                    </div>
                </header>
                {/* Content */}
                <div class="container">
                    <h1>Order Confirmation</h1>
                    <p>Thank you for your order!</p>
                    <div>
                        <h2>Shipping Information:</h2>
                        <p><strong>{dataF.firstName} {dataF.lastName}</strong></p>
                        <p>{dataF.address}</p>
                        <p>{dataF.address2}</p>
                        <p>{dataF.city}, {dataF.state} {dataF.zip}</p>
                    </div>
                    <div>
                        <h2>Payment Information:</h2>
                        <p>
                            <strong>Card number:</strong> {redactedCardNumber()}
                        </p>
                    </div>
                    <div>
                        <h2>Items:</h2>
                        <div>{cartItems}</div>
                    </div>
                    <p>
                        <strong>Subtotal:</strong> {cartSubtotal} <br />
                        <strong>Tax:</strong> {cartTax} <br />
                        <strong>Total:</strong> {cartTotal}
                    </p>
                    <button class="w-100 btn btn-primary btn-lg" onClick={() => continueBrowsing()}>Continue browsing</button>
                </div>
            </div>);
    };

    // function to continue browsing after going to the cart or making a purchase
    const continueBrowsing = () => {
        //TODO clear inputs in the form
        // reset user info
        setDataF({});
        // reset cart info
        setCart([]);
        // go to browse view
        setView(0);
    }

    // function to change the view
    const handleClick = (input) => {
        setView(input);
    };

    useEffect(() => {
        total();
    }, [cart]);

    // function to get the subtotal, tax, and total costs
    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price;
        }
        setCartSubtotal(totalVal.toFixed(2));
        setCartTotal((totalVal * 1.07).toFixed(2));
        setCartTax((totalVal * 0.07).toFixed(2));
    };

    // function to get the quanity of this item in the cart by ID
    function howManyofThis(id) {
        let hmot = cart.filter((cartItem) => cartItem.id === id);
        return hmot.length;
    }

    // return statements based on which view we want
    if (view == 0) {
        return viewBrowse();
    } else if (view == 1) {
        return viewCart();
    } else if (view == 2) {
        return viewConfirmation();
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
                                <button class="btn btn-primary" onClick={() => continueBrowsing()}>Home</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default Shop;
