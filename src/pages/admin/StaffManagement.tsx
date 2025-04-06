
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
import { Filter, Search, UserPlus, Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample staff data
const staffData = [
  {
    id: "D001",
    name: "Dr. Michael Chen",
    role: "Doctor",
    department: "Cardiology",
    email: "michael.chen@healhub.com",
    phone: "123-456-7890",
    joinDate: "2023-01-15",
    status: "active",
    avatar: "https://ui.shadcn.com/avatars/01.png"
  },
  {
    id: "D002",
    name: "Dr. Emily Davis",
    role: "Doctor",
    department: "Neurology",
    email: "emily.davis@healhub.com",
    phone: "123-456-7891",
    joinDate: "2023-02-20",
    status: "active",
    avatar: "https://ui.shadcn.com/avatars/02.png"
  },
  {
    id: "N001",
    name: "Sarah Johnson",
    role: "Nurse",
    department: "Pediatrics",
    email: "sarah.johnson@healhub.com",
    phone: "123-456-7892",
    joinDate: "2023-03-10",
    status: "active",
    avatar: "https://ui.shadcn.com/avatars/03.png"
  },
  {
    id: "D003",
    name: "Dr. James Wilson",
    role: "Doctor",
    department: "Pediatrics",
    email: "james.wilson@healhub.com",
    phone: "123-456-7893",
    joinDate: "2023-01-05",
    status: "active",
    avatar: "https://ui.shadcn.com/avatars/04.png"
  },
  {
    id: "D004",
    name: "Dr. Lisa Taylor",
    role: "Doctor",
    department: "Dermatology",
    email: "lisa.taylor@healhub.com",
    phone: "123-456-7894",
    joinDate: "2023-04-12",
    status: "leave",
    avatar: "https://ui.shadcn.com/avatars/05.png"
  },
  {
    id: "N002",
    name: "Robert Smith",
    role: "Nurse",
    department: "Emergency",
    email: "robert.smith@healhub.com",
    phone: "123-456-7895",
    joinDate: "2023-02-15",
    status: "active",
    avatar: "https://ui.shadcn.com/avatars/06.png"
  },
  {
    id: "A001",
    name: "Jennifer Brown",
    role: "Admin Staff",
    department: "Administration",
    email: "jennifer.brown@healhub.com",
    phone: "123-456-7896",
    joinDate: "2023-01-20",
    status: "active",
    avatar: "https://ui.shadcn.com/avatars/07.png"
  },
  {
    id: "D005",
    name: "Dr. David Miller",
    role: "Doctor",
    department: "Orthopedics",
    email: "david.miller@healhub.com",
    phone: "123-456-7897",
    joinDate: "2023-03-05",
    status: "inactive",
    avatar: "https://ui.shadcn.com/avatars/08.png"
  }
];

const StaffManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStaff, setFilteredStaff] = useState(staffData);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term === "") {
      setFilteredStaff(staffData);
    } else {
      const results = staffData.filter(staff => 
        staff.name.toLowerCase().includes(term.toLowerCase()) ||
        staff.department.toLowerCase().includes(term.toLowerCase()) ||
        staff.role.toLowerCase().includes(term.toLowerCase()) ||
        staff.id.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredStaff(results);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
            <p className="text-gray-600">Manage hospital staff and personnel</p>
          </div>
          <div className="flex mt-4 md:mt-0 gap-3">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Staff Member
            </Button>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Staff Directory</CardTitle>
            <CardDescription>
              View and manage all hospital staff members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search by name, department, role..." 
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
                    <TableHead>Staff ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">{staff.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={staff.avatar} />
                            <AvatarFallback>{getInitials(staff.name)}</AvatarFallback>
                          </Avatar>
                          <span>{staff.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{staff.role}</TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" /> {staff.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm mt-1">
                          <Phone className="h-3 w-3" /> {staff.phone}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(staff.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={`
                          ${staff.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                          ${staff.status === 'leave' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : ''}
                          ${staff.status === 'inactive' ? 'bg-gray-100 text-gray-800 hover:bg-gray-100' : ''}
                        `}>
                          {staff.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View Profile</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredStaff.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No staff members found matching your search.
              </div>
            )}
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Showing {filteredStaff.length} of {staffData.length} staff members
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

export default StaffManagement;
