var app = require('./config/server');

var server = app.listen(400, function(){
	console.log('Servidor online na porta 400');
})

var io = require('socket.io').listen(server);
app.set('io', io);

var usuariosOnline = {};


io.on('connection', function(usuario){
	const idSocket = usuario.id
	usuariosOnline[idSocket] = {online: 1}

	usuario.on('entrarNoServidor', function(dados){
		usuariosOnline[idSocket].idUsuario = dados.idUsuario;
	});

	usuario.on('aprovacaoServico', function(dados){
		var connection = app.config.dbConnection();
		var usuariosModel = new app.app.models.UsuariosDAO(connection);

		usuariosModel.pegarUsuarios(dados.idServico, function(error, result){
			var usuariosDoCliente = [];

			if(result.length > 0){
				var connection = app.config.dbConnection();
				var notificacoesModel = new app.app.models.NotificacoesDAO(connection);
				notificacoesModel.inserirNotificacao(result[0].id_cliente);
			}

			for(i in result){
				usuariosDoCliente.push(result[i].id_usuario);
			}

			Object.keys(usuariosOnline).forEach(function(percorrendo){
				var pessoa = usuariosOnline[percorrendo];
				if(usuariosDoCliente.includes(pessoa.idUsuario)){
					io.sockets.connected[percorrendo].emit('aprovacaoServicoCliente', {idServico: dados.idServico});
				}
			});
		});
	})

	usuario.on('reprovarServico', function(dados){
		var connection = app.config.dbConnection();
		var usuariosModel = new app.app.models.UsuariosDAO(connection);
	
		usuariosModel.listarUsuariosDev(function(error, result){
			var usuariosDev = [];

			for(i in result){
				usuariosDev.push(result[i].id_usuario);
			}

			Object.keys(usuariosOnline).forEach(function(percorrendo){
				var pessoa = usuariosOnline[percorrendo];
				if(usuariosDev.includes(pessoa.idUsuario)){
					io.sockets.connected[percorrendo].emit('servicoReprovado');
				}
			});
		});	
	})

	usuario.on('aprovarServico', function(dados){
		var connection = app.config.dbConnection();
		var usuariosModel = new app.app.models.UsuariosDAO(connection);
	
		usuariosModel.listarUsuariosDev(function(error, result){
			var usuariosDev = [];

			for(i in result){
				usuariosDev.push(result[i].id_usuario);
			}

			Object.keys(usuariosOnline).forEach(function(percorrendo){
				var pessoa = usuariosOnline[percorrendo];
				if(usuariosDev.includes(pessoa.idUsuario)){
					io.sockets.connected[percorrendo].emit('servicoAprovado');
				}
			});
		});	
	})

	usuario.on('disconnect', function(){
		delete usuariosOnline[idSocket];
	});

	usuario.on('visualizarNotificacoes', function(dados){
		var connection = app.config.dbConnection();
		var notificacoesModel = new app.app.models.NotificacoesDAO(connection);
		notificacoesModel.visualizarNotificacoes(dados.idUsuario);
	})
});