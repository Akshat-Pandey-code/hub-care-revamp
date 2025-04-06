
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Edit, Trash2, Plus, Save, X, Image as ImageIcon } from "lucide-react";
import { Doctor, DoctorInsert } from "@/types/supabase";

const DoctorsManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [newDoctor, setNewDoctor] = useState<DoctorInsert>({
    name: "",
    specialty: "",
    qualification: "",
    experience: 0,
    bio: "",
    image_url: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Query to fetch doctors
  const { data: doctors, isLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .order('name');
      
      if (error) {
        toast({
          title: "Error fetching doctors",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      return data;
    },
  });

  // Mutation to add a doctor
  const addDoctorMutation = useMutation({
    mutationFn: async (newDoctor: DoctorInsert) => {
      // Upload image if provided
      let imageUrl = newDoctor.image_url;
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `doctor-${Date.now()}.${fileExt}`;
        
        // Check if a storage bucket for doctor images exists, create if it doesn't
        const { data: buckets } = await supabase.storage.listBuckets();
        const doctorBucket = buckets?.find(bucket => bucket.name === 'doctors');
        
        if (!doctorBucket) {
          const { error } = await supabase.storage.createBucket('doctors', {
            public: true,
          });
          if (error) throw error;
        }
        
        const { data, error } = await supabase.storage
          .from('doctors')
          .upload(fileName, imageFile);
          
        if (error) throw error;
        
        const { data: urlData } = supabase.storage
          .from('doctors')
          .getPublicUrl(fileName);
          
        imageUrl = urlData.publicUrl;
      }
      
      // Make sure required fields are not undefined or null
      const doctorToInsert: DoctorInsert = {
        name: newDoctor.name || "",
        specialty: newDoctor.specialty || "",
        qualification: newDoctor.qualification || "",
        experience: newDoctor.experience || 0,
        bio: newDoctor.bio,
        image_url: imageUrl,
      };
      
      const { data, error } = await supabase
        .from('doctors')
        .insert(doctorToInsert)
        .select();
        
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      setIsAddDialogOpen(false);
      setImageFile(null);
      setNewDoctor({
        name: "",
        specialty: "",
        qualification: "",
        experience: 0,
        bio: "",
        image_url: "",
      });
      toast({
        title: "Doctor added",
        description: "The doctor has been added successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error adding doctor",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mutation to update a doctor
  const updateDoctorMutation = useMutation({
    mutationFn: async (doctor: Doctor) => {
      // Upload image if provided
      let imageUrl = doctor.image_url;
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `doctor-${Date.now()}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('doctors')
          .upload(fileName, imageFile);
          
        if (error) throw error;
        
        const { data: urlData } = supabase.storage
          .from('doctors')
          .getPublicUrl(fileName);
          
        imageUrl = urlData.publicUrl;
      }
      
      const { data, error } = await supabase
        .from('doctors')
        .update({ ...doctor, image_url: imageUrl })
        .eq('id', doctor.id)
        .select();
        
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      setIsEditDialogOpen(false);
      setSelectedDoctor(null);
      setImageFile(null);
      toast({
        title: "Doctor updated",
        description: "The doctor has been updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating doctor",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mutation to delete a doctor
  const deleteDoctorMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('doctors')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      setIsDeleteDialogOpen(false);
      setSelectedDoctor(null);
      toast({
        title: "Doctor deleted",
        description: "The doctor has been deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting doctor",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAddDoctor = () => {
    addDoctorMutation.mutate(newDoctor);
  };

  const handleUpdateDoctor = () => {
    if (selectedDoctor) {
      updateDoctorMutation.mutate(selectedDoctor);
    }
  };

  const handleDeleteDoctor = () => {
    if (selectedDoctor) {
      deleteDoctorMutation.mutate(selectedDoctor.id);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleOpenEditDialog = (doctor: Doctor) => {
    setSelectedDoctor({ ...doctor });
    setIsEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Doctors</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Doctor
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <svg className="animate-spin h-8 w-8 mx-auto text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 text-gray-600">Loading doctors...</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Qualification</TableHead>
                <TableHead>Experience (Years)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors && doctors.length > 0 ? (
                doctors.map((doctor: Doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell>
                      {doctor.image_url ? (
                        <img 
                          src={doctor.image_url} 
                          alt={doctor.name} 
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{doctor.name}</TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>{doctor.qualification}</TableCell>
                    <TableCell>{doctor.experience}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleOpenEditDialog(doctor)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleOpenDeleteDialog(doctor)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No doctors found. Add one to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add Doctor Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Doctor</DialogTitle>
            <DialogDescription>
              Enter the details of the new doctor.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="specialty" className="text-right">
                Specialty
              </Label>
              <Input
                id="specialty"
                value={newDoctor.specialty}
                onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="qualification" className="text-right">
                Qualification
              </Label>
              <Input
                id="qualification"
                value={newDoctor.qualification}
                onChange={(e) => setNewDoctor({ ...newDoctor, qualification: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experience" className="text-right">
                Experience (Years)
              </Label>
              <Input
                id="experience"
                type="number"
                value={newDoctor.experience}
                onChange={(e) => setNewDoctor({ ...newDoctor, experience: parseInt(e.target.value) || 0 })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={newDoctor.bio || ""}
                onChange={(e) => setNewDoctor({ ...newDoctor, bio: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="button" 
              onClick={handleAddDoctor} 
              disabled={addDoctorMutation.isPending}
            >
              {addDoctorMutation.isPending ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </span>
              ) : (
                <span className="flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Doctor Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Doctor</DialogTitle>
            <DialogDescription>
              Update the doctor's information.
            </DialogDescription>
          </DialogHeader>
          {selectedDoctor && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={selectedDoctor.name}
                  onChange={(e) => setSelectedDoctor({ ...selectedDoctor, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-specialty" className="text-right">
                  Specialty
                </Label>
                <Input
                  id="edit-specialty"
                  value={selectedDoctor.specialty}
                  onChange={(e) => setSelectedDoctor({ ...selectedDoctor, specialty: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-qualification" className="text-right">
                  Qualification
                </Label>
                <Input
                  id="edit-qualification"
                  value={selectedDoctor.qualification}
                  onChange={(e) => setSelectedDoctor({ ...selectedDoctor, qualification: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-experience" className="text-right">
                  Experience (Years)
                </Label>
                <Input
                  id="edit-experience"
                  type="number"
                  value={selectedDoctor.experience}
                  onChange={(e) => setSelectedDoctor({ ...selectedDoctor, experience: parseInt(e.target.value) || 0 })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-bio" className="text-right">
                  Bio
                </Label>
                <Textarea
                  id="edit-bio"
                  value={selectedDoctor.bio || ""}
                  onChange={(e) => setSelectedDoctor({ ...selectedDoctor, bio: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-image" className="text-right">
                  Image
                </Label>
                <div className="col-span-3">
                  {selectedDoctor.image_url && (
                    <div className="mb-2">
                      <img 
                        src={selectedDoctor.image_url} 
                        alt={selectedDoctor.name} 
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    </div>
                  )}
                  <Input
                    id="edit-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="button" 
              onClick={handleUpdateDoctor}
              disabled={updateDoctorMutation.isPending}
            >
              {updateDoctorMutation.isPending ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                <span className="flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  Update
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Doctor Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Doctor</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this doctor? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedDoctor && (
            <div className="py-4">
              <p className="text-center font-semibold text-lg">{selectedDoctor.name}</p>
              <p className="text-center text-gray-500">{selectedDoctor.specialty}</p>
            </div>
          )}
          <DialogFooter className="flex justify-between">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="button" 
              variant="destructive"
              onClick={handleDeleteDoctor}
              disabled={deleteDoctorMutation.isPending}
            >
              {deleteDoctorMutation.isPending ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </span>
              ) : (
                <span className="flex items-center">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorsManagement;
