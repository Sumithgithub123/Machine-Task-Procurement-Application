import { useEffect, useRef } from "react";

export function useOutside(handler) {
  const refe = useRef();

  useEffect(() => {
    document.addEventListener(
      "click",
      (e) => {
        if (!refe.current.contains(e.target)) {
          handler(false);
        }
      },
      true
    );
  }, [handler]);

  return refe;
}
