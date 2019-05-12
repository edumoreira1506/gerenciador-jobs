function pausarProjeto(idProjeto, idCliente){
	$.ajax({
		url: '/pausarProjeto',
		method: 'post',
        dataType:'json',
		data: {idProjeto: idProjeto, idCliente: idCliente},
		success: function(data){
			if(data.concluido == 1){
				Swal.fire({
					title: `Sucesso!`,
					text: `Projeto pausado com sucesso.`,
					type: 'success'
				}).then((result) => {
					window.location.href = '/projetos';
				})
			}
		}
	});
}

function retomarProjeto(idProjeto, idCliente){
	$.ajax({
		url: '/retomarProjeto',
		method: 'post',
        dataType:'json',
		data: {idProjeto: idProjeto, idCliente: idCliente},
		success: function(data){
			if(data.concluido == 1){
				Swal.fire({
					title: `Sucesso!`,
					text: `Projeto retomado com sucesso.`,
					type: 'success'
				}).then((result) => {
					window.location.href = '/projetos';
				})
			}
		}
	});
}

function excluirProjeto(idProjeto, idCliente){
	Swal.fire({
		title: `Confirmação!`,
		text: `Tem certeza que deseja excluir esse projeto? Depois de excluído não poderá acessá-lo novamente, é aconselhado apenas pausar o projeto`,
		type: 'warning',
		showCancelButton: true,
	}).then((result) => {
		if(result.value){
			$.ajax({
				url: '/excluirProjeto',
				method: 'post',
				dataType:'json',
				data: {idProjeto: idProjeto, idCliente: idCliente},
				success: function(data){
					if(data.concluido == 1){
						Swal.fire({
							title: `Sucesso!`,
							text: `Projeto excluído com sucesso.`,
							type: 'success'
						}).then((result) => {
							window.location.href = '/projetos';
						})
					}
				}
			});
		}
	})
}