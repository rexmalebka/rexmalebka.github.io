<template>
	<div id="container">
		<div id="background">
			<canvas ref="background_canvas"></canvas>
		</div>
		<div id="bio">
			<div id="avatar">
				<img src="img/mouth.jpg" alt="">
			</div>
			<div id="bio_text">
				<h1>rexmalebka</h1>
				<div>3D enthusiast, python and javascript programmer, livecoding musician, glitch guy, visualist working along with piranhalab and friends.</div>
			</div>
		</div>
		<div id="projects">	
			<div v-for="(project, item) in projects" class='project'>
				<div class="title">
					<a :href="project.url" v-if="project.external">
						<h2>{{project.title}}</h2>
					</a>
					<router-link v-else :to="project.url">{{project.title}}</router-link>
				</div>
				<div class="body">
					<div class="body_image">
						<img :src="project.img" alt="">
					</div>
					<div>
						{{project.description}}
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
const Hydra = require('hydra-synth')
import * as THREE from 'three'

export default defineComponent({
	data(){
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

		const renderer = new THREE.WebGLRenderer();
		renderer.toneMappingExposure = 4
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMap.enabled = true

		const pl = new THREE.PointLight( 0xffffff, 3, 200 );
		pl.position.y = 50
		scene.add(pl)


		camera.position.z = 5

		const light = new THREE.AmbientLight( 0xffffff) 
		light.intensity = 4
		scene.add(light)


		const sphere = new  THREE.Mesh(
			new THREE.TorusKnotGeometry(2,0.5,200,200,0.4,7),
			new THREE.MeshStandardMaterial({
				color: 0xff0000,			
			})
		)

		sphere.transparent = true
		sphere.opacity= 0.7

		sphere.material.metalness = 0.8
		sphere.material.roughness = 0.1

		let color = 0xff0000;
		setInterval(function(){
			sphere.material.color.setHex( (sphere.material.color.getHex() + 10 ) % 0xffffff)
		}, 200)

		sphere.name = 'sphere'

		scene.add(sphere)
		function animate(){
			sphere.rotation.y +=0.001
			sphere.rotation.x +=0.001
			requestAnimationFrame( animate );
			renderer.render( scene, camera );
		
		}
		
		requestAnimationFrame( animate );

		return {
			scene:scene,
			renderer: renderer,
			camera: camera,

			projects:[
				{
					title:'github',
					description:'some of my public codes and other disasters',
					img:'img/github.jpeg',
					url:'https://github.com/rexmalebka',
					external:true
				},
				{
					title:'bandcamp',
					description:'music I made with livecoding',
					img: 'img/bandcamp.jpg',
					url: 'https://rexmalebka.bandcamp.com/',
					external:true,

				},
				{
					title:'Isla',
					description:'3D gallery, an island ',
					img:'',
					url:'/isla',
					external:false,
				},
				{
					title:'amlobot',
					description: 'mañaneras bot made with markov',
					img:'img/amlobot.jpg',
					url: '/amlobot',
					external:false,
				},
			],

		}
	},
	methods:{
		animate(){
		}
	},
	mounted(){
		this.$refs.background_canvas.width= window.innerWidth
		this.$refs.background_canvas.height= window.innerHeight


		const hydra = new Hydra({
			canvas: this.$refs.background_canvas,
			makeGlobal: false,
			detectAudio: false,
			width: window.innerWidth,
			height: window.innerHeight,
		})

		const s= hydra.synth

		s.s0.init({src:this.renderer.domElement})
		 
		s.src(s.s0)
		.diff(s.src(s.o0).scale(1.01))
			.out()

		console.debug("page mounted", this, hydra, THREE)
	}
})
</script>

<style>
html,body{
	margin:0px;
	padding:0px;
	height:100%;
	color:white;
}

#background{
	width:100%;
	height:100%;
	position:fixed;
	z-index:-1;
}

#background canvas{
	width:100%;
	height:100%;
}

#app{
	height:100%;

}

#container{
	display:flex;
	height:100%;
	flex-direction:column;
}

#bio{
	flex:40%;
	margin:1em;
	display:flex;
	background: rgba(0, 0, 0, 0.5);
}

#avatar{
	flex:20%;
	max-width:20%;
	margin:1em;
}

#avatar img{
	width:100%;
	border-radius: 50%;
}

#bio_text{
	margin:1em;
}

#projects{
	flex: 60%;
	margin:1em;
	display:flex;
	flex-wrap:wrap;
	align-items:flex-start;
}

.project{
	display:flex;
	padding:1em;
	background: rgba(0, 0, 0, 0.5);
	max-width:20%;
	color:white;
	margin:1em;
	flex-direction:column;
}



.body_image{
	width:40%;
}

.body_image img{
	width:100%;
	border-radius: 50%;
}

a:link, a:visited{
	color:white;
}
</style>
