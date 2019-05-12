$(document).ready(function(){
	var aberto = false;

	$('#menu').click(function(){
		if(aberto){
			$('#menuPequeno').removeClass('show-sidebar');
			aberto = false;
		}else{
			$('#menuPequeno').addClass('show-sidebar');
			aberto = true;
		}
	});

	$('#sair').click(function(){
		Swal.fire({
			title: `Confirmação!`,
			text: `Tem certeza que deseja sair do sistema?`,
			type: 'warning',
			showCancelButton: true,
		}).then((result) => {
			if(result.value){
				window.location.href = '/sair';
			}
		})
	})

});