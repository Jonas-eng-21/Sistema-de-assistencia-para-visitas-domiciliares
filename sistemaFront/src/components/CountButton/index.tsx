import { useState } from "react";

const CountButton = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>count is {count}</button>
      <p>
        Edit <code>src/pages/Home.tsx</code> and save to test HMR
      </p>
    </div>
  );
};

export default CountButton;
