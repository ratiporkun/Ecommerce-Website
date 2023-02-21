import './cartScreen.css'
import React, { useEffect, useState } from 'react'
import Cookie from "js-cookie"
import $ from 'jquery';
import Axios from 'axios'
import { useHistory } from "react-router-dom";

function CartScreen() {

    const [cart, setCart] = useState([]);
    
    const history = useHistory();

    /* Set rates + misc */
    var taxRate = 0.05;
    var shippingRate = 15.00;
    var fadeTime = 300;


    useEffect(() => {
        /* Assign actions */
        $('.product-quantity input').change(function () {
            console.log(this);
            updateQuantity(this);
        });

        $('.product-removal button').click(function () {
            removeItem(this);
        });
    }, []);

    
    /* Recalculate cart */
    function recalculateCart() {
        var subtotal = 0;

        /* Sum up row totals */
        $('.product').each(function () {
            subtotal += parseFloat($(this).children('.product-line-price').text());
        });

        /* Calculate totals */
        var tax = subtotal * taxRate;
        var shipping = (subtotal > 0 ? shippingRate : 0);
        var total = subtotal + tax + shipping;

        /* Update totals display */
        $('.totals-value').fadeOut(fadeTime, function () {
            $('#cart-subtotal').html(subtotal.toFixed(2));
            $('#cart-tax').html(tax.toFixed(2));
            $('#cart-shipping').html(shipping.toFixed(2));
            $('#cart-total').html(total.toFixed(2));
            if (total === 0) {
                $('.checkout').fadeOut(fadeTime);
            } else {
                $('.checkout').fadeIn(fadeTime);
            }
            $('.totals-value').fadeIn(fadeTime);
        });
    }


    function updateQuantity(quantityInput) {
        console.log(quantityInput)
        /* Calculate line price */
        var productRow = $(quantityInput).parent().parent();
        var price = parseFloat(productRow.children('.product-price').text());
        var quantity = $(quantityInput).val();
        var linePrice = price * quantity;

        /* Update line price display and recalc cart totals */
        productRow.children('.product-line-price').each(function () {
            $(this).fadeOut(fadeTime, function () {
                $(this).text(linePrice.toFixed(2));
                recalculateCart();
                $(this).fadeIn(fadeTime);
            });
        });
    }
    var SubTotal = 0;

    /* Remove item from cart */
    function removeItem(productid) {
        Axios.put('http://localhost:8080/removecart/', { 
            id: productid
        })
        window.location.reload(false);
    }

    function getCart() {
        fetch('http://localhost:8080/getCart/')
            .then(response => response.json())
            .then(result => {
                const cart = result.filter(function (item) {
                    return item.email == Cookie.get("email");
                })
                setCart(cart);
            });
    }
    useEffect(() => {
        getCart()
    }, []);

    {cart.map(item => (SubTotal=SubTotal + item.price*item.quantity))}
    return (

        <div><br /><br />
            <h3>Shopping Cart</h3>

            <div className="shopping-cart">

                <div className="column-labels">
                    <label className="product-image">Image</label>
                    <label className="product-details">Product</label>
                    <label className="product-price">Price</label>
                    <label className="product-quantity">Quantity</label>
                    <label className="product-removal">Remove</label>
                    <label className="product-line-price">Total</label>
                </div>
                {cart.map(item => (
                <div className="product">
                   
                        <div className="product-image">
                            <img alt="" src={item.image} />
                        </div>
                        <div className="product-details">
                            <div className="product-title">{item.productName}</div>
                            <p className="product-description"> {item.productDetails}</p>
                        </div>
                        <div className="product-price">{item.price}</div>
                        <div className="product-quantity">
                            <input type="number" value={item.quantity} min="1" />
                        </div>
                        <div className="product-removal">
                            <button className="remove-product" onClick={()=>removeItem(item._id)}>
                                Remove
                        </button>
                        </div>
                        <div className="product-line-price">{item.price*item.quantity}</div>
                </div>))}
                <div className="totals">
                    <div className="totals-item">
                        <label>Subtotal</label> 
                        <div className="totals-value" id="cart-subtotal">{SubTotal}</div>
                    </div>
                    <div className="totals-item">
                        <label>Shipping</label>
                        <div className="totals-value" id="cart-shipping">10.00</div>
                    </div>
                    <div className="totals-item totals-item-total">
                        <label>Grand Total</label>
                        <div className="totals-value" id="cart-total">{SubTotal+10}</div>
                    </div>
                </div>

                <button className="checkout" onClick={() => history.push('/checkout',{cart:cart, total:SubTotal}) }>Checkout</button>
            </div>

        </div>
    )
}

export default CartScreen
