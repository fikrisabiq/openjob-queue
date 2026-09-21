import nodemailer from 'nodemailer';
class MailSender {
 constructor() {
   this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  sendEmail(targetEmail, { email, title, pelamar, pemilik, perusahaan, dibuat }) {
    const textContent = [
      `Halo Bapak/Ibu ${pemilik} dari ${perusahaan},`,
      `Ada kandidat baru yang melamar pada lowongan pekerjaan Anda (${title}).`,
      '',
      'Informasi Pelamar:',
      `Nama: ${pelamar}`,
      `Email: ${email}`,
      `Tanggal Melamar: ${dibuat}`,
      '',
      'Silakan periksa aplikasi untuk detail lebih lanjut.',
    ].join('\n');
    const message = {
      from: 'no-repy@openjobapi.com',
      to: targetEmail,
      subject: `Notifikasi Lamaran Baru: ${title}`,
      text: textContent
    };
   return this._transporter.sendMail(message);
  }
}
export default MailSender;