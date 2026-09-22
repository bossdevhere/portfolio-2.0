import React, { createContext, useContext, useState, useCallback } from 'react';

const CursorContext = createContext({
  cursorText: '',
  cursorType: 'default',
  isHovered: false,
  setCursorText: () => {},
  setCursorType: () => {},
  setHoverState: () => {},
  resetCursor: () => {}
});

export const CursorProvider = ({ children }) => {
  const [cursorText, setCursorTextState] = useState('');
  const [cursorType, setCursorTypeState] = useState('default');
  const [isHovered, setIsHoveredState] = useState(false);

  const setHoverState = useCallback((hover, text = '', type = 'pointer') => {
    setIsHoveredState(hover);
    setCursorTextState(text);
    setCursorTypeState(type);
  }, []);

  const resetCursor = useCallback(() => {
    setIsHoveredState(false);
    setCursorTextState('');
    setCursorTypeState('default');
  }, []);

  return (
    <CursorContext.Provider value={{
      cursorText,
      cursorType,
      isHovered,
      setCursorText: setCursorTextState,
      setCursorType: setCursorTypeState,
      setHoverState,
      resetCursor
    }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
