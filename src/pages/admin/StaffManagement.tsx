
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DoctorsManagement from "@/components/admin/DoctorsManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StaffManagement = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600">Add, edit and manage doctors and staff members</p>
        </div>

        <Tabs defaultValue="doctors" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="nurses">Nurses</TabsTrigger>
            <TabsTrigger value="administrative">Administrative Staff</TabsTrigger>
          </TabsList>
          <TabsContent value="doctors">
            <DoctorsManagement />
          </TabsContent>
          <TabsContent value="nurses">
            <div className="p-8 text-center text-gray-500 border rounded-lg">
              <p>Nurse management functionality will be implemented in a future update.</p>
            </div>
          </TabsContent>
          <TabsContent value="administrative">
            <div className="p-8 text-center text-gray-500 border rounded-lg">
              <p>Administrative staff management functionality will be implemented in a future update.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default StaffManagement;
