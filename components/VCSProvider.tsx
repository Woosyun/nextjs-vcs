'use client'
import { createContext, useContext, useEffect, useState } from 'react';

const VCSContext = createContext<any>(undefined);

export const VCSProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [vcs, setVCS] = useState(null);

  useEffect(() => {
    async function init() {
      const res = await fetch('/api/vcs');
      const { vcsGraph } = await res.json();
      // console.log(vcsGraph);

      setVCS(vcsGraph);
    }
    init();
  }, []);
  
  return (
    <VCSContext.Provider value={vcs}>
      {children}
    </VCSContext.Provider>
  );
};

export const useVCS = () => {
  const context = useContext(VCSContext);
  if (context === undefined) {
    throw new Error('useVCS must be used within a VCSProvider');
  }
  return context;
}