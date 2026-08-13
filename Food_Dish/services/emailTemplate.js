export const getWelcomeEmailTemplate = (userName, type) => {
  let title;
  let subtitle;
  let welcomeText;
  let features;
  let tips;
  let buttonText;
  let dashboardLink;
  let icon;

  // =========================
  // USER
  // =========================
  if (type === "user") {
    title = `🎉 Welcome to Food Dish`;
    subtitle = "Your account is ready to go";
    icon = "🍽️";

    welcomeText = `
      Thanks for signing up! Your Food Dish account has been
      created successfully. We're excited to have you on board.
    `;

    features = `
      <li>🍽️ Browse and order delicious food</li>
      <li>📦 Track your orders in real time</li>
      <li>❤️ Save your favorite food and restaurants</li>
      <li>⭐ Rate and review your experience</li>
    `;

    tips = `
      <p><strong>💡 Quick tips:</strong></p>
      <p>🔐 Keep your password secure</p>
      <p>📱 Keep your Food Dish account updated</p>
      <p>🔔 Turn on notifications for order updates</p>
    `;

    buttonText = "🚀 Explore Food";
    dashboardLink = "#";
  }

  // =========================
  // PROVIDER
  // =========================
  else if (type === "provider") {
    title = `🎉 Welcome to Food Dish`;
    subtitle = "Grow your business with Food Dish";
    icon = "👨‍🍳";

    welcomeText = `
      Your provider account has been created successfully.
      You can now manage your services, connect with customers,
      and grow your business with Food Dish.
    `;

    features = `
      <li>👨‍🍳 Manage your food services</li>
      <li>📦 Manage customer orders</li>
      <li>👥 Connect with your customers</li>
      <li>📈 Grow your business with Food Dish</li>
    `;

    tips = `
      <p><strong>💡 Quick tips:</strong></p>
      <p>🔐 Keep your provider account secure</p>
      <p>📋 Keep your services and menu updated</p>
      <p>🔔 Turn on notifications for new orders</p>
    `;

    buttonText = "🚀 Go to Provider Dashboard";
    dashboardLink = "#";
  }

  // =========================
  // RESTAURANT
  // =========================
  else if (type === "restaurant") {
    title = `🎉 Welcome to Food Dish`;
    subtitle = "Manage your restaurant with Food Dish";
    icon = "🏪";

    welcomeText = `
      Your restaurant has been successfully added to Food Dish.
      You can now manage your restaurant, add food items,
      manage orders, and serve your customers.
    `;

    features = `
      <li>🏪 Manage your restaurant profile</li>
      <li>🍕 Add and manage food items</li>
      <li>📦 Manage incoming orders</li>
      <li>👥 Serve and connect with customers</li>
    `;

    tips = `
      <p><strong>💡 Quick tips:</strong></p>
      <p>🔐 Keep your restaurant account secure</p>
      <p>🍕 Keep your food menu updated</p>
      <p>🔔 Turn on notifications for new orders</p>
    `;

    buttonText = "🚀 Manage Restaurant";
    dashboardLink = "#";
  }

  // =========================
  // INVALID TYPE
  // =========================
  else {
    throw new Error("Invalid email template type");
  }


  return `
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>Welcome to Food Dish</title>

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

    /* ===== Animations ===== */
    /* Note: animations render on Apple Mail, iOS Mail, and most modern
       webmail clients. Gmail/Outlook desktop will simply show the final
       (static) state — this is a normal email-client limitation. */

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes bounceIcon {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }

    @keyframes pulseButton {
      0%, 100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.45); }
      50% { box-shadow: 0 0 0 8px rgba(20, 184, 166, 0); }
    }

    .email-container {
      max-width: 560px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #eee;
      animation: fadeInUp 0.6s ease-out;
    }

    .header {
      background: linear-gradient(135deg, #6366F1 0%, #14B8A6 100%);
      color: white;
      padding: 36px 20px;
      text-align: center;
    }

    .header-icon {
      font-size: 35px;
      margin-bottom: 8px;
      display: inline-block;
      animation: bounceIcon 2.2s ease-in-out infinite;
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
      line-height: 1.7;
      white-space: pre-line;
    }

    .features {
      background-color: #F5F5FF;
      border-left: 3px solid #6366F1;
      border-radius: 8px;
      padding: 20px 22px;
      margin: 22px 0;
      animation: fadeInUp 0.7s ease-out;
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

    .cta-container {
      text-align: center;
    }

    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #6366F1 0%, #14B8A6 100%);
      color: white;
      padding: 12px 28px;
      text-decoration: none;
      border-radius: 6px;
      font-size: 15px;
      font-weight: 600;
      margin: 20px 0;
      animation: pulseButton 2.5s ease-in-out infinite;
    }

    .tips {
      background-color: #F0FDFA;
      border-left: 3px solid #14B8A6;
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

    .support-text a {
      color: #6366F1;
      text-decoration: none;
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

      <div class="header-icon">
        ${icon}
      </div>

      <h1>
        Food Dish
      </h1>

      <p>
        ${subtitle}
      </p>

    </div>


    <!-- Content -->

    <div class="content">

      <div class="greeting">

        Hi <strong>${userName}</strong> 👋,

      </div>


      <div class="welcome-text">

        ${welcomeText}

      </div>


      <!-- Features Section -->

      <div class="features">

        <h3>
          ✨ What you can do:
        </h3>

        <ul>

          ${features}

        </ul>

      </div>


      <!-- CTA Button -->

      <div class="cta-container">

        <a
          href="${dashboardLink}"
          class="cta-button"
        >
          ${buttonText}
        </a>

      </div>


      <!-- Quick Tips -->

      <div class="tips">

        ${tips}

      </div>


      <!-- Support -->

      <div class="support-text">

        Need help? Reach out to us anytime at

        <a href="mailto:support@fooddish.com">
          support@fooddish.com
        </a>

        💬

      </div>

    </div>


    <!-- Footer -->

    <div class="footer">

      <p>
        &copy; ${new Date().getFullYear()}
        Food Dish. All rights reserved.
      </p>

      <p>
        You received this email because you created
        a ${type} account on Food Dish.
      </p>

    </div>

  </div>

</body>

</html>
`;
};


export default {
  getWelcomeEmailTemplate
};