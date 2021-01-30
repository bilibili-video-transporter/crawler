import { userAgents } from "../constants";

export const useRandomAgent = (): string => {
  return userAgents[parseInt(Math.random() * userAgents.length + "")];
};
