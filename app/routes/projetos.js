module.exports = function(application){
	application.get('/projetos', function(req, res){
		if(req.session.logado == true){
			application.app.controllers.geral.verificacaoTipoUsuarioProjeto(application, req, res, req.session.tipo);
		}else{
			res.redirect('/');
		}
	});

	application.get('/projetosAdmin', function(req, res){
		if(req.session.logado == true){
			if(req.session.tipo == 3)
				application.app.controllers.projetos.listarProjetosAdmin(application, req, res);
			else
				application.app.controllers.geral.verificacaoTipoUsuarioProjeto(application, req, res, req.session.tipo);
		}else{
			res.redirect('/');
		}
	})

	application.get('/projetosDev', function(req, res){
		if(req.session.logado == true){
			if(req.session.tipo == 1)
				application.app.controllers.projetos.listarProjetosDev(application, req, res);
			else
				application.app.controllers.geral.verificacaoTipoUsuarioProjeto(application, req, res, req.session.tipo);
		}else{
			res.redirect('/');
		}
	})

	application.get('/novoProjeto', function(req, res){
		if(req.session.logado == true && req.session.tipo == 3){			
			application.app.controllers.projetos.novoProjeto(application, req, res);
		}else{
			res.redirect('/');
		}
	});

	application.post('/criarNovoProjeto', function(req, res){
		if(req.session.logado == true && req.session.tipo == 3){
			application.app.controllers.projetos.criarNovoProjeto(application, req, res);
		}else{
			res.redirect('/');
		}
	})

	application.post('/pausarProjeto', function(req, res){
		if(req.session.logado == true && req.session.tipo == 3 && req.session.idCliente == req.body.idCliente){
			application.app.controllers.projetos.editarProjeto(application, req, res, req.body.idProjeto, 0);
		}else{
			res.redirect('/');
		}
	})

	application.post('/retomarProjeto', function(req, res){
		if(req.session.logado == true && req.session.tipo == 3 && req.session.idCliente == req.body.idCliente){
			application.app.controllers.projetos.editarProjeto(application, req, res, req.body.idProjeto, 1);
		}else{
			res.redirect('/');
		}
	})

	application.post('/excluirProjeto', function(req, res){
		if(req.session.logado == true && req.session.tipo == 3 && req.session.idCliente == req.body.idCliente){
			application.app.controllers.projetos.editarProjeto(application, req, res, req.body.idProjeto, 50);
		}else{
			res.redirect('/');
		}
	})

	application.get('/projeto', function(req, res){
		if(req.session.logado == true && req.session.tipo == 1){
			application.app.controllers.projetos.listarServicosDoProjeto(application, req, res);
		}else{
			res.redirect('/');
		}
	})
}