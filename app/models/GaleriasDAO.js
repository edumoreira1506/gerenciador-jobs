function GaleriasDAO(connection){
	this._connection = connection;
}


GaleriasDAO.prototype.inserirImagem = function(imagem, idServico, callback){
	this._connection.query('INSERT INTO galeria (id_servico, caminho_imagem) VALUES (?, ?)', [idServico, imagem], callback);
}


module.exports = function(){
	return GaleriasDAO;
}