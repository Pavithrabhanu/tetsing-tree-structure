import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/actions';
import PropTypes from 'prop-types';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import Font Awesome icons

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Handler for toggling the theme
  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  // Determine which icon to show based on the current theme
  const Icon = theme === 'light' ? FaMoon : FaSun;

  return (
    <div className="theme-toggle">
      <Icon
        className="theme-icon"
        onClick={handleToggle}
      />
    </div>
  );
};

ThemeToggle.propTypes = {
  theme: PropTypes.string,
};

export default ThemeToggle;
