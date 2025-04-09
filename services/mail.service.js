const nodemailer = require("nodemailer");
const config = require("config");
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      port: config.get("SMTP_PORT"),
      host: config.get("SMTP_HOST"),
      service: "gmail",
      secure: false,
      auth: {
        user: config.get("SMTP_USER"),
        pass: config.get("SMTP_PASSWORD"),
      },
    });
  }
  async sendActivationToMail(mail, activation_code) {
    await this.transporter.sendMail({
      from: config.get("SMTP_USER"),
      to: mail,
      subject: "this otp for activate account in vassels project",
      text: "",
      html: `
      <div>
        <h3>Accountni faollshtirish uchun kod</h3>
        <p}>${activation_code}</p>
      </div>`,
    });
  }
}
module.exports = new MailService();
