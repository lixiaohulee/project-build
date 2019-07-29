/**
 * @file router/routerfy
 * @author lixiaohu(lixiaohu_neuq@163.com)
 */
import routerList from './routerList'

const routerObj = {
    mode: 'history',
    routes: []
}

Object.keys(routerList).forEach(key => {
    let routerItem = Object.create(null),
        currentRouter = routerList[key],
        baseDir = currentRouter.baseDir,
        tplName = currentRouter.tplName
    
    routerItem.path = `/${baseDir}`
    routerItem.name = tplName
    routerItem.component = () => import(`@/page/${baseDir}/${tplName}.vue`)
    routerObj.routes.push(routerItem)
})

export default routerObj