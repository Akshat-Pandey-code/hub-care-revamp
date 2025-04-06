
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/integrations/supabase/types";

export const useRegisterNotification = () => {
  const { toast } = useToast();

  const sendAdminNotification = async (userId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("admin-notification", {
        body: { type: "user_registration", userId },
      });

      if (error) {
        console.error("Error sending admin notification:", error);
      } else {
        console.log("Admin notification sent successfully:", data);
      }
    } catch (error) {
      console.error("Error in notification process:", error);
      toast({
        title: "Notification Error",
        description: "Unable to send registration notification to admin.",
        variant: "destructive",
      });
    }
  };

  return { sendAdminNotification };
};

// Add direct database notification creation function for components that need it
export const createNotification = async (type: string, userId: string, message: string) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert({
        type,
        user_id: userId,
        message
      });
    
    if (error) {
      console.error("Error creating notification:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Exception creating notification:", error);
    return false;
  }
};
