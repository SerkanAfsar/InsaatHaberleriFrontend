import { RefObject, useEffect, useState } from "react";

export default function useScroll(
  refItem: RefObject<HTMLElement | null>,
  isWindow: boolean = false,
) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (refItem.current) {
        const height = isWindow ? 0 : refItem.current.clientHeight;
        setIsScrolled(window.scrollY > height);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [refItem, isWindow]);
  
  return { isScrolled };
}
