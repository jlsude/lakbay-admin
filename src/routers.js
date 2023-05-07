

import ADMINLogin from './components/ADMIN-login.vue';
import ADMINHomeVue from './components/ADMIN-home.vue';
import ADMINRegisterLocationVue from './components/ADMIN-register-location.vue';
import ADMINManageLocationsVue from './components/ADMIN-manage-locations.vue';   
import ADMINBucketlist from './components/ADMIN-bucketlist.vue';
import ADMINMaps from './components/ADMIN-maps.vue'
import ADMINManagers from './components/ADMIN-managers.vue'
import ADMINAdministrators from './components/ADMIN-administrators.vue'
import ADMINUsers from './components/ADMIN-users.vue'


import testing from './components/testing.vue'

import { createRouter, createWebHistory } from 'vue-router';



const routes = [
    {
        name: 'adminlogin',
        component: ADMINLogin,
        path: '/login' 
    },
    {
        name: 'adminhome',
        component: ADMINHomeVue,
        path: '/' 
    },
    {
        name: 'adminregisterlocation',
        component: ADMINRegisterLocationVue,
        path: '/admin/register/location' 
    },
    {
        name: 'adminmanagelocation',
        component: ADMINManageLocationsVue,
        path: '/admin/manage/location' 
    },
    {
        name: 'adminbucketlist',
        component: ADMINBucketlist,
        path: '/admin/bucketlist' 
    },
    {
        name: 'adminmaps',
        component: ADMINMaps,
        path: '/admin/maps' 
    },
    {
        name: 'adminmanagers',
        component: ADMINManagers,
        path: '/admin/managers' 
    },
    {
        name: 'adminadministrators',
        component: ADMINAdministrators,
        path: '/admin/administrators' 
    },
    {
        name: 'adminusers',
        component: ADMINUsers,
        path: '/admin/users' 
    },
    {
        name: 'testing',
        component: testing,
        path: '/testing'
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;