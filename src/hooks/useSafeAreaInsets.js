//../src/hooks/useSafeAreaInsets.js
import { useState, useEffect } from 'react';

const useSafeAreaInsets = () => {
    const [insets, setInsets] = useState({ top: 0, left: 0, right: 0, bottom: 0 });

    useEffect(() => {
        // Create a dummy div element
        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.padding = '0';
        div.style.margin = '0';
        div.style.top = 'env(safe-area-inset-top)';
        div.style.left = 'env(safe-area-inset-left)';
        div.style.right = 'env(safe-area-inset-right)';
        div.style.bottom = 'env(safe-area-inset-bottom)';
        document.body.appendChild(div);

        // Update insets
        const updateInsets = () => {
            setInsets({
                top: parseInt(window.getComputedStyle(div).top, 10),
                left: parseInt(window.getComputedStyle(div).left, 10),
                right: parseInt(window.getComputedStyle(div).right, 10),
                bottom: parseInt(window.getComputedStyle(div).bottom, 10),
            });
        };

        // ResizeObserver to observe changes
        const resizeObserver = new ResizeObserver(updateInsets);
        resizeObserver.observe(div);

        updateInsets(); // Initial update

        return () => {
            resizeObserver.disconnect();
            document.body.removeChild(div);
        };
    }, []);

    return insets;
};

export default useSafeAreaInsets;
