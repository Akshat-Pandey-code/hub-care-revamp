
import React from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";

const Index = () => {
  return (
    <Layout>
      <Hero />
      
      {/* Services Section (placeholder) */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Online Consultation", "Emergency Care", "Mental Health Support"].map((service, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-purple-700 mb-3">{service}</h3>
                <p className="text-gray-600">
                  Professional healthcare services available 24/7 to meet your medical needs.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Doctors Section (placeholder) */}
      <section id="doctors" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((doctor) => (
              <div key={doctor} className="bg-white p-4 rounded-lg shadow">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-gray-900">Dr. Jane Smith</h3>
                <p className="text-purple-600 mb-2">Cardiologist</p>
                <p className="text-gray-500 text-sm">10+ years of experience in treating heart conditions.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section (placeholder) */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Have any questions? Reach out to our customer support team and we'll get back to you as soon as possible.
          </p>
          <div className="flex justify-center">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
