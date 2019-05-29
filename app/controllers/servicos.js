var multer = require('multer');
var path = require('path');

module.exports.listarServicosAdmin = function(application, req, res){
	var connection = application.config.dbConnection();
    var servicosModel = new application.app.models.ServicosDAO(connection);

    servicosModel.pegarServicos(req.session.idCliente, function(error, result){
        if(req.session.tipo == 2){
            res.render('servicos/gerenciar-servicos-cliente', {servicos: result, admin: 0, idUsuario: req.session.idUsuario});
        }else{
            res.render('servicos/gerenciar-servicos-cliente', {servicos: result, admin: 1, idUsuario: req.session.idUsuario});
        }
    });
}

module.exports.editarServico = function(application, req, res){
    var connection = application.config.dbConnection();
    var servicosModel = new application.app.models.ServicosDAO(connection);

    servicosModel.pegarServicosPeloIdServico(req.body.idServico, function(error, result){
        res.render('servicos/formulario-editar-servico', {servico: result[0], idUsuario: req.session.idUsuario});
    });
}

module.exports.novoServico = function(application, req, res){
    var connection = application.config.dbConnection();
    var projetosModel = new application.app.models.ProjetosDAO(connection);

    projetosModel.pegarProjetos(req.session.idCliente, function(error, result){
        res.render('servicos/formulario-criar-servico', {projetos: result, idUsuario: req.session.idUsuario});
    });
}

