import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import TimelineBg from "../assets/timelinebg.mp4";

const timelineEvents = [
    { id: 1, label: "Start Line", description: "Kickoff: Registration opens", x: 50, y: 300 },
    { id: 2, label: "DRS Straight", description: "Main straight: Coding begins", x: 200, y: 300 },
    { id: 3, label: "Hairpin Turn", description: "Tight corner: Ideation phase", x: 350, y: 150 },
    { id: 4, label: "Pit Entry", description: "Strategic stop: Mentorship session", x: 500, y: 300 },
    { id: 5, label: "Esses Curve", description: "Technical section: Development", x: 650, y: 200 },
    { id: 6, label: "Chicane", description: "Complex section: Debugging", x: 750, y: 350 },
    { id: 7, label: "Final Corner", description: "Last adjustments: Polishing", x: 900, y: 250 },
    { id: 8, label: "Finish Line", description: "Grand finale: Project submission", x: 1050, y: 300 },
];

const carXKeyframes = timelineEvents.map(event => event.x);
const carYKeyframes = timelineEvents.map(event => event.y);


const Timeline = () => {
    const [currentLap, setCurrentLap] = useState(0);
    const [hoveredEventId, setHoveredEventId] = useState(null);
    const tooltipRef = useRef(null);
    const [height, setHeight] = useState(80);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);
    const progress = useMotionValue(0);
    const lastScrollTime = useRef(Date.now());

    const trackPath = isMobile
    ? `
  M150,50 
  L150,200
  Q150,275 250,350
  Q350,425 150,500
  Q75,575 250,650
  L150,750
  Q100,800 250,900
  L150,1050
`
    : `
  M50,300 
  L200,300
  Q275,300 350,150
  Q425,0 500,300
  Q575,450 650,200
  L750,350
  Q800,400 900,250
  L1050,300
`;
    // Car position transforms
    const carX = useTransform(progress,
        Array.from({ length: timelineEvents.length }, (_, i) => i / (timelineEvents.length - 1)),
        isMobile ? timelineEvents.map(event => event.x) : carXKeyframes  // Follow exact x-points
    );
    
    const carY = useTransform(progress,
        Array.from({ length: timelineEvents.length }, (_, i) => i / (timelineEvents.length - 1)),
        isMobile ? timelineEvents.map(event => event.y) : carYKeyframes  // Follow exact y-points
    );
      

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!isMobile) return;

        let startY = 0;
        const handleTouchStart = (e) => {
            startY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            const deltaY = e.touches[0].clientY - startY;
            if (Math.abs(deltaY) < 30) return; // Ignore minor movements

            if (deltaY < 0 && currentLap < timelineEvents.length - 1) {
                setCurrentLap((prev) => Math.min(prev + 1, timelineEvents.length - 1));
            } else if (deltaY > 0 && currentLap > 0) {
                setCurrentLap((prev) => Math.max(prev - 1, 0));
            }
            startY = e.touches[0].clientY; // Reset start position
        };

        document.addEventListener("touchstart", handleTouchStart);
        document.addEventListener("touchmove", handleTouchMove);

        return () => {
            document.removeEventListener("touchstart", handleTouchStart);
            document.removeEventListener("touchmove", handleTouchMove);
        };
    }, [isMobile, currentLap]);


    useEffect(() => {
        const preventPageScroll = (e) => {
            if (currentLap > 0 && currentLap < timelineEvents.length - 1) {
                e.preventDefault();
            }
        };

        document.addEventListener("wheel", preventPageScroll, { passive: false });

        return () => {
            document.removeEventListener("wheel", preventPageScroll);
        };
    }, [currentLap]);


    const handleTimelineScroll = (e) => {
        const container = containerRef.current;
        console.log(container);

        if (!container) return;

        const atTop = container.scrollTop === 0;
        const atBottom = container.scrollHeight - container.scrollTop === container.clientHeight;

        if (!atTop && !atBottom) {
            e.stopPropagation(); // Prevent main page from scrolling
        }

        const now = Date.now();
        if (now - lastScrollTime.current < 200) return;
        lastScrollTime.current = now;

        if (e.deltaY < 0 && currentLap > 0) {
            setCurrentLap((prev) => Math.max(prev - 1, 0));
            e.preventDefault();
        } else if (e.deltaY > 0 && currentLap < timelineEvents.length - 1) {
            setCurrentLap((prev) => Math.min(prev + 1, timelineEvents.length - 1));
            e.preventDefault();
        }
    };

    // Mobile handlers and other existing logic remain similar...
    // For mobile: toggle tooltip on marker click
    const handleEventClick = (eventId) => {
        if (isMobile) {
            setHoveredEventId(hoveredEventId === eventId ? timelineEvents[currentLap].id : eventId);
        }
    };

    // For mobile: close tooltip when clicking outside
    useEffect(() => {
        if (!isMobile) return;
        const handleClickOutside = (event) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
                setHoveredEventId(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isMobile]);

    useEffect(() => {
        progress.set(currentLap / (timelineEvents.length - 1));
        setHoveredEventId(timelineEvents[currentLap].id);
    }, [currentLap, progress]);

    return (
        <div>
            <div ref={containerRef} className="relative overflow-auto bg-background text-white p-8 md:p-10" onWheel={(e) => handleTimelineScroll(e)}>
                <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover opacity-15">
                    <source src={TimelineBg} type="video/mp4" />
                </video>

                <h2 className="lg:text-4xl text-xl font-bold text-center text-white underline underline-offset-8 mb-5 p-6">
                    Hackscript Timeline
                </h2>

                <div className="relative w-full max-w-5xl mx-auto" style={{ height: "600px" }}>
                    <svg viewBox={isMobile ? "0 0 400 1100" : "0 0 1100 400"} className="w-full h-auto">

                        <path d={trackPath} fill="none" stroke="#333" strokeWidth="20" strokeLinecap="round" />
                        <motion.path
                            d={trackPath}
                            fill="none"
                            stroke="url(#trackGradient)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray="4 8"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />

                        {timelineEvents.map(event => (
                            <g key={event.id} transform={`translate(${event.x},${event.y})`}>
                                <motion.g
                                    onClick={() => handleEventClick(event.id)}
                                    onMouseEnter={() => !isMobile && setHoveredEventId(event.id)}
                                    onMouseLeave={() => !isMobile && setHoveredEventId(timelineEvents[currentLap].id)}
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <path
                                        d="M0,-15 L10,0 L0,15 L-10,0 Z"
                                        fill={hoveredEventId === event.id ? "#ffffff" : "#e11d48"}
                                        stroke="#fff"
                                        strokeWidth="2"
                                    />
                                </motion.g>
                            </g>
                        ))}

                        <motion.g
                            style={{
                                x: carX,
                                y: carY,
                                rotate: useTransform(progress, [0, 1], [0, 360])
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        >
                            <path d="M-15,-5 L15,-5 L20,5 L-20,5 Z" fill="#fff" stroke="#e11d48" strokeWidth="2" />
                            <path d="M-10,0 L10,0 M0,-5 L0,5" stroke="#e11d48" strokeWidth="2" />
                        </motion.g>

                        {/* Tooltip rendering remains similar */}
                        {timelineEvents.map(event => (
                            <g key={event.id} transform={`translate(${event.x},${event.y})`}>
                                {hoveredEventId === event.id && (
                                    <foreignObject
                                        x={isMobile ? "20" : event.x > 600 ? "-220" : "20"}
                                        y={isMobile ? (event.y > 600 ? "-80" : "20") : event.y > 300 ? "-50" : "-40"}
                                        width={isMobile ? "250" : "200"}
                                        height={isMobile ? "80" : "150"}
                                        style={{ zIndex: 20 }}
                                    >

                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-black/90 p-4 md:p-3 backdrop-blur-sm rounded-lg border border-red-600 shadow-xl"
                                        >
                                            <div className="text-xs font-bold text-red-400 mb-1">
                                                LAP {event.id}
                                            </div>
                                            <div className="md:text-sm text-xs font-bold text-white mb-1">
                                                {event.label}
                                            </div>
                                            <div className="text-xs text-gray-300">
                                                {event.description}
                                            </div>
                                            <div className="absolute -left-2 top-4 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-red-600" />
                                        </motion.div>
                                    </foreignObject>
                                )}
                            </g>
                        ))}
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Timeline;
