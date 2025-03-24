//Student-dokumentin skeema
const mongoose = require('mongoose');
const GradeSchema = require('./Grade'); //Alidokumentin skeema

// Skeeman luonti. Skeema määrittää kannassa olevan tiedon muodon
const StudentSchema = new mongoose.Schema({
  studentcode: {type: String, unique: true, required: true, match: /^[a-z]{1}[0-9]{4}$/}, //säännönmukainen lauseke alkaa /^ ja loppuu $/
  name: {type: String, required: true, max: 80},
  email: {type: String, required: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}, //regular expression email
  studypoints: {type: Number, required: false, min: 0, max: 300},
  grades: {type: [GradeSchema], required: true}, //Alidokumentin tyyppinä on sen skeema
});

// Tehdään skeemasta model, jonka metodeilla kantaoperaatioita suoritetaan
// Model on luokka joka sisältää skeeman
const Student = mongoose.model('Student', StudentSchema);
// exportataan model
module.exports = Student;