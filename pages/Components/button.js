import React from 'react'
import PropTypes from 'prop-types';

const Button = ({ children, height, width, type, background, onClick, border, borderRadius, cursor, disabled }) => {
  return (
    <button
      type={type}
      style={{ height, width, background, border, borderRadius, cursor }}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  background: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  cursor: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  height: '2.5rem',
  width: '10vw',
  type: 'button',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};


export default Button