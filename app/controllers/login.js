module.exports.iniciar = function(application, req, res){
    res.render('login', {validacao : {}, email: undefined});
}

module.exports.autenticar = function(application, req, res){
    var usuario = req.body;

    req.assert('email','Email é obrigatório').notEmpty();
    req.assert('senha','Senha é obrigatório').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('login', {validacao : erros, email : usuario.email});
        return;
    }

    var connection = application.config.dbConnection();
    var usuariosModel = new application.app.models.UsuariosDAO(connection);

    usuariosModel.autenticarUsuario(usuario, function(error, result){
        if(result.length > 0){
            if(result[0].ativo == 50){
                res.render('login', {validacao : [{msg: "Cliente inativado. Para ativar novamente contate o suporte: (15) 99644-2031!"}], email : usuario.email});
                return;
            }else{
                switch(result[0].aprovado){
                    case 0:
                        res.render('login', {validacao : [{msg: "Sua aprovação está pendente!"}], email : usuario.email});
                        break;

                    case 1:
                        req.session.nome = result[0].nome;
                        req.session.logado = true;
                        req.session.tipo = result[0].tipo;
                        req.session.idUsuario = result[0].id_usuario;
                        req.session.idCliente = result[0].id_cliente;
                        req.session.email = result[0].email;

                        application.app.controllers.geral.verificacaoTipoUsuario(application, req, res, result[0].tipo);
                        break;

                    case 50:
                        res.render('login', {validacao : [{msg: "Seu usuário foi desativado. Para ativar novamente, entre em contato com o suporte: (15) 99644-2031"}], email : usuario.email});
                        break;
                }
            }
        }else{
            res.render('login', {validacao : [{msg: "Email ou senha inválidos!"}], email : usuario.email});
        }
    });
}

