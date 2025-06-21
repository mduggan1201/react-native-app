import React, { createContext, useContext, useState } from 'react'

interface PlayerState {
  life: number;
  lifeChange: number;
  lifeHistory: number[][];
}

interface LifeTrackerContextType {
  players: Record<string, PlayerState>;
  setPlayerState: (playerName: string, updater: (prev: PlayerState) => PlayerState) => void;
  showHistory: boolean;
  toggleShowHistory: () => void;
}

export const defaultPlayerState = { life: 40, lifeChange: 0, lifeHistory: [[40, 0]] };

const LifeTrackerContext = createContext<LifeTrackerContextType | undefined>(undefined);

export const LifeTrackerProvider = ({ children }: { children: React.ReactNode }) => {
  const [players, setPlayers] = useState<Record<string,PlayerState>>({
    'Player 1' : { ...defaultPlayerState },
    'Player 2' : { ...defaultPlayerState }
  });

  const [showHistory, setShowHistory] = useState(false);

  const setPlayerState = (playerName: string, updater: (prev: PlayerState) => PlayerState) => {
    setPlayers(prev => ({
      ...prev,
      [playerName]: updater(prev[playerName])
    }));
  };

  const toggleShowHistory = () => setShowHistory(prev => !prev)

  return (
    <LifeTrackerContext.Provider value={{ players, setPlayerState, showHistory, toggleShowHistory }}>
      {children}
    </LifeTrackerContext.Provider>
  );
};

export const useLifeTracker = () => {
  const context = useContext(LifeTrackerContext);
  if (!context) {
    throw new Error('useLifeTracker must be used within a LifeTrackerProvider');
  }
  return context;
};