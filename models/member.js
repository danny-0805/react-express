const mongoose = require('mongoose')
const { Schema } = mongoose;

const MemberSchema = new Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
})

module.exports = MemberSchema