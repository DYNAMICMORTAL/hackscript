import React from "react";

const Location = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-red-500 mb-12 drop-shadow-glow">
          Race Location
        </h2>
        <div className="bg-black p-8 rounded-lg border border-red-500 drop-shadow-glow">
          <h3 className="text-2xl text-white mb-4">
            A.P. Shah Institute of Technology
          </h3>
          <p className="text-gray-400 mb-8">
            Join us at the heart of technology and innovation
          </p>
          <div className="relative w-full overflow-hidden rounded-lg aspect-video">
            <iframe
              title="A.P. Shah Institute of Technology Location"
              className="absolute top-0 left-0 w-full h-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.4808558470863!2d72.96044647464407!3d19.174157748235654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b92103c0891b%3A0x9ae5aa84812d529c!2sA.P.%20Shah%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1707659258294"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Location;
