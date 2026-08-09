export const getWelcomeEmailTemplate = (userName, appName = "YourApp", dashboardLink = "#") => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ${appName}</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f4f4f4;
      }

      .email-container {
        max-width: 560px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #eee;
      }

      .header {
        background-color: #6366F1;
        color: white;
        padding: 36px 20px;
        text-align: center;
      }

      .header h1 {
        font-size: 24px;
        font-weight: 700;
      }

      .header p {
        font-size: 13px;
        opacity: 0.9;
        margin-top: 6px;
      }

      .content {
        padding: 32px 28px;
      }

      .greeting {
        font-size: 16px;
        color: #333;
        margin-bottom: 16px;
      }

      .greeting strong {
        color: #6366F1;
      }

      .welcome-text {
        font-size: 14px;
        color: #555;
        margin-bottom: 20px;
      }

      .features {
        background-color: #F5F5FF;
        border-radius: 8px;
        padding: 20px 22px;
        margin: 22px 0;
      }

      .features h3 {
        color: #6366F1;
        font-size: 14px;
        margin-bottom: 12px;
        font-weight: 600;
      }

      .features ul {
        list-style: none;
      }

      .features li {
        padding: 6px 0;
        color: #555;
        font-size: 14px;
      }

      .cta-button {
        display: inline-block;
        background-color: #6366F1;
        color: white;
        padding: 12px 28px;
        text-decoration: none;
        border-radius: 6px;
        font-size: 15px;
        font-weight: 600;
        margin: 20px 0;
      }

      .tips {
        background-color: #F0FDFA;
        border-radius: 8px;
        padding: 18px 22px;
        margin: 20px 0;
        font-size: 13px;
        color: #555;
      }

      .tips p {
        padding: 4px 0;
      }

      .support-text {
        font-size: 13px;
        color: #777;
        margin-top: 20px;
        padding-top: 16px;
        border-top: 1px solid #eee;
      }

      .footer {
        background-color: #f8f9fa;
        padding: 20px 28px;
        text-align: center;
        border-top: 1px solid #eee;
      }

      .footer p {
        font-size: 12px;
        color: #888;
        margin: 4px 0;
      }

      .footer a {
        color: #6366F1;
        text-decoration: none;
      }

      @media only screen and (max-width: 600px) {
        .email-container {
          margin: 0;
          border-radius: 0;
        }

        .content {
          padding: 24px 18px;
        }

        .cta-button {
          display: block;
          text-align: center;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <!-- Header -->
      <div class="header">
        <h1>🎉 Welcome to ${appName}</h1>
        <p>Your account is ready to go</p>
      </div>

      <!-- Content -->
      <div class="content">
        <div class="greeting">
          Hi <strong>${userName}</strong> 👋,
        </div>

        <div class="welcome-text">
          Thanks for signing up! Your account has been created successfully and we're excited to have you on board.
        </div>

        <!-- Features Section -->
        <div class="features">
          <h3>✨ What you can do:</h3>
          <ul>
            <li>🍽️ Browse and order from your favorite places</li>
            <li>📦 Track your orders in real time</li>
            <li>❤️ Save favorites for quick reordering</li>
            <li>⭐ Rate and review your experience</li>
          </ul>
        </div>

        <!-- CTA Button -->
        <a href="${dashboardLink}" class="cta-button">🚀 Get Started</a>

        <!-- Quick Tips -->
        <div class="tips">
          <p><strong>💡 Quick tips:</strong></p>
          <p>🔐 Set a strong password to keep your account safe</p>
          <p>📱 Add ${appName} to your home screen for faster access</p>
          <p>🔔 Turn on notifications so you never miss an update</p>
        </div>

        <div class="support-text">
          Need help? Reach out to us anytime at <a href="mailto:support@${appName.toLowerCase()}.com">support@${appName.toLowerCase()}.com</a> 💬
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
        <p>You received this email because you created an account on ${appName}</p>
      </div>
    </div>
  </body>
  </html>
`;
};

export default { getWelcomeEmailTemplate };