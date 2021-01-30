import { Context } from 'koa';
import { hello } from '../service/hello';

// export const helloCol = (ctx: Context) => {
// };
class HelloController {
    static async helloCol(ctx: Context) {
        ctx.body = hello();
    }
}

export default HelloController;
