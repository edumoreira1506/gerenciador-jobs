$(document).ready(function(){
	$.ajax({
		url: '/pegarNotificacoes',
		method: 'get',
		dataType:'json',
		success: function(data){
			if(data.notificacoes > 0){
				Swal.fire('Opa', `Você tem ${data.notificacoes} serviço (s) para aprovar`, 'info').then((result) => {
					socket.emit('visualizarNotificacoes', {idUsuario: idUsuario});
				});
			}
		}
	});

	socket.on('aprovacaoServicoCliente', function(dados){
		Swal.fire('Opa', 'Você tem um serviço para aprovar', 'info').then((result) => {
			socket.emit('visualizarNotificacoes', {idUsuario: idUsuario});
		});
	});

	socket.on('servicoReprovado', function(){
		Swal.fire('Ops', 'Parece que um serviço foi reprovado.', 'info');
	})

	socket.on('servicoAprovado', function(){
		Swal.fire('Parabéns!', 'Parece que um serviço foi aprovado.', 'success');
	})
})

