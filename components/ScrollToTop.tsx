"use client";
import { CircleArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {showScrollTop && (
        <button onClick={handleScrollTop} className="fixed bottom-10 right-0 text-white p-4" title="Scroll to top">
          <CircleArrowUp size={32} color="#FF9500" strokeWidth={3} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
