module.exports = function(application){
	application.get('/pegarNotificacoes', function(req, res){
		if(req.session.logado == true && req.session.tipo != 1){
			application.app.controllers.notificacoes.pegarNotificacoes(application, req, res);
		}else{
			application.app.controllers.geral.verificacaoTipoUsuario(application, req, res, req.session.tipo);
		}
	});
}