import React from "react";
import PropTypes from "prop-types";

const Dropdown = ({ options, onChange, defaultValue = "Select an option" }) => {
  return (
    <select onChange={(e) => onChange(e.target.value)} style={{ padding: "10px", fontSize: "16px" }}>
      <option disabled>{defaultValue}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
};

export default Dropdown;
