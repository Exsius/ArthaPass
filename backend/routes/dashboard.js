import dashboard from '../controllers/dashboard_controller.js'

const dashboard = (express, router) => {
    router.get('/dashboard', dashboard)
}

export default dashboard