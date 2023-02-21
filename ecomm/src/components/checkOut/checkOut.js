import React, { useEffect, useState } from "react";
import "./checkOut.css";
import Cookie from "js-cookie";
import alertify from "alertifyjs";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function CheckOut(props) {
  const [username, setUsername] = useState(null);
  const [creditcard, setCreditcard] = useState(null);
  const [expdate, setexpdate] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [adress, setAdress] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [zip, setZip] = useState(null);
  const [expDateStr, setExpDateStr] = useState("")
  const history = useHistory();

  useEffect(() => {
    const name = Cookie.get("username");
    setUsername(name);
  }, []);

  function onClickCheckout() {
    var itemss = [];
    console.log(expdate)
    for (var i = 0; i < props.history.location.state.cart.length; i++) {
      itemss.push({
        productName: props.history.location.state.cart[i].productName,
        productQuantity: props.history.location.state.cart[i].quantity,
        productPrice: props.history.location.state.cart[i].price,
        productId: props.history.location.state.cart[i].productId,
        stock: props.history.location.state.cart[i].stock
      });
    }
    if (adress == null || adress.length == 0) {
      alertify.error("Adress field is required");
    } else if (country == null || country.length == 0) {
      alertify.error("Country field is required");
    } else if (city == null || city.length == 0) {
      alertify.error("City field is required");
    } else if (zip == null || zip.length != 5) {
      alertify.error("Zip must be length of 5");
    } else if (creditcard == null || creditcard.length != 16) {
      alertify.error("Credit card must be length of 16");
    } else if (expdate == null || expDateStr.length != 5) {
      alertify.error("Expiration date must be length of 4");
    } else if (cvv == null || cvv.length != 3) {
      alertify.error("Cvv must be length of 3");
    } else {
      alertify.success("Purchase Completed!");
      
      const status = "Order recieved";
      Axios.post("http://localhost:8080/postpurchase/", {
        id: Cookie.get("id"),
        email: Cookie.get("email"),
        adress: adress,
        country: country,
        state: city,
        zip: zip,
        nameOnCard: Cookie.get("username"),
        creditcard: creditcard,
        expDate: expdate,
        cvv: cvv,
        items: itemss,
        subTotal: props.history.location.state.total,
        status: status,
      });
      Axios.put("http://localhost:8080/afterCheckout/", {
        email: Cookie.get("email"),
      });
      for(var i = 0; i<itemss.length; i++){
        Axios.put("http://localhost:8080/updateStock/", {
          id:itemss[i].productId,
          decrease:itemss[i].productQuantity,
          stock:itemss[i].stock
        });
      }
      history.push("/")
    }
  }
  return (
    <div>
      {username ? (
        <div>
          <div class="container wow fadeIn">
            <div class="row">
              <div class="col-md-8 mb-4">
                <div class="card">
                  <form class="card-body">
                    <div class="md-form mb-5">
                      <input
                        type="text"
                        id="address"
                        class="form-control"
                        placeholder="1234 Main St"
                        onChange={(e) => {
                          setAdress(e.target.value);
                        }}
                      />
                      <label for="address" class="">
                        Address
                      </label>
                    </div>
                    <div class="row">
                      <div class="col-lg-4 col-md-12 mb-4">
                        <label for="country">Country</label>
                        <input
                          type="text"
                          id="country"
                          class="form-control"
                          placeholder="Country"
                          onChange={(e) => {
                            setCountry(e.target.value);
                          }}
                        />
                        <div class="invalid-feedback">
                          Please select a valid country.
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-6 mb-4">
                        <label for="state">State</label>
                        <input
                          type="text"
                          id="City"
                          class="form-control"
                          placeholder="City"
                          onChange={(e) => {
                            setCity(e.target.value);
                          }}
                        />
                        <div class="invalid-feedback">
                          Please provide a valid state.
                        </div>
                      </div>

                      <div class="col-lg-4 col-md-6 mb-4">
                        <label for="zip">Zip</label>
                        <input
                          type="number"
                          class="form-control"
                          id="zip"
                          placeholder=""
                          onChange={(e) => {
                            setZip(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <hr />

                    <hr />

                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label for="cc-name">Name on card</label>
                        <input
                          type="text"
                          class="form-control"
                          id="cc-name"
                          placeholder=""
                        />
                        <small class="text-muted">
                          Full name as displayed on card
                        </small>
                      </div>
                      <div class="col-md-6 mb-3">
                        <label for="cc-number">Credit card number</label>
                        <input
                          type="number"
                          class="form-control"
                          id="cc-number"
                          placeholder=""
                          onChange={(e) => {
                            setCreditcard(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3 mb-3">
                        <label for="cc-expiration">Expiration</label>
                        <input
                          type="text"
                          class="form-control"
                          id="cc-expiration"
                          placeholder="MM/YY"
                          value={expDateStr}
                          onChange={(e) => {
                            if(e.target.value.length===4){
                              let text = e.target.value.substring(0,2)+"/"+e.target.value.substring(2)
                              setExpDateStr(text)
                            }else{
                              setExpDateStr(e.target.value)
                            }
                            setexpdate(parseInt(e.target.value));
                          }}
                        />
                      </div>
                      <div class="col-md-3 mb-3">
                        <label for="cc-expiration">CVV</label>
                        <input
                          type="number"
                          class="form-control"
                          id="cc-cvv"
                          placeholder=""
                          onChange={(e) => {
                            setCvv(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <hr class="mb-4" />
                    <button
                      class="btn btn-primary btn-lg btn-block"
                      type="button"
                      onClick={()=>onClickCheckout()}
                    >
                      Continue to checkout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div class="container wow fadeIn">
            <div class="row">
              <div class="col-md-8 mb-4">
                <div class="card">
                  <form class="card-body">
                    <div class="row">
                      <div class="col-md-6 mb-2">
                        <div class="md-form ">
                          <input
                            type="text"
                            id="firstName"
                            class="form-control"
                          />
                          <label for="firstName" class="">
                            First name
                          </label>
                        </div>
                      </div>
                      <div class="col-md-6 mb-2">
                        <div class="md-form">
                          <input
                            type="text"
                            id="lastName"
                            class="form-control"
                          />
                          <label for="lastName" class="">
                            Last name
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="md-form mb-5">
                      <input
                        type="text"
                        id="email"
                        class="form-control"
                        placeholder="youremail@example.com"
                      />
                      <label for="email" class="">
                        Email (optional)
                      </label>
                    </div>
                    <div class="md-form mb-5">
                      <input
                        type="text"
                        id="address"
                        class="form-control"
                        placeholder="1234 Main St"
                      />
                      <label for="address" class="">
                        Address
                      </label>
                    </div>
                    <div class="row">
                      <div class="col-lg-4 col-md-12 mb-4">
                        <label for="country">Country</label>
                      </div>
                      <div class="col-lg-4 col-md-6 mb-4">
                        <label for="state">State</label>
                      </div>
                      <div class="col-lg-4 col-md-6 mb-4">
                        <label for="zip">Zip</label>
                        <input
                          type="text"
                          class="form-control"
                          id="zip"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <hr />
                    <hr />
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label for="cc-name">Name on card</label>
                        <input
                          type="text"
                          class="form-control"
                          id="cc-name"
                          placeholder=""
                        />
                        <small class="text-muted">
                          Full name as displayed on card
                        </small>
                      </div>
                      <div class="col-md-6 mb-3">
                        <label for="cc-number">Credit card number</label>
                        <input
                          type="text"
                          class="form-control"
                          id="cc-number"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3 mb-3">
                        <label for="cc-expiration">Expiration</label>
                        <input
                          type="text"
                          class="form-control"
                          id="cc-expiration"
                          placeholder=""
                        />
                      </div>
                      <div class="col-md-3 mb-3">
                        <label for="cc-expiration">CVV</label>
                        <input
                          type="text"
                          class="form-control"
                          id="cc-cvv"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <hr class="mb-4" />
                    <button
                      class="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Continue to checkout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
