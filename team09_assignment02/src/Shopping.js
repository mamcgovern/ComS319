import React, { useState, useEffect } from "react";
import items from "./Products.json";

const Shop = () => {
    const [browseView, setBrowseView] = useState(true);
    const [cartView, setCartView] = useState(false);
    const [confirmationView, setConfirmationView] = useState(false);
    // 0: browse view
    // 1: cart view
    // 2: confirmation view
    const [view, setView] = useState(0);

    // function handleClick(){
    //     let filtered = items.filter
    // }

    function viewBrowse() {
        return (
            <div>
                <button onClick={() => handleClick(0)}>Browse</button>
                <button onClick={() => handleClick(1)}>Cart</button>
                <button onClick={() => handleClick(2)}>Confirmation</button>
                <h1>This is the Browse View</h1>
            </div>
        );
    };

    function viewCart() {
        return (<div>
            <button onClick={() => handleClick(0)}>Browse</button>
            <button onClick={() => handleClick(1)}>Cart</button>
            <button onClick={() => handleClick(2)}>Confirmation</button>
            <h1>This is Cart View</h1>
        </div>);
    };

    function viewConfirmation() {
        return (<div className="bg-gray-100 p-4 text-purple-500">
            <button onClick={() => handleClick(0)}>Browse</button>
            <button onClick={() => handleClick(1)}>Cart</button>
            <button onClick={() => handleClick(2)}>Confirmation</button>
            <h1>This is confirmation view</h1>
        </div>);
    };

    const handleClick = (input) => {
        setView(input);
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