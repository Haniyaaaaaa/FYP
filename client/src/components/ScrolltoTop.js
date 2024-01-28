import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrolltoTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top when the location changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

export default ScrolltoTop;
