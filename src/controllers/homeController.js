const Contact = require('../models/contactModel');

exports.index = async (req, res) => {

    try {
        const contacts = await Contact.findContacts();

        res.render('index',{contacts});
    } catch (error) {
        res.render('404');
    }
}



