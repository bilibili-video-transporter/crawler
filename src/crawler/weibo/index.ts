import superAgent from "superagent";
import { weiboRecommendUrl, userAgent, cookie } from "./constants";
import { Crawler, WeiboItem, WeiboResponse } from "./interfaces/crawler";

class WeiboRecommondCrawler implements Crawler<WeiboItem> {
  get(url: string): Promise<Array<WeiboItem>> {
    return new Promise((resolve) => {
      let list: Array<WeiboItem> = [];
      superAgent
        .post(url)
        .accept("application/json")
        .field(
          "data",
          JSON.stringify({ Component_Home_Recommend: {}, n: 1, m: "home" })
        )
        .set("origin", "https://weibo.com")
        .set("referer", "https://weibo.com/tv/home")
        .set("page-referer", "/tv/home")
        .set("user-agent", userAgent)
        .set("cookie", cookie)
        .set("x-xsrf-token", "TvjVPM_HMFTrAOWk8ykZAT52")
        .then((res) => {
          let result = JSON.parse(res.text || "{}");
          list =
            (result as WeiboResponse)?.data?.Component_Home_Recommend?.list ||
            [];
          resolve(list);
        });
    });
  }
}

export const bootStrap = () => {
  const weiboCrawler = new WeiboRecommondCrawler();

  weiboCrawler.get(weiboRecommendUrl).then((list) => {
    console.log(list);
  });
};
