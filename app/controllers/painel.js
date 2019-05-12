module.exports.iniciarPainel = function(application, req, res){
    var connection = application.config.dbConnection();
    var projetosModel = new application.app.models.ProjetosDAO(connection);
    var servicosModel = new application.app.models.ServicosDAO(connection);

    projetosModel.contarTodosProjetosAdmin(req.session.idCliente, function(error, todosProjetos){
        projetosModel.contarProjetosAtivosAdmin(req.session.idCliente, function(error, projetosAtivos){
            servicosModel.contarTodosServicosAdmin(req.session.idCliente, function(error, todosServicos){
                servicosModel.contarServicosAbertoAdmin(req.session.idCliente, function(error, servicosAberto){
                    servicosModel.contarServicos30DiasAdmin(req.session.idCliente, function(error, servicos30Dias){
                        servicosModel.contarServicosRealizados30diasAdmin(req.session.idCliente, function(error, servicosRealizados30Dias){
                            servicosModel.contarServicos7DiasAdmin(req.session.idCliente, function(error, servicos7Dias){
                                servicosModel.contarServicosRealizados7diasAdmin(req.session.idCliente, function(error, servicosRealizados7Dias){
                                    var json = {nome: req.session.nome, idUsuario: req.session.idUsuario};
                                    json = application.app.controllers.geral.validarTamanhoJson(json, todosProjetos, 'todosProjetos');
                                    json = application.app.controllers.geral.validarTamanhoJson(json, projetosAtivos, 'projetosAtivos');
                                    json = application.app.controllers.geral.validarTamanhoJson(json, todosServicos, 'todosServicos');
                                    json = application.app.controllers.geral.validarTamanhoJson(json, servicosAberto, 'servicosAberto');
                                    json = application.app.controllers.geral.validarTamanhoJson(json, servicos30Dias, 'servicos30Dias');
                                    json = application.app.controllers.geral.validarTamanhoJson(json, servicosRealizados30Dias, 'servicosRealizados30Dias');
                                    json = application.app.controllers.geral.validarTamanhoJson(json, servicos7Dias, 'servicos7Dias');
                                    json = application.app.controllers.geral.validarTamanhoJson(json, servicosRealizados7Dias, 'servicosRealizados7Dias');
                                    res.render('painel/painel-admin', json);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

module.exports.iniciarPainelDev = function(application, req, res){
	var connection = application.config.dbConnection();
    var clientesModel = new application.app.models.ClientesDAO(connection);
    var projetosModel = new application.app.models.ProjetosDAO(connection);
    var usuariosModel = new application.app.models.UsuariosDAO(connection);
    var servicosModel = new application.app.models.ServicosDAO(connection);

    clientesModel.contarTodosClientes(function(error, todosClientes){
        clientesModel.contarClientesAtivos(function(error, clientesAtivos){
        	projetosModel.contarTodosProjetos(function(error, todosProjetos){
        		projetosModel.contarProjetosAtivos(function(error, projetosAtivos){
        			usuariosModel.contarTodosUsuarios(function(error, todosUsuarios){
        				usuariosModel.contarUsuariosAtivos(function(error, usuariosAtivos){
        					servicosModel.contarTodosServicos(function(error, todosServicos){
        						servicosModel.contarServicosAberto(function(error, servicosAberto){
        							servicosModel.contarServicos30Dias(function(error, servicos30Dias){
        								servicosModel.contarServicosRealizados30dias(function(error, servicosRealizados30Dias){
        									servicosModel.contarServicos7Dias(function(error, servicos7Dias){
        										servicosModel.contarServicosRealizados7dias(function(error, servicosRealizados7Dias){
                                                    var json = {nome: req.session.nome, idUsuario: req.session.idUsuario};
                                                    json = application.app.controllers.geral.validarTamanhoJson(json, todosClientes, 'todosClientes');
                                                    json = application.app.controllers.geral.validarTamanhoJson(json, clientesAtivos, 'clientesAtivos');
                                                    json = application.app.controllers.geral.validarTamanhoJson(json, todosProjetos, 'todosProjetos');
                                                    json = application.app.controllers.geral.validarTamanhoJson(json, projetosAtivos, 'projetosAtivos');
                                                    json = application.app.controllers.geral.validarTamanhoJson(json, todosUsuarios, 'todosUsuarios');
                                                    json = application.app.controllers.geral.validarTamanhoJson(json, usuariosAtivos, 'usuariosAtivos');
                                                    json = application.app.controllers.geral.validarTamanhoJson(json, todosServicos, 'todosServicos');
                                                    json = application.app.controllers.geral.validarTamanhoJson(json, servicosAberto, 'servicosAberto');
                                                    json = application.app.controllers.geral.validarTamanhoJson(json, servicos30Dias, 'servicos30Dias');
                                                    json = application.app.controllers.geral.validarTamanhoJson(json, servicosRealizados30Dias, 'servicosRealizados30Dias');
                                                    json = application.app.controllers.geral.validarTamanhoJson(json, servicos7Dias, 'servicos7Dias');
                                                    json = application.app.controllers.geral.validarTamanhoJson(json, servicosRealizados7Dias, 'servicosRealizados7Dias');
        											res.render('painel/painel', json);
        										});
        									});
        								});
        							});
        						});
        					})
        				});
        			});
        		});
        	});
        });
    });
}

module.exports.iniciarPainelCliente = function(application, req, res){
    var connection = application.config.dbConnection();
    var projetosModel = new application.app.models.ProjetosDAO(connection);
    var servicosModel = new application.app.models.ServicosDAO(connection);

    projetosModel.contarTodosProjetosAdmin(req.session.idCliente, function(error, todosProjetos){
        projetosModel.contarProjetosAtivosAdmin(req.session.idCliente, function(error, projetosAtivos){
            servicosModel.contarTodosServicosAdmin(req.session.idCliente, function(error, todosServicos){
                servicosModel.contarServicosAbertoAdmin(req.session.idCliente, function(error, servicosAberto){
                    servicosModel.contarServicos30DiasAdmin(req.session.idCliente, function(error, servicos30Dias){
                        servicosModel.contarServicosRealizados30diasAdmin(req.session.idCliente, function(error, servicosRealizados30Dias){
                            servicosModel.contarServicos7DiasAdmin(req.session.idCliente, function(error, servicos7Dias){
                                servicosModel.contarServicosRealizados7diasAdmin(req.session.idCliente, function(error, servicosRealizados7Dias){
                                    var json = {nome: req.session.nome, idUsuario: req.session.idUsuario};
                                    json = application.app.controllers.geral.validarTamanhoJson(json, todosProjetos, 'todosProjetos');
                                    json = application.app.controllers.geral.validarTamanhoJson(json, projetosAtivos, 'projetosAtivos');
                                    json = application.app.controllers.geral.validarTamanhoJson(json, todosServicos, 'todosServicos');
                                    json = application.app.controllers.geral.validarTamanhoJson(json, servicosAberto, 'servicosAberto');
                                    json = application.app.controllers.geral.validarTamanhoJson(json, servicos30Dias, 'servicos30Dias');
                                    json = application.app.controllers.geral.validarTamanhoJson(json, servicosRealizados30Dias, 'servicosRealizados30Dias');
                                    json = application.app.controllers.geral.validarTamanhoJson(json, servicos7Dias, 'servicos7Dias');
                                    json = application.app.controllers.geral.validarTamanhoJson(json, servicosRealizados7Dias, 'servicosRealizados7Dias');
                                    res.render('painel/painel-cliente', json);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}