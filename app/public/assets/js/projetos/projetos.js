$(document).ready(function(){
	$('#novoProjeto').click(function(){
		$.ajax({
			url: '/novoProjeto',
			method: 'get',
			success: function(data){
				$('#conteudo').html(data);
			}
		});
	})
})
