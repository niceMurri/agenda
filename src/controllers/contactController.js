const Contact = require("../models/contactModel");

exports.index = (req, res) => {
  res.render("contato", { cc: {} });
};

exports.register = async (req, res) => {
  try {
    const contact = new Contact(req.body);

    const contactSuccess = await contact.register();

    if (!contactSuccess) {
      req.flash("errors", contact.errors);
      req.session.save(function () {
        return res.redirect("back");
      });
      return;
    }

    req.flash("success", "Contato Cadastrado.");
    req.session.save(function () {
      res.redirect(`/contact/index/${contact.contact._id}`);
    });
    return;
  } catch (error) {
    return res.render("404");
  }
};

exports.editIndex = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = new Contact(req.body);
    const cc = await contact.searchById(id);

    if (!id && !contact) return res.render("404");

    res.render("contato", { cc });
  } catch (error) {
    console.log(error);
    return res.render("404");
  }
};

exports.edit = async (req, res) => {
  try {
    
    const id = req.params.id;
    const contact = new Contact(req.body);
    const updateContact = await contact.edit(id);
    
    if(!updateContact){
      req.flash("errors", contact.errors);
      req.session.save(function () {
        return res.redirect("back");
      });
      return;
    }

    req.flash("success", 'Contato atualizado com sucesso!');
      req.session.save(function () {
        return res.redirect("back");
      });

    return;

  } catch (error) {
    return res.render('404');
  }
};

exports.delete = async (req,res) => {
  const id = req.params.id;

  if(!id){
    req.flash("errors", 'Não existe esse contato');
      req.session.save(function () {
        return res.redirect("/");
      });
      return;
  }

  const deleteContact = await Contact.deleteContact(id); 

  req.flash("success", 'Contato foi excluído!');
      req.session.save(function () {
        return res.redirect("/");
      });
      return;
}
