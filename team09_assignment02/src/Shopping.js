import React, { useState, useEffect } from "react";
import items from "./Products.json";

// TODO Create video

const Shop = () => {
    /*
     * 0: browse view
     * 1: cart view
     * 2: confirmation view
     */
    const [view, setView] = useState(0);

    const [ProductsCategory, setProductsCategory] = useState(items);
    const [query, setQuery] = useState("");

    // cart info
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartSubtotal, setCartSubtotal] = useState(0);
    const [cartTax, setCartTax] = useState(0);
    const [checkoutCart, setCheckoutCart] = useState([]);

    // shipping info
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState();

    // payment info
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");



     // plus button function
    const addToCart = (el) => {
        setCart([...cart, el]);
        if(!checkoutCart.includes(el)){
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
          if (e.target.value === ""){
            empty = true
            return ProductsCategory;
          }
          return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setProductsCategory(results);
        if(!empty){
            setView(3);
        }
      }; 
    function viewFilteredSearch() {
        const listItems = ProductsCategory.map((el) => (
            <div class="album py-5 bg-body-tertiary">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {/* <div> */}
                        {/* <div class="col"> */}
                            <div class="card shadow-sm">
                                <img  src={el.image} width='180px' />
                                <div class="card-body">
                                    <div > {/*class="col"*/}
                                        <div><strong>{el.title}</strong><br/> {el.category}</div><br/>
                                        <div>${el.price}</div><br/>
                                        
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
                        {/* </div> */}
                    </div>
                </div>
            </div>
        ));

        return (
            <div>
                {/* Header */}
                <header class="p-3 navbar1 navigation bg-dark">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-end">
                        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" action="searchResults.html">
                            {/* TODO Make search functional */}
                            <input type="search" value={query} onChange={handleChange} class="form-control form-control-light text-bg-light" placeholder="Search..." aria-label="Search" name="info" id="info" />
                        </form>
                        <button class="btn btn-primary rounded-pill px-3" onClick={() => handleClick(1)}>Cart</button>
                    </div>
                </header>
                {/* Contents */}
                <div class="container">
                    <h1>Squishmallows</h1>
                    <div>{listItems}</div>
                </div>
            </div>
        );
    }
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
        const listItems = items.map((el) => (
                        <div class="col">
                            <div class="card shadow-sm">
                                <img class="img-fluid" src={el.image} width='180px' />
                                <div class="card-body">
                                    <div class="col">
                                        <div><strong>{el.title}</strong><br/> {el.category}</div><br/>
                                        <div>${el.price}</div><br/>
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
                            {/* TODO Make search functional */}
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
        // TODO Change so the function doesn't allow duplicates, but instead uses the howManyofThis function
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
                    {/* <div class="col">
                        <button class="btn btn-secondary" type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
                        <button class="btn btn-primary" type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                    </div> */}
                    <div class="col">
                        ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
                    </div>
                </div>
            </div>
        ));

        // function to update the stored first name
        const handleFirstNameChange = (event) => {
            setFirstName(event.target.value);
        };

        // function to update the stored last name
        const handleLastNameChange = (event) => {
            setLastName(event.target.value);
        };

        // function to update the stored address
        const handleAddress1Change = (event) => {
            setAddress1(event.target.value);
        };

        // function to update the stored address2
        const handleAddress2Change = (event) => {
            setAddress2(event.target.value);
        };

        // function to update the stored city
        const handleCityChange = (event) => {
            setCity(event.target.value);
        };

        // function to update the stored state
        const handleStateChange = (event) => {
            setState(event.target.value);
        };

        // function to update the stored zipcode
        const handleZipcodeChange = (event) => {
            setZipcode(event.target.value);
        };

        // function to update the stored card name
        const handleCardNameChange = (event) => {
            setCardName(event.target.value);
        };

        // function to update the stored card number
        const handleCardNumberChange = (event) => {
            setCardNumber(event.target.value);
        };

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
            {/* TODO validate inputs */}
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
                        <form class="needs-validation" novalidate>

                            {/* Shipping Information */}
                            <h4 class="mb-3">Shipping address</h4>
                            <div class="row g-3">
                                <div class="col-sm-6">
                                    <label for="firstName" class="form-label">First name</label>
                                    <input type="text" class="form-control" id="firstName" placeholder="" onChange={handleFirstNameChange} required />
                                    <div class="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <label for="lastName" class="form-label">Last name</label>
                                    <input type="text" class="form-control" id="lastName" placeholder="" onChange={handleLastNameChange} required />
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
                                    <input type="text" class="form-control" id="address" placeholder="1234 Main St" onChange={handleAddress1Change} required />
                                    <div class="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>
                                <div class="col-12">
                                    <label for="address2" class="form-label">Address 2 <span
                                        class="text-body-secondary">(Optional)</span></label>
                                    <input type="text" class="form-control" id="address2" placeholder="Apartment or suite" onChange={handleAddress2Change} />
                                </div>
                                <div class="col-md-5">
                                    <label for="city" class="form-label">City</label>
                                    <input type="text" class="form-control" id="city" placeholder="" onChange={handleCityChange} required />
                                    <div class="invalid-feedback">
                                        Please enter your city.
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <label for="state" class="form-label">State</label>
                                    <select class="form-select" id="state" onChange={handleStateChange} required>
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
                                    <input type="text" class="form-control" id="zip" placeholder="" onChange={handleZipcodeChange} required />
                                    <div class="invalid-feedback">
                                        Zip code required.
                                    </div>
                                </div>
                            </div>

                            <hr class="my-4" />

                            {/* Payment Information */}
                            <h4 class="mb-3">Payment</h4>
                            <div class="row gy-3">
                                <div class="col-md-6">
                                    <label for="cc-name" class="form-label">Name on card</label>
                                    <input type="text" class="form-control" id="cc-name" placeholder="" onChange={handleCardNameChange} required />
                                    <small class="text-body-secondary">Full name as displayed on card</small>
                                    <div class="invalid-feedback">
                                        Name on card is required
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="cc-number" class="form-label">Credit card number</label>
                                    <input type="text" class="form-control" id="cc-number" placeholder="" onChange={handleCardNumberChange} required />
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

                            {/* Submit Button */}
                            <button class="w-100 btn btn-primary btn-lg" type="submit" onClick={() => submitForm()}>Order</button>
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
        // TODO Change so the function doesn't allow duplicates, but instead uses the howManyofThis function
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

        // function to redact the first 12 digist of the card number
        const redactedCardNumber = () => {
            return "XXXX-XXXX-XXXX-" + cardNumber.slice(-4);
        };

        // function to format the user's shipping address
        const address = () => {
            if (address2 == "") {
                return (<p>
                    {firstName} {lastName} <br />
                    {address1}<br />
                    {city}, {state} {zipcode}
                </p>);
            } else {
                return (<p>
                    {firstName} {lastName} <br />
                    {address1}<br />
                    {address2}<br />
                    {city}, {state} {zipcode}
                </p>);
            }
        }

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
                        {address()}
                    </div>
                    <div>
                        <h2>Payment Information:</h2>
                        <p>
                            <strong>Name on card:</strong> {cardName}<br />
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
        // reset user info
        setFirstName("");
        setLastName("");
        setAddress1("");
        setAddress2("");
        setCity("");
        setState("");
        setZipcode("");
        setCardName("");
        setCardNumber();
        // go to browse view
        setView(0);
    }

    // function to submit checkout form
    const submitForm = () => {
        setCart([]); // clears cart since the items were purchased
        setView(2); // goes to the confirmation view
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
    } else if (view == 3) {
        return viewFilteredSearch();
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
