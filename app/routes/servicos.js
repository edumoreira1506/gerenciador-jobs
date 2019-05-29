module.exports = function(application){
	application.get('/servicos', function(req, res){
		if(req.session.logado == true){
			application.app.controllers.geral.verificacaoTipoUsuarioServico(application, req, res, req.session.tipo);
		}else{
			res.redirect('/');
		}
	});

	application.get('/servicosAdmin', function(req, res){
		if(req.session.logado == true){
			if(req.session.tipo == 3)
				application.app.controllers.servicos.listarServicosAdmin(application, req, res);
			else
				application.app.controllers.geral.verificacaoTipoUsuarioServico(application, req, res, req.session.tipo);
		}else{
			res.redirect('/');
		}
	});

	application.get('/servicosCliente', function(req, res){
		if(req.session.logado == true){
			if(req.session.tipo == 2)
				application.app.controllers.servicos.listarServicosAdmin(application, req, res);
			else
				application.app.controllers.geral.verificacaoTipoUsuarioServico(application, req, res, req.session.tipo);
		}else{
			res.redirect('/');
		}
	})

	application.post('/editarServico', function(req, res){
		if(req.session.logado == true)
			application.app.controllers.servicos.editarServico(application, req, res);
		else
			res.redirect('/');
	});

	application.post('/editarServicoFormulario', function(req, res){
		if(req.session.logado == true)
			application.app.controllers.servicos.editarServicoFormulario(application, req, res);
		else
			res.redirect('/');
	});

	application.get('/novoServico', function(req, res){
		if(req.session.logado == true && (req.session.tipo == 3 || req.session.tipo == 2)){			
			application.app.controllers.servicos.novoServico(application, req, res);
		}else{
			res.redirect('/');
		}
	});

	application.post('/criarNovoServico', function(req, res){
		if(req.session.logado == true && (req.session.tipo == 3 || req.session.tipo == 2))
			application.app.controllers.servicos.criarNovoServico(application, req, res);

		else
			res.redirect('/');
	})

	application.get('/servico', function(req, res){
		if(req.session.logado == true)
			application.app.controllers.servicos.servico(application, req, res);
		else
			res.redirect('/')
	});

	application.get('/servicosDev', function(req, res){
		if(req.session.logado == true){
			if(req.session.tipo == 1)
				application.app.controllers.servicos.listarServicosDev(application, req, res);
			else
				application.app.controllers.geral.verificacaoTipoUsuarioServico(application, req, res, req.session.tipo);
		}else{
			res.redirect('/');
		}
	});

	application.post('/iniciarServico', function(req, res){
		if(req.session.logado == true){
			if(req.session.tipo == 1)
				application.app.controllers.servicos.iniciarServico(application, req, res);
			else
				application.app.controllers.geral.verificacaoTipoUsuarioServico(application, req, res, req.session.tipo);
		}else{
			res.redirect('/');
		}
	})

	application.post('/aprovarServico', function(req, res){
		if(req.session.logado == true){
			if(req.session.tipo == 3 || req.session.tipo == 2)
				application.app.controllers.servicos.aprovarServico(application, req, res);
			else
				application.app.controllers.geral.verificacaoTipoUsuarioServico(application, req, res, req.session.tipo);
		}else{
			res.redirect('/');
		}
	})

	application.post('/deletarServico', function(req, res){
		if(req.session.logado == true){
			application.app.controllers.servicos.deletarServico(application, req, res);
		}else{
			res.redirect('/');
		}
	});

	application.post('/mandarParaAprovacao', function(req, res){
		if(req.session.logado == true){
			if(req.session.tipo == 1)
				application.app.controllers.servicos.mandarParaAprovacao(application, req, res);
			else
				application.app.controllers.geral.verificacaoTipoUsuarioServico(application, req, res, req.session.tipo);
		}else{
			res.redirect('/');
		}
	})

	application.post('/reprovarServico', function(req, res){
		if(req.session.logado == true){
			if(req.session.tipo == 3 || req.session.tipo == 2)
				application.app.controllers.servicos.reprovarServico(application, req, res);
			else
				application.app.controllers.geral.verificacaoTipoUsuarioServico(application, req, res, req.session.tipo);
		}else{
			res.redirect('/');
		}
	})

	application.post('/todosServicos', function(req, res){
		if(req.session.logado == true){
			if(req.session.tipo == 1)
				application.app.controllers.servicos.todosServicos(application, req, res);

			else
				application.app.controllers.servicos.todosServicosCliente(application, req, res);
		}else{
			res.redirect('/');
		}
	});

	application.post('/servicosFiltrados', function(req, res){
		if(req.session.logado == true){
			if(req.session.tipo == 1)
				application.app.controllers.servicos.servicosFiltrados(application, req, res);

			else
				application.app.controllers.servicos.servicosFiltradosCliente(application, req, res);
		}else{
			res.redirect('/');
		}
	})
}