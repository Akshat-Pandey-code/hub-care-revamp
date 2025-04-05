
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
import { Filter, Search, UserPlus, FileText, UserCog } from "lucide-react";

// Sample patient data
const patientData = [
  {
    id: "P1001",
    name: "John Smith",
    age: 45,
    gender: "Male",
    contactNumber: "123-456-7890",
    email: "john.smith@example.com",
    lastVisit: "2025-03-28",
    status: "active"
  },
  {
    id: "P1002",
    name: "Emma Johnson",
    age: 32,
    gender: "Female",
    contactNumber: "123-456-7891",
    email: "emma.johnson@example.com",
    lastVisit: "2025-04-01",
    status: "active"
  },
  {
    id: "P1003",
    name: "Michael Brown",
    age: 58,
    gender: "Male",
    contactNumber: "123-456-7892",
    email: "michael.brown@example.com",
    lastVisit: "2025-02-15",
    status: "inactive"
  },
  {
    id: "P1004",
    name: "Sophia Williams",
    age: 29,
    gender: "Female",
    contactNumber: "123-456-7893",
    email: "sophia.williams@example.com",
    lastVisit: "2025-04-03",
    status: "active"
  },
  {
    id: "P1005",
    name: "Daniel Jones",
    age: 41,
    gender: "Male",
    contactNumber: "123-456-7894",
    email: "daniel.jones@example.com",
    lastVisit: "2025-03-20",
    status: "active"
  },
  {
    id: "P1006",
    name: "Olivia Davis",
    age: 36,
    gender: "Female",
    contactNumber: "123-456-7895",
    email: "olivia.davis@example.com",
    lastVisit: "2025-01-10",
    status: "inactive"
  },
  {
    id: "P1007",
    name: "James Wilson",
    age: 52,
    gender: "Male",
    contactNumber: "123-456-7896",
    email: "james.wilson@example.com",
    lastVisit: "2025-04-02",
    status: "active"
  }
];

const PatientRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(patientData);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term === "") {
      setFilteredPatients(patientData);
    } else {
      const results = patientData.filter(patient => 
        patient.name.toLowerCase().includes(term.toLowerCase()) ||
        patient.email.toLowerCase().includes(term.toLowerCase()) ||
        patient.id.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredPatients(results);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Records</h1>
            <p className="text-gray-600">Manage and view patient information</p>
          </div>
          <div className="flex mt-4 md:mt-0 gap-3">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Patient
            </Button>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Patient Database</CardTitle>
            <CardDescription>
              Search and manage all registered patients in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search patients by name, email, or ID..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age/Gender</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.id}</TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>
                        {patient.age} / {patient.gender}
                      </TableCell>
                      <TableCell>
                        <div>{patient.contactNumber}</div>
                        <div className="text-xs text-gray-500">{patient.email}</div>
                      </TableCell>
                      <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={`
                          ${patient.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                          ${patient.status === 'inactive' ? 'bg-gray-100 text-gray-800 hover:bg-gray-100' : ''}
                        `}>
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <button className="p-1 text-blue-600 hover:text-blue-800">
                            <FileText className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-purple-600 hover:text-purple-800">
                            <UserCog className="h-4 w-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredPatients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No patients found matching your search.
              </div>
            )}
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Showing {filteredPatients.length} of {patientData.length} patients
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default PatientRecords;
