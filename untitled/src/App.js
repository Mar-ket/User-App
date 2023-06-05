import React from 'react';
import './App.css';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {Home} from "./pages/Home";
import {Products} from "./pages/Products";
import {Product} from "./pages/Product";
import {NewProduct} from "./pages/NewProduct";
import {NotFound} from "./pages/NotFound";
import {NavBarTop} from "./components/NavbarTop";
import {Account} from "./pages/Account";
import {Login} from "./pages/Login";
import {Cart} from "./pages/Cart";
import {ProductAdmin} from "./pages/ProductAdmin";
import {Signup} from "./pages/SignUp";
import Protected from "./components/Protected";
import axios from "axios";
import {SuccessPage} from "./pages/SuccessPage";
import {FailedPage} from "./pages/FailedPage";
import Ads from "./pages/Ads";
import CreateAd from './pages/CreateAd';
import DisplayAds from './pages/DisplayAds';

function App() {
    const navigate = useNavigate();

    const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (<Route
        {...rest}
        render={props => isAuthenticated ? (<Component {...props} />) : (
            <Navigate to="/login" replace={true} state={{from: props.location}}/>)}
    />);
    const isAdmin = () => {
        axios.get(`http://localhost:8000/entities/entity/externalId${JSON.parse(localStorage.getItem("user"))["id"]}`)

    };

    return (<>
        <NavBarTop/>
        <div className="app-container"> 
            
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Signup/>}></Route>
                <Route path="/products" element={<Products/>}></Route>
                <Route path="/products/:id" element={<Product/>}></Route>
                <Route path="/products/new" element={<NewProduct/>}></Route>
                <Route path="/account" element={<Account/>}></Route>
                <Route path="/cart" element={<Cart/>}></Route>
                <Route path="/successPage" element={<SuccessPage/>}></Route>
                <Route path="/createAd" element={<CreateAd/>}></Route>
                <Route path="/allAds" element={<DisplayAds/>}></Route>
                <Route path="/failedPage" element={<FailedPage/>}></Route>
                <Route path={"/productadmin/:id"} element={<Protected isLoggedIn={isAdmin}>
                    <ProductAdmin/>
                </Protected>}>
                </Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
            <Ads />
        </div>
    </>);
}

export default App;
