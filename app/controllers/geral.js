module.exports.verificacaoTipoUsuario = function(application, req, res, tipo){
	switch(tipo){
		case 1: res.redirect('/painelDev'); break;
		case 2: res.redirect('/painelCliente'); break;
		case 3: res.redirect('/painelAdmin'); break;
	}
}

module.exports.verificacaoTipoUsuarioServico = function(application, req, res, tipo){
	switch(tipo){
		case 1: res.redirect('/servicosDev'); break;
		case 2: res.redirect('/servicosCliente'); break;
		case 3: res.redirect('/servicosAdmin'); break;
	}
}

module.exports.verificacaoTipoUsuarioProjeto = function(application, req, res, tipo){
	switch(tipo){
		case 1: res.redirect('/projetosDev'); break;
		case 2: res.redirect('/'); break;
		case 3: res.redirect('/projetosAdmin'); break;
	}
}

module.exports.verificacaoTipoUsuarioUsuario = function(application, req, res){
	switch(req.session.tipo){
		case 1: res.redirect('/usuariosDev'); break;
		case 2: res.redirect('/');
		case 3: res.redirect('/usuariosAdmin'); break;
	}
}

module.exports.sair = function(application, req, res){
	req.session.destroy(function(err){
		res.redirect('/');		
	});
}

module.exports.validarTamanhoJson = function(json, variavel, nomeChave){
    if(variavel == undefined || variavel == null){
        json[nomeChave] = "0";
        return json;
    }else{
        json[nomeChave] = variavel[0][nomeChave];
        return json;
    }
}