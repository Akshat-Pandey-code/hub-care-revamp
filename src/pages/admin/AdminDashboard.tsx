
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import StatsCard from "@/components/admin/StatsCard";
import PatientChart from "@/components/admin/PatientChart";
import RecentAppointmentsTable from "@/components/admin/RecentAppointmentsTable";
import NotificationsView from "@/components/admin/NotificationsView";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Calendar, 
  ActivitySquare, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome to your admin dashboard</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Patients"
            value="1,257"
            icon={<Users className="h-5 w-5" />}
            description={
              <div className="flex items-center justify-end space-x-1 text-green-500">
                <span>+20%</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            }
          />
          <StatsCard
            title="Appointments"
            value="237"
            icon={<Calendar className="h-5 w-5" />}
            description={
              <div className="flex items-center justify-end space-x-1 text-green-500">
                <span>+12%</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            }
          />
          <StatsCard
            title="New Patients"
            value="45"
            icon={<ActivitySquare className="h-5 w-5" />}
            description={
              <div className="flex items-center justify-end space-x-1 text-green-500">
                <span>+8%</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            }
          />
          <StatsCard
            title="Revenue"
            value="$32,580"
            icon={<DollarSign className="h-5 w-5" />}
            description={
              <div className="flex items-center justify-end space-x-1 text-red-500">
                <span>-4%</span>
                <ArrowDownRight className="h-4 w-4" />
              </div>
            }
          />
        </div>

        {/* Main Content - Split into Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - 2/3 Width */}
          <div className="lg:col-span-2 space-y-8">
            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Trends</CardTitle>
                <CardDescription>
                  Monthly patient counts for the current year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PatientChart />
              </CardContent>
            </Card>

            {/* Appointments */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Appointments</CardTitle>
                <CardDescription>
                  Recent patient appointments and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentAppointmentsTable />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - 1/3 Width */}
          <div className="space-y-8">
            {/* Notifications */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Activity Feed</CardTitle>
                <CardDescription>
                  Recent notifications and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NotificationsView />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors">
                    <span className="block font-medium mb-1">Add Doctor</span>
                    <span className="text-xs text-gray-500">Add a new doctor to the system</span>
                  </button>
                  <button className="p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors">
                    <span className="block font-medium mb-1">Add Patient</span>
                    <span className="text-xs text-gray-500">Register a new patient</span>
                  </button>
                  <button className="p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors">
                    <span className="block font-medium mb-1">Schedule</span>
                    <span className="text-xs text-gray-500">Manage appointment schedule</span>
                  </button>
                  <button className="p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors">
                    <span className="block font-medium mb-1">Reports</span>
                    <span className="text-xs text-gray-500">Generate system reports</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
