var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  nome: String,
  sobrenome: String,
  email: String,
  senha: String

});

module.exports = mongoose.model('User', UserSchema);