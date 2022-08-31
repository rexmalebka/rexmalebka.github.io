<template>
	<div id="main">
		<h1 v-bind:style="{letterSpacing: i+'px'}">Not Found</h1>
		<router-link to="/">Go Home</router-link>
	</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	data(){
		return{
			i: 4-Math.random()*2
		}
	},
	mounted(){
		console.info('component NotFound mounted',this)
		const app = this
		setInterval(function(){
			app.i =  4-(Math.random()*4)
		},100)
	},
	name:'NotFound'
})
</script>


<style>
#main{
	font-size:4vw;
	display:flex;
	flex-direction:column;
	align-items:center;
}
</style>
