import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Initialize Resend inside the function to avoid build-time errors
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    
    const body = await request.json();
    const { fullName, role, contact, email, serviceType, country, dateOfShoot, howDidYouKnow, whatDrawsYou } = body;

    // Validate required fields
    if (!fullName || !role || !contact || !email || !serviceType || !country || !dateOfShoot || !howDidYouKnow || !whatDrawsYou) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Gido Photography <onboarding@resend.dev>",
      to: 'gidowilly1@gmail.com',
      subject: `New Booking Inquiry: ${serviceType}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #f0f4f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f4f8; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background-color: #0891b2; padding: 40px 30px; text-align: center;">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 15px;">
                          <path d="M9 11l3 3L22 4"></path>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                          New Booking Inquiry
                        </h1>
                        <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                          Gido Photography Booking Form
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="margin: 0 0 25px 0; color: #64748b; font-size: 15px; line-height: 1.6;">
                          You've received a new booking inquiry from your website.
                        </p>
                        
                        <!-- Booking Details -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                          <tr>
                            <td style="padding: 20px; background-color: #f1f5f9; border-left: 4px solid #0891b2; border-radius: 4px;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <!-- Full Name -->
                                <tr>
                                  <td style="padding-bottom: 18px;">
                                    <table cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td style="padding-right: 10px; vertical-align: top;">
                                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0891b2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                          </svg>
                                        </td>
                                        <td>
                                          <span style="display: block; color: #0891b2; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Full Name</span>
                                          <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 500;">${fullName}</p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                
                                <!-- Role -->
                                <tr>
                                  <td style="padding-bottom: 18px;">
                                    <table cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td style="padding-right: 10px; vertical-align: top;">
                                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0891b2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="9" cy="7" r="4"></circle>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                          </svg>
                                        </td>
                                        <td>
                                          <span style="display: block; color: #0891b2; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Role</span>
                                          <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 500;">${role}</p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                
                                <!-- Contact -->
                                <tr>
                                  <td style="padding-bottom: 18px;">
                                    <table cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td style="padding-right: 10px; vertical-align: top;">
                                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0891b2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                          </svg>
                                        </td>
                                        <td>
                                          <span style="display: block; color: #0891b2; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Contact</span>
                                          <p style="margin: 0; color: #1e293b; font-size: 16px;">${contact}</p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                
                                <!-- Email -->
                                <tr>
                                  <td style="padding-bottom: 18px;">
                                    <table cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td style="padding-right: 10px; vertical-align: top;">
                                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0891b2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                          </svg>
                                        </td>
                                        <td>
                                          <span style="display: block; color: #0891b2; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Email</span>
                                          <p style="margin: 0; color: #1e293b; font-size: 16px;">
                                            <a href="mailto:${email}" style="color: #0891b2; text-decoration: none;">${email}</a>
                                          </p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                
                                <!-- Service Type -->
                                <tr>
                                  <td style="padding-bottom: 18px;">
                                    <table cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td style="padding-right: 10px; vertical-align: top;">
                                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0891b2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="9" y1="3" x2="9" y2="21"></line>
                                          </svg>
                                        </td>
                                        <td>
                                          <span style="display: block; color: #0891b2; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Service Type</span>
                                          <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 500;">${serviceType}</p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                
                                <!-- Country -->
                                <tr>
                                  <td style="padding-bottom: 18px;">
                                    <table cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td style="padding-right: 10px; vertical-align: top;">
                                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0891b2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="2" y1="12" x2="22" y2="12"></line>
                                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                          </svg>
                                        </td>
                                        <td>
                                          <span style="display: block; color: #0891b2; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Country</span>
                                          <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 500;">${country}</p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                
                                <!-- Date of Shoot -->
                                <tr>
                                  <td style="padding-bottom: 18px;">
                                    <table cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td style="padding-right: 10px; vertical-align: top;">
                                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0891b2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                          </svg>
                                        </td>
                                        <td>
                                          <span style="display: block; color: #0891b2; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Date of Shoot/Event</span>
                                          <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 500;">${dateOfShoot}</p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                
                                <!-- How Did You Know -->
                                <tr>
                                  <td style="padding-bottom: 18px;">
                                    <table cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td style="padding-right: 10px; vertical-align: top;">
                                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0891b2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                          </svg>
                                        </td>
                                        <td>
                                          <span style="display: block; color: #0891b2; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">How Did You Know About Us</span>
                                          <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 500;">${howDidYouKnow}</p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- What Draws You -->
                        <div style="margin-bottom: 30px;">
                          <table cellpadding="0" cellspacing="0" style="margin-bottom: 10px;">
                            <tr>
                              <td style="padding-right: 8px; vertical-align: middle;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0891b2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                              </td>
                              <td>
                                <span style="color: #0891b2; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">What Draws You to Our Work</span>
                              </td>
                            </tr>
                          </table>
                          <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1;">
                            <p style="margin: 0; color: #1e293b; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${whatDrawsYou.replace(/\n/g, '<br>')}</p>
                          </div>
                        </div>
                        
                        <!-- Action Button -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="padding-top: 10px;">
                              <a href="mailto:${email}" style="display: inline-flex; align-items: center; padding: 14px 32px; background-color: #0891b2; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(8, 145, 178, 0.3);">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                                  <polyline points="9 11 12 14 22 4"></polyline>
                                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                </svg>
                                Reply to ${fullName.split(' ')[0]}
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f8fafc; padding: 25px 30px; border-top: 1px solid #e2e8f0;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                              </svg>
                              <p style="margin: 0; color: #94a3b8; font-size: 13px; text-align: center; line-height: 1.6;">
                                This email was sent from the booking form on your website<br>
                                <span style="color: #0891b2; font-weight: 500;">Gido Photography</span>
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Booking inquiry sent successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

