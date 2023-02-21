import React, { useState, useEffect } from 'react';
import './editproducts.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Axios from 'axios'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import { event } from 'jquery';
import e from 'cors';
import alertify from "alertifyjs";
import { faMale } from '@fortawesome/free-solid-svg-icons';

function EditProducts() {

    const [cName, setCName] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [rating, setRating] = useState(0)
    const [image1, setİmage1] = useState("")
    const [image2, setİmage2] = useState("")
    const [description, setDescription] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [gender, setGender] = useState("")
    const [brand, setBrand] = useState("")

    const [currproduct, setCurrproduct] = useState([])
    const [currproductName, setCurrproductName] = useState("")
    const [currproductPrice, setCurrproductPrice] = useState(0)
    const [currproductStock, setCurrproductStock] = useState(0)
    const [currproductDescription, setCurrproductDescription] = useState("")
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("")

    function getProducts() {
        fetch('http://localhost:8080/getProducts/')
            .then(response => response.json())
            .then(result => {
                setProducts(result);
            });
    }
    useEffect(() => {
        getProducts()
        getCategories()
    }, [])

    function renderX() {
        if (currentIndex === 0)
            return renderAdd();
        else if (currentIndex === 1)
            return renderEdit();
        else
            return renderDelete();
    }
    function onClickEditProduct() {
        Axios.put("http://localhost:8080/productmanager/updateproduct", {
            id: currproduct._id,
            name: currproductName,
            price: currproductPrice,
            stock: currproductStock,
            description: currproductDescription,
        })
        alertify.success("Successfully updated product!")
        window.location.reload(false);
    }


    function onClickAddProduct() {
        if (categoryName.length == 0 || categoryName==null) {
            alertify.error('Product name can not be empty!')
        }else if (name.length == 0) {
            alertify.error('Product name can not be empty!')
        } else if (gender.length == 0) {
            alertify.error('You must select a gender!')
        } else if (brand.length == 0) {
            alertify.error('You must select a brand!')
        }  else if (price == 0) {
            alertify.error('Price can not be empty!')
        } else if (stock == 0) {
            alertify.error('Stock can not be empty!')
        }else if (rating == 0) {
            alertify.error('Rating can not be empty!')
        } else if (image1.length == 0) {
            alertify.error('Image1 can not be empty!')
        } else if (image2.length == 0) {
            alertify.error('Image2 can not be empty!')
        } else if (description.length == 0) {
            alertify.error('Description can not be empty!')
        } else {
            Axios.post('http://localhost:8080/productmanager/addproduct', {
                cName: categoryName,
                name: name,
                price: price,
                gender: gender,
                brand: brand,
                stock: stock,
                rating: rating,
                image1: image1,
                image2: image2,
                description: description
            });
            alertify.success("Successfully added product!")
            window.location.reload(false);
        }
    }
    function onClickDeleteProduct() {
        Axios.put("http://localhost:8080/productmanager/deleteproduct", {
            id: currproduct._id,
        });
        alertify.success("Successfully deleted product!")
        window.location.reload(false);
    }
    function getCategories() {
        fetch("http://localhost:8080/getCategories/")
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            });
    }
    function handleOnChangeGender(e) {
        let gender = e.target.value
        setGender(gender)
    }
    function handleOnChangeBrand(e) {
        let brand = e.target.value
        setBrand(brand)
    }
    function renderAdd() {
        return <div>
            <Form>
                <FormGroup>
                    <Label for="Category Name">Category Name</Label>
                    <select onChange={handleOnChange2} id="select_id" class="select-css">
                        {categories.map((category) => (<option value={category.name}>{category.name}</option>))}
                    </select>
                </FormGroup>
                <FormGroup>
                    <Label for="Product Name">Product Name</Label>
                    <Input type="text" placeholder="Product Name"
                        onChange={(event) => setName(event.target.value)} />
                </FormGroup>
                <Label for="Category Name">Gender</Label>
                <select onChange={handleOnChangeGender} id="select_id" class="select-css">
                    <option disabled selected>Please select gender</option>
                    <option>male</option>
                    <option>female</option>
                </select>
                <Label for="Category Name">Brand</Label>
                <select onChange={handleOnChangeBrand} id="select_id" class="select-css">
                    <option disabled selected>Please select brand</option>
                    <option>niqe</option>
                    <option>mc waikiki</option>
                    <option>pierre mardin</option>
                    <option>adibas</option>
                </select>
                <FormGroup>
                    <Label for="Price">Price</Label>
                    <Input type="number" placeholder="Price"
                        onChange={(event) => setPrice(event.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="Stock">Stock</Label>
                    <Input type="number" placeholder="Stock"
                        onChange={(event) => setStock(event.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="Rating">Rating</Label>
                    <Input type="number" placeholder="Rating"
                        onChange={(event) => setRating(event.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="Image 1">Image 1</Label>
                    <Input type="text" placeholder="Image 1"
                        onChange={(event) => setİmage1(event.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="Image 2">Image 2</Label>
                    <Input type="text" placeholder="Image 2"
                        onChange={(event) => setİmage2(event.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="Description">Description</Label>
                    <Input type="text" placeholder="Description"
                        onChange={(event) => setDescription(event.target.value)} />
                </FormGroup>
                <Button onClick={onClickAddProduct}>Add Product</Button>
            </Form>
        </div>
    }
    function handleOnChange(e) {
        let item = products.filter(product => product.name === e.target.value)
        setCurrproduct(item[0])
        setCurrproductName(item[0].name)
        setCurrproductPrice(item[0].price)
        setCurrproductStock(item[0].stock)
        setCurrproductDescription(item[0].description)
        console.log(e.target.value)
        console.log(e)
    }
    function handleOnChange2(e) {
        let item = categories.filter(category => category.name === e.target.value)
        setCategoryName(item[0].name)
    }

    function renderEdit() {
        return <div>

            <Form>
                <select onChange={handleOnChange} id="select_id" class="select-css">
                    {products.map(product => (<option value={product.name}>{product.name}</option>))}
                </select>
                <FormGroup>
                    <Label for="Name">Name</Label>
                    <Input onChange={(event) => setCurrproductName(event.target.value)}
                        type="text" name="name" id="exampleEmail" placeholder={currproduct.name}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="Stock">Stock</Label>
                    <Input onChange={(event) => setCurrproductStock(event.target.value)}
                        type="number" name="stock" id="examplePassword" placeholder={currproduct.stock}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="Description">Description</Label>
                    <Input onChange={(event) => setCurrproductDescription(event.target.value)}
                        type="text" name="description" id="examplePassword" placeholder={currproduct.description} />
                </FormGroup>
                <FormGroup>
                    <Label for="Price">Price</Label>
                    <Input onChange={(event) => setCurrproductPrice(event.target.value)}
                        type="number" name="price" id="examplePassword" placeholder={currproduct.price} />
                </FormGroup>
                <Button onClick={() => onClickEditProduct()}>Update Product</Button>
            </Form>
        </div>
    }
    function renderDelete() {
        return <div>
            <Form>
                <select onChange={handleOnChange} id="select_id" class="select-css">
                    {products.map(product => (<option value={product.name}>{product.name}</option>))}
                </select>
                <br></br>
                <Button onClick={() => onClickDeleteProduct()}>Delete Product</Button>
            </Form>
        </div>
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

                            <nav class="side-menu">
                                <ul class="nav">
                                    <li class="col-md-2">
                                        <a onClick={() => setCurrentIndex(0)}>
                                            <span class="fa fa-plus-square"></span> Add Product
                                            </a>
                                    </li>
                                    <li class="col-md-2" >
                                        <a onClick={() => setCurrentIndex(1)}>
                                            <span class="fa fa-cog"></span> Edit Product
                                            </a>
                                    </li>
                                    <li class="col-md-2" >
                                        <a onClick={() => setCurrentIndex(2)}>
                                            <span class="fa fa-trash"></span> Delete Product
                                            </a>
                                    </li>
                                    <li>
                                    </li>
                                </ul>
                            </nav>


                        </div>
                    </section>
                </div>
                {renderX()}
            </div>
        </div>
    )
}

export default EditProducts