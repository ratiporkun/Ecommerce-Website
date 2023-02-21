import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
  NavbarText,
} from "reactstrap";
import Cookie from "js-cookie";
import { MDBCol, MDBIcon } from "mdbreact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
function Navi() {
  const history = useHistory();

  const [categories, setCategories] = useState([]);
  const [username, setUsername] = useState(null);
  const [isSalesMan, setisSalesMan] = useState(false);
  const [isProdMan, setisProdMan] = useState(false);
  const [searchStr, setSearchStr] = useState("")
  useEffect(() => {
    getCategories();
    const name = Cookie.get("username");
    const isSalesMan = Cookie.get("isSalesMan");
    const isProdMan = Cookie.get("isProdMan");
    setUsername(name);
    setisSalesMan(isSalesMan);
    setisProdMan(isProdMan);
  }, [username]);

  function onClickLogout() {
    Cookie.remove("username");
    Cookie.remove("email");
    Cookie.remove("id");
    Cookie.remove("isSalesMan");
    Cookie.remove("isProdMan");
  }

  function handleOnSubmit() {
    
  }

  function getCategories() {
    fetch("http://localhost:8080/getCategories/")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  }
  return (
    <Navbar
      style={{ paddingLeft: 0, paddingRight: 0 }}
      color="light"
      light
      expand="md"
    >
      <NavbarBrand href="/">
        <img
          alt=""
          height="75"
          src="https://cdn.discordapp.com/attachments/773948058945585153/788115676706504784/e42203bb-2bb7-4719-b435-23d40e289b1d_200x200.png"
        />
      </NavbarBrand>
      <NavbarToggler />
      <Collapse navbar>
        <Nav className="mr-auto" navbar>
          <UncontrolledDropdown direction="right" nav inNavbar>
            <DropdownToggle nav caret>
              All Categories
            </DropdownToggle>
            <DropdownMenu right>
              {categories.map((category) => (
                <DropdownItem>
                  <div
                    onClick={() => {
                      history.push("/productlist/", { category: category });
                    }}
                  >
                    {category.name}
                  </div>
                </DropdownItem>
              ))}
              <DropdownItem></DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <NavLink style={{ color: "black" }} href="/productlist">
                  View All
                </NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
         
        </Nav>
        <MDBCol md="2">
          <div className="input-group md-form form-sm form-1 pl-0">
            <button style={{border:"none"}} onClick={() => history.push("/productlist/", { searchStr: searchStr })}>
            <div className="input-group-prepend">
              <span className="input-group-text purple lighten-3" id="basic-text1">
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
              </span>
            </div></button>
            <input className="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search"
             onChange={(e)=>{setSearchStr(e.target.value)}} />
          </div>
        </MDBCol>
        {isProdMan == "true" ? (
          <div>
            <NavbarText>
              <NavLink>ProductManager</NavLink>
            </NavbarText>
            <NavbarText>
              <NavLink
                href="/editproducts"
                onClick={() => history.push("/editproducts")}
              >
                Edit Products
              </NavLink>
            </NavbarText>
            <NavbarText>
              <NavLink
                href="/validatecomments"
                onClick={() => history.push("/validatecomments")}
              >
                Validate Comments
              </NavLink>
            </NavbarText>
          </div>
        ) : isSalesMan == "true" ? (
          <div>
            <NavbarText>
              <NavLink>SalesManager</NavLink>
            </NavbarText>
            <NavbarText>
              <NavLink
                href="/newcampaign"
                onClick={() => history.push("/newcampaign")}
              >
                New Campaign
              </NavLink>
            </NavbarText>
            <NavbarText>
              <NavLink
                href="/vieworders"
                onClick={() => history.push("/vieworders")}
              >
                View Invoices
              </NavLink>
            </NavbarText>
          </div>
        ) : username ? (
          <div>
            <NavbarText>
              <NavLink
                href="/myprofile"
                onClick={() => history.push("/myprofile")}
              >
                {username}
              </NavLink>
            </NavbarText>
            <NavbarText>
              <NavLink href="/cart/">Cart</NavLink>
            </NavbarText>
          </div>
        ) : (
                <div>
                  {" "}
                  <NavbarText>
                    <NavLink href="/signin/">Sign In</NavLink>
                  </NavbarText>
                  <NavbarText>
                    <NavLink href="/cart/">Cart</NavLink>
                  </NavbarText>
                </div>
              )}

        {username && (
          <NavbarText onClick={onClickLogout}>
            <NavLink href="/">Log out</NavLink>
          </NavbarText>
        )}
      </Collapse>
    </Navbar>
  );
}

export default Navi;
