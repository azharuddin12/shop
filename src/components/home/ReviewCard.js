import "../../styles/home/review-card.css";

import Rating from "../general/Rating";

const ReviewCard = ({ rating, name, content }) => {
  return (
    <div className="review-card">
      <Rating rating={ rating } />
      <p className="name">{ name }</p>
      <p className="content">{ content }</p>
    </div>
  );
}
 
export default ReviewCard;