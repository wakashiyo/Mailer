const mailer = require('nodemailer');

const config = require('./config.json');

const smtp = mailer.createTransport({
  host: config.host,
  port: config.port,
  auth: {
    user: config.auth.user,
    pass: config.auth.pass,
  },
});

const mailOptions = {
  from: 'takahiro <takahiro@example.com>', // sender address
  to: 'testuser <testuser@example.com>', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Hello world?', // plain text body
  html: '<b>Hello world?</b>', // html body
};

const exec = function send(option) {
  return new Promise((resolve, reject) => {
    smtp.sendMail(option, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

exec(mailOptions).then((res) => {
  console.log('Message sent: %s', res.messageId);
  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', mailer.getTestMessageUrl(res));
}).catch((err) => {
  console.log(`error: ${err}`);
});
