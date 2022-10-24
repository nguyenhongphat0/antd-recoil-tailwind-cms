import { selector } from "recoil";
import { User } from "../models/user";

export const userState = selector<User | null>({
  key: 'user',
  get: async () => {
    // await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: 1,
      name: 'John Doe',
      avt: 'https://avatars0.githubusercontent.com/u/174825?s=460&v=4',
      role: 'ADMIN'
    };
  }
})