const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config()

const prisma = new PrismaClient();

async function sendEmails() {
    try {
        const users = await prisma.user.findMany();
        const events = await prisma.event.findMany();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        for (const user of users) {
            for (const event of events) {
                const mailOptions = {
                    from: 'rameldili1@gmail.com',
                    to: user.email,
                    subject: `Event: ${event.title}`,
                    text: `Dear ${user.first_name},\n\nEvent Details:\nDescription: ${event.description}\nStart Date: ${event.start_date}\nEnd Date: ${event.end_date}\nLocation: ${event.location}\n\nRegards,\nEvent MEnagment System`
                };

                await transporter.sendMail(mailOptions);
                console.log(`Email sent to ${user.email} for event: ${event.title}`);
            }
        }
    } catch (error) {
        console.error('Error sending emails:', error);
    } finally {
        await prisma.$disconnect();
    }
}

sendEmails();
