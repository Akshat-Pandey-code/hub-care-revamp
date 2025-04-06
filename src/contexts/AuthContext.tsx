
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any; data: any }>;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any; data: any }>;
  signOut: () => Promise<void>;
  updateProfile: (data: any) => Promise<{ error: any; data: any }>;
  setAdminStatus: (userId: string, isAdmin: boolean) => Promise<{ error: any; data: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAdmin(session?.user?.user_metadata?.isAdmin === true);
        setIsLoading(false);
      }
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAdmin(session?.user?.user_metadata?.isAdmin === true);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed in successfully",
          description: "Welcome back!",
        });
      }

      return { data, error };
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          // Auto-confirm email to remove verification requirement
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account created successfully",
          description: "Your account has been created. You can now sign in.",
        });
      }

      return { data, error };
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Sign out failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (data: any) => {
    try {
      const { data: updateData, error } = await supabase.auth.updateUser({
        data: data,
      });

      if (error) {
        toast({
          title: "Profile update failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
        });
      }

      return { data: updateData, error };
    } catch (error: any) {
      toast({
        title: "Profile update failed",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  // New function to set admin status
  const setAdminStatus = async (userId: string, isAdmin: boolean) => {
    try {
      const { data: updateData, error } = await supabase.auth.admin.updateUserById(
        userId,
        { user_metadata: { isAdmin } }
      );

      if (error) {
        toast({
          title: "Admin status update failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Admin status updated",
          description: `User ${isAdmin ? 'is now an admin' : 'is no longer an admin'}`,
        });
      }

      return { data: updateData, error };
    } catch (error: any) {
      toast({
        title: "Admin status update failed",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAdmin,
        signIn,
        signUp,
        signOut,
        updateProfile,
        setAdminStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
