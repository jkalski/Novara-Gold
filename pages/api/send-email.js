export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, phone, formType, smsConsent, subject, message } = req.body

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' })
    }

    // Dynamically import nodemailer
    const nodemailerModule = await import('nodemailer')
    const nodemailer = nodemailerModule.default || nodemailerModule
    
    // Create transporter using Microsoft 365 email configuration (GoDaddy domain connected to M365)
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com', // Microsoft 365 SMTP server
      port: 587,
      secure: false, // false for 587 (uses STARTTLS)
      requireTLS: true, // Upgrade to TLS
      auth: {
        user: process.env.GODADDY_EMAIL,
        pass: process.env.GODADDY_EMAIL_PASSWORD,
      },
    })

    // Determine email content based on form type
    let emailSubject, emailContent
    
    if (formType === 'lead') {
      emailSubject = `🌟 Requested Investor Kit from ${name} - Novara Gold`
      emailContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; text-align: center;">
                      <h1 style="color: #fbbf24; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">NOVARA GOLD</h1>
                      <p style="color: #fde68a; margin: 8px 0 0 0; font-size: 15px; font-weight: 500;">The Future of Vaulted Wealth</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px 20px; margin-bottom: 30px; border-radius: 4px;">
                        <h2 style="color: #92400e; margin: 0 0 5px 0; font-size: 20px;">🌟 Requested Investor Kit</h2>
                        <p style="color: #78350f; margin: 0; font-size: 14px;">A potential client has requested information</p>
                      </div>
                      
                      <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
                        <tr>
                          <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; width: 140px;">
                            <strong style="color: #374151; font-size: 14px;">Name:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                            <span style="color: #1f2937; font-size: 14px;">${name}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #374151; font-size: 14px;">Email:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                            <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none; font-size: 14px;">${email}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #374151; font-size: 14px;">Phone:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                            <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none; font-size: 14px;">${phone || 'Not provided'}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #374151; font-size: 14px;">SMS Consent:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                            <span style="color: ${smsConsent ? '#059669' : '#dc2626'}; font-weight: 600; font-size: 14px;">${smsConsent ? '✓ Yes' : '✗ No'}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f9fafb;">
                            <strong style="color: #374151; font-size: 14px;">Submitted:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff;">
                            <span style="color: #6b7280; font-size: 14px;">${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 20px 30px; border-top: 1px solid #e5e7eb; text-align: center;">
                      <p style="color: #6b7280; font-size: 12px; margin: 0;">
                        This is an automated notification from your Novara Gold website.<br>
                        Please respond to the client as soon as possible.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    } else if (formType === 'contact') {
      emailSubject = `💬 Contact Form from ${name} - Novara Gold`
      emailContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; text-align: center;">
                      <h1 style="color: #fbbf24; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">NOVARA GOLD</h1>
                      <p style="color: #fde68a; margin: 8px 0 0 0; font-size: 15px; font-weight: 500;">The Future of Vaulted Wealth</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px 20px; margin-bottom: 30px; border-radius: 4px;">
                        <h2 style="color: #1e3a8a; margin: 0 0 5px 0; font-size: 20px;">💬 Contact Form Submission</h2>
                        <p style="color: #1e40af; margin: 0; font-size: 14px;">A client has sent you a message</p>
                      </div>
                      
                      <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
                        <tr>
                          <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; width: 140px;">
                            <strong style="color: #374151; font-size: 14px;">Name:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                            <span style="color: #1f2937; font-size: 14px;">${name}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #374151; font-size: 14px;">Email:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                            <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none; font-size: 14px;">${email}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #374151; font-size: 14px;">Phone:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                            <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none; font-size: 14px;">${phone || 'Not provided'}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #374151; font-size: 14px;">Subject:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                            <span style="color: #1f2937; font-weight: 600; font-size: 14px;">${subject || 'Not provided'}</span>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding: 20px; background-color: #f9fafb;">
                            <strong style="color: #374151; font-size: 14px; display: block; margin-bottom: 10px;">Message:</strong>
                            <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e5e7eb;">
                              <p style="color: #1f2937; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message || 'Not provided'}</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                            <strong style="color: #374151; font-size: 14px;">SMS Consent:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-top: 1px solid #e5e7eb;">
                            <span style="color: ${smsConsent ? '#059669' : '#dc2626'}; font-weight: 600; font-size: 14px;">${smsConsent ? '✓ Yes' : '✗ No'}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f9fafb;">
                            <strong style="color: #374151; font-size: 14px;">Submitted:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff;">
                            <span style="color: #6b7280; font-size: 14px;">${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 20px 30px; border-top: 1px solid #e5e7eb; text-align: center;">
                      <p style="color: #6b7280; font-size: 12px; margin: 0;">
                        This is an automated notification from your Novara Gold website.<br>
                        Please respond to the client as soon as possible.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    } else {
      emailSubject = `📋 Form Submission from ${name} - Novara Gold`
      emailContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; text-align: center;">
                      <h1 style="color: #fbbf24; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">NOVARA GOLD</h1>
                      <p style="color: #fde68a; margin: 8px 0 0 0; font-size: 15px; font-weight: 500;">The Future of Vaulted Wealth</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <div style="background-color: #f3f4f6; border-left: 4px solid #6b7280; padding: 15px 20px; margin-bottom: 30px; border-radius: 4px;">
                        <h2 style="color: #374151; margin: 0 0 5px 0; font-size: 20px;">📋 Form Submission</h2>
                        <p style="color: #4b5563; margin: 0; font-size: 14px;">New form submission received</p>
                      </div>
                      
                      <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
                        <tr>
                          <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; width: 140px;">
                            <strong style="color: #374151; font-size: 14px;">Name:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                            <span style="color: #1f2937; font-size: 14px;">${name}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #374151; font-size: 14px;">Email:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                            <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none; font-size: 14px;">${email}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #374151; font-size: 14px;">Phone:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                            <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none; font-size: 14px;">${phone || 'Not provided'}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f9fafb;">
                            <strong style="color: #374151; font-size: 14px;">Submitted:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff;">
                            <span style="color: #6b7280; font-size: 14px;">${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 20px 30px; border-top: 1px solid #e5e7eb; text-align: center;">
                      <p style="color: #6b7280; font-size: 12px; margin: 0;">
                        This is an automated notification from your Novara Gold website.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    }

    // Email options
    const mailOptions = {
      from: process.env.GODADDY_EMAIL,
      to: process.env.GODADDY_EMAIL, // Send to your own email
      subject: emailSubject,
      html: emailContent,
      replyTo: email
    }

    // Send email
    await transporter.sendMail(mailOptions)

    console.log('Email sent successfully:', { name, email, formType })
    
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    })

  } catch (error) {
    console.error('Error sending email:', error)
    
    // Still return success to user to avoid showing errors
    // Log the actual error for debugging
    res.status(200).json({ 
      success: true, 
      message: 'Thank you for your submission' 
    })
  }
}
