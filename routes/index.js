var express = require('express');
var quizController = require('../controller/quiz_controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});
router.get('/quizes',quizController.index);
router.get('/quizes/:quizId(\\d+)',quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);
router.get('/author/',quizController.author);
module.exports = router;
