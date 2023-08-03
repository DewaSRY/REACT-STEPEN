import { useState, useEffect } from "react";

export function useCount(initialCount: number) {
  const [count, setCount] = useState(initialCount);
  useEffect(() => {
    console.log(count);
  }, [count]);
  const handleCountIncrist = () => setCount((prevNum) => prevNum + 1);
  return {
    count,
    setCount,
    handleCountIncrist,
  };
}
