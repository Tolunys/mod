import React, { createContext, useState } from 'react';

export const MoodContext = createContext({
  mood: null,
  setMood: () => {},
});

export const MoodProvider = ({ children }) => {
  const [mood, setMood] = useState(null);

  return (
    <MoodContext.Provider value={{ mood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
};
