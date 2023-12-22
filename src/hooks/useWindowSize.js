import { useState, useEffect } from 'react';

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        // Handler to update window size when the window is resized
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        // Add event listener to listen for window resize events
        window.addEventListener('resize', handleResize);

        // Initial window size setup
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });

        // Remove event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures that this effect runs only once

    return windowSize;
}
