import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import TimelineBg from "../assets/timelinebg.mp4";

const timelineEvents = [
  {
    id: 1,
    label: "Start Line",
    description: "Kickoff: Registration opens",
    x: 40,
    y: 30,
  },
  { id: 2, label: "DRS Straight", description: "Coding begins", x: 150, y: 80 },
  {
    id: 3,
    label: "Hairpin Turn",
    description: "Ideation phase",
    x: 250,
    y: 150,
  },
  {
    id: 4,
    label: "Pit Entry",
    description: "Mentorship session",
    x: 200,
    y: 250,
  },
  { id: 5, label: "Esses Curve", description: "Development", x: 150, y: 350 },
  { id: 6, label: "Chicane", description: "Debugging", x: 250, y: 450 },
  { id: 7, label: "Final Corner", description: "Polishing", x: 350, y: 500 },
  {
    id: 8,
    label: "Finish Line",
    description: "Project submission",
    x: 250,
    y: 600,
  },
];

const Timeline = () => {
  const [currentLap, setCurrentLap] = useState(0);
  const containerRef = useRef(null);
  const progress = useMotionValue(0);

  const trackPath = `M40,30 L150,80 Q200,120 250,150 Q300,200 200,250 Q150,300 150,350 Q200,400 250,450 Q300,500 350,500 Q400,550 250,600`;

  useEffect(() => {
    progress.set(currentLap / (timelineEvents.length - 1));
  }, [currentLap, progress]);

  return (
    <section id="timeline" className="relative p-4 md:p-8">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover opacity-15"
      >
        <source src={TimelineBg} type="video/mp4" />
      </video>

      <h2 className="text-2xl md:text-4xl font-bold text-center text-primary underline mb-4 md:mb-5">
        Hackscript Timeline
      </h2>

      <div
        ref={containerRef}
        className="relative w-full max-w-3xl md:max-w-4xl mx-auto"
      >
        <svg viewBox="0 0 450 700" className="w-full h-auto">
          <path
            d={trackPath}
            fill="none"
            stroke="#333"
            strokeWidth="15"
            strokeLinecap="round"
          />
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

          {timelineEvents.map((event) => (
            <g key={event.id} transform={`translate(${event.x},${event.y})`}>
              <circle r="8" fill="#e11d48" stroke="#fff" strokeWidth="2" />
              <foreignObject x="-40" y="15" width="100" height="90">
                <motion.div
                  className="bg-black/90 p-1 rounded-lg border border-primary text-white text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-[10px]">{event.label}</p>
                  <p className="text-xs">{event.description}</p>
                </motion.div>
              </foreignObject>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
};

export default Timeline;
