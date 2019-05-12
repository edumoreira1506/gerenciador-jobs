$(document).ready(function(){
	$('#novoServico').click(function(){
		$.ajax({
			url: '/novoServico',
			method: 'get',
			success: function(data){
				$('#conteudo').html(data);
			}
		});
	})

	$('#filtroSelect').change(function(){
		if(this.value == ""){
			var urlAjax = '/todosServicos';
		}else{
			var urlAjax = '/servicosFiltrados';
		}

		$.ajax({
			url: urlAjax,
			method: 'POST',
			data: {status: this.value},
			success: function(servicos){
				$('.container-fluid .row').html('')
				var html = ``;
				
				for(i in servicos){
					var dia = (servicos[i].data_solicitacao.toString()).substring(8, 10);
					var mes = (servicos[i].data_solicitacao.toString()).substring(5, 7);
					var ano = (servicos[i].data_solicitacao.toString()).substring(0, 4);

					var horario = (servicos[i].data_solicitacao.toString()).substring(11, 16);

					var stringData = dia + '/' + mes + '/' + ano;

					var observacaoAtual = servicos[i].observacao;
					if(observacaoAtual.includes("<br />")){
						var arrayObservacao = observacaoAtual.split("<br />");
						var observacoesHtml = '';
						for(var j = 0; j < arrayObservacao.length; j++){
							observacoesHtml += '<b>' + (j + 1)+'º ajuste: </b>' + arrayObservacao[j] + '<br />';
						}
					}else{
						var observacoesHtml = servicos[i].observacao;
					}

					switch(servicos[i].statusServico){
						case 0:
							var dia = (servicos[i].data_termino.toString()).substring(8, 10);
							var mes = (servicos[i].data_termino.toString()).substring(5, 7);
							var ano = (servicos[i].data_termino.toString()).substring(0, 4);
							var horarioTermino = (servicos[i].data_termino.toString()).substring(11, 16);
							var stringDataTermino = dia + '/' + mes + '/' + ano;

							var htmlInfo = `<br />Status: Concluído <br />
											Finalizado em: ${stringDataTermino} às ${horarioTermino}`;
							break;

						case 1:
							var htmlInfo = `<br />Status: Aguardando início
									<button class="btn btn-primary" type="button" onclick="iniciarServico(${servicos[i].id_servico})">Começar</button>`;
							break;

						case 3:
							var htmlInfo = `<br />Status: Em andamento <br />
									Responsável: ${servicos[i].nomeResponsavel}`;
							break;

						case 4:
							var htmlInfo = `<br />Status: Aguardando aprovação do cliente <br />
									Realizado por: ${servicos[i].nomeResponsavel}`;
					}

					html += `
						<div class="col-lg-12">
						<div class="card">
							<div class="card-header">
								<h4>${servicos[i].nomeProjeto}</h4>
							</div>
							<div class="card-body">
								<p class="text-muted m-b-15">${observacoesHtml}</p>
								<p class="text-muted m-b-15">${htmlInfo}
								<br />Pedido em: ${stringData} às ${horario}</p>
							</div>
						</div>
					</div>
					`;
				}

				$('.container-fluid .row').html(html);
			}
		});
	})

	$('#filtroSelectCliente').change(function(){
		if(this.value == ""){
			var urlAjax = '/todosServicos';
		}else{
			var urlAjax = '/servicosFiltrados';
		}

		$.ajax({
			url: urlAjax,
			method: 'POST',
			data: {status: this.value},
			success: function(servicos){
				console.log(servicos)
				$('#servicos').html('')
				var html = ``;
				
				for(i in servicos){
					var dia = (servicos[i].data_solicitacao.toString()).substring(8, 10);
					var mes = (servicos[i].data_solicitacao.toString()).substring(5, 7);
					var ano = (servicos[i].data_solicitacao.toString()).substring(0, 4);

					var horario = (servicos[i].data_solicitacao.toString()).substring(11, 16);

					var stringData = dia + '/' + mes + '/' + ano;

					var observacaoAtual = servicos[i].observacao;
					if(observacaoAtual.includes("<br />")){
						var arrayObservacao = observacaoAtual.split("<br />");
						var observacoesHtml = '';
						for(var j = 0; j < arrayObservacao.length; j++){
							observacoesHtml += '<b>' + (j + 1)+'º ajuste: </b>' + arrayObservacao[j] + '<br />';
						}
					}else{
						var observacoesHtml = servicos[i].observacao;
					}

					switch(servicos[i].statusServico){
						case 0:
							var dia = (servicos[i].data_termino.toString()).substring(8, 10);
							var mes = (servicos[i].data_termino.toString()).substring(5, 7);
							var ano = (servicos[i].data_termino.toString()).substring(0, 4);
							var horarioTermino = (servicos[i].data_termino.toString()).substring(11, 16);
							var stringDataTermino = dia + '/' + mes + '/' + ano;

							var htmlInfo = `<br />Status: Finalizado <br />
											Pedido em: ${stringData} às ${horario}<br />
											Finalizado em: ${stringDataTermino} às ${horarioTermino}</p>`;
							break;

						case 1:
							var htmlInfo = `<br />Status: Na fila
									<br />Pedido em: ${stringData} às ${horario}</p>`;
							break;

						case 3:
							var htmlInfo = `<br />Status: Em andamento
									<br />Pedido em: ${stringData} às ${horario}</p>`;
							break;

						case 4:
							var htmlInfo = `<br />Status: Aguardando sua aprovação <br />
									<br />Pedido em: ${stringData} às ${horario}</p>
									<p class="text-muted m-b-15">
										<button class="btn btn-primary" onclick="aprovarServico(${servicos[i].id_servico})">Aprovar</button>
										<button class="btn btn-primary" onclick="reprovarServico(${servicos[i].id_servico})">Reprovar</button>
									</p>`;
					}

					html += `
						<div class="col-lg-12">
						<div class="card">
							<div class="card-header">
								<h4>${servicos[i].nomeProjeto}</h4>
							</div>
							<div class="card-body">
								<p class="text-muted m-b-15">${observacoesHtml}</p>
								<p class="text-muted m-b-15">${htmlInfo}
							</div>
						</div>
					</div>
					`;
				}

				$('#servicos').html(html);
			}
		});
	})
})