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
import routeMiddleware from './route';

const app = new Koa(); // 新建一个koa应用


app.use(routeMiddleware); // 加载路由

app.listen(3000); // 此应用会监听3000端口

console.log('Server running on port 3000');
