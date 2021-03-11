// TODO:
//      Add a listener to changes in positions' state (add, remove)
//      (Note: you need to emit events when a new position added and an existing position removed)
//      This listener will send emails to all 'interested' applicants.
//      Use npm library such as 'sendmail', 'nodemailer' etc.
//      (Note: do not store your email and password in the code.)
//      (check README.md for additional information)

const nodemailer = require('nodemailer');
const applicantModel = require('./applicants');
const EventEmitter = require('events').EventEmitter;
const Emitter = new EventEmitter();

const transporter = nodemailer.createTransport({
    service: 'Yandex',
    auth: {
        user: '<email>',
        pass: '<password>'
    }
});

Emitter.on('addPosition', async (position) => {

    const applicants = await applicantModel.getAllPositions();

    let to = [];

    const mailOptions = {
        from: 'testlab15human@yandex.by',
        subject: 'Add position',
        text: `Position is added\nCompany: ${position.company}\nLevel: ${position.level}\nCategory: ${position.category}\nJapanese Required:${position.japaneseRequired}\nDescription: ${position.description}`
    }

    applicants.forEach(el => {
        if ((el.japaneseKnowledge || el.japaneseKnowledge == position.japaneseRequired) && el.categories.includes(position.category) && el.level === position.level) {
            to.push(el.email);
        }
    })

    if (to.length > 0) {
        mailOptions.to = to.join(',');

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    }
})

Emitter.on('removePosition', async (position) => {

    const applicants = await applicantModel.getAllPositions();

    let to = [];

    const mailOptions = {
        from: 'testlab15human@yandex.by',
        subject: 'Add position',
        text: `Position is removed\nCompany: ${position.company}\nLevel: ${position.level}\nCategory: ${position.category}\nJapanese Required:${position.japaneseRequired}\nDescription: ${position.description}`
    }

    applicants.forEach(el => {
        if ((el.japaneseKnowledge || el.japaneseKnowledge == position.japaneseRequired) && el.categories.includes(position.category) && el.level === position.level) {
            to.push(el.email);
        }
    })

    if (to.length > 0) {
        mailOptions.to = to.join(',');

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    }

})

exports.myEmitter = Emitter;