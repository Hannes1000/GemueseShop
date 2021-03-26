import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import AddProductPage from "./views/AddProductPage/AddProductPage"
import ProductViewPage from "./views/ProductViewPage/ProductViewPage"
import ProductEditAllPage from "./views/ProductEditPage/ProductEditAllPage/ProductEditAllPage"
import ProductEditPage from "./views/ProductEditPage/ProductEditPage"
import EmailSendingPage from "./views/EmailsendingPage/emailsendingPage"

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, false)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/view" component={Auth(ProductViewPage, false, false)} />
          <Route exact path="/product/add" component={Auth(AddProductPage, true, true)} />
          <Route exact path="/product/edit" component={Auth(ProductEditAllPage, true, true)} />
          <Route exact path="/product/edit/:id" component={Auth(ProductEditPage, true, true)} />
          <Route exact path="/order" component={Auth(EmailSendingPage, true, false)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
