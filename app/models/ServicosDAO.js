function ServicosDAO(connection){
	this._connection = connection;
}

ServicosDAO.prototype.pegarServicos = function(idCliente, callback){
	this._connection.query('SELECT galeria.caminho_imagem, servico.id_servico, data_solicitacao, data_termino, observacao, servico.status as statusServico, projeto.nome as nomeProjeto FROM servico JOIN projeto USING (id_projeto) JOIN galeria USING (id_servico) WHERE id_cliente = ? AND projeto.status <> 50 ORDER BY id_servico DESC', idCliente, callback);
}

ServicosDAO.prototype.pegarServicosPeloIdProjeto = function(idProjeto, callback){
	this._connection.query('SELECT projeto.id_cliente,usuario.nome as nomeResponsavel, id_responsavel, id_servico, data_solicitacao, data_termino, observacao, servico.status as statusServico, projeto.nome as nomeProjeto FROM servico JOIN projeto USING (id_projeto) LEFT JOIN usuario ON servico.id_responsavel = usuario.id_usuario WHERE projeto.id_projeto = ? AND projeto.status <> 50 ORDER BY id_servico DESC', idProjeto, callback);
}

ServicosDAO.prototype.pegarServicosPeloIdServico = function(idServico, callback){
	this._connection.query('SELECT * FROM servico WHERE id_servico = ?', idServico, callback);
}

ServicosDAO.prototype.pegarServicosPeloIdCliente = function(idCliente, callback){
	this._connection.query('SELECT usuario.nome as nomeResponsavel, id_servico, data_solicitacao, data_termino, observacao, servico.status as statusServico, projeto.nome as nomeProjeto FROM servico JOIN projeto USING (id_projeto) LEFT JOIN usuario ON servico.id_responsavel = usuario.id_usuario WHERE projeto.id_cliente = ? AND projeto.status <> 50 ORDER BY id_servico DESC', idCliente, callback);
}

ServicosDAO.prototype.pegarTodosServicos = function(callback){
	this._connection.query('SELECT galeria.caminho_imagem, usuario.nome as nomeResponsavel, id_responsavel, servico.id_servico, data_solicitacao, data_termino, observacao, servico.status as statusServico, projeto.nome as nomeProjeto FROM servico JOIN projeto USING (id_projeto) LEFT JOIN usuario ON servico.id_responsavel = usuario.id_usuario JOIN galeria USING (id_servico) WHERE projeto.status <> 50 ORDER BY id_servico DESC', callback);
}

ServicosDAO.prototype.inserirServico = function(idProjeto, observacao, callback){
	this._connection.query('INSERT INTO servico (id_projeto, observacao) VALUES (?, ?)', [idProjeto, observacao], callback);
}

ServicosDAO.prototype.iniciarServico = function(idUsuario, idServico, callback){
	this._connection.query('UPDATE servico SET id_responsavel = ?, status = 3 WHERE id_servico = ?', [idUsuario, idServico], callback);
}

ServicosDAO.prototype.aprovarServico = function(idServico, callback){
	this._connection.query('UPDATE servico SET status = 0, data_termino = NOW() WHERE id_servico = ?', idServico, callback);
}

ServicosDAO.prototype.editarServico = function(idServico, statusServico, callback){
	this._connection.query('UPDATE servico SET status = ? WHERE id_servico = ?', [statusServico,idServico], callback);
}

ServicosDAO.prototype.reprovarServico = function(idServico, novaObservacao, callback){
	this._connection.query("UPDATE servico SET id_responsavel = null, status = 1, observacao = CONCAT((SELECT observacao FROM (SELECT * FROM servico) AS s1 WHERE id_servico = ?), '<br />', ?) WHERE id_servico = ?", [idServico, novaObservacao, idServico], callback);
}

ServicosDAO.prototype.contarTodosServicos = function(callback){
	this._connection.query('SELECT COUNT(id_servico) as todosServicos FROM servico', callback);
}

ServicosDAO.prototype.contarServicosAberto = function(callback){
	this._connection.query('SELECT COUNT(id_servico) as servicosAberto FROM servico WHERE status = 1 OR status = 3', callback);
}

ServicosDAO.prototype.contarServicos30Dias = function(callback){
	this._connection.query('SELECT COUNT(id_servico) as servicos30Dias FROM servico WHERE data_solicitacao BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE()', callback);
}

