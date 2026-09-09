import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define the Layout Route */}
        <Route path="/" element={<Layout />}>
          {/* Nested Routes within the Layout */}
          <Route index element={<Home />} /> {/* Default Route */}
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all for undefined routes */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;