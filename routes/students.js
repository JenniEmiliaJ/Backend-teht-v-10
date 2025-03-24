// Reititystiedosto  johon opiskelijatietokantaa
// manipuloivat reitit

const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const sc = require('../controllers/studentcontroller');
const authorize = require('../verifytoken');

// 1. findAll
// localhost.3000/students/
router.get('/', sc.findAll);
/*
// 2. findById
// http://localhost:3000/students/67a31afa4a9d3c27980a8635
router.get('/:id', sc.findById); // :id -> kaksoispiste koska id on dynaaminen reittiparametri = muuttuva

// 3. findByStudentcode
router.get('/bycode/:studentcode', sc.findByStudentcode);

// 4. add
router.post('/', authorize, sc.add);

// 5. deleteStudent
router.delete('/delete/:studentcode', authorize, sc.deleteStudent);

// 6. updateStudent
router.put('/update/:studentcode', authorize, sc.updateStudent);

// 7. findBelowLimit
router.get('/below/:limit', sc.findBelowLimit); // lisätty "/below/" jotta osoite ei sekaannut id:n tai studentcoden kanssa"

// 8. newGrade
// http://localhost:PORTTI/students/k1234/grades + PUT + raw + JSON postmanissa
// lähetettävä data:
/*
{
  "coursecode": "HTS20000",
  "grade": 4
}

router.put('/newGrade/:studentcode', sc.newGrade);

// 9. updateGrade
router.put('/updateGrade/:studentcode/:coursecode', sc.updateGrade);

// 10. findAllByCourse
router.get('/findAllByCourse/:coursecode', sc.findAllByCourse);
*/

module.exports = router;