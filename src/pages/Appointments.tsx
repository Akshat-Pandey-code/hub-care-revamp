
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const Appointments = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [doctor, setDoctor] = useState("");
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !doctor || !service || !name || !email || !phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send data to a backend
    toast({
      title: "Appointment Booked",
      description: `Your appointment with ${doctor} on ${date.toDateString()} has been scheduled.`,
    });
    
    // Reset form
    setDate(undefined);
    setDoctor("");
    setService("");
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Book an Appointment</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Schedule an appointment with our healthcare professionals. Fill out the form below and we'll confirm your booking shortly.
        </p>
        
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="John Doe" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="john@example.com" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      placeholder="(123) 456-7890" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Select Service</Label>
                    <Select value={service} onValueChange={setService} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online-consultation">Online Consultation</SelectItem>
                        <SelectItem value="emergency-care">Emergency Care</SelectItem>
                        <SelectItem value="mental-health">Mental Health Support</SelectItem>
                        <SelectItem value="family-medicine">Family Medicine</SelectItem>
                        <SelectItem value="pediatric-care">Pediatric Care</SelectItem>
                        <SelectItem value="health-screening">Health Screening</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Select Doctor</Label>
                    <Select value={doctor} onValueChange={setDoctor} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-jane-smith">Dr. Jane Smith (Cardiologist)</SelectItem>
                        <SelectItem value="dr-michael-chen">Dr. Michael Chen (Pediatrician)</SelectItem>
                        <SelectItem value="dr-sarah-johnson">Dr. Sarah Johnson (Dermatologist)</SelectItem>
                        <SelectItem value="dr-robert-davis">Dr. Robert Davis (Neurologist)</SelectItem>
                        <SelectItem value="dr-lisa-rodriguez">Dr. Lisa Rodriguez (Psychiatrist)</SelectItem>
                        <SelectItem value="dr-james-wilson">Dr. James Wilson (Orthopedic Surgeon)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Select Date</Label>
                  <div className="border rounded-md p-4">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="mx-auto"
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  Book Appointment
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Appointments;
