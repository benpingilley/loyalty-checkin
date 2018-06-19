module.exports = {
    smtp: {
        host: process.env.SMTP_HOST || undefined, // GMAIL: smtp.gmail.com
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_EMAIL || undefined, // From email address
            pass: process.env.SMTP_PASSWORD || undefined, // Password
        },
    },
};
