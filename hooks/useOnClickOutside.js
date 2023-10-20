"use client"
import { useEffect } from "react";

export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (ref?.current && !ref?.current?.contains(event.target)) {
        handler && handler(event);
      }
    };

    const handle = (event) => {
      if (event.code === "Escape") {
        handler && handler(event);
      }
    };
    document.addEventListener("keydown", handle, true);
    document.addEventListener("click", listener, true);
    return () => {
      document.removeEventListener("click", listener);
      document.removeEventListener("keydown", handle, true);
    };
  }, [ref, handler]);
};

export const useOnClickOutsideRefs = (ref, ref2, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (
        ref?.current &&
        !ref?.current?.contains(event.target) &&
        !ref2?.current?.contains(event.target)
      ) {
        handler && handler(event);
      }
    };

    const handle = (event) => {
      if (event.code === "Escape") {
        handler && handler(event);
      }
    };
    document.addEventListener("keydown", handle, true);
    document.addEventListener("click", listener, true);
    return () => {
      document.removeEventListener("click", listener);
      document.removeEventListener("keydown", handle, true);
    };
  }, [ref, ref2, handler]);
};

export const useOnKeyDown = (onClose) => {
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
};
