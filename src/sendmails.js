const mailer = require('nodemailer');

const config = require('./config.json');

const mailList = require('../mailinglist.json');

const smtp = mailer.createTransport({
  host: config.host,
  port: config.port,
  auth: {
    user: config.auth.user,
    pass: config.auth.pass,
  },
});

const option = function createMailOption(item) {
  return {
    from: item.from, // sender address
    to: item.to, // list of receivers
    subject: item.subject, // Subject line
    text: item.text, // plain text body
  };
};

const read = function mailinglistRead(json) {
  const items = json;
  var mails = [];
  const group = [];

  for (var i = 0; i < items.length; i++) {
    mails.push(option(items[i]));
    if (mails.length === 10) {
      group.push(mails);
      mails = [];
    }
  }
  if (mails.length > 0) {
    group.push(mails);
  }
  return group;
};

const create = async function createmails(items) {
  const promisses = [];
  for (var i = 0; i < items.length; i++) {
    const result = smtp.sendMail(items[i]);
    promisses.push(result);
  }
  return promisses;
};

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

const exec = async function sendmails(group) {
  const results = await group.map(items => create(items));
  await Promise.all(results);
  await sleep();
};

exec(read(mailList.results));
