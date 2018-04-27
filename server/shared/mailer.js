const nodemailer = require('nodemailer');

module.exports = settings => {
    const transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: settings.email,
                pass: settings.pass
            }
        },
        {
            from : settings.email
        }
    );

    const verifyEmail = (receiver, pass) => {
        const message = {
            to: receiver,
            subject: 'Welcome to Tagus!',
            text: `Welcome to Tagus, ${receiver}! Your password to access Tagus is: ${pass}`,
            html: 
                `<h4>Welcome to Tagus, ${receiver}</h4>
                <p>Your password to access Tagus is: <b>${pass}</b></p>`
        };
    
        return new Promise((resolve, reject) => {
            transporter.sendMail(message, (error, info) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    };

    return {
        verifyEmail
    };
};
