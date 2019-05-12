$(document).ready(function(){
	$('#novoDesenvolvedor').click(function(){
		$.ajax({
			url: '/novoDesenvolvedor',
			method: 'get',
			success: function(data){
				$('#conteudo').html(data);
			}
		});
	});

	$('#editarInformacoesPerfil').submit(function(e){
		e.preventDefault();

		$.ajax({
			url: '/editarPerfil',
			method: 'post',
			dataType:'json',
			data: {nome: $('#nome').val(), email: $('#email').val()},
			success: function(data){
				if(data.concluido == 1){
					Swal.fire({
						title: `Sucesso!`,
						text: `Informações alteradas com sucesso.`,
						type: 'success'
					}).then((result) => {
						window.location.href = '/editarPerfil';
					})
				}
			}
		});
	})

	$('#alterarSenha').click(function(e){
		e.preventDefault();

		Swal.fire({
			title: 'Digite sua senha',
			input: 'password',
			inputPlaceholder: 'Senha',
			inputAttributes: {
				id: 'senhaAntiga'
			}
		}).then(result => {
			$.ajax({
				url: '/verificarSenhaAntiga',
				method: 'post',
				dataType:'json',
				data: {senhaAntiga: $('#senhaAntiga').val()},
				success: function(data){
					if(data.concluido == 2){
						Swal.fire({
							title: `Ops!`,
							text: `Senha incorreta.`,
							type: 'error'
						})
					}else{
						Swal.fire({
							title: 'Digite sua nova senha',
							input: 'password',
							inputPlaceholder: 'Senha',
							inputAttributes: {
								id: 'novaSenha'
							}
						}).then(result => {
							var novaSenha = $('#novaSenha').val();
							Swal.fire({
								title: 'Confirme sua nova senha',
								input: 'password',
								inputPlaceholder: 'Senha',
								inputAttributes: {
									id: 'confirmacaoNovaSenha'
								}
							}).then(result => {
								var confirmacaoNovaSenha = $('#confirmacaoNovaSenha').val();
								if(novaSenha != confirmacaoNovaSenha){
									Swal.fire({
										title: `Ops!`,
										text: `As senhas estão diferentes.`,
										type: 'error'
									})
								}else{
									$.ajax({
										url: '/alterarSenha',
										method: 'post',
										dataType:'json',
										data: {novaSenha: novaSenha, confirmacaoNovaSenha: confirmacaoNovaSenha},
										success: function(data){
											if(data.concluido == 2){
												Swal.fire({
													title: `Ops!`,
													text: `As senhas estão diferentes.`,
													type: 'error'
												})
											}else{
												Swal.fire({
													title: `Sucesso!`,
													text: `Senha alterada!`,
													type: 'success'
												})
											}
										}
									});
								}
							})
						})
					}
				}
			});
		})

	})
});