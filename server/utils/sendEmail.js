const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, message, category }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Smart Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: `
      <div style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;color:#111827;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e5e7eb;">
                
                <tr>
                  <td style="background:#0f172a;padding:28px 32px;color:#ffffff;">
                    <h1 style="margin:0;font-size:24px;">Smart Support</h1>
                    <p style="margin:8px 0 0;color:#cbd5e1;font-size:14px;">
                      Your support request has been received
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:32px;">
                    <p style="font-size:16px;line-height:1.7;margin:0 0 18px;">
                      Hello,
                    </p>

                    <p style="font-size:16px;line-height:1.7;margin:0 0 24px;">
                      Thank you for contacting us. Our system reviewed your request and prepared the following response:
                    </p>

                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:20px;margin-bottom:24px;">
                      <p style="margin:0;font-size:15px;line-height:1.7;color:#334155;">
                        ${message}
                      </p>
                    </div>

                    ${
                      category
                        ? `<div style="margin-bottom:24px;">
                            <span style="display:inline-block;background:#dbeafe;color:#1d4ed8;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:bold;">
                              Category: ${category}
                            </span>
                          </div>`
                        : ""
                    }

                    <p style="font-size:15px;line-height:1.7;color:#475569;margin:0 0 24px;">
                      If this reply does not solve your issue, our support team will review your ticket and follow up as soon as possible.
                    </p>

                    <a href="#" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:10px;font-size:14px;font-weight:bold;">
                      View Support Portal
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style="background:#f8fafc;padding:22px 32px;border-top:1px solid #e5e7eb;">
                    <p style="margin:0;color:#64748b;font-size:13px;line-height:1.6;">
                      This is an automated response from Smart Support Automation System.
                    </p>
                    <p style="margin:8px 0 0;color:#94a3b8;font-size:12px;">
                      © ${new Date().getFullYear()} Smart Support. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </div>
    `,
  });
};

module.exports = sendEmail;