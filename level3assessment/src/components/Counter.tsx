import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <>
      <h5 className="text-center"> Counter </h5>
      <div className="row justify-content-center">
        <div className="col-6 d-flex flex-column align-items-center">
          <p>Count: {count}</p>
          <div>
            <button
              className="btn btn-primary mx-3 m-2"
              onClick={handleIncrement}
            >
              Increment
            </button>

            <button
              className="btn btn-secondary mx-3 m-2"
              onClick={handleDecrement}
            >
              Decrement
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Counter;
