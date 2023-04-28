let navbar = document.getElementById('navbar');

navbar.innerHTML = `
	<div id="logo">Souls</div>
	<label for="btn" class="icon">
		<i class="fa fa-bars"></i>
	</label>
	<input type="checkbox" id="btn"></input>
	<ul>
		<li><a href="#">Início</a></li>
		<li>
			<label for="btn-jogos" class="show">Jogos +</label>
			<a href="#">Jogos</a>
			<input type="checkbox" id="btn-jogos">
			<ul>
				<li><a href="#">Dark Souls</a></li>
				<li><a href="#">Dark Souls 2</a></li>
				<li><a href="#">Dark Souls 3</a></li>
				<li><a href="#">Bloodborne</a></li>
				<li><a href="#">Sekiro</a></li>
				<li><a href="#">Elden Ring</a></li>
			</ul>
		</li>
		<li><a href="#">Itens Destaque</a></li>
		<li>
			<label for="btn-gp" class="show">Gameplay +</label>
			<a href="#">Gameplay</a>
			<input type="checkbox" id="btn-gp">
			<ul>
				<li><a href="#">Dark Souls</a></li>
				<li><a href="#">Bloodborne</a></li>
				<li><a href="#">Sekiro</a></li>
				<li><a href="#">Elden Ring</a></li>
			</ul>
		</li>
		<li><a href="#">História</a></li>
		<li>
			<label for="btn-galeria" class="show">Galeria +</label>
			<a href="#">Galeria</a>
			<input type="checkbox" id="btn-galeria">
			<ul>
				<li><a href="#">Dark Souls</a></li>
				<li><a href="#">Dark Souls 2</a></li>
				<li><a href="#">Dark Souls 3</a></li>
				<li><a href="#">Bloodborne</a></li>
				<li><a href="#">Sekiro</a></li>
				<li><a href="#">Elden Ring</a></li>
			</ul>
		</li>
		<li><a href="#">Contato</a></li>
	</ul>
`;