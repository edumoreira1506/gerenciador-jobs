function inativarCliente(idCliente){
	var nomeCliente = $('#nome_' + idCliente).html();

	Swal.fire({
		title: `Confirmação!`,
		text: `Tem certeza que deseja inativar o cliente ${nomeCliente}?`,
		type: 'warning',
		showCancelButton: true,
	}).then((result) => {
		if(result.value){
			$.ajax({
				url: '/inativarCliente',
				method: 'post',
				dataType:'json',
				data: {idCliente: idCliente},
				success: function(data){
					if(data.concluido == 1){
						Swal.fire({
							title: `Sucesso!`,
							text: `Cliente inativado com sucesso.`,
							type: 'success'
						}).then((result) => {
							window.location.href = '/clientes';
						})
					}
				}
			});
		}
	})
}

function ativarCliente(idCliente){
	var nomeCliente = $('#nome_' + idCliente).html();

	Swal.fire({
		title: `Confirmação!`,
		text: `Tem certeza que deseja ativar o cliente ${nomeCliente}?`,
		type: 'warning',
		showCancelButton: true,
	}).then((result) => {
		if(result.value){
			$.ajax({
				url: '/ativarCliente',
				method: 'post',
				dataType:'json',
				data: {idCliente: idCliente},
				success: function(data){
					if(data.concluido == 1){
						Swal.fire({
							title: `Sucesso!`,
							text: `Cliente ativado com sucesso.`,
							type: 'success'
						}).then((result) => {
							window.location.href = '/clientes';
						})
					}
				}
			});
		}
	})
}

function deletarCliente(idCliente){
	var nomeCliente = $('#nome_' + idCliente).html();

	Swal.fire({
		title: `Confirmação!`,
		text: `Tem certeza que deseja deletar o cliente ${nomeCliente}?`,
		type: 'warning',
		showCancelButton: true,
	}).then((result) => {
		if(result.value){
			$.ajax({
				url: '/deletarCliente',
				method: 'post',
				dataType:'json',
				data: {idCliente: idCliente},
				success: function(data){
					if(data.concluido == 1){
						Swal.fire({
							title: `Sucesso!`,
							text: `Cliente deletado com sucesso.`,
							type: 'success'
						}).then((result) => {
							window.location.href = '/clientes';
						})
					}
				}
			});
		}
	})
}