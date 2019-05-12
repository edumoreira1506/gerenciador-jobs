module.exports = function(application){
	application.get('/usuarios', function(req, res){
		if(req.session.logado == true && req.session.tipo != 2){
			application.app.controllers.geral.verificacaoTipoUsuarioUsuario(application, req, res);
		}else{
			res.redirect('/');
		}
	});

	application.get('/usuariosAdmin', function(req, res){
		if(req.session.logado == true && req.session.tipo == 3){
			application.app.controllers.usuarios.listarUsuariosAdmin(application, req, res);
		}else{
			res.redirect('/usuarios');
		}
	});

	application.get('/usuariosDev', function(req, res){
		if(req.session.logado == true && req.session.tipo == 1){
			application.app.controllers.usuarios.listarUsuariosDev(application, req,res);
		}else{
			res.redirect('/usuarios');
		}
	});

	application.get('/novoUsuario', function(req, res){
		if(req.session.logado == true && req.session.tipo == 3){			
			application.app.controllers.usuarios.novoUsuario(application, req, res);
		}else{
			res.redirect('/');
		}
	});

	application.post('/aprovarUsuario', function(req, res){
		if(req.session.logado == true){	
			if(req.session.tipo == 3 && req.body.idCliente == req.session.idCliente)		
				application.app.controllers.usuarios.aprovarUsuario(application, req, res);
		}else{
			res.redirect('/');
		}
	})

	application.post('/bloquearUsuario', function(req, res){
		if(req.session.logado == true && req.session.tipo == 3 && req.body.idCliente == req.session.idCliente){	
			application.app.controllers.usuarios.bloquearUsuario(application, req, res);
		}else{
			res.redirect('/');
		}
	})

	application.post('/excluirUsuario', function(req, res){
		if(req.session.logado == true && req.session.tipo == 3 && req.body.idCliente == req.session.idCliente){		
			application.app.controllers.usuarios.excluirUsuario(application, req, res);
		}else{
			res.redirect('/');
		}
	})

	application.post('/excluirUsuarioDev', function(req, res){
		if(req.session.logado == true && req.session.tipo == 1){
			application.app.controllers.usuarios.excluirUsuarioDev(application, req, res);
		}else{
			res.redirect('/');
		}
	})

	application.get('/novoDesenvolvedor', function(req, res){
		if(req.session.logado == true && req.session.tipo == 1){			
			application.app.controllers.usuarios.novoDesenvolvedor(application, req, res);
		}else{
			res.redirect('/');
		}
	});

	application.post('/criarNovoDesenvolvedor', function(req, res){
		if(req.session.logado == true && req.session.tipo == 1)
			application.app.controllers.usuarios.criarNovoDesenvolvedor(application, req, res);

		else
			res.redirect('/');
	})

	application.get('/editarPerfil', function(req, res){
		if(req.session.logado == true)
			application.app.controllers.usuarios.editarPerfil(application, req, res);

		else
			res.redirect('/');
	})

	application.post('/editarPerfil', function(req, res){
		if(req.session.logado == true)
			application.app.controllers.usuarios.editarInformacoesPerfil(application, req, res);

		else
			req.redirect('/');
	});

	application.post('/verificarSenhaAntiga', function(req, res){
		if(req.session.logado == true)
			application.app.controllers.usuarios.verificarSenhaAntiga(application, req, res)

		else
			res.redirect('/');
	})

	application.post('/alterarSenha', function(req, res){
		if(req.session.logado == true)
			application.app.controllers.usuarios.alterarSenha(application, req, res)

		else
			res.redirect('/');
	});
}