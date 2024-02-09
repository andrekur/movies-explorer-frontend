import { useEffect } from "react";


export function useMenuClose(isOpen, closeMenu) {
  useEffect(() => {
    if (!isOpen) return;

    const handleOverlay = (event) => {
      if (event.target.classList.contains("header__mobile-menu")) {
        closeMenu(event);
      }
    };

    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("mousedown", handleOverlay);
    };

  }, [isOpen, closeMenu]);
}
