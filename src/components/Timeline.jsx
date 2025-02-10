import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import TimelineBg from "../assets/timelinebg.mp4";

const timelineEvents = [
    { id: 1, label: "Start Line", description: "Kickoff: Registration opens", x: 50, y: 350 },
    { id: 2, label: "High-Speed Straight", description: "Main straight: Coding begins", x: 150, y: 300 },
    { id: 3, label: "Sharp Turn", description: "A challenging curve: Ideation phase", x: 250, y: 250 },
    { id: 4, label: "Pit Stop", description: "Quick pit stop: Mentorship & refresh", x: 350, y: 220 },
    { id: 5, label: "Hairpin", description: "Tight corner: Team strategy session", x: 450, y: 240 },
    { id: 6, label: "Chicane", description: "Complex curves: Final adjustments", x: 550, y: 200 },
    { id: 7, label: "DRS Zone", description: "Overtake zone: Accelerate for impact", x: 650, y: 180 },
    { id: 8, label: "Finish Line", description: "Grand finale: Project submission", x: 750, y: 150 },
];

const carXKeyframes = timelineEvents.map(event => event.x);
const carYKeyframes = timelineEvents.map(event => event.y);

const trackPath = `
  M50,350
  C100,320 150,300 150,300
  L250,250
  C300,240 350,220 350,220
  L450,240
  Q500,220 550,200
  L650,180
  C700,170 750,150 750,150
`;

const Timeline = () => {
    const [hoveredEventId, setHoveredEventId] = useState(null);
    const progress = useMotionValue(0);
    const tooltipRef = useRef(null);
    const [height, setHeight] = useState(80);
    const [isMobile, setIsMobile] = useState(false);

    const carRotation = useTransform(progress, [0, 1], [0, 360]);

    useEffect(() => {
        if (tooltipRef.current) {
            setHeight(tooltipRef.current.clientHeight + 10);
        }
    }, [hoveredEventId]);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    const handleEventClick = (eventId) => {
        if (isMobile) {
            setHoveredEventId(hoveredEventId === eventId ? null : eventId);
        }
    };

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

    return (
        <div ref={tooltipRef} id="timeline" className="relative overflow-hidden bg-background text-white p-8 md:p-10">
            {/* Background Video */}
            <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover -z-10">
                <source src={TimelineBg} type="video/mp4" />
            </video>

            <h2 className="lg:text-4xl text-xl font-bold text-center text-white underline underline-offset-8 mb-5 p-6">
                Hackscript Timeline
            </h2>

            <div className="relative w-full max-w-5xl mx-auto">
                <svg viewBox="0 0 800 400" className="w-full h-auto">
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
                                onMouseLeave={() => !isMobile && setHoveredEventId(null)}
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
                        transformOrigin="center"
                        style={{ rotate: carRotation }}
                        animate={{ x: carXKeyframes, y: carYKeyframes }}
                        transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                    >
                        <path d="M-15,-5 L15,-5 L20,5 L-20,5 Z" fill="#fff" stroke="#e11d48" strokeWidth="2" />
                        <path d="M-10,0 L10,0 M0,-5 L0,5" stroke="#e11d48" strokeWidth="2" />
                        <motion.path
                            d="M0,-8 L5,-13 L10,-8"
                            fill="none"
                            stroke="#e11d48"
                            strokeWidth="2"
                            animate={{ pathLength: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.5 }}
                        />
                    </motion.g>

                    {timelineEvents.map(event => (
                        <g key={event.id} transform={`translate(${event.x},${event.y})`}>
                            {hoveredEventId === event.id && (
                                <foreignObject
                                    x={event.x > 600 ? "-220" : "20"}
                                    y={event.y > 300 ? "-50" : "-40"}
                                    width={isMobile ? "250" : "200"}
                                    height={height}
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

            <audio id="engineSound" loop>
                <source src="/f1-engine.mp3" type="audio/mpeg" />
            </audio>
        </div>
    );
};

export default Timeline;
