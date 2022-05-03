const mongoose = require("mongoose");
const { async } = require("regenerator-runtime");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  nome: {
    required: true,
    type: String,
  },
  sobrenome: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  telefone: {
    type: String,
    default: "",
  },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

const ContactModel = mongoose.model("contact", ContactSchema);

function Contact(body) {
  this.body = body;
  this.errors = [];
  this.contact = null;
}

Contact.prototype.register = async function () {
  //validate
  this.validate();

  if (this.errors.length > 0) return false;

  //register done
  try {
    this.contact = await ContactModel.create(this.body);

    return true;
  } catch (error) {
    res.render("404");
    return false;
  }
};
Contact.prototype.searchById = async (id) => {
  if (typeof id !== "string") return false;

  try {
    const user = await ContactModel.findById(id);

    return user;
  } catch (error) {
    return false;
  }
};

Contact.prototype.edit = async function (id) {
  this.validate();

  if (typeof id !== "string") return false;

  this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {
    new: true,
  });

  return this.contact;
};

Contact.prototype.validate = function () {
  this.clearUp();

  if (!this.body.nome) this.errors.push("É obrigatório um nome.");

  if (this.body.email && !validator.isEmail(this.body.email))
    this.errors.push("Email precisa ser válido!");

  if (!this.body.email && !this.body.telefone)
    this.errors.push("é necessário pelo menos um email ou um telefone.");
};

Contact.prototype.clearUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== "string") this.body[key] = "";
  }

  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone,
  };
};

Contact.findContacts = async function(){
  const contatos = await ContactModel.find().sort({criadoEm: -1});
  return contatos;
}

Contact.deleteContact = async function(id){
  if(typeof id !== 'string') return false;

  const contact = await ContactModel.findByIdAndDelete(id);
  return contact;
}
module.exports = Contact;
