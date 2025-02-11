import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import TimelineBg from "../assets/timelinebg.mp4";

// Memoized timeline events to prevent recreating on each render
const TIMELINE_EVENTS = [
    { id: 1, label: "Start Line", description: "Kickoff: Registration opens", x: 50, y: 300 },
    { id: 2, label: "DRS Straight", description: "Main straight: Coding begins", x: 200, y: 300 },
    { id: 3, label: "Hairpin Turn", description: "Tight corner: Ideation phase", x: 350, y: 150 },
    { id: 4, label: "Pit Entry", description: "Strategic stop: Mentorship session", x: 500, y: 300 },
    { id: 5, label: "Esses Curve", description: "Technical section: Development", x: 650, y: 200 },
    { id: 6, label: "Chicane", description: "Complex section: Debugging", x: 750, y: 350 },
    { id: 7, label: "Final Corner", description: "Last adjustments: Polishing", x: 900, y: 250 },
    { id: 8, label: "Finish Line", description: "Grand finale: Project submission", x: 1050, y: 300 },
];

const MOBILE_EVENTS = TIMELINE_EVENTS.map((event, index) => ({
    ...event,
    x: 150,
    y: 50 + (index * 100)
}));

// Memoized track paths
const TRACK_PATHS = {
    mobile: 'M150,50 L150,1050',
    desktop: 'M50,300 L200,300 Q275,300 350,150 Q425,0 500,300 Q575,450 650,200 L750,350 Q800,400 900,250 L1050,300'
} ;

// Memoized EventMarker component
const EventMarker = memo(({ event, isActive, isHovered, onHover, onClick }) => (
    <g transform={`translate(${event.x},${event.y})`}>
        <motion.g
            onClick={onClick}
            onMouseEnter={onHover}
            whileHover={{ scale: 1.2 }}
        >
            <path
                d="M0,-15 L10,0 L0,15 L-10,0 Z"
                fill={isHovered ? "#ffffff" : "#e11d48"}
                stroke="#fff"
                strokeWidth="2"
            />
        </motion.g>
        {isActive && <EventTooltip event={event} />}
    </g>
));

// Memoized EventTooltip component
const EventTooltip = memo(({ event }) => (
    <foreignObject
        x={event.x > 600 ? "-220" : "20"}
        y={event.y > 300 ? "-50" : "-40"}
        width="220"
        height="170"
    >
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/90 p-4 backdrop-blur-sm rounded-lg border border-primary shadow-xl"
        >
            <div className="text-sm font-bold text-red-400 mb-1">LAP {event.id}</div>
            <div className="text-sm font-bold text-white mb-1">{event.label}</div>
            <div className="text-sm text-gray-300">{event.description}</div>
        </motion.div>
    </foreignObject>
));

const Timeline = () => {
    const [currentLap, setCurrentLap] = useState(0);
    const [hoveredEventId, setHoveredEventId] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);
    const progress = useMotionValue(0);
    const scrollThrottleRef = useRef(null);

    // Memoized motion values
    const carX = useTransform(
        progress,
        [0, 1],
        [TIMELINE_EVENTS[0].x, TIMELINE_EVENTS[TIMELINE_EVENTS.length - 1].x]
    );

    const carY = useTransform(
        progress,
        TIMELINE_EVENTS.map((_, i) => i / (TIMELINE_EVENTS.length - 1)),
        TIMELINE_EVENTS.map(event => event.y)
    );

    // Optimized resize handler
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        const debouncedResize = debounce(handleResize, 250);
        window.addEventListener('resize', debouncedResize);
        handleResize();

        return () => window.removeEventListener('resize', debouncedResize);
    }, []);

    // Optimized scroll handler
    const handleScroll = useCallback((e) => {
        if (scrollThrottleRef.current) return;
        scrollThrottleRef.current = true;

        requestAnimationFrame(() => {
            if (e.deltaY < 0 && currentLap > 0) {
                setCurrentLap(prev => prev - 1);
            } else if (e.deltaY > 0 && currentLap < TIMELINE_EVENTS.length - 1) {
                setCurrentLap(prev => prev + 1);
            }
            scrollThrottleRef.current = false;
        });
    }, [currentLap]);

    // Update progress on lap change
    useEffect(() => {
        progress.set(currentLap / (TIMELINE_EVENTS.length - 1));
        setHoveredEventId(TIMELINE_EVENTS[currentLap].id);
    }, [currentLap, progress]);

    return (
        <section className="relative bg-background text-white p-8">
            <div ref={containerRef} className="max-w-5xl mx-auto" onWheel={handleScroll}>
            <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover opacity-15">
                    <source src={TimelineBg} type="video/mp4" />
                </video>
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
                    Hackscript Timeline
                </h2>

                <svg viewBox={isMobile ? "0 0 300 800" : "0 0 1100 400"} className="w-full h-auto">
                    <path 
                        d={isMobile ? TRACK_PATHS.mobile : TRACK_PATHS.desktop} 
                        stroke="#333" 
                        strokeWidth="20" 
                        fill="none" 
                    />
                    
                    {(isMobile ? MOBILE_EVENTS : TIMELINE_EVENTS).map(event => (
                        <EventMarker
                            key={event.id}
                            event={event}
                            isActive={hoveredEventId === event.id}
                            isHovered={hoveredEventId === event.id}
                            onHover={() => setHoveredEventId(event.id)}
                            onClick={() => setHoveredEventId(event.id)}
                        />
                    ))}

                    {!isMobile && (
                        <motion.g style={{ x: carX, y: carY }}>
                            <path 
                                d="M-15,-5 L15,-5 L20,5 L-20,5 Z" 
                                fill="#fff" 
                                stroke="#e11d48" 
                                strokeWidth="2" 
                            />
                        </motion.g>
                    )}
                </svg>
            </div>
        </section>
    );
};

// Utility function for debouncing
const debounce = (fn, ms) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
};

export default Timeline;