import fs from "fs/promises";
import path from "path";
import { userAgents } from "../constants";

export const useRandomAgent = (): string => {
  return userAgents[parseInt(Math.random() * userAgents.length + "")];
};

export const saveWeiboList2LocalFile = (
  data: Array<any>,
  fileName: string = "weibo.json"
) => {
  const filePath = path.resolve(__dirname, "/src/crawler/weibo", fileName);
  fs.writeFile(filePath, JSON.stringify(data), "utf-8")
    .then(() => {
      console.log("save weibo json to local file finished :)");
    })
    .catch((e) => {
      console.warn("save to local file failed with", e);
    });
};
