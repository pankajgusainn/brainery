import { useState, useEffect } from 'react';

interface UserData {
  name: string;
  age: number;
}

export function useUserData() {
  const [userData, setUserDataState] = useState<UserData | null>(() => {
    const saved = localStorage.getItem('userData');
    return saved ? JSON.parse(saved) : null;
  });

  const setUserData = (data: UserData) => {
    setUserDataState(data);
    localStorage.setItem('userData', JSON.stringify(data));
  };

  return { userData, setUserData };
}