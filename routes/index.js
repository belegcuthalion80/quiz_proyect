var express = require('express');
var quizController = require('../controller/quiz_controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' ,errors: []});
});
//Autoload de comandos con :quizId
router.param('quizId', quizController.load);
router.get('/quizes',quizController.index);
router.get('/quizes/:quizId(\\d+)',quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);
router.get('/quizes/:quizId(\\d+)/edit',quizController.edit);
router.put('/quizes/:quizId(\\d+)',quizController.update);
router.delete('/quizes/:quizId(\\d+)',quizController.destroy);
router.get('/author/',quizController.author);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
module.exports = router;
