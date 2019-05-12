module.exports.listarUsuariosAdmin = function(application, req, res){
	var connection = application.config.dbConnection();
    var usuariosModel = new application.app.models.UsuariosDAO(connection);

    usuariosModel.listarUsuarios(req.session.idCliente, req.session.idUsuario, function(error, result){
        res.render('usuarios/gerenciar-usuarios-cliente', {usuarios : result, idUsuario: req.session.idUsuario});
    });
}

module.exports.listarUsuariosDev = function(application, req, res){
    var connection = application.config.dbConnection();
    var usuariosModel = new application.app.models.UsuariosDAO(connection);

    usuariosModel.listarUsuariosPrincipais(function(error, result){
        var usuariosClientes = result;
        usuariosModel.listarUsuariosDev(function(error, response){
            var usuariosDev = response;
            res.render('usuarios/gerenciar-usuarios', {usuariosClientes : usuariosClientes, usuariosDev : usuariosDev, idUsuario: req.session.idUsuario});
        });
    });
}

module.exports.aprovarUsuario = function(application, req, res){
	var connection = application.config.dbConnection();
    var usuariosModel = new application.app.models.UsuariosDAO(connection);

   	usuariosModel.aprovarUsuario(req.body.idUsuario, function(error, result){
        res.send({"concluido":"1"});
    });
}

module.exports.bloquearUsuario = function(application, req, res){
    var connection = application.config.dbConnection();
    var usuariosModel = new application.app.models.UsuariosDAO(connection);

    usuariosModel.bloquearUsuario(req.body.idUsuario, function(error, result){
        res.send({"concluido":"1"});
    });
}

module.exports.excluirUsuario = function(application, req, res){
    var connection = application.config.dbConnection();
    var usuariosModel = new application.app.models.UsuariosDAO(connection);

    usuariosModel.excluirUsuario(req.body.idUsuario, function(error, result){
        res.send({"concluido":"1"});
    });
}

module.exports.excluirUsuarioDev = function(application, req, res){
    var connection = application.config.dbConnection();
    var usuariosModel = new application.app.models.UsuariosDAO(connection);

    usuariosModel.excluirUsuario(req.body.idUsuario, function(error, result){
        res.send({"concluido":"1"});
    });
}

module.exports.novoDesenvolvedor = function(application, req, res){
    res.render('usuarios/formulario-criar-usuario-dev', {idUsuario: req.session.idUsuario});
}

module.exports.criarNovoDesenvolvedor = function(application, req, res){
    var desenvolvedor = req.body;

    req.assert('nome','Nome do usuário é obrigatório').notEmpty();
    req.assert('email','Email do usuário é obrigatório').notEmpty();
    req.assert('senha','Senha é obrigatório').notEmpty();

    var erros = req.validationErrors();
    if(erros){
        return;
    }

    var connection = application.config.dbConnection();
    var usuariosModel = new application.app.models.UsuariosDAO(connection);

    usuariosModel.inserirDev(desenvolvedor.nome, desenvolvedor.email, desenvolvedor.senha, function(error, result){
        res.redirect('/usuarios');
    });
}

module.exports.editarPerfil = function(application, req, res){
    var connection = application.config.dbConnection();
    var usuariosModel = new application.app.models.UsuariosDAO(connection);

    usuariosModel.buscarUsuarioPeloEmail(req.session.email, function(error, result){
        res.render('usuarios/editar-perfil', {tipo: req.session.tipo, dados: result[0], idUsuario: req.session.idUsuario});
    });
}

module.exports.editarInformacoesPerfil = function(application, req, res){
    var connection = application.config.dbConnection();
    var usuariosModel = new application.app.models.UsuariosDAO(connection);

    usuariosModel.editarInformacoesPerfil(req.session.idUsuario, req.body.nome, req.body.email, function(error, result){
        res.send({"concluido":"1"});
    })
}

module.exports.verificarSenhaAntiga = function(application, req, res){
    var connection = application.config.dbConnection();
    var usuariosModel = new application.app.models.UsuariosDAO(connection);

    usuariosModel.verificarSenhaAntiga(req.session.idUsuario, req.body.senhaAntiga, function(error, result){
        if(result.length == 0){
            res.send({"concluido":"2"});
        }else{
            res.send({"concluido":"1"});
        }
    })
}

module.exports.alterarSenha = function(application, req, res){
    if(req.body.novaSenha != req.body.confirmacaoNovaSenha){
        res.send({"concluido":"2"});
    }else{
        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.UsuariosDAO(connection);

        usuariosModel.alterarSenha(req.session.idUsuario, req.body.novaSenha, function(error, result){
            res.send({"concluido":"1"});
        });
    }
}