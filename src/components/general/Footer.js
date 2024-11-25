import "../../styles/general/footer.css";

import Links from "./Links";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="left-section">
          <h1>Shop.Co</h1>
          <p>
            We have clothes that suits your style and which you're proud to wear. From women to men.
          </p>
          <div className="icons">
            <img src={require("../../images/twitter.png")} alt="twitter.png" />
            <img src={require("../../images/facebook.png")} alt="facebook.png" />
            <img src={require("../../images/instagram.png")} alt="instagram.png" />
            <img src={require("../../images/github.png")} alt="github.png" />
          </div>
        </div>
        <Links title={"Company"} links={["About", "Features", "Works", "Careers"]} />
        <Links title={"Help"} links={["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"]} />
        <Links title={"FAQ"} links={["Account", "Manage Deliveries", "Orders", "Payments"]} />
      </div>
      <div className="bottom-section container">
        <p>Shop.co © 2000-2023, All Rights Reserved</p>
        <div className="icons">
          <img src={require("../../images/visa.png")} alt="visa.png" />
          <img src={require("../../images/mastercard.png")} alt="mastercard.png" />
          <img src={require("../../images/paypal.png")} alt="paypal.png" />
          <img src={require("../../images/apple-pay.png")} alt="apple-pay.png" />
          <img src={require("../../images/google-pay.png")} alt="google-pay.png" />
        </div>
      </div>
    </footer>
  );
}
 
export default Footer;