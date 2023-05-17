import { expect, Page, test } from "@playwright/test";
import { IO } from "@controller/IO";
const Decrypt = require("atob");


export class Utilities {
  async randomString(len?: number, charSet?: string) {
    charSet =
      charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    len = len || 5;
    let randomString = "";
    for (let i = 0; i < len; i++) {
      const randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  }

  async decrypt(value: string) {
    return Decrypt(value);
  }
}