import "../../styles/general/counter.css";

function incCount(setCount){
  setCount((count) => count + 1);
}

function decCount(count, setCount){
  if(count > 1)
    setCount((count) => count - 1);
}

const Counter = ({ count, setCount }) => {
  return (
    <div className="counter">
      <button className="inc-btn" onClick={ () => { incCount(setCount)} }> + </button>
      <p>{ count }</p>
      <button className="dec-btn" onClick={ () => { decCount(count, setCount)} }> - </button>
    </div>
  );
}
 
export default Counter;