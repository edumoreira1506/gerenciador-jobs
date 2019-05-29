function iniciarServico(idServico){
	Swal.fire({
		title: `Confirmação!`,
		text: `Tem certeza que deseja iniciar o serviço?`,
		type: 'info',
		showCloseButton: true,
  		showCancelButton: true,
	}).then((result) => {
		if (result.value) {
			$.ajax({
				url: '/iniciarServico',
				method: 'post',
				dataType:'json',
				data: {idServico: idServico},
				success: function(data){
					if(data.concluido == 1){
						window.location.href = "/servicos";
					}

					if(data.concluido == 2){
						Swal.fire({
							title: `Ops!`,
							text: `Parece que outro dev já assumiu o serviço,`,
							type: 'info',
						}).then((result) => { window.location.href = '/servicos'; })
					}
				}
			});
		}
	})
}

function aprovarServico(idServico){
	Swal.fire({
		title: `Confirmação!`,
		text: `Tem certeza que deseja aprovar o serviço?`,
		type: 'info',
		showCloseButton: true,
  		showCancelButton: true,
	}).then((result) => {
		if (result.value) {
			$.ajax({
				url: '/aprovarServico',
				method: 'post',
				dataType:'json',
				data: {idServico: idServico},
				success: function(data){
					console.log(data);
					if(data.concluido == 1){
						socket.emit('aprovarServico',	{idServico: idServico});
						window.location.href = "/servicos";
					}
				}
			});
		}
	})
}

function reprovarServico(idServico){
	Swal.fire({
		title: `Confirmação!`,
		text: `Tem certeza que deseja reprovar o serviço?`,
		type: 'info',
		showCloseButton: true,
  		showCancelButton: true,
	}).then((result) => {
		if (result.value) {
			const {value: text} = Swal.fire({
				input: 'textarea',
				title: "Informações",
				text: "Poderia nos dar mais detalhes a respeito do serviço?",
				type: 'info',
				showCloseButton: true,
				showCancelButton: true,
			}).then((result) => {
				if(result.value){
					$.ajax({
						url: '/reprovarServico',
						method: 'post',
						dataType:'json',
						data: {idServico: idServico, novaObservacao: result.value},
						success: function(data){
							if(data.concluido == 1){
								socket.emit('reprovarServico',	{idServico: idServico});
								window.location.href = "/servicos";
							}
						}
					});
				}
			})			
		}
	})
}

function mandarParaAprovacao(idServico){
	Swal.fire({
		title: `Confirmação!`,
		text: `Tem certeza que deseja mandar para aprovação o serviço?`,
		type: 'info',
		showCloseButton: true,
  		showCancelButton: true,
	}).then((result) => {
		if (result.value) {
			$.ajax({
				url: '/mandarParaAprovacao',
				method: 'post',
				dataType:'json',
				data: {idServico: idServico},
				success: function(data){
					if(data.concluido == 1){
						socket.emit('aprovacaoServico',	{idServico: idServico});
						window.location.href = "/servicos";
					}

				}
			});
		}
	})
}

function editarServico(idServico){
	$.ajax({
		url: '/editarServico',
		method: 'POST',
		data: {idServico: idServico},
		success: function(data){
			$('#conteudo').html(data);
		}
	});
}

function deletarServico(idServico){
	Swal.fire({
		title: `Confirmação!`,
		text: `Tem certeza que deseja deletar o serviço?`,
		type: 'info',
		showCloseButton: true,
  		showCancelButton: true,
	}).then((result) => {
		if (result.value) {
			$.ajax({
				url: '/deletarServico',
				method: 'post',
				dataType:'json',
				data: {idServico},
				success: function(data){
					if(data.concluido == 1){
						window.location.href = "/servicos";
					}

				}
			});
		}
	})
}