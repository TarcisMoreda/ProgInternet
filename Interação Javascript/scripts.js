// BOTÕES DE INTERAÇÃO
let like = document.getElementById('like');
let comentar = document.getElementById('comentar');
let btn_comentar = document.getElementById('btnComentar');
let foto = document.getElementById('foto');

// ELEMENTOS
let formulario = document.getElementById('formulario');
let comentarios = document.getElementById('comentarios');
let txt_comentario = document.getElementById('txtComentario');

// BOTÃO LIKE E BOTÃO DISLIKE
let liked = false;
like.addEventListener('click', ()=>{
	if(!liked){
		liked = true;
		like.src = 'icones/coracao_red.png'
	}
	else{
		liked = false;
		like.src = 'icones/coracao.png'
	}
});

// MOSTRAR FORMULÁRIO DE COMENTAR
let comentarHidden = true;
comentar.addEventListener('click', ()=>{
	if(comentarHidden){
		comentarHidden = false;
		formulario.style.display = 'flex';
		comentarios.style.height = '10rem'
	}
	else{
		comentarHidden = true;
		formulario.style.display = 'none';
		comentarios.style.height = '18rem'
	}
});

// COMENTAR
btn_comentar.addEventListener('click', ()=>{
	if(txt_comentario.value===''){
		alert('Comentário vazio!');
		return;
	}

	const comentario = `
		<div class="comentario">
			<span>Tárcis</span>
			<p>${txt_comentario.value}</p>
		</div>
	`;
	comentarios.innerHTML += comentario;
	txt_comentario.value = '';
});

// LIKE NA FOTO
foto.addEventListener('dblclick', ()=>{
	if(!liked){
		liked = true;
		like.src = 'icones/coracao_red.png'
	}
	else{
		liked = false;
		like.src = 'icones/coracao.png'
	}
});