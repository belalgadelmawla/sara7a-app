export const signUp = (link,name) => `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Email</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      font-family: Arial, sans-serif;
      font-size: 16px;
      color: #333333;
    }

    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 5px;
      padding: 20px;
    }

    .email-header {
      text-align: center;
      background-color: #007BFF;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 5px 5px 0 0;
    }

    .email-content {
      padding: 20px;
    }

    .email-footer {
      text-align: center;
      font-size: 14px;
      color: #666666;
      margin-top: 20px;
    }

    a {
      color: #007BFF;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Your Company</h1>
    </div>
    <div class="email-content">
      <p>Hello ${name},</p>
      <p>We wanted to reach out to share some exciting news and updates with you!</p>
      <p>Here’s what’s new:</p>
      <ul>
        <li>Feature 1: [Description]</li>
        <li>Feature 2: [Description]</li>
      </ul>
      <p>
        <a href=${link} style="display: inline-block; background-color: #007BFF; color: #ffffff; padding: 10px 20px; border-radius: 5px;">Activate Account</a>
      </p>
      <p>Thank you for your continued support!</p>
      <p>Best regards,<br>Your Company Team</p>
    </div>
    <div class="email-footer">
      &copy; 2025 Your Company | <a href="[Unsubscribe Link]">Unsubscribe</a>
    </div>
  </div>
</body>
</html>

`
