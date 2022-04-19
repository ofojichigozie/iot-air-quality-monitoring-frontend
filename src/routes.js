import Login from './pages/Login'
import Home from './pages/Home'

let checkAuthenticatedState = (to, from, next) => {
    let isLoggedIn = localStorage.getItem('user') !== null ? true : false;

    if(isLoggedIn){
        next();
        return;
    }

    next('/');
}

export default [
    {path: '/', component: Login},
    {path: '/home', component: Home, beforeEnter: checkAuthenticatedState}
];