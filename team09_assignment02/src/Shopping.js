import React, { useState, useEffect } from "react";
import items from "./Products.json";

const Shop = () => {
    /*
     * 0: browse view
     * 1: cart view
     * 2: confirmation view
     */
    const [view, setView] = useState(0);

    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartSubtotal, setCartSubtotal] = useState(0);
    const [cartTax, setCartTax] = useState(0);

    function viewBrowse() {
        const listItems = items.map((el) => (
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
                        <button class="btn btn-secondary" type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
                        <button class="btn btn-primary" type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                    </div>
                    <div class="col">
                        ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
                    </div>
                </div>
            </div>
        ));

        const addToCart = (el) => {
            setCart([...cart, el]);
        };

        const removeFromCart = (el) => {
            let hardCopy = [...cart];
            hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
            setCart(hardCopy);
        };

        return (
            <div>
                <header class="p-3 navbar1 navigation bg-dark">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(0)}>Browse</button>
                        </ul>
                        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" action="searchResults.html">
                            <input type="search" class="form-control form-control-light text-bg-light" placeholder="Search..." aria-label="Search" name="info" id="info" />
                        </form>
                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(1)}>Cart</button>
                    </div>
                </header>
                <div class="container">
                    <h1>Browse</h1>
                    <div>{listItems}</div>
                </div>
            </div>
        );
    };

    function howManyofThis(id) {
        let hmot = cart.filter((cartItem) => cartItem.id === id);
        return hmot.length;
    }

    function viewCart() {
        const cartItems = cart.map((el) => (
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0">{el.title}</h6>
                    <small class="text-body-secondary">{el.category}</small>
                </div>
                <span class="text-body-secondary">{el.price}</span>
            </li>
        ));

        return (<div>
            <header class="p-3 navbar1 navigation bg-dark">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(0)}>Browse</button>
                    </ul>
                    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" action="searchResults.html">
                        <input type="search" class="form-control form-control-light text-bg-light" placeholder="Search..." aria-label="Search" name="info" id="info" />
                    </form>
                    <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(1)}>Cart</button>
                </div>
            </header>
            <div class="container">
                <div class="row g-5">
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
                        <h4 class="mb-3">Shipping address</h4>
                        <form class="needs-validation" novalidate>
                            <div class="row g-3">
                                <div class="col-sm-6">
                                    <label for="firstName" class="form-label">First name</label>
                                    <input type="text" class="form-control" id="firstName" placeholder="" required />
                                    <div class="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <label for="lastName" class="form-label">Last name</label>
                                    <input type="text" class="form-control" id="lastName" placeholder="" required />
                                    <div class="invalid-feedback">
                                        Valid last name is required.
                                    </div>
                                </div>

                                <div class="col-12">
                                    <label for="email" class="form-label">Email <span class="text-body-secondary">(Optional)</span></label>
                                    <input type="email" class="form-control" id="email" placeholder="you@example.com" />
                                    <div class="invalid-feedback">
                                        Please enter a valid email address for shipping updates.
                                    </div>
                                </div>

                                <div class="col-12">
                                    <label for="address" class="form-label">Address</label>
                                    <input type="text" class="form-control" id="address" placeholder="1234 Main St" required />
                                    <div class="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>

                                <div class="col-12">
                                    <label for="address2" class="form-label">Address 2 <span
                                        class="text-body-secondary">(Optional)</span></label>
                                    <input type="text" class="form-control" id="address2" placeholder="Apartment or suite" />
                                </div>

                                <div class="col-md-5">
                                    <label for="country" class="form-label">Country</label>
                                    <select class="form-select" id="country" required>
                                        <option value="">Choose...</option>
                                        <option>United States</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <label for="state" class="form-label">State</label>
                                    <select class="form-select" id="state" required>
                                        <option value="">Choose...</option>
                                        <option>Iowa</option>
                                        <option>Wisconsin</option>
                                        <option>Illinois</option>
                                        <option>Minnesota</option>
                                        <option>North Dakota</option>
                                        <option>South Dakota</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <label for="zip" class="form-label">Zip</label>
                                    <input type="text" class="form-control" id="zip" placeholder="" required />
                                    <div class="invalid-feedback">
                                        Zip code required.
                                    </div>
                                </div>
                            </div>

                            <hr class="my-4" />

                            <h4 class="mb-3">Payment</h4>

                            <div class="row gy-3">
                                <div class="col-md-6">
                                    <label for="cc-name" class="form-label">Name on card</label>
                                    <input type="text" class="form-control" id="cc-name" placeholder="" required />
                                    <small class="text-body-secondary">Full name as displayed on card</small>
                                    <div class="invalid-feedback">
                                        Name on card is required
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <label for="cc-number" class="form-label">Credit card number</label>
                                    <input type="text" class="form-control" id="cc-number" placeholder="" required />
                                    <div class="invalid-feedback">
                                        Credit card number is required
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <label for="cc-expiration" class="form-label">Expiration</label>
                                    <input type="text" class="form-control" id="cc-expiration" placeholder="" required />
                                    <div class="invalid-feedback">
                                        Expiration date required
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <label for="cc-cvv" class="form-label">CVV</label>
                                    <input type="text" class="form-control" id="cc-cvv" placeholder="" required />
                                    <div class="invalid-feedback">
                                        Security code required
                                    </div>
                                </div>
                            </div>

                            <hr class="my-4" />

                            <button class="w-100 btn btn-primary btn-lg" type="submit" onClick={() => handleClick(2)}>Continue to checkout</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>);
    };

    function viewConfirmation() {
        const cartItems = cart.map((el) => (
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

        return (
            <div>
                <header class="p-3 navbar1 navigation bg-dark">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(0)}>Browse</button>
                        </ul>
                        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" action="searchResults.html">
                            <input type="search" class="form-control form-control-light text-bg-light" placeholder="Search..." aria-label="Search" name="info" id="info" />
                        </form>
                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(1)}>Cart</button>
                    </div>
                </header>
                <div class="container">
                    <h1>Order Confirmation</h1>
                    <p>Thank you for your order!</p>
                    <p><strong>Items:</strong></p>
                    <div>{cartItems}</div>
                    <p><strong>Subtotal:</strong> {cartSubtotal}</p>
                    <p><strong>Tax:</strong> {cartTax}</p>
                    <p><strong>Total:</strong> {cartTotal}</p>
                    <button class="w-100 btn btn-primary btn-lg"onClick={() => continueBrowsing()}>Continue browsing</button>
                </div>
            </div>);
    };

    const continueBrowsing = () => {
        setCart([]);
        setView(0);
    }

    const handleClick = (input) => {
        setView(input);
    };

    useEffect(() => {
        total();
    }, [cart]);

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price;
        }
        setCartSubtotal(totalVal.toFixed(2));
        totalVal = (totalVal * 1.07).toFixed(2);
        setCartTotal(totalVal);
        setCartTax((cartTotal - cartSubtotal).toFixed(2));
    };

    if (view == 0) {
        return viewBrowse();
    } else if (view == 1) {
        return viewCart();
    } else if (view == 2) {
        return viewConfirmation();
    } else {
        return (
            <div>
                <button onClick={() => handleClick(0)}>Browse</button>
                <button onClick={() => handleClick(1)}>Cart</button>
                <button onClick={() => handleClick(2)}>Confirmation</button>
                Shop Here
            </div>
        );
    }

}
export default Shop;