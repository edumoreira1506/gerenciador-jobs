module.exports.listarClientes = function(application, req, res){
	var connection = application.config.dbConnection();
    var clientesModel = new application.app.models.ClientesDAO(connection);

    clientesModel.listarClientes(function(error, result){
        res.render('clientes/gerenciar-clientes', {clientes: result, idUsuario: req.session.idUsuario});
    });
}

module.exports.novoCliente = function(application, req, res){
	res.render('clientes/formulario-criar-cliente', {idUsuario: req.session.idUsuario});
}

module.exports.criarNovoCliente = function(application, req, res){
	var cliente = req.body;

	req.assert('nome','Nome do Cliente é obrigatório').notEmpty();
	req.assert('cpf_cnpj','CPF/CNPJ do cliente é obrigatório').notEmpty();
	req.assert('chave','Chave é obrigatório').notEmpty();

	var erros = req.validationErrors();
    if(erros){
        return;
    }

    var connection = application.config.dbConnection();
    var clientesModel = new application.app.models.ClientesDAO(connection);

    clientesModel.inserirCliente(cliente, function(error, result){
        res.redirect('/clientes');
    });
}

module.exports.editarCliente = function(application, req, res, ativo){
    var connection = application.config.dbConnection();
    var clientesModel = new application.app.models.ClientesDAO(connection);

    clientesModel.editarCliente(req.body.idCliente, ativo, function(error, result){
        res.send({"concluido":"1"});
    });
}

module.exports.cliente = function(application, req, res){
    var cliente = req.query;

    var connection = application.config.dbConnection();
    var servicosModel = new application.app.models.ServicosDAO(connection);

    servicosModel.pegarServicosPeloIdCliente(cliente.id_cliente, function(error, result){
        res.render('servicos/gerenciar-servicos', {servicos: result, idUsuario : req.session.idUsuario});
    });
}

module.exports.clientesFiltrados = function(application, req, res){
    var connection = application.config.dbConnection();
    var clientesModel = new application.app.models.ClientesDAO(connection);

    clientesModel.listarClientesFiltrados(req.body.status ,function(error, result){
        res.send(result);
    });
}

module.exports.todosClientes = function(application, req, res){
    var connection = application.config.dbConnection();
    var clientesModel = new application.app.models.ClientesDAO(connection);

    clientesModel.listarClientes(function(error, result){
        res.send(result);
    });
}

module.exports.editarEmpresa = function(application, req, res){
    var connection = application.config.dbConnection();
    var clientesModel = new application.app.models.ClientesDAO(connection);

    clientesModel.pegarCliente(req.session.idCliente ,function(error, result){
        res.render('clientes/editar-empresa', {dados: result[0], idUsuario: req.session.idUsuario});
    });
}

module.exports.editarInformacoesEmpresa = function(application, req, res){
    var connection = application.config.dbConnection();
    var clientesModel = new application.app.models.ClientesDAO(connection);

    clientesModel.editarInformacoesEmpresa(req.session.idCliente, req.body.nome, req.body.cpf_cnpj, req.body.chave, function(error, result){
        res.send({"concluido":"1"});
    })
}