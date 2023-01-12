var delayInMilliSegundos = 3300;

setTimeout(function(){

	
	//Setup/Fundo do Game
	//Const - significa que esta criando uma variavel com valor fixo, ou seja uma constante somente leitura
	const canvas = document.querySelector('canvas')
	const c = canvas.getContext('2d')
	
	const scoreEl = document.querySelector('#scoreEl')
	console.log(scoreEl)
	
	canvas.width = innerWidth
	canvas.height = innerHeight
	
	//Limites do Jogo
	
	class Borda {
		static width = 40
		static height = 40
		constructor({position, image}){
			this.position = position
			this.width = 40
			this.height = 40
		this.image = image
		}
		
		//Gerando as Bordas
		desenho(){
			/*Cor das Bordas
			c.fillStyle = 'blue';
			//Posicao das Bordas
			c.fillRect(this.position.x, this.position.y, this.width, this.height)*/
			
			c.drawImage(this.image, this.position.x, this.position.y)
		}
	}
	
	//Criando Pac-Man/Futuro Fantasma e seus movimentos
	class Player {
		
		constructor({position, velocity}) {
			this.position = position
			this.velocity = velocity
			this.radius = 15
			this.radians = 0.75
			this.openRate = 0.12
			this.rotation = 0
		}
		
		desenhoPac(){
			c.save()
			c.translate(this.position.x, this.position.y)
			c.rotate(this.rotation)
			c.translate(-this.position.x, -this.position.y)
			c.beginPath()
			
			c.arc(this.position.x, this.position.y, this.radius, this.radians, Math.PI * 2 - this.radians)
			c.lineTo(this.position.x, this.position.y)
			//Cor do Pac/Fantasma
			c.fillStyle = 'yellow'
			
			c.fill()
			c.closePath()
			
			c.restore()
		}
		
		//Uptade da posição + velocidade
		uptade() {
			this.desenhoPac()
			this.position.x += this.velocity.x
			this.position.y += this.velocity.y
			
			if(this.radians < 0 || this.radians > .75) this.openRate = -this.openRate
			this.radians += this.openRate
		}
	}
	
	class Fantasma {
		static speed = 2
		constructor({position, velocity, color = 'red'}) {
			this.position = position
			this.velocity = velocity
			this.radius = 15
			this.color = color
			this.prevColisoes = []
			this.speed = 2
			this.assustado = false
		}
		
		desenhoFantasma(){
			c.beginPath()
			c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
			
			//Cor do Fantasma
		c.fillStyle = this.assustado ? 'blue' : this.color
		
		c.fill()
		c.closePath()
	}
	
	//Uptade da posição + velocidade
	uptade() {
		this.desenhoFantasma()
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		
	}
}

class Bolinha {
	
	constructor({position}) {
		this.position = position
		this.radius = 3
	}
	
	desenhoBolinha(){
		c.beginPath()
		c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
		
		//Cor das bolinhas
		c.fillStyle = 'white'
		
		c.fill()
		c.closePath()
	}
}

class PowerUp {
	
	constructor({position}) {
		this.position = position
		this.radius = 8
	}
	
	desenhoPowerUp(){
		c.beginPath()
		c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
		
		//Cor das bolinhas
		c.fillStyle = 'white'
		
		c.fill()
		c.closePath()
	}
}

const bolinhas = []
const limites = []
const powerUps = []
const fantasmas = [
	//1
	new Fantasma({
		position:{
			x:Borda.width * 6 + Borda.width/2,
			y:Borda.height + Borda.height/2
		},
		velocity:{
			x: Fantasma.speed,
			y: 0
		}
	}),
	//2
	new Fantasma({
		position:{
			x:Borda.width * 6 + Borda.width/2,
			y:Borda.height + Borda.height/2
		},
		velocity:{
			x: Fantasma.speed,
			y: 0
		},
		color: 'gray'
	}),
	//3
	new Fantasma({
		position:{
			x:Borda.width * 6 + Borda.width/2,
			y:Borda.height + Borda.height/2
		},
		velocity:{
			x: Fantasma.speed,
			y: 0
		},
		color: 'lightblue'
	}),
	
	//4
	new Fantasma({
		position:{
			x:Borda.width * 6 + Borda.width/2,
			y:Borda.height + Borda.height/2
		},
		velocity:{
			x: Fantasma.speed,
			y: 0
		},
		color: 'pink'
	}),
	
	//5
	new Fantasma({
		position:{
			x:Borda.width * 6 + Borda.width/2,
			y:Borda.height + Borda.height/2
		},
		velocity:{
			x: Fantasma.speed,
			y: 0
		},
		color: 'purple'
	}),
	//6
	new Fantasma({
		position:{
			x:Borda.width * 10 + Borda.width/2,
			y:Borda.height * 3 + Borda.height/2
		},
		velocity:{
			x: Fantasma.speed,
			y: 0
		},
		color: 'green'
	}),
	//7
	new Fantasma({
		position:{
			x:Borda.width * 10 + Borda.width/2,
			y:Borda.height * 3 + Borda.height/2
		},
		velocity:{
			x: Fantasma.speed,
			y: 0
		},
		color: 'darkgreen'
	}),
	//8
	new Fantasma({
		position:{
			x:Borda.width * 10 + Borda.width/2,
			y:Borda.height * 3 + Borda.height/2

		},
		velocity:{
			x: Fantasma.speed,
			y: 0
		},
		color: 'orange'
	}),
	//9
	new Fantasma({
		position:{
			x:Borda.width * 10 + Borda.width/2,
			y:Borda.height * 3 + Borda.height/2
		},
		velocity:{
			x: Fantasma.speed,
			y: 0
		},
		color: 'brown'
	}),
	//10
	new Fantasma({
		position:{
			x:Borda.width * 10 + Borda.width/2,
			y:Borda.height * 3 + Borda.height/2
		},
		velocity:{
			x: Fantasma.speed,
			y: 0
		},
		color: '#483D8B'
	}),
	//11
	new Fantasma({
		position:{
			x:Borda.width * 10 + Borda.width/2,
			y:Borda.height * 3 + Borda.height/2
		},
		velocity:{
			x: Fantasma.speed,
			y: 0
		},
		color: '#9400D3'
	}),
	//12
	new Fantasma({
		position:{
			x:Borda.width * 10 + Borda.width/2,
			y:Borda.height * 3 + Borda.height/2
		},
		velocity:{
			x: Fantasma.speed,
			y: 0
		},
		color: '#E6E6FA	'
	}),
]

//Criando onde ele vai nascer
const player = new Player({
	
	position: {
		x:Borda.width * 16 + Borda.width/2,
		y:Borda.height * 8 + Borda.height/2
	},
	
	velocity: {
		x:0,
		y:0
	}
})

const keys = {
	w:{
		pressed: false
	},
	a:{
		pressed: false
	},
	s:{
		pressed:false
	},
	d:{
		pressed: false
	}
}

//Chave vazia
//Serve para que mesmo se tiver duas teclas apertadas ao mesmo tempo
// a ultima tecla apertada fara a ação
let ultimaChave = ''
let pontuacao = 0


//Criando mapa
const map = [

//Os - são Quadrados
//as ' ' são espaços vazio
['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
['|', 'p', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
['|', '.', 'pC1', 'cR', '.', 'cL', 'pC2', '.', 'pC1', 'pH', 'pH', 'pH', 'pH', 'cR', '.', 'cL', 'pH', 'cR', '.', 'cL', 'pH', 'pH', 'pH', 'pH', 'pC2', '.', 'pC1', 'cR', '.', 'cL', 'pC2', '.', '|'],
['|', '.', 'cB', '.', '.', '.', 'cB', '.', 'cB', 'p', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'p', 'cB', '.', 'cB', '.', '.', '.', 'cB', '.', '|'],
['|', '.', '.', '.', 'b', '.', '.', '.', '.', '.', 'pC1', 'pH', 'pH', 'cR', '.', 'cL', 'pH', 'cR', '.', 'cL', 'pH', 'pH', 'pC2', '.', '.', '.', '.', '.', 'b', '.', '.', '.', '|'],
['|', '.', 'cT', '.', 'p', '.', 'cT', '.', 'cT', '.', 'pV', '.', '.', '.', '.', '.', 'p', '.', '.', '.', '.', '.', 'pV', '.', 'cT', '.', 'cT', '.', 'p', '.', 'cT', '.', '|'],
['|', '.', 'pV', '.', 'cT', '.', 'pV', '.', 'pV', '.', 'pV', '.', 'cT', '.', 'cT', '.', 'cT', '.', 'cT', '.', 'cT', '.', 'pV', '.', 'pV', '.', 'pV', '.', 'cT', '.', 'pV', '.', '|'],
['|', '.', 'pV', '.', 'cB', '.', 'pV', '.', 'pV', '.', 'pV', '.', 'cB', '.', 'cB', '.', 'cB', '.', 'cB', '.', 'cB', '.', 'pV', '.', 'pV', '.', 'pV', '.', 'cB', '.', 'pV', '.', '|'],
['|', '.', 'cB', '.', 'p', '.', 'cB', '.', 'cB', '.', 'pV', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'pV', '.', 'cB', '.', 'cB', '.', 'p', '.', 'cB', '.', '|'],
['|', '.', '.', '.', 'b', '.', '.', '.', '.', '.', 'pC4', 'pH', 'pH', 'cR', '.', 'cL', 'pH', 'cR', '.', 'cL', 'pH', 'pH', 'pC3', '.', '.', '.', '.', '.', 'b', '.', '.', '.', '|'],
['|', '.', 'cT', '.', '.', '.', 'cT', '.', 'cT', 'p', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'p', 'cT', '.', 'cT', '.', '.', '.', 'cT', '.', '|'],
['|', '.', 'pC4', 'cR', '.', 'cL', 'pC3', '.', 'pC4', 'pH', 'pH', 'pH', 'pH', 'cR', '.', 'cL', 'pH', 'cR', '.', 'cL', 'pH', 'pH', 'pH', 'pH', 'pC3', '.', 'pC4', 'cR', '.', 'cL', 'pC3', '.', '|'],
['|', 'p', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
	
]

//Criando imagem das bordas
function createImage(src){

	const image = new Image()
	image.src = src
	return image

}

//Criando bordas
map.forEach((row, i) => {
	row.forEach((symbol, j) => {
		switch (symbol) {
			case '-':
				limites.push(
					new Borda({
						position:{
							x:Borda.width * j,
							y:Borda.height * i
						},
						image: createImage('./img/pipeHorizontal.png')
					})
				)
			break
			case '|':
				limites.push(
					new Borda({
						position:{
							x:Borda.width * j,
							y:Borda.height * i
						},
						image: createImage('./img/pipeVertical.png')
					})
				)
			break
			case '1':
				limites.push(
					new Borda({
						position:{
							x:Borda.width * j,
							y:Borda.height * i
						},
						image: createImage('./img/pipeCorner1.png')
					})
				)
			break
			case '2':
				limites.push(
					new Borda({
						position:{
							x:Borda.width * j,
							y:Borda.height * i
						},
						image: createImage('./img/pipeCorner2.png')
					})
				)
			break
			case '3':
				limites.push(
					new Borda({
						position:{
							x:Borda.width * j,
							y:Borda.height * i
						},
						image: createImage('./img/pipeCorner3.png')
					})
				)
			break
			case '4':
				limites.push(
					new Borda({
						position:{
							x:Borda.width * j,
							y:Borda.height * i
						},
						image: createImage('./img/pipeCorner4.png')
					})
				)
			break
			case 'b':
				limites.push(
					new Borda({
						position:{
							x:Borda.width * j,
							y:Borda.height * i
						},
						image: createImage('./img/block.png')
					})
				)
			break
			case '.':
				bolinhas.push(
					new Bolinha({
						position:{
							x: j * Borda.width + Borda.width/2  ,
							y: i * Borda.height + Borda.height/2
						},
					})
				)
			break
			case 'p':
				powerUps.push(
					new PowerUp({
						position:{
							x: j * Borda.width + Borda.width/2  ,
							y: i * Borda.height + Borda.height/2
						},
					})
				)
			break
			case 'cL':
				limites.push(
					new Borda({
						position:{
							x:Borda.width * j,
							y:Borda.height * i
						},
						image: createImage('./img/capLeft.png')
					})
				)
			break
			case 'pC2':
				limites.push(
					new Borda({
						position:{
							x:Borda.width * j,
							y:Borda.height * i
						},
						image: createImage('./img/pipeCorner2.png')
					})
				)
			break
			case 'cB':
				limites.push(
					new Borda({
						position:{
							x:Borda.width * j,
							y:Borda.height * i
						},
						image: createImage('./img/capBottom.png')
					})
				)
			break
			case 'pC3':
				limites.push(
					new Borda({
						position:{
							x:Borda.width * j,
							y:Borda.height * i
						},
						image: createImage('./img/pipeCorner3.png')
					})
				)
			break
			case 'cT':
				limites.push(
					new Borda({
						position:{
							x:Borda.width * j,
							y:Borda.height * i
						},
						image: createImage('./img/capTop.png')
					})
				)
			break
			case 'pC4':
				limites.push(
					new Borda({
						position:{
							x:Borda.width * j,
							y:Borda.height * i
						},
						image: createImage('./img/pipeCorner4.png')
					})
				)
			break
			case 'pC1':
				limites.push(
					new Borda({
						position:{
							x:Borda.width * j,
							y:Borda.height * i
						},
						image: createImage('./img/pipeCorner1.png')
					})
				)
			break
			case 'cR':
				limites.push(
					new Borda({
						position:{
							x:Borda.width * j,
							y:Borda.height * i
						},
						image: createImage('./img/capRight.png')
					})
				)
			break
			case 'pH':
				limites.push(
					new Borda({
						position:{
							x:Borda.width * j,
							y:Borda.height * i
						},
						image: createImage('./img/pipeHorizontal.png')
					})
				)
			break
			case 'pV':
				limites.push(
					new Borda({
						position:{
							x:Borda.width * j,
							y:Borda.height * i
						},
						image: createImage('./img/pipeVertical.png')
					})
				)
			break
		}
	})
})
//Circulo colide com retangulo
function circuloColideComRetangulo({
	circulo,
	retangulo
}){
	//Este preencher é pra detectar o pequeno espaco de colisao
	const preencher = Borda.width /2 - circulo.radius - 1
	return ( circulo.position.y - circulo.radius + circulo.velocity.y <= 
		retangulo.position.y + retangulo.height + preencher
		&& circulo.position.x + circulo.radius + circulo.velocity.x >= retangulo.position.x - preencher
		&& circulo.position.y + circulo.radius + circulo.velocity.y >= retangulo.position.y - preencher
		&& circulo.position.x - circulo.radius + circulo.velocity.x <= 
		retangulo.position.x + retangulo.width + preencher)
}
//Para iniciar qualquer animacao
let animacaoId
//Criando loop de animações

function animacao(){
	animacaoId = requestAnimationFrame(animacao)
	c.clearRect(0, 0, canvas.width, canvas.height)
	
	//Conferindo qual esta pressionada

	if(keys.w.pressed && ultimaChave === 'w'){
		for(let i = 0; i < limites.length; i++){
		const borda = limites[i]
			if(circuloColideComRetangulo({
			circulo:{...player, velocity:{
				x: 0,
				y: -5
			}},
			retangulo:borda
		})) {
			player.velocity.y = 0
			break
		}else{
			player.velocity.y = -5
		}
	}	
}

	else if(keys.a.pressed && ultimaChave === 'a'){
		for(let i = 0; i < limites.length; i++){
		const borda = limites[i]
			if(circuloColideComRetangulo({
			circulo:{...player, velocity:{
				x: -5,
				y: 0
			}},
			retangulo:borda
		})) {
			player.velocity.x = 0
			break
		}else{
			player.velocity.x = -5
		}
	}		
}

	else if(keys.s.pressed && ultimaChave === 's'){

		for(let i = 0; i < limites.length; i++){
		const borda = limites[i]
			if(circuloColideComRetangulo({
			circulo:{...player, velocity:{
				x: 0,
				y: 5
			}},
			retangulo:borda
		})) {
			player.velocity.y = 0
			break
		}else{
			player.velocity.y = 5
		}
	}	
}

	else if(keys.d.pressed && ultimaChave === 'd'){

		for(let i = 0; i < limites.length; i++){
		const borda = limites[i]

			if(circuloColideComRetangulo({
			circulo:{...player, velocity:{
				x: 5,
				y: 0
			}},
			retangulo:borda
		})) {
			player.velocity.x = 0
			break
		}else{
			player.velocity.x = 5
		}
	}	
}

//Fantasmas tocarem no Pac, apos ele ter comido o PowerUp

for(let i = fantasmas.length -1; 0 <= i; i--){
	const fantasma = fantasmas[i]

//Detectando colisao do fantasma e do player
if(Math.hypot(fantasma.position.x - player.position.x, 
	fantasma.position.y - player.position.y) < fantasma.radius  + player.radius){

		//Se estamos tocando em um fantasma com medo:
		if(fantasma.assustado){
			fantasmas.splice(i, 1)
		} 
		else{
		cancelAnimationFrame(animacaoId)
		alert('Game Over! Aperte F5 para jogar novamente')
			}
	}
}

//Vencer
if(bolinhas.length === 0){
	alert('Parabéns Você Venceu! Aperte F5 caso queira jogar de novo')
	cancelAnimationFrame(animacaoId)
}


//Iniciando powerUp
for(let i = powerUps.length -1; 0 <= i; i--){
	const powerUp = powerUps[i]
	powerUp.desenhoPowerUp()

	//Quando tocar nos PowerUp
	if(Math.hypot(powerUp.position.x - player.position.x, 
		powerUp.position.y - player.position.y) < powerUp.radius  + player.radius){
			
			powerUps.splice(i, 1)

			//Fazer os fantasmas se assustarem com o Pac com PowerUp
			fantasmas.forEach((fantasma) => {
				fantasma.assustado = true

				setTimeout(() => {
					fantasma.assustado = false
				}, 3000)
			})
		}
}

for(let i = bolinhas.length -1; 0 <= i; i--){
	const bolinha = bolinhas[i]
	bolinha.desenhoBolinha()

	//Quando tocar nas nas bolinhas
	if(Math.hypot(bolinha.position.x - player.position.x, 
		bolinha.position.y - player.position.y) < bolinha.radius  + player.radius){
			
			//console.log('tocando')
			bolinhas.splice(i, 1)
			pontuacao += 10
			scoreEl.innerHTML = pontuacao
		}
}	


	limites.forEach((borda) => {
		borda.desenho()


	if(circuloColideComRetangulo({
		circulo:player,
		retangulo:borda
	})){

		console.log('colidindo')
		player.velocity.x = 0
		player.velocity.y = 0

		}

	})


//Dando uptade no Player
player.uptade()

//local onde esta colidindo
fantasmas.forEach((fantasma) => {
	fantasma.uptade()



	const colisoes = []

	limites.forEach(borda => {
		if(			
			!colisoes.includes('right') &&
			circuloColideComRetangulo({
			circulo:{...fantasma, velocity:{
				x: fantasma.speed,
				y: 0
			}},
			retangulo:borda
		})) {
			colisoes.push('right')
		}
		
		if(
			!colisoes.includes('left') &&
			circuloColideComRetangulo({
			circulo:{...fantasma, velocity:{
				x: -fantasma.speed,
				y: 0
			}},
			retangulo:borda
		})) {
			colisoes.push('left')
		}
		if(
			!colisoes.includes('up') &&
			circuloColideComRetangulo({
			circulo:{...fantasma, velocity:{
				x: 0,
				y: -fantasma.speed
			}},
			retangulo:borda
		})) {
			colisoes.push('up')
		}
		
		if(
			!colisoes.includes('down') &&
			circuloColideComRetangulo({
			circulo:{...fantasma, velocity:{
				x: 0,
				y: fantasma.speed
			}},
			retangulo:borda
		})) {
			colisoes.push('down')
		}
	})
	//Conferindo pra ter certeza que esta colidindo com algo
	if(colisoes.length > fantasma.prevColisoes.length)
	fantasma.prevColisoes = colisoes

	if(JSON.stringify(colisoes) !== JSON.stringify(fantasma.prevColisoes)){
		
		//console.log('gogo')

	//Criar um if para dizer "ei nosso fantasma pode ir para baixo para direita"
	if(fantasma.velocity.x > 0) fantasma.prevColisoes.push('right')
	
	else if(fantasma.velocity.x < 0) fantasma.prevColisoes.push('left')

	else if(fantasma.velocity.y < 0) fantasma.prevColisoes.push('up')

	else if(fantasma.velocity.y > 0) fantasma.prevColisoes.push('down')

	console.log(colisoes)
	console.log(fantasma.prevColisoes)
	//Criar um caminho potencial para saber que pode ir para baixo direita etc
	const caminhos = fantasma.prevColisoes.filter(colisao => {
		//Vai retornar se esta no loop ou nao
		return !colisoes.includes(colisao)
	})
	console.log({caminhos})

	//Caminhos randomicos pro fantasma
	//Math.floor - arredondar numeros randomicos
	const direcao = caminhos[Math.floor(Math.random() * caminhos.length)]

	console.log({direcao})

	//Fazendo ele mudar as direcoes quando aparecer o nome Ex: "right"
	switch (direcao){
		case 'down':
			fantasma.velocity.y = fantasma.speed
			fantasma.velocity.x = 0
			break
		case 'up':
			fantasma.velocity.y = -fantasma.speed
			fantasma.velocity.x = 0
			break
		case 'right':
			fantasma.velocity.y = 0
			fantasma.velocity.x = fantasma.speed
			break
		case 'left':
			fantasma.velocity.y = 0
			fantasma.velocity.x = -fantasma.speed
			break
	}

	//conferir a nova colisao apos mudar de direcao
	fantasma.prevColisoes = []
	}
	//console.log(colisoes)
})

//Rotacao do Pac

if(player.velocity.x > 0) player.rotation = 0
else if(player.velocity.x < 0) player.rotation = Math.PI
else if(player.velocity.y > 0) player.rotation = Math.PI / 2
else if(player.velocity.y < 0) player.rotation = Math.PI * 1.5


}//fim da animacao


animacao()

player.desenhoPac()

//Dando funções ao Player
addEventListener('keydown', ({ key }) => {
	console.log(event.key)
	switch(key){

		case 'w':
		keys.w.pressed = true
		ultimaChave = 'w'
		break

		case 'a':
		keys.a.pressed = true
		ultimaChave = 'a'
		break

		case 's':
		keys.s.pressed = true
		ultimaChave = 's'
		break

		case 'd':
		keys.d.pressed = true
		ultimaChave = 'd'
		break
	}

})

addEventListener('keyup', ({ key }) => {
	console.log(event.key)
	switch(key){

		case 'w':
		keys.w.pressed = false
		break

		case 'a':
		keys.a.pressed = false
		break

		case 's':
		keys.s.pressed = false
		break

		case 'd':
		keys.d.pressed = false
		break
	}
	console.log(player.velocity)
})
},delayInMilliSegundos);