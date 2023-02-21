import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import alertify from "alertifyjs";
import Axios from "axios";
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

function ViewOrders() {

    const [orders, setOrders] = useState([])
    const [adress, setAdress] = useState("")
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null)
    useEffect(() => {
        fetch("http://localhost:8080/getpurchase/vieworders")
            .then((response) => response.json())
            .then((result) => {
                setOrders(result)
            });

    }, []);

    function onClickDelete(id) {
        Axios.put("http://localhost:8080/deletepurchase/", {
            id: id,
        });
        window.location.reload(false);
    }

    function handleOnChange(e, id, email) {
        Axios.put("http://localhost:8080/updatestatus/", {
            id: id,
            email: email,
            status: e.target.value
        });
        alertify.success("Successfully changed the status!")
        window.location.reload(false);
    }

    function onClickUpdateAdress() {
        Axios.put("http://localhost:8080/updatepurchase/", {
            id: selectedOrderId,
            adress: adress
        });
        alertify.success('Succesfully updated adress!')
        setmodalIsOpen(false);
        setSelectedOrderId(null)
        window.location.reload(false);
    }

    function updateAdress() {
        return (
            <div>
                <FormGroup>
                    <Label for="Name">Update Adress</Label>
                    <Input type="textarea" name="text" id="exampleText"
                        onChange={(event) => setAdress(event.target.value)}
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
                <Button onClick={() => onClickUpdateAdress()}>Submit</Button>
                <Button onClick={() => setmodalIsOpen(false)}>Close</Button>
            </div>
        );
    }

    return (
        <div>
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
                                                            {order.status == "Order recieved" &&
                                                                <div>
                                                                    <Button style={{ float: "right" }} outline color="danger" onClick={() => onClickDelete(order._id)}>Delete</Button>

                                                                    <Button style={{ float: "right" }} outline onClick={() => {
                                                                        setSelectedOrderId(order._id)
                                                                        setmodalIsOpen(true)}}>Update Adress</Button>
                                                                    <Modal
                                                                        isOpen={modalIsOpen}
                                                                        style={customStyles}
                                                                        contentLabel="Example Modal"
                                                                    >
                                                                        {updateAdress()}
                                                                    </Modal>
                                                                </div>}

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
                                                                        item.productQuantity}{" "}</p>))}
                                                            <hr />
                                                            <div class="float-right">
                                                                <span class="float-right text-info">
                                                                    {order.status == "Order recieved" ?
                                                                        <select onChange={(e) => handleOnChange(e, order._id, order.email)} id="select_id" class="select-css">
                                                                            <option>{order.status}</option>
                                                                            <option>On Delivery</option>
                                                                            <option>Delivered</option>
                                                                        </select> : order.status == "On Delivery" ?
                                                                            <select onChange={(e) => handleOnChange(e, order._id, order.email)} id="select_id" class="select-css">
                                                                                <option>{order.status}</option>
                                                                                <option>Delivered</option>
                                                                            </select> : <div class="float-right">
                                                                                <span class="float-right text-info">
                                                                                    {order.status}
                                                                                    <i class="icofont-check-circled text-success"></i>
                                                                                </span>
                                                                            </div>}


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
        </div>
    )
}

export default ViewOrders
