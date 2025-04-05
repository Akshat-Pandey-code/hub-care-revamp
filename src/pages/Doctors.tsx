
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

const Doctors = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. Jane Smith",
      specialty: "Cardiologist",
      experience: "10+ years",
      description: "Specializes in diagnosing and treating heart conditions",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Pediatrician",
      experience: "8 years",
      description: "Focused on children's health and preventive care",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Dr. Sarah Johnson",
      specialty: "Dermatologist",
      experience: "12 years",
      description: "Expert in skin health and cosmetic procedures",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Dr. Robert Davis",
      specialty: "Neurologist",
      experience: "15 years",
      description: "Specializes in disorders of the nervous system",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Dr. Lisa Rodriguez",
      specialty: "Psychiatrist",
      experience: "9 years",
      description: "Mental health specialist with focus on therapy and medication management",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      experience: "14 years",
      description: "Expert in musculoskeletal conditions and surgical interventions",
      imageUrl: "/placeholder.svg"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Doctors</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Our team of highly qualified doctors is dedicated to providing exceptional healthcare services. 
          Book an appointment with one of our specialists today.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <img src={doctor.imageUrl} alt={doctor.name} />
                  </Avatar>
                  <h3 className="text-xl font-semibold text-purple-700">{doctor.name}</h3>
                  <p className="text-purple-600 mb-2">{doctor.specialty}</p>
                  <p className="text-gray-500 text-sm mb-2">{doctor.experience} of experience</p>
                  <p className="text-gray-600">{doctor.description}</p>
                  <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
                    Book Appointment
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

export default Doctors;
