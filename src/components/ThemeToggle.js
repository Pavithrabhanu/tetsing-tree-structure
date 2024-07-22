import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/treeSlice';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.tree.theme);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  const Icon = theme === 'light' ? FaMoon : FaSun;

  return (
    <div className="theme-toggle">
      <Icon className="theme-icon" onClick={handleToggle} />
    </div>
  );
};

export default ThemeToggle;
