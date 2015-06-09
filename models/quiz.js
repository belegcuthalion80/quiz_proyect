//Definicion del modelo de Quiz

module.exports = function(secuelize,DataTypes){

	return secuelize.define('Quiz',
		{	pregunta: DataTypes.STRING,
			respuesta: DataTypes.STRING,
		});
}