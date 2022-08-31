<template>
	<div id="header">
		<h1>Amlobot</h1>
		<img src="/img/amlobot.jpg" alt="">
	</div>
	<div v-if="loading_data" id="container">Loading data </div>
	<div v-else id="container">
		<div>
			<label for="">first word:</label>
			<input type="text" @keyup="list_options" v-model="start_word">
		</div>
		<div id="words_options">
			<label v-for="(option, item) in  options" @click="start_word=option, options=[]">{{option}}</label>
		</div>
		<div>
			<label for="">length:</label>
			<input type="number" v-model="length">
		</div>
		<div>
			<button @click="generate">generate</button>
		</div>
		<div id="result">
			<div v-for="(res, item) in result.split('. ')">{{res}}.</div>
		</div>
	</div>
</template>


<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	name: 'amlo',
	data(){
		return {
			start_word: '',
			length:100,
			result:'',
			loading_data: true,
			corpus:{},
			words:[],
			words_lower:[],
			options:[],
		}
	},
	methods:{
		list_options(e:InputEvent){
			const word = e.target.value.toLowerCase().trim()
			console.debug("assdf",word)
			this.options = []

			if (this.corpus[word] != undefined){
				this.options.push(word)
			}
			
			if (this.words_lower.indexOf(word) >= 0){
				this.options.push(
					this.words[
						this.words_lower.indexOf(word)
					]
				)
			}

			for(let i=0; i<this.words_lower.length;i++){
				if (
					this.words_lower[i] == word || 
					this.words_lower[i].includes(word) &&
					this.options.indexOf(this.words_lower[i]) == -1

				){
					this.options.push( this.words[i] ) 
				}

				const chars = Array.from(new Set(word)).join('')
				const rule = new RegExp(`[${chars}]+`,'gm')

				if (
					rule.test(this.words_lower[i]) &&
					this.options.indexOf(this.words_lower[i]) == -1
				){
					this.options.push( this.words[i]) 
				}

				if(this.options.length > 5){
					break
				}
			}
		},
		generate(){
			if(this.corpus[this.start_word] == undefined){
				return
			}
			this.options = []

			let word = this.start_word
			this.result = word
			for(let i=0;i<this.length;i++){
				let options = Object.entries(this.corpus[word]).sort( x=> x[1])
				options = options.map(x=> x[0])
				
				let best
				if(Math.random() > 0.5){
					 best = options[options.length-1]
				}else{
					best = options[Math.floor(Math.random() * options.length)]
				}
				console.debug(options, best, ':)')
				this.result += ' '+best
				word = best
			}
		}
	},
	mounted(){
		const app = this
		fetch('/src/pages/amlobot/scripts/trained_data_ascii.json')
			.then((response) => response.json())
			.then(json=>{
				app.corpus = json
				app.words = Object.keys(json)
				app.words_lower = app.words.map((x:string)=>x.toLowerCase())
				app.loading_data = false
			})

		console.debug('component amlo mounted', this)
	}
})

</script>

<style>
html,body{
	background:black;
}
#header{
	display:flex;
	align-items:center;
	justify-content:center;
	flex-direction:column;
}

#header h1{
	margin:1em;
	font-size:3em;
}

#header img{
	width:10%;
}

#container{
	background:black;
	font-size:2em;
	display:flex;
	flex-direction:column;
	align-items:center;
}

input[type="text"]{
	font-size:0.8em;
}

#container > div {
	display:flex;
	flex-direction:row;
	align-items:center;
}

#words_options label{
	margin:0.2em;
}

#result{
	display:flex;
	flex-direction:column !important;
	width:70%;
}

#result div{
	margin-top:0.5em;
}
</style>
