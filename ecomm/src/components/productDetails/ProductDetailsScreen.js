import "./ProductDetails.css";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Axios from "axios";
import alertify from "alertifyjs";
import Cookie from "js-cookie";

function ProductDetailsScreen(props) {
  const [count, setcount] = useState(1);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments();
  }, []);

  function getComments() {
    fetch("http://localhost:8080/getcomment/productcomment")
      .then((response) => response.json())
      .then((result) => {
        const comment = result.filter(function (item) {
          return item.productName == props.history.location.state.product.name;
        });
        setComments(comment);
      });
  }
  function onClickAddToCart(product) {
    fetch("http://localhost:8080/getCart/")
      .then((response) => response.json())
      .then((result) => {
        const cart = result.filter(function (item) {
          return (
            item.productName == product.name &&
            item.email == Cookie.get("email")
          );
        });
        if (product.stock == 0) {
          alertify.error("Item out of stock.");
        } else {
          setmodalIsOpen(true);
          if (cart.length != 0) {
            Axios.put("http://localhost:8080/updatecart/", {
              id: cart[0]._id,
              quantity: cart[0].quantity,
            })
              .then((response) => {
                console.log("Response: ", response);
              })
              .catch((err) => {
                console.log("Error: ", err);
              })
              .finally(() => {
                setmodalIsOpen(false);
                alertify.success("Added to Cart!");
              });
          } else {
            Axios.post("http://localhost:8080/setcart/", {
              email: Cookie.get("email"),
              productName: product.name,
              productId: product._id,
              stock: product.stock,
              productDetails: product.description,
              price: product.price * (100 - product.discountRate) / 100,
              quantity: 1,
              image: product.image1,
            })
              .then((response) => {
                console.log("Response: ", response);
              })
              .catch((err) => {
                console.log("Error: ", err);
              })
              .finally(() => {
                setmodalIsOpen(false);
                alertify.success("Added to Cart!");
              });
          }
        }
      });
  }
  return (
    <div>
      <div class="container dark-grey-text mt-5">
        <div class="row wow fadeIn">
          <div class="col-md-6 mb-4">
            <img
              src={props.history.location.state.product.image1}
              class="img-fluid"
              alt=""
            />
          </div>
          <div class="col-md-6 mb-4">
            <div class="p-4">
              <div class="mb-3">
                <a href="">
                  <span class="badge purple mr-1">
                    {props.history.location.state.product.cName}
                  </span>
                </a>
                <a href="">
                  <span class="badge blue mr-1">New</span>
                </a>
                <a href="">
                  <span class="badge red mr-1">Bestseller</span>
                </a>
              </div>

              <p class="lead">
                <span class="mr-1">
                  <del>${props.history.location.state.product.price}</del>
                </span>
                <span>${props.history.location.state.product.price *(100-props.history.location.state.product.discountRate)/100}</span>
              </p>
              <h3>{props.history.location.state.product.name}</h3>
              <hr></hr>
              <p class="lead font-weight-bold">Description</p>

              <p>
                {props.history.location.state.product.description}
              </p>
              <br />
              <button class="btn btn-primary btn-md my-0 p" type="submit" onClick={()=>onClickAddToCart(props.history.location.state.product)}>
                Add to cart
                <i class="fas fa-shopping-cart ml-1"></i>
              </button>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div class="bg-white rounded shadow-sm p-4 mb-4 restaurant-detailed-ratings-and-reviews">
      <div class="container">
        <h5 class="mb-1">All Ratings and Reviews({comments.length})</h5>
       
        <br></br>
        <hr></hr>
        
        {comments.map((comment) => (
        <div class="reviews-members pt-4 pb-4">
          <div class="media">
            <div class="media-body">
              <div class="reviews-members-header">
                <h6 class="mb-1">
                  <p class="text-black">
                    {comment.userName}
                  </p>
                </h6>
                <p class="text-gray">{new Date(comment.createdAt).toDateString()}</p>
              </div>
              <div class="reviews-members-body">
                <p>
                  {comment.comment}
                </p>
              </div>
              <div class="reviews-members-footer">
                <ReactStars
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  edit={false}
                  value={comment.rate}
                />
              </div>
            </div>
          </div>
          <br></br>
          <hr></hr>
        </div>
        ))}
        </div>
      </div>
        
    </div>
  );
}

export default ProductDetailsScreen;