ServicosDAO.prototype.contarServicosRealizados30dias = function(callback){
	this._connection.query('SELECT COUNT(id_servico) as servicosRealizados30Dias FROM servico WHERE data_solicitacao BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE() AND status = 0', callback);
}

ServicosDAO.prototype.contarServicos7Dias = function(callback){
	this._connection.query('SELECT COUNT(id_servico) as servicos7Dias FROM servico WHERE data_solicitacao BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()', callback);
}

ServicosDAO.prototype.contarServicosRealizados7dias = function(callback){
	this._connection.query('SELECT COUNT(id_servico) as servicosRealizados7Dias FROM servico WHERE data_solicitacao BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE() AND status = 0', callback);
}

ServicosDAO.prototype.contarTodosServicosAdmin = function(idCliente, callback){
	this._connection.query('SELECT COUNT(id_servico) as todosServicos FROM servico JOIN projeto ON servico.id_projeto = projeto.id_projeto WHERE id_cliente = ?',idCliente, callback);
}

ServicosDAO.prototype.contarServicosAbertoAdmin = function(idCliente, callback){
	this._connection.query('SELECT COUNT(id_servico) as servicosAberto FROM servico JOIN projeto ON servico.id_projeto = projeto.id_projeto WHERE (servico.status = 1 OR servico.status = 3) AND id_cliente = ?',idCliente, callback);
}

ServicosDAO.prototype.contarServicos30DiasAdmin = function(idCliente, callback){
	this._connection.query('SELECT COUNT(id_servico) as servicos30Dias FROM servico JOIN projeto ON servico.id_projeto = projeto.id_projeto WHERE data_solicitacao BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE() AND id_cliente = ?',idCliente, callback);
}

ServicosDAO.prototype.contarServicosRealizados30diasAdmin = function(idCliente, callback){
	this._connection.query('SELECT COUNT(id_servico) as servicosRealizados30Dias FROM servico JOIN projeto ON servico.id_projeto = projeto.id_projeto WHERE data_solicitacao BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE() AND servico.status = 0 AND id_cliente = ?',idCliente, callback);
}

ServicosDAO.prototype.contarServicos7DiasAdmin = function(idCliente, callback){
	this._connection.query('SELECT COUNT(id_servico) as servicos7Dias FROM servico JOIN projeto ON servico.id_projeto = projeto.id_projeto WHERE data_solicitacao BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE() AND id_cliente = ?',idCliente, callback);
}

ServicosDAO.prototype.contarServicosRealizados7diasAdmin = function(idCliente, callback){
	this._connection.query('SELECT COUNT(id_servico) as servicosRealizados7Dias FROM servico JOIN projeto ON servico.id_projeto = projeto.id_projeto WHERE data_solicitacao BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE() AND servico.status = 0 AND id_cliente = ?',idCliente, callback);
}

ServicosDAO.prototype.servicosFiltrados = function(status, idUsuario, callback){
	if(status == 1){
		var where = `id_responsavel = ${idUsuario}`;
	}

	if(status == 2){
		var where = 'servico.status = 1';
	}

	if(status == 3){
		var where = 'servico.status = 0';
	}

	this._connection.query('SELECT usuario.nome as nomeResponsavel, id_responsavel, id_servico, data_solicitacao, data_termino, observacao, servico.status as statusServico, projeto.nome as nomeProjeto FROM servico JOIN projeto USING (id_projeto) LEFT JOIN usuario ON servico.id_responsavel = usuario.id_usuario WHERE projeto.status <> 50 AND ' + where + ' ORDER BY id_servico DESC', callback);
}

ServicosDAO.prototype.servicosFiltradosCliente = function(status, idCliente, callback){
	if(status == 2){
		var where = 'servico.status = 1';
	}

	if(status == 3){
		var where = 'servico.status = 0';
	}

	if(status == 4){
		var where = 'servico.status = 4';
	}

	this._connection.query('SELECT id_servico, data_solicitacao, data_termino, observacao, servico.status as statusServico, projeto.nome as nomeProjeto FROM servico JOIN projeto USING (id_projeto) WHERE id_cliente = ? AND projeto.status <> 50 AND ' + where + ' ORDER BY id_servico DESC', idCliente, callback);
}

module.exports = function(){
	return ServicosDAO;
}