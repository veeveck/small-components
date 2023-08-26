import React, { useRef, useCallback } from "react";

const useDebounce = (callback, delay) => {
  let timeout = useRef(null);
  let debounce = useCallback(
    function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        callback.apply(context, args);
      }, delay);
    },
    [callback, delay]
  );
  return debounce;
};
const DebounceHook = () => {
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const debouncedSearch = useDebounce(handleChange, 2000);
  return (
    <>
      <input
        type="search"
        onChange={debouncedSearch}
        placeholder="Enter your query!!"
      />
    </>
  );
};

export default DebounceHook;
