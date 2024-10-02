export const replyToContactTemplate = (name: string, originalMessage: string, replyMessage: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reply to Your Message</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f4f4f4; padding: 10px; text-align: center; }
        .content { padding: 20px 0; }
        .message { background-color: #f9f9f9; border-left: 3px solid #ccc; padding: 10px; margin-bottom: 20px; }
        .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Reply to Your Message</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for contacting us. I have received your message and would like to respond.</p>
            <div class="message">
                <strong>Your original message:</strong>
                <p>${originalMessage}</p>
            </div>
            <div class="message">
                <strong>My reply:</strong>
                <p>${replyMessage}</p>
            </div>
            <p>If you have any further questions, please don't hesitate to contact us.</p>
            <p>Here is my phone number: <strong>+250788724867/strong>,</p>
        </div>
        <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>
`;