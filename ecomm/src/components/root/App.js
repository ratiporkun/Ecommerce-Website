import React from 'react';
import Homepage from "../navi/HomePage"
import { Route } from 'react-router-dom'; 
import { Container } from "reactstrap";
import ProductList from "../productsList/ProductList";
import SignInPage from "../loginRegister/SignInPage";
import Navi from "../navi/Navi";
import { BrowserRouter as Router } from "react-router-dom";
import CartScreen from '../../cart/CartScreen';
import ProductDetailsScreen from '../productDetails/ProductDetailsScreen';
import myProfile from '../myProfile/MyProfile';
import checkOut from '../checkOut/checkOut';
import editProducts from '../productManager/editProducts';
import validateComments from '../productManager/validateComments';
import viewOrders from '../salesManager/viewOrders';
import newCampaign from '../salesManager/newCampaign';

function App() {
  return (
       
      <Router>
      <div>
      <Navi/>
      <Route path="/" exact component={Homepage} />
      <Route path="/productlist"  component={ProductList} />
      <Route path="/editproducts"  component={editProducts} />
      <Route path="/validatecomments"  component={validateComments} />
      <Route path="/checkout"  component={checkOut} />
      <Route path="/signin/"  component={SignInPage} />
      <Route path="/cart"  component={CartScreen} />
      <Route path="/productdetails"  component={ProductDetailsScreen} />
      <Route path="/myprofile"  component={myProfile} />
      <Route path="/vieworders"  component={viewOrders} />
      <Route path="/newcampaign"  component={newCampaign} />
      </div>
      </Router>  
  );
}

export default App;
