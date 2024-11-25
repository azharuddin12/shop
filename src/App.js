import "./styles/general/general.css"

import { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import useSWR from "swr";

import useSetupCart from "./hooks/useSetupCart";
import { useVerifyToken } from "./hooks/useVerifyToken";

import Header from './components/general/Header';
import Hero from "./components/home/Hero";
import Banner from "./components/home/Banner";
import ProductsOverview from "./components/home/ProductsOverview";
import CustomerReviews from "./components/home/CustomerReviews";
import Footer from "./components/general/Footer";
import ProductDetails from "./components/products/ProductDetails";
import ViewProducts from "./components/products/ViewProducts";
import ViewCart from "./components/cart/ViewCart";
import Loading from "./components/general/Loading";
import Checkout from "./components/checkout/Checkout";
import Error from "./components/general/Error";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import ViewProfile from "./components/profile/ViewProfile";
import EditPersonalInfo from "./components/profile/EditPersonalInfo";
import EditAccountInfo from "./components/profile/EditAccountInfo";
import useFetchProducts from "./hooks/useFetchProducts";

function App() {
  useSetupCart();
  useVerifyToken();
  
  const location = useLocation();
  const showHeaderAndFooter = location.pathname !== '/sign-in' && location.pathname !== '/sign-up';

  useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), [location]);
  
  const { data: products, error } = useSWR("/products", useFetchProducts);

  if(error)
    return (<Error />);

  if (!products) 
    return (<Loading />);
  
  return (
    <div className="App">      
    { showHeaderAndFooter && <Header /> }
      <Switch>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route exact path="/">
          <Hero />
          <Banner />
          <ProductsOverview className="new-arrivals" heading="New Arrivals" products={products.slice(0, 4)} />
          <ProductsOverview className="top-selling" heading="Top Selling" products={products.slice(4, 8)} />
          <CustomerReviews />
        </Route>
        <Route path="/view-products/:key?">
          <ViewProducts products={products} />
        </Route>
        <Route path="/product-details/:id">
          <ProductDetails products={products} />
        </Route>
        <Route path="/view-cart">
          <ViewCart />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route exact path="/profile">
          <ViewProfile />
        </Route>
        <Route path="/profile/edit-personal-info">
          <EditPersonalInfo />
        </Route>
        <Route path="/profile/edit-account-info">
          <EditAccountInfo />
        </Route>
      </Switch>
      { showHeaderAndFooter && <Footer /> }
    </div>
  );
}

export default App;