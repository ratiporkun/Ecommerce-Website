import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import alertify from "alertifyjs";

function NewCampaign() {
  const [discountRate, setdiscountRate] = useState(0);
  const [productId, setproductId] = useState("");
  const [products, setProducts] = useState([]);
  


  function getProducts() {
    fetch("http://localhost:8080/getProducts/")
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
      });
  }
  useEffect(() => {
    getProducts();
  }, []);

  function handleOnChange(e) {
    let item = products.filter(
      (product) => product.name === e.target.value
    );
    setdiscountRate(item[0].discountRate)
    setproductId(item[0]._id);
    console.log(e.target.value);
    console.log(e);
  }

  function onClickEditProduct() {
    Axios.put("http://localhost:8080/updatediscount/", {
      id: productId,
      discountRate: discountRate,
    });
    alertify.success("Successfully updated product!");
    window.location.reload(false);
  }

  return (
    <div>
      <div class="container">
        <Form>
          <select onChange={handleOnChange} id="select_id" class="select-css">
              <option disabled selected>Select a product</option>
            {products.map((product) => (
              <option value={product.name}>{product.name}</option>
            ))}
          </select>
          <FormGroup>
            <Label for="Discount Rate">Discount Rate</Label>
            <Input
              onChange={(event) => setdiscountRate(event.target.value)}
              type="number"
              name="discount"
              id="exampleEmail"
              placeholder={discountRate}
            />
          </FormGroup>
          <Button onClick={() => onClickEditProduct()}>Update Product</Button>
        </Form>
      </div>
    </div>
  );
}

export default NewCampaign;