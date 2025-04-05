
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, HeartPulse, Stethoscope, Users, Brain, Baby } from "lucide-react";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Online Consultation",
      description: "Connect with our doctors remotely through secure video calls for non-emergency medical advice and treatment recommendations.",
      icon: <Stethoscope className="h-12 w-12 text-purple-600" />
    },
    {
      id: 2,
      title: "Emergency Care",
      description: "24/7 emergency medical services with quick response times for critical situations requiring immediate attention.",
      icon: <HeartPulse className="h-12 w-12 text-purple-600" />
    },
    {
      id: 3,
      title: "Mental Health Support",
      description: "Comprehensive mental health services including therapy, counseling, and psychiatric care for various conditions.",
      icon: <Brain className="h-12 w-12 text-purple-600" />
    },
    {
      id: 4,
      title: "Family Medicine",
      description: "Preventive care, routine check-ups, and treatment for the whole family, from infants to elderly patients.",
      icon: <Users className="h-12 w-12 text-purple-600" />
    },
    {
      id: 5,
      title: "Pediatric Care",
      description: "Specialized healthcare for children, including regular check-ups, vaccinations, and treatment for childhood illnesses.",
      icon: <Baby className="h-12 w-12 text-purple-600" />
    },
    {
      id: 6,
      title: "Health Screenings",
      description: "Comprehensive health assessments and screenings to detect potential health issues early for better treatment outcomes.",
      icon: <Calendar className="h-12 w-12 text-purple-600" />
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Services</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          We offer a wide range of healthcare services to meet your medical needs. 
          Our professional team is dedicated to providing high-quality care for you and your family.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-purple-700 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                  <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
                    Learn More
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Services;
