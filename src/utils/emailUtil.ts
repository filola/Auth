import * as nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import * as AWS from 'aws-sdk';

// dotenv.config();
AWS.config.update({ region: 'ap-northeast-2' });

const transporter = nodemailer.createTransport({
  host: 'email-smtp.ap-northeast-2.amazonaws.com',
  port: 465,
  secure: true,
  auth: {
    // user: process.env.accessKeyId,
    // pass: process.env.secretAccessKey,
    user: process.env.accessKeyId,
    pass: process.env.secretAccessKey,
  },
});

export function SendMail(body: any, files: any) {
  const { portfolio } = files;

  const attachList = [];
  for (let j = 0; j < portfolio.length; j++) {
    attachList.push({
      filename: portfolio[j].originalname,
      content: Buffer.from(portfolio[j].buffer, 'base64'),
      contentType: 'application/pdf',
    });
  }

  transporter.sendMail(
    {
      from: 'test <test@gmail.com>',
      to: body.email,
      subject: 'test',
      attachments: attachList,
      html:
        '<p>test</p>',
    },
    (err: any, info: { envelope: object; messageId: string }) => {
      if (err) {
        console.log(err);
      }
      // console.log('sendEmail: ' + JSON.stringify(info.envelope));
      // console.log(info.messageId);
    },
  );
}
