import React from 'react';

const Cafe = () => {
  return (
    <div className="min-h-screen bg-[#F5F2E9] font-sans antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[600px] lg:h-[800px] overflow-hidden">
        <img 
          src="/img/kyCLS.webp" 
          alt="Coffee shop lifestyle" 
          className="absolute inset-0 w-full h-full object-cover origin-center"
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 lg:py-10 lg:px-16">
          {/* Top layout on mobile, sides on desktop */}
          <div className="flex flex-col lg:flex-row justify-between items-center h-full">
            
            {/* Left Label */}
            <div className="hidden lg:flex w-[200px] justify-start">
              <span className="text-white text-[12px] tracking-[0.2em] uppercase">
                A Specialty Cafe
              </span>
            </div>

            {/* Center Brand */}
            <div className="flex flex-col items-center justify-center gap-8">
              <h1 
                className="text-white text-5xl md:text-7xl lg:text-[100px] font-thin leading-[0.9] text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                THE<br />ARTISAN<br />ROAST
              </h1>
              <button className="px-8 py-4 border border-[#7D6B3D] hover:bg-[#7D6B3D]/10 transition-colors rounded text-white text-[13px] tracking-[0.1em] uppercase">
                Reserve Your Space
              </button>
            </div>

            {/* Right Label */}
            <div className="hidden lg:flex w-[200px] justify-end mt-auto">
              <span className="text-white text-[12px] tracking-[0.2em] uppercase text-right">
                Downtown
              </span>
            </div>
            
          </div>
        </div>
      </section>

      {/* Amenity Bar */}
      <div className="w-full h-auto py-6 lg:h-20 lg:py-0 px-8 lg:px-16 flex flex-wrap gap-4 lg:flex-nowrap justify-center lg:justify-around items-center bg-[#F5F2E9]">
        <span className="text-[13px] tracking-[0.1em] text-[#5E5954] uppercase w-full lg:w-auto text-center lg:text-left block">
          Freshly Roasted
        </span>
        <div className="hidden lg:block w-px h-6 bg-[#DCD8CB]"></div>
        <span className="text-[13px] tracking-[0.1em] text-[#5E5954] uppercase w-full lg:w-auto text-center lg:text-left block">
          Daily Pastries
        </span>
        <div className="hidden lg:block w-px h-6 bg-[#DCD8CB]"></div>
        <span className="text-[13px] tracking-[0.1em] text-[#5E5954] uppercase w-full lg:w-auto text-center lg:text-left block">
          Coworking Space
        </span>
        <div className="hidden lg:block w-px h-6 bg-[#DCD8CB]"></div>
        <span className="text-[13px] tracking-[0.1em] text-[#5E5954] uppercase w-full lg:w-auto text-center lg:text-left block">
          Community Events
        </span>
      </div>

      {/* About Section */}
      <section className="w-full max-w-[1440px] mx-auto px-8 lg:px-[160px] xl:px-[240px] py-20 lg:py-[120px] flex flex-col lg:flex-row items-center gap-16 lg:gap-[120px]">
        
        {/* Left Text */}
        <div className="flex-1 flex flex-col gap-6 lg:gap-8">
          <span className="text-[13px] tracking-[0.2em] text-[#5E5954] uppercase">
            About
          </span>
          <h2 
            className="text-4xl lg:text-[48px] text-[#2D2926] leading-[1.1] font-normal"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Craft of Coffee.
          </h2>
          <p className="text-[16px] text-[#5E5954] leading-[1.6]">
            Every cup we serve is a testament to our dedication. We meticulously source our beans from sustainable farms and roast them in small batches to highlight their unique profiles.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex-1 w-full h-[400px] lg:h-[600px] relative">
          <img 
            src="/img/JszOY.webp" 
            alt="Cafe Illustration" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

      </section>

      {/* Decorative Icon Divider */}
      <div className="w-full h-[40px] lg:h-[120px] flex justify-center items-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#7D6B3D" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C9.5 2 8 4 8 6.5C8 9 9.5 10.5 12 12C14.5 10.5 16 9 16 6.5C16 4 14.5 2 12 2ZM6.5 8C4 8 2 9.5 2 12C2 14.5 4 16 6.5 16C9 16 10.5 14.5 12 12C10.5 9.5 9 8 6.5 8ZM17.5 8C15 8 13.5 9.5 12 12C13.5 14.5 15 16 17.5 16C20 16 22 14.5 22 12C22 9.5 20 8 17.5 8ZM12 12C9.5 13.5 8 15 8 17.5C8 20 9.5 22 12 22C14.5 22 16 20 16 17.5C16 15 14.5 13.5 12 12Z" fillOpacity="0.8"/>
        </svg>
      </div>

      {/* Our Space Section */}
      <section className="w-full max-w-[1440px] mx-auto px-8 lg:px-[160px] xl:px-[240px] py-20 lg:py-[120px] flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-[120px]">
        
        {/* Left Image */}
        <div className="flex-1 w-full h-[400px] lg:h-[600px] relative">
          <img 
            src="/img/LLQjI.webp" 
            alt="Barista pouring coffee" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Text */}
        <div className="flex-1 flex flex-col gap-6 lg:gap-8">
          <span className="text-[13px] tracking-[0.2em] text-[#5E5954] uppercase">
            Our Space
          </span>
          <h2 
            className="text-4xl lg:text-[48px] text-[#2D2926] leading-[1.1] font-normal"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Where Focus Meets Flow.
          </h2>
          <p className="text-[16px] text-[#5E5954] leading-[1.6]">
            Our space is designed for both the casual conversationalist and the dedicated professional. With ample natural light, high-speed wi-fi, and a hum of productivity.
          </p>
        </div>

      </section>

      {/* Footer Section */}
      <footer className="w-full bg-[#2D2926] mt-10 lg:mt-0">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-[160px] xl:px-[240px] py-20 lg:py-[120px] flex flex-col lg:flex-row gap-16 lg:gap-[120px]">
          
          {/* Left Text & CTA */}
          <div className="flex-1 flex flex-col gap-6 lg:gap-8">
            <span className="text-[13px] tracking-[0.2em] text-[#5E5954] uppercase">
              Join Us
            </span>
            <h2 
              className="text-4xl lg:text-[48px] text-[#F5F2E9] leading-[1.1] font-normal"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Become Part of the Routine.
            </h2>
            <p className="text-[16px] text-[#5E5954] leading-[1.6]">
              A space curated for the creative, the professional, and the enthusiast. We bring the community together over exceptional coffee.
            </p>
            <button className="mt-4 px-8 py-4 bg-[#7D6B3D] hover:bg-[#7D6B3D]/90 transition-colors text-white rounded w-fit text-[13px] tracking-[0.1em] uppercase">
              Learn More
            </button>
          </div>

          {/* Right Location & Hours */}
          <div className="flex-1 flex flex-col gap-10 lg:gap-12 lg:pl-10">
            <div className="flex flex-col gap-4">
              <span className="text-[13px] tracking-[0.2em] text-[#5E5954] uppercase">
                Location
              </span>
              <p 
                className="text-2xl lg:text-[24px] text-[#F5F2E9] leading-[1.4]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                123 Main Street<br />Downtown, OK 73102
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[13px] tracking-[0.2em] text-[#5E5954] uppercase">
                Hours
              </span>
              <div className="flex flex-col gap-2">
                <span className="text-[16px] text-[#5E5954]">Mon-Fri: 7am - 6pm</span>
                <span className="text-[16px] text-[#5E5954]">Sat-Sun: 8am - 4pm</span>
              </div>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Cafe;
