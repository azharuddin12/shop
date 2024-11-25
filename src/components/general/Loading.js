import "../../styles/general/loading.css";

import { useEffect, useState } from "react";

const Loading = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    let intervalId = setInterval(() => {
      setDots((dots) => (dots === '...'? '' : dots + '.'));
    }, 700);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return (
    <div className="loading">
      <h1>Loading{ dots }</h1>
    </div>
  );
}
 
export default Loading;