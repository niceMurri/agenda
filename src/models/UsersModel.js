const mongoose = require("mongoose");
const validator = require("validator").default;
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("user", userSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    //validate
    this.validate();

    if (this.errors.length > 0) return false;

    if(await this.userExists()){
      this.errors.push('Email já foi usado.')
      return false;
    }

    //register done
    try {
      const salt = bcrypt.genSaltSync()
      this.body.password = bcrypt.hashSync(this.body.password, salt);

      this.user = await UserModel.create(this.body);
      return this.user;

    } catch (error) {
      res.render('404');
    }
  }

  async login(){
    this.validate();

    if(this.errors.length > 0) return;

    if(!await this.userExists()){
      this.errors.push("Usuário não existe.")
      return false;
    }
    
    try {
      this.user = await UserModel.findOne({email: this.body.email});
      
      if(!bcrypt.compareSync(this.body.password,this.user.password)){
        this.errors.push("Email ou senha inválido.");
        return false;
      }

      return true;
    } catch (error) {
        return false;
    }

  }

  async userExists(){
    return await UserModel.findOne({email: this.body.email});;
  }

  validate() {
    this.clearUp();

    if (!validator.isEmail(this.body.email))
      this.errors.push("Email precisa ser válido!");

    if (this.body.password.length < 6)
      this.errors.push("Senha deve conter no mínimo 6 caracteres!");
  }

  clearUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") this.body[key] = "";
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = Login;
