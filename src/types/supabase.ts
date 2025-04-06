
import { Database as DatabaseGenerated } from "@/integrations/supabase/types";

export type Database = DatabaseGenerated;

export type Doctor = Database['public']['Tables']['doctors']['Row'];
export type DoctorInsert = Database['public']['Tables']['doctors']['Insert'];
export type DoctorUpdate = Database['public']['Tables']['doctors']['Update'];

export type Service = Database['public']['Tables']['services']['Row']; 
export type ServiceInsert = Database['public']['Tables']['services']['Insert'];
export type ServiceUpdate = Database['public']['Tables']['services']['Update'];

export type Appointment = Database['public']['Tables']['appointments']['Row'];
export type AppointmentInsert = Database['public']['Tables']['appointments']['Insert'];
export type AppointmentUpdate = Database['public']['Tables']['appointments']['Update'];

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type Notification = Database['public']['Tables']['notifications']['Row'];
export type NotificationInsert = Database['public']['Tables']['notifications']['Insert'];
export type NotificationUpdate = Database['public']['Tables']['notifications']['Update'];

export type MedicalRecord = Database['public']['Tables']['medical_records']['Row'];
export type MedicalRecordInsert = Database['public']['Tables']['medical_records']['Insert'];
export type MedicalRecordUpdate = Database['public']['Tables']['medical_records']['Update'];
