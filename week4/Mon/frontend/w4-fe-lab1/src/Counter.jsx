import "./Counter.css";
import { useState } from "react";

const Counter = () => {
  const handleClick = () => {
    console.log("Button clicked");
  };
  //   let theme = "light";

  const setDarkTheme = () => {
    theme = "dark";
    console.log(theme);
  };

  const setLightTheme = () => {
    theme = "light";
    console.log(theme);
  };

  const [theme, setTheme] = useState("light");
  const [count, setCount] = useState(0);

  const setDarkThemeHandler = () => setTheme("dark");
  const setLightThemeHandler = () => setTheme("light");
  const toggleThemeHandler = () => {
    setTheme(t => t === "light" ? "dark" : "light");
  };
  const incrementHandler = () => {
    setCount(c => c + 1);
  };

  const decrementHandler = () => {
    setCount(c => c - 1);
  };

  return (
    <div className={`content ${theme}`}>
      <h1>UseState Component</h1>

      <button onClick={setDarkThemeHandler}>Dark</button>
      <button onClick={setLightThemeHandler}>Light</button>
      <button onClick={toggleThemeHandler}>Toggle</button>

      <h2>{count}</h2>

      <button onClick={incrementHandler}>+</button>
      <button onClick={decrementHandler}>-</button>
    </div>
  );
};

export default Counter;
