
import React from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <Hero />
      
      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Services</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            We offer a comprehensive range of healthcare services tailored to meet your needs.
            Our team of medical professionals is committed to providing high-quality care.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {["Online Consultation", "Emergency Care", "Mental Health Support"].map((service, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-purple-700 mb-3">{service}</h3>
                <p className="text-gray-600 mb-4">
                  Professional healthcare services available 24/7 to meet your medical needs.
                </p>
                <Link to="/services">
                  <Button variant="outline" size="sm">Learn More</Button>
                </Link>
              </div>
            ))}
          </div>
          <Link to="/services">
            <Button className="bg-purple-600 hover:bg-purple-700">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Doctors Section */}
      <section id="doctors" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Doctors</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Meet our team of experienced and dedicated healthcare professionals.
            Each doctor brings expertise and compassion to every patient interaction.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {[1, 2, 3, 4].map((doctor) => (
              <div key={doctor} className="bg-white p-4 rounded-lg shadow">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-gray-900">Dr. Jane Smith</h3>
                <p className="text-purple-600 mb-2">Cardiologist</p>
                <p className="text-gray-500 text-sm mb-4">10+ years of experience</p>
                <Link to="/doctors">
                  <Button variant="outline" size="sm">View Profile</Button>
                </Link>
              </div>
            ))}
          </div>
          <Link to="/doctors">
            <Button className="bg-purple-600 hover:bg-purple-700">
              View All Doctors
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Appointment Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Book an Appointment</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Ready to schedule a visit? Book an appointment with one of our healthcare professionals today.
            We offer flexible scheduling to accommodate your needs.
          </p>
          <Link to="/appointments">
            <Button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 text-lg">
              Schedule Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
