function NotificacoesDAO(connection){
	this._connection = connection;
}

NotificacoesDAO.prototype.inserirNotificacao = function(idCliente, callback){
	this._connection.query('INSERT INTO notificacoes (id_cliente) VALUES (?) ', idCliente, callback);
}

NotificacoesDAO.prototype.pegarNotificacoes = function(idCliente, callback){
	this._connection.query('SELECT COUNT(id_notificacao) as notificacoes FROM notificacoes WHERE id_cliente = ? AND visualizada = 0', idCliente, callback);
}

NotificacoesDAO.prototype.visualizarNotificacoes = function(idUsuario){
	this._connection.query('UPDATE notificacoes SET visualizada = 1 WHERE id_cliente = (SELECT id_cliente FROM usuario WHERE id_usuario = ?)', idUsuario);
}

module.exports = function(){
	return NotificacoesDAO;
}