import { useEffect, useRef } from 'react';

const useResetLocalStorage = () => {
  const isResetLocalStorageCalled = useRef(false);

  useEffect(() => {
    isResetLocalStorageCalled.current = false;
  }, []);

  return isResetLocalStorageCalled;
};

export default useResetLocalStorage;
