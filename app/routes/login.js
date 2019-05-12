module.exports = function(application){
	application.get('/', function(req, res){
		if(req.session.logado == true){
			application.app.controllers.geral.verificacaoTipoUsuario(application, req, res, req.session.tipo);
		}else{
			application.app.controllers.login.iniciar(application, req, res);
		}
	});

	application.post('/autenticar', function(req, res){
		application.app.controllers.login.autenticar(application, req, res);
	});

	application.get('/autenticar', function(req, res){
		if(req.session.logado == true){
			application.app.controllers.geral.verificacaoTipoUsuario(application, req, res, req.session.tipo);
		}else{
			res.redirect('/');
		}
	});
}