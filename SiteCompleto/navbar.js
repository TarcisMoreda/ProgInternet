let navbar = document.getElementById('navbar');

const is_subfolder = document.URL.replace('http://127.0.0.1:5500/', '').includes('/');
let links = [
	'index.html',
	'jogos/demonssouls.html',
	'jogos/darksouls.html',
	'jogos/darksouls2.html',
	'jogos/darksouls3.html',
	'jogos/bloodborne.html',
	'jogos/sekiro.html',
	'jogos/eldenring.html',
	'itens.html',
	'gameplay/darksouls.html',
	'gameplay/bloodborne.html',
	'gameplay/sekiro.html',
	'gameplay/eldenring.html',
	'historia.html',
	'galeria/demonssouls.html',
	'galeria/darksouls.html',
	'galeria/darksouls2.html',
	'galeria/darksouls3.html',
	'galeria/bloodborne.html',
	'galeria/sekiro.html',
	'galeria/eldenring.html',
	'contato.html'
];

if(is_subfolder){
	const subfolder = document.URL.replace('http://127.0.0.1:5500/', '').split('/')[0];

	for(let i=0; i<links.length; ++i){
		if(!links[i].includes(subfolder))
			links[i] = `../${links[i]}`;
		else
			links[i] = links[i].replace(`${subfolder}/`, '');
	}
}

const inner_nav = `
	<div id="logo">Souls</div>
	<label for="btn" class="icon">
		<i class="fa fa-bars"></i>
	</label>
	<input type="checkbox" id="btn"></input>
	<ul>
		<li><a href="${links[0]}">Início</a></li>
		<li>
			<label for="btn-jogos" class="show">Jogos +</label>
			<a>Jogos</a>
			<input type="checkbox" id="btn-jogos">
			<ul>
				<li><a href="${links[1]}">Demon's Souls</a></li>
				<li><a href="${links[2]}">Dark Souls</a></li>
				<li><a href="${links[3]}">Dark Souls 2</a></li>
				<li><a href="${links[4]}">Dark Souls 3</a></li>
				<li><a href="${links[5]}">Bloodborne</a></li>
				<li><a href="${links[6]}">Sekiro</a></li>
				<li><a href="${links[7]}">Elden Ring</a></li>
			</ul>
		</li>
		<li><a href="${links[8]}">Itens Destaque</a></li>
		<li>
			<label for="btn-gp" class="show">Gameplay +</label>
			<a>Gameplay</a>
			<input type="checkbox" id="btn-gp">
			<ul>
				<li><a href="${links[9]}">Demon's/Dark Souls</a></li>
				<li><a href="${links[10]}">Bloodborne</a></li>
				<li><a href="${links[11]}">Sekiro</a></li>
				<li><a href="${links[12]}">Elden Ring</a></li>
			</ul>
		</li>
		<li><a href="${links[13]}">História</a></li>
		<li>
			<label for="btn-galeria" class="show">Galeria +</label>
			<a>Galeria</a>
			<input type="checkbox" id="btn-galeria">
			<ul>
				<li><a href="${links[14]}">Demon's Souls</a></li>
				<li><a href="${links[15]}">Dark Souls</a></li>
				<li><a href="${links[16]}">Dark Souls 2</a></li>
				<li><a href="${links[17]}">Dark Souls 3</a></li>
				<li><a href="${links[18]}">Bloodborne</a></li>
				<li><a href="${links[19]}">Sekiro</a></li>
				<li><a href="${links[20]}">Elden Ring</a></li>
			</ul>
		</li>
		<li><a href="${links[21]}">Contato</a></li>
	</ul>
`;
navbar.innerHTML = inner_nav;