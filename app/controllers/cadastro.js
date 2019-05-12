module.exports.criarConta = function(application, req, res){
	res.render('usuarios/formulario-criar-usuario', {validacao : {}, usuario : {}, sucesso: 0});
}

module.exports.validacaoCriacao = function(application, req, res){
    var usuario = req.body;

    req.assert('nome','Nome é obrigatório').notEmpty();
    req.assert('email','Email é obrigatório').notEmpty();
    req.assert('senha','Senha é obrigatório').notEmpty();
    req.assert('chave','Chave é obrigatório').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('usuarios/formulario-criar-usuario', {validacao : erros, usuario : usuario, sucesso: 0});
        return;
    }

    var connection = application.config.dbConnection();
    var usuariosModel = new application.app.models.UsuariosDAO(connection);
    var clientesModel = new application.app.models.ClientesDAO(connection);

    clientesModel.verificarChave(usuario.chave, function(error, result){
        if (result.length > 0) {
            var aberto = 0;
        }else{
            var aberto = 1;
        }

        clientesModel.procuraChaveNoBanco(usuario.chave, function(error, result){
                if(result.length == 0){
                    res.render('usuarios/formulario-criar-usuario', {validacao : erros, usuario : usuario, sucesso: 3});
                }else{
                    var idCliente = result[0].id_cliente;
                    usuarioInserir = {nome: usuario.nome, email: usuario.email, senha: usuario.senha, aprovado: aberto, id_cliente: idCliente};

                    usuariosModel.verificarEmail(usuario.email, function(error, result){
                        if(result.length == 0){
                            if(aberto == 1){
                                usuarioInserir.tipo = 3;

                                usuariosModel.inserirUsuario(usuarioInserir, function(error, result){
                                    res.render('usuarios/formulario-criar-usuario', {validacao : erros, usuario : usuario, sucesso: 1});
                                }); 
                            }else{
                                usuarioInserir.tipo = 2;

                                usuariosModel.inserirUsuarioSimples(usuarioInserir, function(error, result){
                                    res.render('usuarios/formulario-criar-usuario', {validacao : erros, usuario : usuario, sucesso: 2});
                                }); 
                            }
                        }
                        else{
                           res.render('usuarios/formulario-criar-usuario', {validacao : erros, usuario : usuario, sucesso: 4});
                        }
                    });                    
                }
            });
    });
}