module.exports.criarNovoServico = function(application, req, res){
    var storage = multer.diskStorage({
        destination: 'app/public/assets/img/uploads',
        filename: function(req, file, callback){
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    var upload = multer({
        storage: storage,
        fileFilter: (req, file, callback) => {
            checkFileType(file, callback);
        }
    }).single('imagens');

    var checkFileType = (file, callback) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extensaoImagem = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype)

        if(mimetype && extensaoImagem){
            return callback(null, true);
        }else{
            callback('1');
        }
    }

    upload(req, res, (erros) => {
        if(erros){
            return;
        }else{
            var servico = req.body;
            req.assert('observacao','Nome do Projeto é obrigatório').notEmpty();

            var erros = req.validationErrors();
            if(erros){
                return;
            }

            var connection = application.config.dbConnection();
            var servicosModel = new application.app.models.ServicosDAO(connection);
            var galeriasModel = new application.app.models.GaleriasDAO(connection);

            if(req.file != undefined){
                servicosModel.inserirServico(servico.idProjeto, servico.observacao, function(error, result){
                    var idServico = result.insertId;
                    galeriasModel.inserirImagem(req.file.filename, idServico, function(error, result){
                        var idServico = result.insertId;

                        res.redirect('/servicos');
                    });
                });
            }else{
                servicosModel.inserirServico(servico.idProjeto, servico.observacao, function(error, result){
                    res.redirect('/servicos');
                });
            }
        }
    });
}

module.exports.editarServicoFormulario = function(application, req, res){
    var storage = multer.diskStorage({
        destination: 'app/public/assets/img/uploads',
        filename: function(req, file, callback){
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    var upload = multer({
        storage: storage,
        fileFilter: (req, file, callback) => {
            checkFileType(file, callback);
        }
    }).single('imagens');

    var checkFileType = (file, callback) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extensaoImagem = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype)

        if(mimetype && extensaoImagem){
            return callback(null, true);
        }else{
            callback('1');
        }
    }

    upload(req, res, (erros) => {
        if(erros){
            return;
        }else{
            var servico = req.body;
            req.assert('observacao','Descição do serviço é obrigatório').notEmpty();

            var erros = req.validationErrors();
            if(erros){
                return;
            }

            var connection = application.config.dbConnection();
            var servicosModel = new application.app.models.ServicosDAO(connection);
            var galeriasModel = new application.app.models.GaleriasDAO(connection);

            if(req.file != undefined){

                servicosModel.editarObservacaoServico(servico.idServico, servico.observacao, function(error, result){
                    galeriasModel.editarImagem(req.file.filename, servico.idServico, function(error, result){
                        res.redirect('/servicos');
                    });
                });
            }else{
                servicosModel.editarObservacaoServico(servico.idServico, servico.observacao, function(error, result){
                    res.redirect('/servicos');
                });
            }
        }
    });
}

module.exports.servico = function(application, req, res){
    var idProjeto = req.query;

    var connection = application.config.dbConnection();
    var servicosModel = new application.app.models.ServicosDAO(connection);

    servicosModel.pegarServicosPeloIdProjeto(idProjeto.projeto, function(error, result){
        if(req.session.tipo == 1){
            res.render('servicos/gerenciar-servicos', {servicos: result, idUsuario: req.session.idUsuario});
        }else{
            if(req.session.tipo == 3)
                res.render('servicos/gerenciar-servicos-cliente', {servicos: result, admin:1, idUsuario: req.session.idUsuario});
            else
                res.render('servicos/gerenciar-servicos-cliente', {servicos: result, admin:0, idUsuario: req.session.idUsuario});
        }
    });
}

module.exports.listarServicosDev = function(application, req, res){
    var connection = application.config.dbConnection();
    var servicosModel = new application.app.models.ServicosDAO(connection);

    servicosModel.pegarTodosServicos(function(error, result){
        res.render('servicos/gerenciar-servicos', {servicos: result, idUsuario : req.session.idUsuario});
    });
}

module.exports.iniciarServico = function(application, req, res){
    var connection = application.config.dbConnection();
    var servicosModel = new application.app.models.ServicosDAO(connection);

    servicosModel.pegarServicosPeloIdServico(req.body.idServico, function(error, result){
        if(result[0].id_responsavel == null){
            servicosModel.iniciarServico(req.session.idUsuario, req.body.idServico, function(error, result){
                res.send({"concluido":"1"});
            });
        }else{
            res.send({"concluido":"2"});
        }
    });   
}

module.exports.aprovarServico = function(application, req, res){
    var connection = application.config.dbConnection();
    var servicosModel = new application.app.models.ServicosDAO(connection);

    servicosModel.aprovarServico(req.body.idServico, function(error, result){
        res.send({"concluido":"1"});
    });
}

module.exports.deletarServico = (application, req, res) => {
    var connection = application.config.dbConnection();
    var servicosModel = new application.app.models.ServicosDAO(connection);

    servicosModel.deletarServico(req.body.idServico, function(error, result){
        res.send({"concluido":"1"});
    });
}

module.exports.mandarParaAprovacao = function(application, req, res){
    var connection = application.config.dbConnection();
    var servicosModel = new application.app.models.ServicosDAO(connection);

    servicosModel.editarServico(req.body.idServico, 4, function(error, result){
        res.send({"concluido":"1"});
    });
}

module.exports.reprovarServico = function(application, req, res){
    var connection = application.config.dbConnection();
    var servicosModel = new application.app.models.ServicosDAO(connection);
    
    servicosModel.reprovarServico(req.body.idServico, req.body.novaObservacao, function(error, result){
        res.send({"concluido":"1"});
    });
}

module.exports.todosServicos = function(application, req, res){
    var connection = application.config.dbConnection();
    var servicosModel = new application.app.models.ServicosDAO(connection);

    servicosModel.pegarTodosServicos(function(error, result){
        res.send(result);
    });
}

module.exports.servicosFiltrados = function(application, req, res){
    var connection = application.config.dbConnection();
    var servicosModel = new application.app.models.ServicosDAO(connection);

    servicosModel.servicosFiltrados(req.body.status, req.session.idUsuario, function(error, result){
        res.send(result);
    });
}

module.exports.servicosFiltradosCliente = function(application, req, res){
    var connection = application.config.dbConnection();
    var servicosModel = new application.app.models.ServicosDAO(connection);

    servicosModel.servicosFiltradosCliente(req.body.status, req.session.idCliente, function(error, result){
        res.send(result);
    });
}

module.exports.todosServicosCliente = function(application, req, res){
    var connection = application.config.dbConnection();
    var servicosModel = new application.app.models.ServicosDAO(connection);

    servicosModel.pegarServicos(req.session.idCliente, function(error, result){
        res.send(result)
    });
}