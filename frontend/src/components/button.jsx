import React from "react";
import PropTypes from "prop-types";
// Button Component
const Button = ({
  label,
  color = "customBlue",
  activeColor = "customBlue",
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-${color} hover:bg-${activeColor} text-white font-bold py-2 px-4 rounded-full transition shadow-md ${className}`}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  activeColor: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Button;
