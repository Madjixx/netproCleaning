import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  service_type: string;
  address: string;
  message: string;
}

const getServiceTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    'end_construction': 'Fin de chantier',
    'residence': 'Résidence',
    'office': 'Entreprise et bureau',
    'commercial': 'Commerce et établissement'
  };
  return labels[type] || type;
};

const createEmailHTML = (quote: QuoteRequest): string => {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle demande de devis - NetPro Cleaning</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f7fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

          <!-- Header avec gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                ✨ Nouvelle Demande de Devis
              </h1>
              <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">
                NetPro Cleaning
              </p>
            </td>
          </tr>

          <!-- Contenu principal -->
          <tr>
            <td style="padding: 40px 30px;">

              <!-- Badge service -->
              <div style="text-align: center; margin-bottom: 30px;">
                <span style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); color: white; padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: 600;">
                  ${getServiceTypeLabel(quote.service_type)}
                </span>
              </div>

              <!-- Informations client -->
              <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h2 style="margin: 0 0 15px 0; color: #1e293b; font-size: 18px; font-weight: 600;">
                  👤 Informations du client
                </h2>
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 8px 0;">
                      <strong style="color: #475569; font-size: 14px;">Nom :</strong>
                      <span style="color: #1e293b; font-size: 14px; margin-left: 10px;">${quote.name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <strong style="color: #475569; font-size: 14px;">Email :</strong>
                      <a href="mailto:${quote.email}" style="color: #3b82f6; text-decoration: none; font-size: 14px; margin-left: 10px;">${quote.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">
                      <strong style="color: #475569; font-size: 14px;">Téléphone :</strong>
                      <a href="tel:${quote.phone}" style="color: #3b82f6; text-decoration: none; font-size: 14px; margin-left: 10px;">${quote.phone}</a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Adresse du service -->
              <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h2 style="margin: 0 0 10px 0; color: #1e293b; font-size: 18px; font-weight: 600;">
                  📍 Adresse du service
                </h2>
                <p style="margin: 0; color: #1e293b; font-size: 14px; line-height: 1.6;">
                  ${quote.address}
                </p>
              </div>

              <!-- Message -->
              ${quote.message ? `
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h2 style="margin: 0 0 10px 0; color: #1e293b; font-size: 18px; font-weight: 600;">
                  💬 Message
                </h2>
                <p style="margin: 0; color: #1e293b; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
                  ${quote.message}
                </p>
              </div>
              ` : ''}

              <!-- Call to action -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${quote.email}" style="display: inline-block; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
                  Répondre au client
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px 0; color: #64748b; font-size: 13px;">
                NetPro Cleaning - Service de nettoyage professionnel
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                📧 contact@netprocleaning.be | 📱 0477 20 99 89
              </p>
              <p style="margin: 10px 0 0 0; color: #cbd5e1; font-size: 11px;">
                Cette demande a été envoyée depuis le formulaire de contact du site web
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

// Fonction pour extraire l'IP du client
const getClientIP = (req: Request): string => {
  // Essayer différents headers utilisés par les proxies
  const xForwardedFor = req.headers.get('x-forwarded-for');
  const xRealIp = req.headers.get('x-real-ip');
  const cfConnectingIp = req.headers.get('cf-connecting-ip'); // Cloudflare
  
  if (xForwardedFor) {
    // x-forwarded-for peut contenir plusieurs IPs, prendre la première
    return xForwardedFor.split(',')[0].trim();
  }
  
  if (xRealIp) {
    return xRealIp;
  }
  
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  
  return 'unknown';
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const quoteData: QuoteRequest = await req.json();

    // Validation des données
    if (!quoteData.name || !quoteData.email || !quoteData.phone || 
        !quoteData.service_type || !quoteData.address) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Validation de l'email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(quoteData.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid email format",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Validation du service_type
    const validServiceTypes = ['end_construction', 'residence', 'office', 'commercial'];
    if (!validServiceTypes.includes(quoteData.service_type)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid service type",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Récupérer l'IP du client et le user agent
    const clientIP = getClientIP(req);
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Initialiser Supabase avec la clé service_role pour bypasser RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase configuration missing");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Vérifier le rate limit via la fonction SQL
    const { data: rateLimitCheck, error: rateLimitError } = await supabase
      .rpc('check_quote_rate_limit', {
        p_ip_address: clientIP,
        p_email: quoteData.email,
        p_limit_per_hour: 3,
        p_limit_per_day: 10
      });

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
      // Continue même en cas d'erreur de rate limit (fail open)
    }

    if (rateLimitCheck === false) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Rate limit exceeded. Please try again later.",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 429,
        }
      );
    }

    // Insérer la demande dans la base de données avec IP et user agent
    const { data: insertData, error: insertError } = await supabase
      .from('quote_requests')
      .insert([{
        ...quoteData,
        ip_address: clientIP,
        user_agent: userAgent
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw new Error(`Database error: ${insertError.message}`);
    }

    // Envoyer l'email via Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      // Retourner succès quand même car la demande est dans la DB
      return new Response(
        JSON.stringify({ 
          success: true, 
          id: insertData.id,
          warning: "Quote saved but email notification failed"
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    const emailHTML = createEmailHTML(quoteData);

    const emailData = {
      from: "NetPro Cleaning <onboarding@resend.dev>",
      to: ["contact@netprocleaning.be"],
      subject: `Nouvelle demande de devis - ${getServiceTypeLabel(quoteData.service_type)} - ${quoteData.name}`,
      html: emailHTML,
      reply_to: quoteData.email
    };

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailData),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Resend API error:", errorData);
      // Retourner succès quand même car la demande est dans la DB
      return new Response(
        JSON.stringify({ 
          success: true, 
          id: insertData.id,
          warning: "Quote saved but email notification failed"
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    const emailResult = await emailResponse.json();

    return new Response(
      JSON.stringify({ 
        success: true, 
        id: insertData.id,
        messageId: emailResult.id 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Error in send-quote-email function:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});