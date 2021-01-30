// import superAgent from "superagent";

// const test = () => {
//   const url = "https://jsonplaceholder.typicode.com/posts";
//   superAgent.get(url).then((res) => {
//     // console.log(res);
//     console.log("ok");
//   });
// };

// test();

// console.log("it works");
import Koa from 'koa'; // koa框架
import Router from 'koa-router'; // koa-router：处理路由

const app = new Koa(); // 新建一个koa应用
const router = new Router(); // 新建一个路由

router.get('/hello', async (ctx) => { //定义路由以及对应处理
  ctx.body = 'Hello World!';
});

app.use(router.routes()); // 加载路由

app.listen(3000); // 此应用会监听3000端口

console.log('Server running on port 3000');
