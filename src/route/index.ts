import Router from 'koa-router';
import HelloController from '../controller/hello'

const router = new Router(); // 新建一个路由

router.get('/(.*)', HelloController.helloCol);

export default router.routes();