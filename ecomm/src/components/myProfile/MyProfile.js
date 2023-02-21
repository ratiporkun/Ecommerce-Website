import React, { useState, useEffect } from "react";
import "./myProfile.css";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Cookie from "js-cookie";
import Axios from "axios";
import Modal from "react-modal";
import ReactStars from "react-rating-stars-component";
import alertify from "alertifyjs";


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

function MyProfile(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newPass, setNewPass] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");

  function onClickUpdatePass() {
    Axios.put("http://localhost:8080/updatepass/", {
      id: Cookie.get("id"),
      password: newPass,
    });
  }

  function onClickUpdateEmail() {
    Axios.put("http://localhost:8080/updatemail/", {
      id: Cookie.get("id"),
      email: newEmail,
    });
    Cookie.set("email", newEmail);
  }

  useEffect(() => {
    fetch("http://localhost:8080/getpurchase/" + Cookie.get("id"))
      .then((response) => response.json())
      .then((result) => {
        setOrders(result);
        console.log(result);
      });

    console.log(orders);
  }, []);

  function renderProfile() {
    return (
      <div className="renders">
        <Form>
          <FormGroup>
            <Label for="E-mail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder={Cookie.get("email")}
              onChange={(event) => setNewEmail(event.target.value)}
            />
          </FormGroup>
          <Button onClick={() => onClickUpdateEmail()}>Submit</Button>
          <FormGroup>
            <Label for="Password">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Password"
              onChange={(event) => setNewPass(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Re-password">Re-password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Re-password"
            />
          </FormGroup>
          <Button onClick={() => onClickUpdatePass()}>Submit</Button>
        </Form>
      </div>
    );
  }
  const ratingChanged = (newRating) => {
    setRate(newRating);
  };
  function onClickSubmitComment(pName) {
    Axios.post("http://localhost:8080/addcomment/", {
      userName: Cookie.get("username"),
      productName: pName,
      rate: rate,
      userComment: comment,
    });
    alertify.success('Succesfully Rated!')
    setmodalIsOpen(false);

  }
  function CommentandRate(pName) {
    return (
      <div>
        <FormGroup>
          <Label for="Name">Comment</Label>
          <Input type="textarea" name="text" id="exampleText"
            onChange={(event) => setComment(event.target.value)}
            style={{
              verticalAlign: "top",
              textAlign: "top",
              width: "300px",
              height: "150px",
            }}
            placeholder=""
          />
        </FormGroup>
        <br></br>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
        />
        <Button onClick={() => onClickSubmitComment(pName)}>Submit</Button>
        <Button onClick={() => setmodalIsOpen(false)}>Close</Button>
      </div>
    );
  }

  function renderOrders() {
    return (
      <div className="renders">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="osahan-account-page-right shadow-sm bg-white p-4 h-100">
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane  fade  active show"
                    id="orders"
                    role="tabpanel"
                    aria-labelledby="orders-tab"
                  >
                    <h4 class="font-weight-bold mt-0 mb-4">Past Orders</h4>
                    {orders.map((order) => (
                      <div class="bg-white card mb-4 order-list shadow-sm">
                        <div class="gold-members p-4">
                          <div class="media">
                            <div class="media-body">
                              <h6 class="mb-2">
                                <a href="#"></a>
                                <a href="#" class="text-black">
                                  Akelyos
                                </a>
                              </h6>
                              <p class="text-gray mb-1">
                                <i class="icofont-location-arrow"></i>{" "}
                                <h4>
                                  {order.adress +
                                    ", " +
                                    order.state +
                                    ", " +
                                    order.country}
                                </h4>
                              </p>
                              <p class="text-gray mb-3">
                                <i class="icofont-list"></i> ORDER #{order._id}{" "}
                                <i class="icofont-clock-time ml-2"></i>{" "}
                              </p>
                              {order.items.map((item) => (
                                <p class="text-dark">
                                  {item.productName +
                                    " x " +
                                    item.productQuantity}{" "}

                                  <Button outline onClick={() => setmodalIsOpen(true)}>
                                    Comment and Rate
                                  </Button>
                                  <Modal
                                    isOpen={modalIsOpen}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                  >
                                    {CommentandRate(item.productName)}
                                  </Modal>{" "}
                                </p>
                              ))}
                              <hr />
                              <div class="float-right">
                                <span class="float-right text-info">
                                  {order.status}
                                  <i class="icofont-check-circled text-success"></i>
                                </span>
                              </div>
                              <p class="mb-0 text-black text-primary pt-2">
                                <span class="text-black font-weight-bold">
                                  {" "}
                                  Total Paid:
                                </span>
                                ${order.subTotal} + $10 Shipping
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderX() {
    if (currentIndex === 0) return renderProfile();
    else return renderOrders();
  }

  return (
    <div>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div class="container">
        <div class="view-account">
          <section class="module">
            <div class="module-inner">
              <div class="side-bar col-md-3 col-sm-6">
                <div class="user-info">
                  <img
                    class="img-profile img-circle img-responsive center-block"
                    src="https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png"
                    alt=""
                  />
                  <ul class="meta list list-unstyled">
                    <li class="name">{Cookie.get("username")}</li>
                  </ul>
                </div>
                <nav class="side-menu">
                  <ul class="nav">
                    <li>
                      <a href="#" onClick={() => setCurrentIndex(0)}>
                        <span class="fa fa-user"></span> Profile
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={() => setCurrentIndex(2)}>
                        <span class="fa fa-credit-card"></span> Orders
                      </a>
                    </li>
                    <li></li>
                  </ul>
                </nav>
              </div>
            </div>
          </section>
        </div>
        {renderX()}
      </div>
    </div>
  );
}

export default MyProfile;
