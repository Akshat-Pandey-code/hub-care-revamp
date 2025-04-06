
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminUserManager from "@/components/admin/AdminUserManager";
import DoctorsManagement from "@/components/admin/DoctorsManagement";

const StaffManagement = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600">Manage doctors and administrative staff</p>
        </div>

        <div className="space-y-8">
          {/* Admin User Manager */}
          <AdminUserManager />
          
          {/* Doctors Management */}
          <DoctorsManagement />
        </div>
      </div>
    </AdminLayout>
  );
};

export default StaffManagement;
