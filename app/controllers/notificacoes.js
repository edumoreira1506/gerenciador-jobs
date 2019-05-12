module.exports.pegarNotificacoes = function(application, req, res){
	var connection = application.config.dbConnection();
    var notificacoesModel = new application.app.models.NotificacoesDAO(connection);

    notificacoesModel.pegarNotificacoes(req.session.idCliente, function(error, result){
    	res.send({notificacoes: result[0].notificacoes})
    });
}