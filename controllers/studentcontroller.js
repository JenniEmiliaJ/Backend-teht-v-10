/*
Kontrolleri on olio, joka sisältää metodeja. Se tehty siksi, että
saadaan erotettua reitit ja tietokantahakujen sovelluslogiikka toisistaan.
Se on siis arkkitehtuuriratkaisu. Eli saamme aikaan järkevämmän arkkitehtuurin
kun jaamme eri asioita tekevän koodin eri tiedostoihin ja kansioihin.
*/

const Student = require('../models/Student'); // haetaan model

// Tietokannan käsittelymetodit tehdään olion sisään
// metodin nimi on avain ja sen runko on arvo
const StudentController = {

  // 1. Kaikkien opiskelijoiden haku
  /* findAll -metodi hakee kaikki opiskelijat
  Student-modelin find-metodilla */
  findAll(req, res) {
    Student.find()
      .then((students) => {
        res.json(students);
      })
      .catch((error) => {
        throw error;
      });
  },

  // 2. Kaikkien opiskelijoiden haku
  // findById hakee yhden opiskelijan id:n perusteella
  async findById (req, res) {
    try {
      const student = await Student.findOne({ _id: req.params.id });
      res.json(student);
    } catch (error) {
      throw error;
    }
  },

  // 3. Yhden opiskelijan haku opiskelijanumeron perusteella.

  async findByStudentcode (req, res) {
    try {
      const student = await Student.findOne({ studentcode: req.params.studentcode });
      res.json(student);
    } catch (error) {
      throw error;
    }
  },

  // 4. Opiskelijan lisäys

  add: (req, res) => {
    /*
    Valitse postmanissa raw, body ja JSON-muoto. koodi:
  {
  "studentcode": "k1234",
  "name": "Kossi Opiskelija",
  "email": "k1234@jamk.fi",
  "studypoints": 5,
  "grades": [
    {
      "coursecode": "HTS10600",
      "grade": 0
    }
  ]
}
    */
    const newStudent = new Student(req.body);
    Student.create(newStudent)
      .then((student) => {
        console.log('Opiskelija lisätty' + student);
        res.json(student);
      })
      .catch((err) => {
        console.error(err);
      });
  },

  // 5. Opiskelijan poisto
  async deleteStudent (req, res) {
    try {
      const student = await Student.deleteOne({ studentcode: req.params.studentcode });
      res.json(student);
    } catch (error) {
      throw error;
    }
  },

  // 6. Opiskelijan muokkaus
  async updateStudent (req, res) {
    try {
      const { studentcode } = req.params; //ottaa studencoden url:sta
      const updatedData = req.body; // uusi data requestin (postman) bodysta
      const updatedStudent = await Student.findOneAndUpdate(
        { studentcode: studentcode }, updatedData, { new: true });
      res.json(updatedStudent);
    } catch (error) {
      throw error;
    }
  },

  // 7. Niiden opiskelijoiden haku joilla on opintopisteitä alle url-osoitteessa lähetetyn arvon.
  async findBelowLimit (req, res) {
    try {
      const limit = parseInt(req.params.limit, 10); // ottaa opintopisteiden rajan url-osoitteesta.
      const students = await Student.find(
        { studypoints: { $lt: limit }});
      res.json(students);
    } catch (error) {
      throw error;
    }
  },

  // 8. Uuden arvosanan lisäys opiskelijalle ja samalla opintopisteiden lisäys viidellä.
  async newGrade (req, res) {
    try {
      const newGrade = req.body; // uusi arvosana requestin (postman) bodysta
      const { studentcode } = req.params;

      // päivitetään opiskelijan tiedot:
      const updatedStudent = await Student.findOneAndUpdate(
        { studentcode: studentcode },
        {
          $push: { grades: newGrade }, // lisätään uusi arvosana grades-taulukkoon
          $inc: { studypoints: 5 }
        },
        { new: true }); // palautetaan päivitetyt tiedot
      res.json(updatedStudent);
    } catch (error) {
      throw error;
    }
  },

  // 9. Arvosanan muokkaus
  async updateGrade (req, res) {
    try {
      const studentcode = req.params.studentcode; // päivitettävä kurssi url:sta
      const coursecode = req.params.coursecode;
      const { grade } = req.body; // päivitetyt tiedot postmanin bodysta

      // päivitetään arvosana
      const updatedStudent = await Student.findOneAndUpdate(
        { 'studentcode': studentcode, 'grades.coursecode': coursecode },
        { $set: { 'grades.$.grade': grade } },
        { new: true });
      res.json(updatedStudent);
    } catch (error) {
      throw error;
    }
  },
  // 10. Niiden opiskelijoiden haku joilla on tietty kurssi
  async findAllByCourse (req, res) {
    try {
      const coursecode = req.params.coursecode;

      const students = await Student.find(
        { 'grades.coursecode': coursecode }
      );
      res.json(students);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = StudentController;

/*
students.js -reittitiedostossa kontrollerin metodia kutsutaan tällä tavalla:
router.get('/', StudentController.findAll);
jolloin kaikki opiskelijat saadaan JSON-muodossa osoitteesta http://localhost:3000/students/

*/
