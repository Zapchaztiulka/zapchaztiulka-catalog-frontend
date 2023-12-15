import { useEffect } from 'react';

export const useOutsideClick = (ref, ref2, callback) => {
  const handleClick = e => {
    if (
      ref?.current &&
      !ref?.current.contains(e.target) &&
      !ref2?.current?.contains(e.target)
    ) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export const useOnKeyDown = onClose => {
  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        onClose();
        document.body.classList.remove('stop-scrolling');
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
};
