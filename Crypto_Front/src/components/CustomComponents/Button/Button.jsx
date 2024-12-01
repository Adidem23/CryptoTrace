import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ text, onClick, type = "button", style, disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      disabled={disabled}
      className="custom-button"
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

export default Button;
