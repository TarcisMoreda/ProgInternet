let partida = document.getElementById("cmbPartida");
let destino = document.getElementById("cmbDestino");
let adultos = document.getElementById("txtAdultos");
let crianca = document.getElementById("txtCriancas");
let bebe = document.getElementById("txtBebes");
let ida_volta = document.getElementById("chkIdaVolta");
let btn_orcamento = document.getElementById("btnOrcamento");
let valores_out = document.getElementById("valores")
let erros_out = document.getElementById("erros")

const ubl = "Uberlândia"
const sp = "São Paulo"
const rj = "Rio de Janeiro"

btn_orcamento.addEventListener("click", ()=>{
	preco_base = 0.0;

	if((partida.value===ubl && destino.value===sp) || (partida.value===sp && destino.value===ubl))
		preco_base = 200.0;
	else if ((partida.value===ubl && destino.value===rj) || (partida.value===rj && destino.value===ubl))
		preco_base = 300.0;
	else if ((partida.value===sp && destino.value===rj) || (partida.value===rj && destino.value===sp))
		preco_base = 150.0;
	else{
		valores_out.innerHTML = ""
		erros_out.innerHTML = `
			A partida e o destino não podem ser iguais.<br>
			Mas foram colocadas como:<br>
			Partida: ${partida.value}<br>
			Destino: ${destino.value}
		`;
		return;
	}

	const quant_adultos = parseInt(adultos.value);
	const quant_crianca = parseInt(crianca.value);
	const quant_bebe = parseInt(bebe.value);

	if(quant_adultos<=0 && quant_crianca<=0 && quant_bebe<=0){
		valores_out.innerHTML = ""
		erros_out.innerHTML = `
			A quantidade total de passageiros nessa viajem é zero.<br>
			Porfavor, adicionar passageiros!
		`;
		return;
	}
	else if(quant_adultos<=0 && quant_bebe>0){
		valores_out.innerHTML = ""
		erros_out.innerHTML = `
			Para bebês viajarem precisa de pelo menos 1 adulto na viajem.
		`;
		return;
	}
	else if(quant_bebe>2){
		valores_out.innerHTML = ""
		erros_out.innerHTML = `
			Pode comprar apenas 2 passagens de bebês.
		`;
		return;
	}

	preco_total = (quant_adultos*preco_base)+(quant_crianca*preco_base*0.5)
	if(ida_volta.checked)
		preco_total *= 1.9

	erros_out.innerHTML = ""	
	valores_out.innerHTML = `
		Valor total:<br>
		R$ ${preco_total}
	`;
});