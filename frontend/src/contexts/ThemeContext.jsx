import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext();

/**
 * ThemeProvider — Premium radial theme toggle
 * 
 * Uses the native View Transitions API to capture snapshots of the DOM 
 * before and after the theme switch, and animates a circular clip-path 
 * revealing the new theme snapshot. This perfectly preserves all text and 
 * backgrounds, scaling correctly across the entire mobile screen.
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  // Sync DOM class + localStorage whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(async (x, y) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Fallback for browsers that don't support View Transitions API
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    // Wait for the transition to be ready
    const transition = document.startViewTransition(() => {
      // Synchronously apply the class to the DOM so the "new" snapshot is correct
      const root = document.documentElement;
      if (nextTheme === 'dark') root.classList.add('dark');
      else root.classList.remove('dark');
      
      // Update React state
      setTheme(nextTheme);
    });

    await transition.ready;

    // Calculate the maximum radius needed to cover the ENTIRE viewport diagonal
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Animate the root's new view pseudo-element
    document.documentElement.animate(
      [
        { clipPath: `circle(0px at ${x}px ${y}px)` },
        { clipPath: `circle(${maxRadius}px at ${x}px ${y}px)` },
      ],
      {
        duration: 800,
        easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
