
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-8 md:gap-12">
          {/* Text Content - Will display below image on mobile */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Your Health Is Our <span className="text-purple-600">Top Priority</span>
            </h1>
            <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto md:mx-0">
              Connect with certified doctors online and receive personalized healthcare from the comfort of your home, 24/7.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2">
                Book Consultation
              </Button>
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-2">
                Learn More
              </Button>
            </div>
          </div>

          {/* Image - Will display above text on mobile */}
          <div className={cn(
            "w-full md:w-1/2",
            "flex justify-center"
          )}>
            <img 
              src="https://img.freepik.com/free-vector/online-doctor-consultation-illustration_88138-414.jpg" 
              alt="Online Doctor Consultation" 
              className="w-full max-w-xl rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
