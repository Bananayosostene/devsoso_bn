export const newBlogNotificationTemplate = (title: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Blog Posted</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f4f4f4; padding: 10px; text-align: center; }
        .content { padding: 20px 0; }
        .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Blog Posted</h1>
        </div>
        <div class="content">
            <p>Hello Dear User,</p>
            <p>A blog has posted on Sostene's platform. Here is the blog name:</p>
            <ul>
                <li><strong>Blog Name:</strong> ${title}</li>
                <li><strong>visit site:</strong>https://bananayosostene.github.io/My-Brand-Sostene/UI/pages/users.html </li>
            </ul>
            <p>Please take any necessary actions or Look at the blog.</p>
        </div>
        <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>
`;