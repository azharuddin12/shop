import "../../styles/general/message.css";

import { useEffect, useRef } from "react";

const Message = ({ message, color }) => {
  const msg = useRef();

  useEffect(() => {
    msg.current.style.top = "1%";
  
    let timeoutId = setTimeout(() => {
      msg.current.style.top = "-50%";
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    }
  }, []);

  return (
    <div ref={ msg } className="message" style={{"backgroundColor": `${color}`}}>
      <p>{ message }</p>
    </div>
  );
}
 
export default Message;