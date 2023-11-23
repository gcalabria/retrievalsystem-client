import { useState, useEffect } from 'react';

const usePersist = () => {
  const localStorageState = localStorage.getItem('persist');
  const [persist, setPersist] = useState<boolean>(
    convertToBoolean(localStorageState),
  );

  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist] as const;
};

export default usePersist;

// helper function
function convertToBoolean(value: string | null) {
  if (value === 'true') return true;
  return false;
}
