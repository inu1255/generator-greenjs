import Home from '@/pages/Home';
// import Svn from '@/pages/Svn';
import PostMan from '@/pages/PostMan';
import CollectForm from '@/pages/postman/CollectForm.vue';
import TaskForm from '@/pages/postman/TaskForm.vue';
import NodeForm from '@/pages/postman/NodeForm.vue';

export default [{
        path: '/',
        name: '主页',
        icon: "home",
        component: Home
    },
    // {
    //     path: '/svn',
    //     name: 'Svn',
    //     icon: "social-github",
    //     component: Svn
    // },
    {
        path: '/postman',
        name: 'PostMan',
        icon: "social-github",
        component: PostMan,
        children: [{
            path: '/postman/:cid',
            name: 'CollectForm',
            component: CollectForm,
        }, {
            path: '/postman/:cid/:tid',
            name: 'TaskForm',
            component: TaskForm,
        }, {
            path: '/postman/:cid/:tid/:nid',
            name: 'NodeForm',
            component: NodeForm,
        }, ]
    }
];