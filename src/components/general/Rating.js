import "../../styles/general/rating.css";

import { memo } from "react";

import filledStar from "../../images/filled-star.png";
import halfFilledStar from "../../images/half-filled-star.png";

const Rating = ({ rating }) => {
  let stars = calculateStars(rating);
  
  return (
    <div className="rating">
      <div className="stars">
        {stars.map((star, index) => {
          return <img key={index}  src={star} alt="star.png" />
        })}
      </div>
      <p>{ rating + "/5" }</p>
    </div>
  );
}

function calculateStars(rating){
  let stars = [];

  for(let x = rating; x > 0; x--){
   if(x >= 1){
    stars.push(filledStar);
   }
   else{
    stars.push(halfFilledStar);
   }
  }

  return stars;
}
 
export default memo(Rating);