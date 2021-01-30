import superAgent from "superagent";
import { weiboRecommendUrl, cookie, sxtfToken } from "./constants";
import { Crawler, WeiboItem, WeiboResponse } from "./interfaces/crawler";
import { useRandomAgent } from "./utils";

class WeiboRecommondCrawler implements Crawler<WeiboItem> {
  next_cursor: number | null;
  cookie: string;
  sxtfToken: string;

  constructor(next_cursor: number | null, cookie: string, sxtfToken: string) {
    this.next_cursor = next_cursor;
    this.cookie = cookie;
    this.sxtfToken = sxtfToken;
  }

  get(url: string, formData: string): Promise<Array<WeiboItem>> {
    console.log(`fetching [${url}] ...`);
    return new Promise((resolve, reject) => {
      let list: Array<WeiboItem> = [];
      superAgent
        .post(url)
        .field("data", formData)
        .accept("application/json")
        .set("origin", "https://weibo.com")
        .set("referer", "https://weibo.com/tv/home")
        .set("page-referer", "/tv/home")
        .set("user-agent", useRandomAgent())
        .set("cookie", this.cookie)
        .set("x-xsrf-token", this.sxtfToken)
        .then((res) => {
          let result = JSON.parse(res.text || "{}") as WeiboResponse;
          if (result?.msg !== "succ") {
            console.error(`fetch [${url}] failed`);
            return reject(
              new Error(
                `get weibo recommen failed, msg: ${result?.msg} , code: ${result?.code}`
              )
            );
          }
          const Component_Home_Recommend =
            result?.data?.Component_Home_Recommend;
          if (!Component_Home_Recommend) {
            console.error(`fetch [${url}] failed`);
            return reject(
              new Error("get weibo recommen failed, result is not right")
            );
          }
          this.next_cursor = Component_Home_Recommend?.next_cursor;
          list = Component_Home_Recommend?.list || [];
          console.log(`ok :)`);
          resolve(list);
        })
        .catch((e) => {
          reject(new Error(e));
        });
    });
  }

  async next() {
    const { next_cursor } = this;
    const Component_Home_Recommend = next_cursor ? { next_cursor } : {};
    const formData = JSON.stringify({ Component_Home_Recommend });
    const url = `${weiboRecommendUrl}`;
    return await this.get(url, formData);
  }
}

export const bootStrap = async () => {
  let count = 2; // 爬取次数
  let list: Array<WeiboItem> = [];
  const weiboCrawler = new WeiboRecommondCrawler(null, cookie, sxtfToken);
  while (count) {
    const temp = await weiboCrawler.next();
    list.push(...temp);
    count -= 1;
  }
  console.log(`get total ${list.length} `);
  console.log(list?.[0]);
};
