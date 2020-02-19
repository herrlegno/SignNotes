import { useState, useEffect } from 'react';

interface MediaQueries {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  mobile: boolean;
  mobileUp: boolean;
  tablet: boolean;
  desktop: boolean;
}

const useMediaQuery = () => {
  const [mediaQueries, setMediaQueries] = useState<MediaQueries>({
    xs: window.innerWidth < 576,
    sm: window.innerWidth >= 576 && window.innerWidth < 768,
    md: window.innerWidth >= 768 && window.innerWidth < 992,
    lg: window.innerWidth >= 992 && window.innerWidth < 1200,
    xl: window.innerWidth >= 1200,
    mobile: window.innerWidth < 576,
    mobileUp: window.innerWidth >= 576,
    tablet: window.innerWidth >= 576 && window.innerWidth < 992,
    desktop: window.innerWidth >= 992,
  });

  useEffect(() => {
    const calcMediaQueries = () => {
      const width = window.innerWidth;
      setMediaQueries({
        xs: width < 576,
        sm: width >= 576 && width < 768,
        md: width >= 768 && width < 992,
        lg: width >= 992 && width < 1200,
        xl: width >= 1200,
        mobile: width < 576,
        mobileUp: width >= 576,
        tablet: width >= 576 && width < 992,
        desktop: width >= 992,
      });
    };

    calcMediaQueries();

    window.addEventListener('resize', calcMediaQueries);

    return () => {
      window.removeEventListener('resize', calcMediaQueries);
    };
  }, []);

  return mediaQueries;
};

export default useMediaQuery;
