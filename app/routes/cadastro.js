module.exports = function(application){
	application.get('/criar-conta', function(req, res){
		if(req.session.logado == true){
			application.app.controllers.geral.verificacaoTipoUsuario(application, req, res, req.session.tipo);
		}else{
			application.app.controllers.cadastro.criarConta(application, req, res);
		}
	});

	application.post('/criar-conta', function(req, res){
		application.app.controllers.cadastro.validacaoCriacao(application, req, res);
	});
}

