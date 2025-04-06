
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle CORS preflight requests
const handleCors = (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
};

serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const requestUrl = new URL(req.url);
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the request body
    const requestData = await req.json();
    const { type, userId } = requestData;

    if (!type || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Get user information
    const { data: userData, error: userError } = await supabase
      .auth
      .admin
      .getUserById(userId);

    if (userError) {
      return new Response(
        JSON.stringify({ error: userError.message }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Create notification in the database
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert({
        type,
        user_id: userId,
        message: `New user registered: ${userData.user.email}`,
      });

    if (notificationError) {
      return new Response(
        JSON.stringify({ error: notificationError.message }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // In a real application, you would send an email here using a service like SendGrid or Mailgun
    console.log(`NOTIFICATION: ${type} - User ${userData.user.email} (${userId}) registered`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Notification created successfully",
        user: userData.user.email
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
