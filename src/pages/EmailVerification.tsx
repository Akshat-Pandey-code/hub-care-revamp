
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, CheckCircle2, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const EmailVerification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [email] = useState("user@example.com"); // In a real app, this would come from auth context
  
  const handleResendCode = () => {
    toast({
      title: "Verification Code Sent",
      description: `A new verification code has been sent to ${email}`,
    });
  };
  
  const handleVerify = () => {
    if (!verificationCode) {
      toast({
        title: "Error",
        description: "Please enter the verification code",
        variant: "destructive",
      });
      return;
    }
    
    setIsVerifying(true);
    
    // Mock verification - in a real app, this would call an API
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      
      toast({
        title: "Email Verified",
        description: "Your email has been successfully verified",
      });
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            {isVerified ? (
              <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
            ) : (
              <Mail className="mx-auto h-16 w-16 text-purple-500 mb-4" />
            )}
            <CardTitle className="text-2xl">
              {isVerified ? "Email Verified" : "Verify Your Email"}
            </CardTitle>
            <CardDescription>
              {isVerified 
                ? "Thank you for verifying your email address. You're all set!" 
                : `We've sent a verification code to ${email}. Please enter it below to verify your account.`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isVerified && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Verification Code</label>
                  <Input 
                    type="text" 
                    placeholder="Enter your verification code" 
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>
                <div className="text-sm text-center text-gray-500">
                  Didn't receive a code? 
                  <button 
                    onClick={handleResendCode}
                    className="text-purple-600 hover:text-purple-700 font-medium ml-1"
                  >
                    Resend code
                  </button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            {isVerified ? (
              <Button onClick={() => navigate("/profile")}>
                Go to Profile
              </Button>
            ) : (
              <Button 
                onClick={handleVerify} 
                disabled={isVerifying}
                className="w-full"
              >
                {isVerifying && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                {isVerifying ? "Verifying..." : "Verify Email"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default EmailVerification;
