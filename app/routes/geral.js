module.exports = function(application){
	application.get('/sair', function(req, res){
		if(req.session.logado == true){
			application.app.controllers.geral.sair(application, req, res);
		}else{
			res.redirect('/');
		}
	});
}
