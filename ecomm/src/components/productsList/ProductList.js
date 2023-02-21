import React, { Component, useEffect, useState } from "react";
import "./ProductList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faShoppingCart, faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "react-tooltip";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import alertify from "alertifyjs";
import Cookie from "js-cookie";
import Modal from "react-modal";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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
function ProductList(props) {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const history = useHistory();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (props.history.location.state && props.history.location.state.searchStr) {
      console.log(props.history.location.state.searchStr)
      getSearchedProducts(props.history.location.state.searchStr)
    } else if (props.history.location.state && props.history.location.state.category) {
      let newcategory = props.history.location.state.category;
      getProducts(newcategory.name);
    } else {
      getProducts();
    }
  }, [props.history.location.state]);

  function getSearchedProducts(searchStr) {
    fetch("http://localhost:8080/getProducts/")
      .then((response) => response.json())
      .then((result) => {
        var product = result
        var searchArr = searchStr.split(" ")
        searchArr.forEach(element => {
          product = product.filter(function (item) {
            return item.description.includes(element);
          });
        });
        
        setProducts(product);
      });
  }

  function getProducts(categoryName) {
    fetch("http://localhost:8080/getProducts/")
      .then((response) => response.json())
      .then((result) => {
        if (categoryName) {
          console.log(categoryName);
          const product = result.filter(function (item) {
            return item.cName == categoryName;
          });
          setProducts(product);
        } else {
          setProducts(result);
        }
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
  function handleClickBrand(brand) {
    if (checkNike === true) {
      setCheckNike(false)
      const product = products.filter(function (item) {
        return item.brand === brand;
      })
      setProducts(product)
    }
    else {
      setCheckNike(true)
      getProducts()
    }

  }
  function handleClickGender(gender) {
    if (checkNike === true) {
      setCheckNike(false)
      const product = products.filter(function (item) {
        return item.gender === gender;
      })
      setProducts(product)
    }
    else {
      setCheckNike(true)
      getProducts()
    }

  }
  function onClickAscending() {
    const sorted = products.sort((a, b) => b["price"] * (100 - b["discountRate"]) / 100 - a["price"] * (100 - a["discountRate"]) / 100);
    setProducts(sorted)
  }
  function onClickDescending() {
    const sorted = products.sort((a, b) => a["price"] * (100 - a["discountRate"]) / 100 - b["price"] * (100 - b["discountRate"]) / 100);
    setProducts(sorted)
  }
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [checkNike, setCheckNike] = useState(true)
  const toggle = () => setDropdownOpen(prevState => !prevState);
  return (

    <div className="row">
      <div className="col-md-3" style={{ marginTop: "50px" }}>
        <div class="container" >
          <div >
            <h3 class="grid-title"><FontAwesomeIcon icon={faSort} /> Sort by</h3>
            <Dropdown  isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Price</DropdownItem>
                <DropdownItem onClick={() => onClickDescending()}>Ascending</DropdownItem>
                <DropdownItem onClick={() => onClickAscending()}>Descending</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <hr />
            <h3 class="grid-title"><FontAwesomeIcon icon={faFilter} /> Filters</h3>
            <hr />
            <h5>By category:</h5>
            <div class="checkbox">
              <label><input type="checkbox" class="icheck" onClick={(e) => handleClickBrand("niqe")} /> Nike</label>
            </div>
            <div class="checkbox">
              <label><input type="checkbox" class="icheck" onClick={(e) => handleClickBrand("adibas")} /> Adibas</label>
            </div>
            <div class="checkbox">
              <label><input type="checkbox" class="icheck" onClick={(e) => handleClickBrand("pierre mardin")} /> Pierre Mardin</label>
            </div>
            <div class="checkbox">
              <label><input type="checkbox" class="icheck" onClick={(e) => handleClickBrand("mc waikiki")} /> Mc Waikiki </label>
            </div>
            <h5>By gender:</h5>
            <div class="checkbox">
              <label><input type="checkbox" class="icheck" onClick={(e) => handleClickGender("male")} /> Male</label>
            </div>
            <div class="checkbox">
              <label><input type="checkbox" class="icheck" onClick={(e) => handleClickGender("female")} /> Female</label>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-9">
        <div className="row">


          {products.map((product) => (
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
                  <h3 className="title">
                    <a href="#">{props.currentCategory} </a>
                  </h3>
                  <div className="price">
                    ${product.price * (100 - product.discountRate) / 100}
                    {product.discountRate != 0 &&
                      <span>${product.price}</span>}

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
          ))}</div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal">
        Loading...
      </Modal>
    </div>
  );
}

export default ProductList;
