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
                <div>
                    <h1>Checkout</h1>
                    <p><strong>Items:</strong></p>
                    <p>{cartItems}</p>
                    <p><strong>Subtotal:</strong> {cartSubtotal}</p>
                    <p><strong>Tax:</strong> {cartTax}</p>
                    <p><strong>Total:</strong> {cartTotal}</p>
                </div>
                <div>

                </div>
            </div>
        </div>);
    };

    function viewConfirmation() {
        const cartItems = cart.map((el) => (
            <div key={el.id}>
                <img class=
                    "img-fluid" src={el.image} width={150} />
                {el.title}
                ${el.price}
            </div>
        ));

        return (
            <div className="bg-gray-100 p-4 text-purple-500">
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
                    <hr />
                    <p><strong>Subtotal:</strong> {cartSubtotal}</p>
                    <p><strong>Tax:</strong> {cartTax}</p>
                    <p><strong>Total:</strong> {cartTotal}</p>
                </div>
            </div>);
    };

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
        setCartSubtotal(totalVal);
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