$(document).ready(function(){
	$('#novoCliente').click(function(){
		$.ajax({
			url: '/novoCliente',
			method: 'get',
			success: function(data){
				$('#conteudo').html(data);
			}
		});
	})

	$('#filtroSelect').change(function(){
		var filtroDeBusca = this.value;

		if(this.value == ""){
			var urlAjax = '/todosClientes';
		}else{
			var urlAjax = '/clientesFiltrados';
		}

		$.ajax({
			url: urlAjax,
			method: 'POST',
			data: {status: this.value},
			success: function(clientes){
				$('tbody').html('');
				var html = ``;

				for(i in clientes){
					if(clientes[i].ativo == 1){
						var status = 'Ativo';
						var botao = `
							<button class="item" data-toggle="tooltip" data-placement="top" title="Inativar" onclick="inativarCliente(${clientes[i].id_cliente})">
                                <i class="fas fa-times"></i>
                            </button>
						`;
					}else{
						var status = 'Inativo';
						var botao = `
							<button class="item" data-toggle="tooltip" data-placement="top" title="Ativar" onclick="ativarCliente(${clientes[i].id_cliente})">
                                <i class="fas fa-check"></i>
                            </button>
						`;
					}

					html += `
						<tr class="tr-shadow">	
                            <td><a href="cliente?id_cliente=${clientes[i].id_cliente}"><span id="nome_${clientes[i].id_cliente}">${clientes[i].nome}</span></a></td>
                            <td>
                            	<span class="block-email">${clientes[i].chave}</span>
                            </td>
                            <td class="desc">${clientes[i].cpf_cnpj}</td>
                            <td>${status}</td>
                            <td>
                               	<div class="table-data-feature">${botao}
									<button class="item" data-toggle="tooltip" data-placement="top" title="Deletar" onclick="deletarCliente(${clientes[i].id_cliente})">
                                        <i class="zmdi zmdi-delete"></i>
                                    </button>
                               	</div>
                            </td>
                        </tr>
                        <tr class="spacer"></tr>
					`;
				}

				$('tbody').append(html);
			}
		});
	})

	$('#editarInformacoesEmpresa').submit(function(e){
		e.preventDefault();

		$.ajax({
			url: '/editarEmpresa',
			method: 'post',
			dataType:'json',
			data: {nome: $('#nome').val(), cpf_cnpj: $('#cpf_cnpj').val(), chave: $('#chave').val()},
			success: function(data){
				if(data.concluido == 1){
					Swal.fire({
						title: `Sucesso!`,
						text: `Informações alteradas com sucesso.`,
						type: 'success'
					}).then((result) => {
						window.location.href = '/editarEmpresa';
					})
				}
			}
		});
	})
})
