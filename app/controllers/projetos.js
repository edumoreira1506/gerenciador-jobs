module.exports.listarProjetosAdmin = function(application, req, res){
	var connection = application.config.dbConnection();
    var projetosModel = new application.app.models.ProjetosDAO(connection);

    projetosModel.pegarProjetos(req.session.idCliente, function(error, result){
      res.render('projetos/gerenciar-projetos-cliente', {projetos: result, idUsuario: req.session.idUsuario});
    });
}

module.exports.listarProjetosDev = function(application, req, res){
    var connection = application.config.dbConnection();
    var projetosModel = new application.app.models.ProjetosDAO(connection);

    projetosModel.pegarTodosProjetos(function(error, result){
        res.render('projetos/gerenciar-projetos', {projetos: result, idUsuario: req.session.idUsuario});        
    });
}

module.exports.novoProjeto = function(application, req, res){
	res.render('projetos/formulario-criar-projeto');
}

module.exports.criarNovoProjeto = function(application, req, res){
    var projeto = req.body;

    req.assert('nome','Nome do Projeto é obrigatório').notEmpty();

    var erros = req.validationErrors();
    if(erros){
        return;
    }

    var connection = application.config.dbConnection();
    var projetosModel = new application.app.models.ProjetosDAO(connection);

    projetosModel.inserirProjeto(projeto.nome, req.session.idCliente, function(error, result){
        res.redirect('/projetos');
    });
}

module.exports.editarProjeto = function(application, req, res, idProjeto, status){
    var connection = application.config.dbConnection();
    var projetosModel = new application.app.models.ProjetosDAO(connection);

    projetosModel.editarProjeto(idProjeto, status, function(error, result){
        res.send({"concluido":"1"});
    });
}

module.exports.listarServicosDoProjeto = function(application, req, res){
    var projeto = req.query;

    var connection = application.config.dbConnection();
    var servicosModel = new application.app.models.ServicosDAO(connection);

    servicosModel.pegarServicosPeloIdProjeto(projeto.id_projeto, function(error, result){
        res.render('servicos/gerenciar-servicos', {servicos: result, idUsuario : req.session.idUsuario});
    });
}