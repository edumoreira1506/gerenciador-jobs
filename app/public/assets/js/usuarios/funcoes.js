function criacaoContaCompleta(){
	var nomePessoa = document.getElementById('nomePessoaCriada').value;
	var splitado = nomePessoa.split(" ");
	nomePessoa = splitado[0];

	Swal.fire({
		title: `Bem vindo! ${nomePessoa}`,
		text: `Criação completa, basta clicar em ok para acessar nosso sitema.`,
		type: 'success'
	}).then((result) => {
		window.location.href = "/";
	})
}

function criacaoPendente(){
	Swal.fire({
		title: `Pendente!`,
		text: `A criação da sua conta está pendente, basta o administrador da empresa aprovar seu cadastro.`,
		type: 'info'
	}).then((result) => {
		window.location.href = "/";
	})
}

function chaveInexistente(){
	Swal.fire({
		title: `Erro!`,
		text: `A chave que está tentando usar não existe.`,
		type: 'error'
	})
}

function emailRepetido(){
	var nomePessoa = document.getElementById('nomePessoaCriada').value;
	var splitado = nomePessoa.split(" ");
	nomePessoa = splitado[0];

	var email = document.getElementById('emailPessoaCriada').value;

	Swal.fire({
		title: `Erro!`,
		text: `Desculpe ${nomePessoa}, mas o email ${email} já está em uso.`,
		type: 'error'
	})
}

function aprovarUsuario(idUsuario, idCliente){
	var nomeUsuario = $('#nome_' + idUsuario).html();

	Swal.fire({
		title: `Confirmação!`,
		text: `Tem certeza que deseja aprovar o usuário ${nomeUsuario}?`,
		type: 'info',
		showCloseButton: true,
  		showCancelButton: true,
	}).then((result) => {
		if (result.value) {
			$.ajax({
				url: '/aprovarUsuario',
				method: 'post',
				dataType:'json',
				data: {idUsuario: idUsuario, idCliente: idCliente},
				success: function(data){
					if(data.concluido == 1){
						window.location.href = "/usuarios";
					}
				}
			});
		}
	})
}

function bloquearUsuario(idUsuario, idCliente){
	var nomeUsuario = $('#nome_' + idUsuario).html();

	Swal.fire({
		title: `Confirmação!`,
		text: `Tem certeza que deseja bloquear o acesso do usuário ${nomeUsuario}?`,
		type: 'info',
		showCloseButton: true,
  		showCancelButton: true,
	}).then((result) => {
		if (result.value) {
			$.ajax({
				url: '/bloquearUsuario',
				method: 'post',
				dataType:'json',
				data: {idUsuario: idUsuario, idCliente: idCliente},
				success: function(data){
					if(data.concluido == 1){
						window.location.href = "/usuarios";
					}
				}
			});
		}
	})
}

function excluirUsuario(idUsuario, idCliente){
	var nomeUsuario = $('#nome_' + idUsuario).html();

	Swal.fire({
		title: `Confirmação!`,
		text: `Tem certeza que deseja excluir o usuário ${nomeUsuario}?`,
		type: 'info',
		showCloseButton: true,
  		showCancelButton: true,
	}).then((result) => {
		if (result.value) {
			$.ajax({
				url: '/excluirUsuario',
				method: 'post',
				dataType:'json',
				data: {idUsuario: idUsuario, idCliente: idCliente},
				success: function(data){
					if(data.concluido == 1){
						window.location.href = "/usuarios";
					}
				}
			});
		}
	})
}

function excluirUsuarioDev(idUsuario){
	var nomeUsuario = $('#nome_' + idUsuario).html();

	Swal.fire({
		title: `Confirmação!`,
		text: `Tem certeza que deseja excluir o usuário ${nomeUsuario}?`,
		type: 'info',
		showCloseButton: true,
  		showCancelButton: true,
	}).then((result) => {
		if (result.value) {
			$.ajax({
				url: '/excluirUsuarioDev',
				method: 'post',
				dataType:'json',
				data: {idUsuario: idUsuario},
				success: function(data){
					if(data.concluido == 1){
						window.location.href = "/usuarios";
					}
				}
			});
		}
	})
}