
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data
const recentAppointments = [
  {
    id: "AP-0012-3456",
    patientName: "Sarah Johnson",
    doctor: "Dr. Michael Chen",
    specialty: "Cardiology",
    date: "2025-04-06",
    time: "09:30 AM",
    status: "confirmed"
  },
  {
    id: "AP-0012-3457",
    patientName: "Robert Williams",
    doctor: "Dr. Emily Davis",
    specialty: "Neurology",
    date: "2025-04-06",
    time: "10:45 AM",
    status: "pending"
  },
  {
    id: "AP-0012-3458",
    patientName: "Jennifer Brown",
    doctor: "Dr. James Wilson",
    specialty: "Pediatrics",
    date: "2025-04-06",
    time: "01:15 PM",
    status: "confirmed"
  },
  {
    id: "AP-0012-3459",
    patientName: "David Miller",
    doctor: "Dr. Lisa Taylor",
    specialty: "Dermatology",
    date: "2025-04-06",
    time: "03:30 PM",
    status: "canceled"
  },
  {
    id: "AP-0012-3460",
    patientName: "Emily Clark",
    doctor: "Dr. Robert Smith",
    specialty: "Orthopedics",
    date: "2025-04-07",
    time: "11:00 AM",
    status: "confirmed"
  }
];

const RecentAppointmentsTable = () => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentAppointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell className="font-medium">{appointment.id}</TableCell>
              <TableCell>{appointment.patientName}</TableCell>
              <TableCell>
                <div>{appointment.doctor}</div>
                <div className="text-xs text-gray-500">{appointment.specialty}</div>
              </TableCell>
              <TableCell>
                <div>{new Date(appointment.date).toLocaleDateString()}</div>
                <div className="text-xs text-gray-500">{appointment.time}</div>
              </TableCell>
              <TableCell>
                <Badge className={`
                  ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                  ${appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : ''}
                  ${appointment.status === 'canceled' ? 'bg-red-100 text-red-800 hover:bg-red-100' : ''}
                `}>
                  {appointment.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentAppointmentsTable;
