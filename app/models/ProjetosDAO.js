function ProjetosDAO(connection){
	this._connection = connection;
}

ProjetosDAO.prototype.pegarProjetos = function(idCliente, callback){
	this._connection.query('SELECT p1.id_projeto, p1.nome, p1.status, p1.id_cliente, (SELECT COUNT(id_servico) FROM servico s1 WHERE s1.id_projeto = p1.id_projeto) AS servicos FROM projeto p1 WHERE id_cliente = ? AND p1.status <> 50', idCliente, callback);
}

ProjetosDAO.prototype.pegarTodosProjetos = function(callback){
	this._connection.query('SELECT p1.id_projeto, p1.nome as nomeProjeto, p1.status, p1.id_cliente, (SELECT COUNT(id_servico) FROM servico s1 WHERE s1.id_projeto = p1.id_projeto) AS servicos, cliente.nome as nomeCliente FROM projeto p1 JOIN cliente ON cliente.id_cliente = p1.id_cliente WHERE p1.status <> 50 AND cliente.ativo <> 50', callback);
}

ProjetosDAO.prototype.inserirProjeto = function(nomeProjeto, idCliente, callback){
	this._connection.query('INSERT INTO projeto (nome, id_cliente) VALUES (? , ?)', [nomeProjeto, idCliente], callback);
}

ProjetosDAO.prototype.editarProjeto = function(idProjeto, status, callback){
	idProjeto = parseInt(idProjeto);
	this._connection.query('UPDATE projeto SET status = ? WHERE id_projeto = ?', [status, idProjeto], callback);
}

ProjetosDAO.prototype.contarTodosProjetos = function(callback){
	this._connection.query('SELECT COUNT(id_projeto) as todosProjetos FROM projeto', callback);
}

ProjetosDAO.prototype.contarProjetosAtivos = function(callback){
	this._connection.query('SELECT COUNT(id_projeto) as projetosAtivos FROM projeto WHERE status <> 50', callback);
}

ProjetosDAO.prototype.contarTodosProjetosAdmin = function(idCliente, callback){
	this._connection.query('SELECT COUNT(id_projeto) as todosProjetos FROM projeto WHERE id_cliente = ?', idCliente, callback);
}

ProjetosDAO.prototype.contarProjetosAtivosAdmin = function(idCliente, callback){
	this._connection.query('SELECT COUNT(id_projeto) as projetosAtivos FROM projeto WHERE status <> 50 AND id_cliente = ?', idCliente, callback);
}

module.exports = function(){
	return ProjetosDAO;
}