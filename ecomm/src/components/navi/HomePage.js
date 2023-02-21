import { React, useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./HomePage.css";
import "../productsList/ProductList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "react-tooltip";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import alertify from "alertifyjs";
import Cookie from "js-cookie";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
    position: "fixed",
  },
};

function HomePage() {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const history = useHistory();

  const [product1, setProduct1] = useState([]);
  const [product2, setProduct2] = useState([]);
  const [product3, setProduct3] = useState([]);

  useEffect(() => {
    getProducts();
    
  }, []);

  function getProducts() {
    fetch("http://localhost:8080/getProducts/")
      .then((response) => response.json())
      .then((result) => {
        const product1 = result.filter(function (item) {
            return parseInt(item.discountRate)  === 20;
          });
          const product2 = result.filter(function (item) {
            return parseInt(item.discountRate) === 30;
          });
          const product3 = result.filter(function (item) {
            return parseInt(item.discountRate) === 50;
          });
          setProduct1(product1);
          setProduct2(product2);
          setProduct3(product3);            
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
              price: product.price,
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
      <br></br>
      <br></br>
      <div className="container">
        <div className="App">
          <AliceCarousel autoPlay autoPlayInterval="2000" style={{}}>
            <img
              src="https://image.freepik.com/free-vector/christmas-sale-banner-with-realistic-presents_1361-2950.jpg"
              className="sliderimg"
              alt=""
            />
            <img
              src="https://image.freepik.com/free-vector/winter-sale-fifty-percent-off-lettering_1262-8082.jpg"
              className="sliderimg"
              alt=""
            />
            <img
              src="https://image.freepik.com/free-vector/realistic-christmas-sale-banner-template_1361-1973.jpg"
              className="sliderimg"
              alt=""
            />
          </AliceCarousel>
          <AliceCarousel autoPlay autoPlayInterval="2000" style={{}}>
            <img
              src="https://image.freepik.com/free-vector/christmas-sale-banner-with-realistic-presents-blue-golden_1361-3105.jpg"
              className="sliderimg"
              alt=""
            />
            <img
              src="https://image.freepik.com/free-vector/vibrant-shiny-christmas-sale-banner-design_1017-16235.jpg?1"
              className="sliderimg"
              alt=""
            />
            <img
              src="https://image.freepik.com/free-vector/winter-christmas-sale-banner-decoration_1017-16606.jpg"
              className="sliderimg"
              alt=""
            />
          </AliceCarousel>
          <h2>
            Discount up to 20%
          </h2>
          <div className="container">
      <div className="row">
        {product1.map((product) => (
          <div className="col-md-3 col-sm-6">
            <div className="product-grid3">
              <div className="product-image3">
                <a href="#">
                  <img className="pic-1" src={product.image1} />
                  <img className="pic-2" src={product.image2} />
                </a>
                <ul className="social">
                  <Tooltip placement="top"></Tooltip>
                  <li>
                    <a
                      onClick={() => {
                        history.push("/productdetails", { product: product });
                      }}
                      data-tip="View"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </a>
                  </li>
                  <li id="carttip">
                    <a
                      onClick={() => onClickAddToCart(product)}
                      data-tip="Add to Cart"
                    >
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </a>
                  </li>
                </ul>
                {/* <span className="product-new-label">New</span> */}
              </div>
              <div className="product-content">
                <div className="price">
                  ${product.price * (100-product.discountRate)/100}
                  <span>${product.price}</span>
                </div>
                <ul className="rating">
                  <li className="fa fa-star"></li>
                  <li className="fa fa-star"></li>
                  <li className="fa fa-star"></li>
                  <li className="fa fa-star disable"></li>
                  <li className="fa fa-star disable"></li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
          <h2 >Discount up to 30%</h2>

          <div className="container">
      <div className="row">
        {product2.map((product) => (
          <div className="col-md-3 col-sm-6">
            <div className="product-grid3">
              <div className="product-image3">
                <a href="#">
                  <img className="pic-1" src={product.image1} />
                  <img className="pic-2" src={product.image2} />
                </a>
                <ul className="social">
                  <Tooltip placement="top"></Tooltip>
                  <li>
                    <a
                      onClick={() => {
                        history.push("/productdetails", { product: product });
                      }}
                      data-tip="View"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </a>
                  </li>
                  <li id="carttip">
                    <a
                      onClick={() => onClickAddToCart(product)}
                      data-tip="Add to Cart"
                    >
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </a>
                  </li>
                </ul>
                {/* <span className="product-new-label">New</span> */}
              </div>
              <div className="product-content">
                <div className="price">
                  ${product.price * (100-product.discountRate)/100}
                  <span>${product.price}</span>
                </div>
                <ul className="rating">
                  <li className="fa fa-star"></li>
                  <li className="fa fa-star"></li>
                  <li className="fa fa-star"></li>
                  <li className="fa fa-star disable"></li>
                  <li className="fa fa-star disable"></li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
          <h2>Discount up to 50%</h2>
          <div className="container">
            <div className="row">
              {product3.map((product) => (
                <div className="col-md-3 col-sm-6">
                  <div className="product-grid3">
                    <div className="product-image3">
                      <a href="#">
                        <img className="pic-1" src={product.image1} />
                        <img className="pic-2" src={product.image2} />
                      </a>
                      <ul className="social">
                        <Tooltip placement="top"></Tooltip>
                        <li>
                          <a
                            onClick={() => {
                              history.push("/productdetails", {
                                product: product,
                              });
                            }}
                            data-tip="View"
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </a>
                        </li>
                        <li id="carttip">
                          <a
                            onClick={() => onClickAddToCart(product)}
                            data-tip="Add to Cart"
                          >
                            <FontAwesomeIcon icon={faShoppingCart} />
                          </a>
                        </li>
                      </ul>
                      {/* <span className="product-new-label">New</span> */}
                    </div>
                    <div className="product-content">
                      <div className="price">
                        ${(product.price * (100 - product.discountRate)) / 100}
                        <span>${product.price}</span>
                      </div>
                      <ul className="rating">
                        <li className="fa fa-star"></li>
                        <li className="fa fa-star"></li>
                        <li className="fa fa-star"></li>
                        <li className="fa fa-star disable"></li>
                        <li className="fa fa-star disable"></li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Modal
              isOpen={modalIsOpen}
              style={customStyles}
              contentLabel="Example Modal"
            >
              Loading...
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;