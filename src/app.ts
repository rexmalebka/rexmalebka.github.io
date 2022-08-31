import {createRouter, createWebHashHistory} from 'vue-router'
import {createApp} from 'vue'

import App from './app.vue'
import Home from './pages/Home.vue'
import Amlo from './pages/Amlo.vue'
import NotFound from './pages/NotFound.vue'

const routes:any[] =[
	{path:'/', component:Home},
	{path:'/amlobot', component:Amlo},
	{path:'/:pathMatch(.*)', component: NotFound}
]


const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default createApp(App).use(router).mount('#app')
