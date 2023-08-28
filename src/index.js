import { createWebHistory, createRouter } from "vue-router";
import Graficos from './components/Graficos.vue'
import Musica from './components/Musica.vue'

const routes = [
    {
        path:'/graficos',
        name: 'graficos',
        component: Graficos
    },
    {
        path:'/musica',
        name: 'musica',
        component: Musica
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });

export default router;