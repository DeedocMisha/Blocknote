import { createRouter,createWebHashHistory } from "vue-router";
import MaIne from "./components/PaGe.vue";



export default createRouter ({
    history: createWebHashHistory(),
    routes: [
       
        {path: '/',name:'home' ,component:MaIne},
        

    ]
})
