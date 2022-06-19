import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import FileUpload from "@/views/FileUpload.vue";
import StudiesBrowser from "@/views/StudiesBrowser.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/studies",
        name: "StudiesBrowser",
        component: StudiesBrowser,
    },
    {
        path: "/file-upload",
        name: "FileUpload",
        component: FileUpload,
    },
    //   Lazy-loading example
    //   {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    //   }
];

const router = new VueRouter({
    mode: "hash",
    routes
});

export default router;