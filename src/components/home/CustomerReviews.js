import "../../styles/home/customer-reviews.css";

import ReviewCard from "./ReviewCard";

const CustomerReviews = () => {
  return (
    <div className="customer-reviews container">
      <h1>Our Happy Customers</h1>
      <div className="reviews-section">
        <ReviewCard name={"Alex K."} content={"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."} rating={5} />
        <ReviewCard name={"Sarah M."} content={"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."} rating={5} />
        <ReviewCard name={"James L."} content={"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."} rating={5} />
      </div>
    </div>
  );
}
 
export default CustomerReviews;