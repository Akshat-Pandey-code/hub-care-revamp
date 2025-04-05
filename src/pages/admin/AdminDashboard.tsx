
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, Activity, TrendingUp, FileText, Clock, User, AlertCircle } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import StatsCard from "@/components/admin/StatsCard";
import RecentAppointmentsTable from "@/components/admin/RecentAppointmentsTable";
import PatientChart from "@/components/admin/PatientChart";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, Admin!</p>
          </div>
          <div className="flex mt-4 md:mt-0 gap-3">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button>
              <TrendingUp className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            title="Total Patients"
            value="3,254"
            trend="+12%"
            trendType="up"
            icon={<Users className="h-6 w-6 text-purple-500" />}
          />
          <StatsCard 
            title="Today's Appointments"
            value="42"
            trend="+5%"
            trendType="up"
            icon={<Calendar className="h-6 w-6 text-green-500" />}
          />
          <StatsCard 
            title="Available Doctors"
            value="16"
            trend="-2"
            trendType="down"
            icon={<User className="h-6 w-6 text-blue-500" />}
          />
          <StatsCard 
            title="Cancelled Appointments"
            value="7"
            trend="-3%"
            trendType="up"
            icon={<AlertCircle className="h-6 w-6 text-red-500" />}
          />
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Patient Activity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Activity className="mr-2 h-5 w-5 text-purple-500" />
                    Patient Activity
                  </CardTitle>
                  <CardDescription>
                    Patients registered per month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PatientChart />
                </CardContent>
              </Card>

              {/* Department Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
                    Department Statistics
                  </CardTitle>
                  <CardDescription>
                    Appointments by department
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Cardiology", "Neurology", "Pediatrics", "Orthopedics"].map((dept, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{dept}</span>
                          <span className="font-medium">{Math.floor(Math.random() * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Appointments */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="flex items-center text-lg">
                    <Clock className="mr-2 h-5 w-5 text-purple-500" />
                    Recent Appointments
                  </CardTitle>
                  <CardDescription>
                    Latest appointment bookings
                  </CardDescription>
                </div>
                <Link to="/admin/appointments">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <RecentAppointmentsTable />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>Patient Records</CardTitle>
                <CardDescription>
                  Detailed information about all patients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Link to="/admin/patients">
                    <Button>View Patient Records</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Management</CardTitle>
                <CardDescription>
                  Schedule and manage patient appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Link to="/admin/appointments">
                    <Button>Manage Appointments</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="staff">
            <Card>
              <CardHeader>
                <CardTitle>Staff Management</CardTitle>
                <CardDescription>
                  Manage doctors, nurses, and other hospital staff
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Link to="/admin/staff">
                    <Button>Manage Staff</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
