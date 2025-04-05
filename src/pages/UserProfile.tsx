
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, FileText, Settings, Shield, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    dob: "1990-01-01",
    bloodType: "O+",
    allergies: "None",
  });
  
  const [emailVerified, setEmailVerified] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
      variant: "default",
    });
  };

  const handleResendVerification = () => {
    toast({
      title: "Verification Email Sent",
      description: "Please check your inbox for the verification link.",
      variant: "default",
    });
  };

  const handleVerifyNow = () => {
    // This would usually redirect to the verification page
    // For demo, we'll just set it as verified
    setEmailVerified(true);
    toast({
      title: "Email Verified",
      description: "Your email has been successfully verified.",
      variant: "default",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{formData.fullName}</h2>
                <p className="text-muted-foreground mb-4">Patient ID: #12345</p>
                
                {!emailVerified && (
                  <div className="w-full bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4 text-sm text-yellow-800">
                    Your email is not verified. 
                    <button 
                      onClick={handleVerifyNow}
                      className="ml-1 underline text-yellow-900 font-medium"
                    >
                      Verify now
                    </button>
                  </div>
                )}
                
                <div className="w-full mt-4 space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    My Appointments
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Medical Records
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile">
              <TabsList className="mb-8">
                <TabsTrigger value="profile">Profile Information</TabsTrigger>
                <TabsTrigger value="medical">Medical History</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Manage your personal details and contact information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        {isEditing ? (
                          <Input 
                            name="fullName" 
                            value={formData.fullName} 
                            onChange={handleChange} 
                          />
                        ) : (
                          <div className="p-2 border rounded-md">{formData.fullName}</div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <div className="flex items-center gap-2">
                          {isEditing ? (
                            <Input 
                              name="email" 
                              value={formData.email} 
                              onChange={handleChange} 
                              type="email"
                            />
                          ) : (
                            <div className="p-2 border rounded-md flex-1">{formData.email}</div>
                          )}
                          {emailVerified ? (
                            <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-green-50 border border-green-200 text-green-700">
                              <Shield className="h-3 w-3 mr-1" /> Verified
                            </span>
                          ) : (
                            <button 
                              onClick={handleResendVerification}
                              className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700"
                            >
                              Verify
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        {isEditing ? (
                          <Input 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                          />
                        ) : (
                          <div className="p-2 border rounded-md">{formData.phone}</div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Date of Birth</label>
                        {isEditing ? (
                          <Input 
                            name="dob" 
                            value={formData.dob} 
                            onChange={handleChange} 
                            type="date"
                          />
                        ) : (
                          <div className="p-2 border rounded-md">{formData.dob}</div>
                        )}
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">Address</label>
                        {isEditing ? (
                          <Input 
                            name="address" 
                            value={formData.address} 
                            onChange={handleChange} 
                          />
                        ) : (
                          <div className="p-2 border rounded-md">{formData.address}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    {isEditing ? (
                      <>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save Changes</Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                    )}
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="medical">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Information</CardTitle>
                    <CardDescription>
                      Your important medical information that doctors might need to know.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Blood Type</label>
                        <div className="p-2 border rounded-md">{formData.bloodType}</div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Allergies</label>
                        <div className="p-2 border rounded-md">{formData.allergies}</div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Recent Appointments</h3>
                      <div className="text-sm text-gray-500">
                        No recent appointments found.
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Medical Records</h3>
                      <div className="text-sm text-gray-500">
                        No medical records available. Please contact your doctor to get access to your medical records.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security and access settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Change Password</label>
                      <div className="grid grid-cols-1 gap-4">
                        <Input type="password" placeholder="Current Password" />
                        <Input type="password" placeholder="New Password" />
                        <Input type="password" placeholder="Confirm New Password" />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button>Update Password</Button>
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                      <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
