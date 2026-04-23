import { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState({
    taps: 0,
    doubleTaps: 0,
    longPresses: 0,
    drags: 0,
    swipeRight: 0,
    swipeLeft: 0,
    pinches: 0,
  });

  const addScore = (points) => setScore((prev) => prev + points);

  const updateStat = (key) =>
    setStats((prev) => ({ ...prev, [key]: prev[key] + 1 }));

  return (
    <GameContext.Provider value={{ score, addScore, stats, updateStat }}>
      {children}
    </GameContext.Provider>
  );
};
