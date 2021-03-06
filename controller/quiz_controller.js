
var models = require('../models/models.js');


//Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req,res,next,quizId){
	models.Quiz.findById(quizId).then(function(quiz){
		if (quiz){
			req.quiz=quiz;
			next();
		}else { next (new Error('No existe quizId=' + quizId));}
	}
).catch(function(error){next(error);});
};
//GET /quizes/new
exports.new = function(req,res){
	var quiz = models.Quiz.build(
		{pregunta: 'Pregunta' , respuesta: 'Respuesta'}
		);
	res.render('quizes/new', {quiz : quiz , errors: []})
}
// POST /quizes/create
exports.create = function(req, res) {
  
  var quiz = models.Quiz.build( req.body.quiz );

  quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else {
        quiz // save: guarda en DB campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta","tema"]})
        .then( function(){ res.redirect('/quizes')}) 
      }      // res.redirect: Redirección HTTP a lista de preguntas
    }
  ).catch(function(error){next(error)});
};


//GET /quizes
exports.index = function(req,res){
	req.query.search=(req.query.search||null)
	if (req.query.search === null){
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index.ejs', {quizes: quizes , errors: [] })
		})
	}else
		models.Quiz.findAll({where: ["pregunta like ? AND tema like ?", '%'+req.query.search.replace(/\s/g,"%")+'%',req.query.tema]}).then(function(quizes){
		 	res.render('quizes/index.ejs', {quizes: quizes, errors: []})
	})
};
//GET /quizes/:id
exports.show = function(req,res){
	
		res.render('quizes/show', {quiz: req.quiz , errors: []})

};
//GET /quizes/:id/answer
exports.answer = function(req,res){
	var resultado = 'Incorrecto';
		if (req.query.respuesta === req.quiz.respuesta){
			resultado='Correcto';
		}
		res.render('quizes/answer',{quiz:req.quiz,respuesta: resultado, errors: []})
		
	
};
exports.edit = function(req,res){
		var quiz=req.quiz;
		res.render('quizes/edit', {quiz: quiz , errors: []})

};
exports.update = function(req,res){
		req.quiz.pregunta=req.body.quiz.pregunta;
		req.quiz.respuesta=req.body.quiz.respuesta;
		req.quiz.tema=req.body.quiz.tema;
		console.log(req.body.respuesta);
		
		req.quiz
		.validate()
		.then(
			function(err){
				if (err){
					res.render('quizes/edit',{quiz: req.quiz, errors: err.erros});
				}else{
					req.quiz
					.save({fields: ["pregunta", "respuesta","tema"]})
					.then(function(){res.redirect('/quizes');});

				}
				
			}
			);
	};
	exports.destroy = function(req,res){
		req.quiz.destroy().then(function(){
			res.redirect('/quizes');

		}).catch(function(error){next(error)});
	};

exports.author = function(req,res){
	res.render('author', {author: 'Francisco Javier Garcia Nieto' , errors:[]})
};

