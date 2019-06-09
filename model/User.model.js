const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nome: String,
  sobrenome: String,
  email: String,
  senha: String

});

module.exports = mongoose.model('User', UserSchema);