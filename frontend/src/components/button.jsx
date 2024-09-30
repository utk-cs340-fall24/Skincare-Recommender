// Button Component
import React from 'react';

const Button = ({ label, color = 'blue', activeColor = 'blue', onClick }) => {
  const buttonStyle = {
    // Initial color for button.
    backgroundColor: color,
  };

  // Changes color when hovering over button.
  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = activeColor;
  };

  // Reverts back to initial color when not hovering anymore.
  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = color;
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={buttonStyle}
      className="text-white font-bold py-2 px-4 rounded-full transition shadow-md"
    >
      {label}
    </button>
  );
};

export default Button;