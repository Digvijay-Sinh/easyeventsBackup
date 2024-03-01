import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
// import "react-tailwindcss-datepicker/src/index.css";

const DarkModeDatepicker = ({ value, handleValueChange }) => {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  //   // Function to toggle dark mode
  //   const toggleDarkMode = () => {
  //     setDarkMode(!darkMode);
  //   };

  return (
    <div className={darkMode ? "dark" : ""}>
      {/* <button onClick={toggleDarkMode}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button> */}
      <Datepicker
        primaryColor="purple"
        value={{
          startDate: value.startDate,
          endDate: new Date(value.endDate),
        }}
        onChange={handleValueChange}
        // inputClassName={darkMode ? "text-white" : ""} // Adjust text color for dark mode
        // No need to add specific dark mode classes for the Datepicker component
      />
    </div>
  );
};

export default DarkModeDatepicker;
