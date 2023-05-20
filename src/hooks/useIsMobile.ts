import { useEffect, useState } from 'react';

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState<boolean>();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.matchMedia('(max-width: 769px)').matches);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        isMobile
    };
};
