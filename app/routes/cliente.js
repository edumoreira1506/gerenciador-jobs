module.exports = function(application){
	application.get('/clientes', function(req, res){
		if(req.session.logado == true && req.session.tipo == 1){
			application.app.controllers.clientes.listarClientes(application, req, res);
		}else{
			res.redirect('/');
		}
	});

	application.get('/novoCliente', function(req, res){
		if(req.session.logado == true && req.session.tipo == 1){			
			application.app.controllers.clientes.novoCliente(application, req, res);
		}else{
			res.redirect('/');
		}
	});

	application.post('/ciarNovoCliente', function(req, res){
		if(req.session.logado == true && req.session.tipo == 1)
			application.app.controllers.clientes.criarNovoCliente(application, req, res);

		else
			res.redirect('/');
	})

	application.post('/inativarCliente', function(req, res){
		if(req.session.logado == true && req.session.tipo == 1)
			application.app.controllers.clientes.editarCliente(application, req, res, 0);

		else
			res.redirect('/');
	})

	application.post('/ativarCliente', function(req, res){
		if(req.session.logado == true && req.session.tipo == 1)
			application.app.controllers.clientes.editarCliente(application, req, res, 1);

		else
			res.redirect('/');
	})

	application.post('/deletarCliente', function(req, res){
		if(req.session.logado == true && req.session.tipo == 1)
			application.app.controllers.clientes.editarCliente(application, req, res, 50);

		else
			res.redirect('/');
	})

	application.get('/cliente', function(req, res){
		if(req.session.logado == true && req.session.tipo == 1)
			application.app.controllers.clientes.cliente(application, req, res);

		else
			res.redirect('/');
	})

	application.post('/clientesFiltrados', function(req, res){
		if(req.session.logado == true && req.session.tipo == 1)
			application.app.controllers.clientes.clientesFiltrados(application, req, res);

		else
			res.redirect('/');
	})

	application.post('/todosClientes', function(req, res){
		if(req.session.logado == true && req.session.tipo == 1)
			application.app.controllers.clientes.todosClientes(application, req, res);

		else
			res.redirect('/');
	})

	application.get('/editarEmpresa', function(req, res){
		if(req.session.logado == true && req.session.tipo == 3)
			application.app.controllers.clientes.editarEmpresa(application, req, res);

		else
			res.redirect('/');
	})

	application.post('/editarEmpresa', function(req, res){
		if(req.session.logado == true && req.session.tipo == 3)
			application.app.controllers.clientes.editarInformacoesEmpresa(application, req, res);

		else
			res.redirect('/');
	})
}