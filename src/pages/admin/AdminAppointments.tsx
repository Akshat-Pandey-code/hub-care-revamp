
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Search, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample appointment data
const appointmentData = [
  {
    id: "AP-0012-3456",
    patientName: "Sarah Johnson",
    patientId: "P1001",
    doctor: "Dr. Michael Chen",
    specialty: "Cardiology",
    date: "2025-04-06",
    time: "09:30 AM",
    status: "confirmed",
    type: "Check-up"
  },
  {
    id: "AP-0012-3457",
    patientName: "Robert Williams",
    patientId: "P1002",
    doctor: "Dr. Emily Davis",
    specialty: "Neurology",
    date: "2025-04-06",
    time: "10:45 AM",
    status: "pending",
    type: "Consultation"
  },
  {
    id: "AP-0012-3458",
    patientName: "Jennifer Brown",
    patientId: "P1003",
    doctor: "Dr. James Wilson",
    specialty: "Pediatrics",
    date: "2025-04-06",
    time: "01:15 PM",
    status: "confirmed",
    type: "Follow-up"
  },
  {
    id: "AP-0012-3459",
    patientName: "David Miller",
    patientId: "P1004",
    doctor: "Dr. Lisa Taylor",
    specialty: "Dermatology",
    date: "2025-04-06",
    time: "03:30 PM",
    status: "canceled",
    type: "Procedure"
  },
  {
    id: "AP-0012-3460",
    patientName: "Emily Clark",
    patientId: "P1005",
    doctor: "Dr. Robert Smith",
    specialty: "Orthopedics",
    date: "2025-04-07",
    time: "11:00 AM",
    status: "confirmed",
    type: "Surgery"
  },
  {
    id: "AP-0012-3461",
    patientName: "Michael Brown",
    patientId: "P1006",
    doctor: "Dr. Sarah Johnson",
    specialty: "General Medicine",
    date: "2025-04-07",
    time: "02:30 PM",
    status: "pending",
    type: "Check-up"
  },
  {
    id: "AP-0012-3462",
    patientName: "Jessica White",
    patientId: "P1007",
    doctor: "Dr. David Miller",
    specialty: "Ophthalmology",
    date: "2025-04-08",
    time: "10:15 AM",
    status: "confirmed",
    type: "Consultation"
  },
  {
    id: "AP-0012-3463",
    patientName: "Daniel Jones",
    patientId: "P1008",
    doctor: "Dr. Jennifer Brown",
    specialty: "Cardiology",
    date: "2025-04-08",
    time: "03:45 PM",
    status: "pending",
    type: "Follow-up"
  }
];

const AdminAppointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredAppointments, setFilteredAppointments] = useState(appointmentData);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterAppointments(term, statusFilter);
  };
  
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    filterAppointments(searchTerm, value);
  };
  
  const filterAppointments = (term: string, status: string) => {
    let results = appointmentData;
    
    // Filter by search term
    if (term !== "") {
      results = results.filter(appointment => 
        appointment.patientName.toLowerCase().includes(term.toLowerCase()) ||
        appointment.doctor.toLowerCase().includes(term.toLowerCase()) ||
        appointment.id.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    // Filter by status
    if (status !== "all") {
      results = results.filter(appointment => appointment.status === status);
    }
    
    setFilteredAppointments(results);
  };
  
  const updateAppointmentStatus = (id: string, newStatus: string) => {
    // In a real app, this would update the database
    const updatedAppointments = filteredAppointments.map(appointment => {
      if (appointment.id === id) {
        return { ...appointment, status: newStatus };
      }
      return appointment;
    });
    
    setFilteredAppointments(updatedAppointments);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="text-gray-600">Manage and schedule patient appointments</p>
          </div>
          <div className="flex mt-4 md:mt-0 gap-3">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Calendar View
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Appointment Management</CardTitle>
            <CardDescription>
              View, update, and manage all scheduled appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search by patient, doctor, or ID..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="canceled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.id}</TableCell>
                      <TableCell>
                        <div>{appointment.patientName}</div>
                        <div className="text-xs text-gray-500">ID: {appointment.patientId}</div>
                      </TableCell>
                      <TableCell>
                        <div>{appointment.doctor}</div>
                        <div className="text-xs text-gray-500">{appointment.specialty}</div>
                      </TableCell>
                      <TableCell>
                        <div>{new Date(appointment.date).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500">{appointment.time}</div>
                      </TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>
                        <Badge className={`
                          ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                          ${appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : ''}
                          ${appointment.status === 'canceled' ? 'bg-red-100 text-red-800 hover:bg-red-100' : ''}
                        `}>
                          {appointment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {appointment.status === 'pending' && (
                            <>
                              <button 
                                className="p-1 text-green-600 hover:text-green-800" 
                                onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                              >
                                <Check className="h-4 w-4" />
                              </button>
                              <button 
                                className="p-1 text-red-600 hover:text-red-800"
                                onClick={() => updateAppointmentStatus(appointment.id, 'canceled')}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          <Button variant="outline" size="sm">Details</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredAppointments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No appointments found matching your criteria.
              </div>
            )}
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Showing {filteredAppointments.length} of {appointmentData.length} appointments
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="ml-1">Previous</span>
                </Button>
                <Button variant="outline" size="sm">
                  <span className="mr-1">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAppointments;
