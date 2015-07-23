//Definicion del modelo de Quiz

module.exports = function(secuelize,DataTypes){

	return secuelize.define('Quiz',
		{	pregunta: {
			type: DataTypes.STRING,
			validate: {notEmpty:{msg: "-> Falta Pregunta"}}
			},
			respuesta: {
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "-> Falta Respuesta"}}
			},
			tema: {
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "-> Falta Tipo"}}
			}
		}
	);
}