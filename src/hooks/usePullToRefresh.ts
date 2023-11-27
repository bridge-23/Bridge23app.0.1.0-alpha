//..src/hooks/usePullToRefresh.ts
import { useEffect } from 'react';

const usePullToRefresh = () => {
    useEffect(() => {
        let startY = 0;
        let endY = 0;

        const onTouchStart = (e: TouchEvent) => {
            startY = e.touches[0].clientY;
        };

        const onTouchMove = (e: TouchEvent) => {
            endY = e.touches[0].clientY;
        };

        const onTouchEnd = () => {
            if (window.scrollY === 0 && endY > startY + 50) {
                window.location.reload();
            }
        };

        document.addEventListener('touchstart', onTouchStart);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);

        return () => {
            document.removeEventListener('touchstart', onTouchStart);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
        };
    }, []);


    // You can add more logic here if needed
};

export default usePullToRefresh;
