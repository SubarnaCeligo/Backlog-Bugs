import type { Page } from "@playwright/test";
import { request } from "@playwright/test";
import BasePage from "../pageFactory/pages/BasePage";
import { ConnectionsPage } from "../pageFactory/pages/ConnectionsPage";
import { ExportsPage } from "../pageFactory/pages/ExportsPage";
import { HomePage } from "../pageFactory/pages/HomePage";
import { LoginPage } from "../pageFactory/pages/LoginPage";
import { MyAccountPage } from "../pageFactory/pages/MyAccountPage";
import { SettingsPage } from "../pageFactory/pages/SettingsPage";
import { Assertions } from "@lib/Assertions";
import { Utilities } from "@lib/Utilities";

export class IO {
  protected page: Page;
  public basePage: BasePage;
  public connectionPage: ConnectionsPage;
  public exportsPage: ExportsPage;
  public homePage: HomePage;
  public loginPage: LoginPage;
  public myAccountPage: MyAccountPage;
  public settingsPage: SettingsPage;
  public assert: Assertions;
  public util: Utilities;

  constructor() {
    this.basePage = new BasePage(this.page);
    this.connectionPage = new ConnectionsPage(this.page);
    this.exportsPage = new ExportsPage(this.page);
    this.homePage = new HomePage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.myAccountPage = new MyAccountPage(this.page);
    this.settingsPage = new SettingsPage(this.page);
    this.assert = new Assertions(this.page);
    this.util = new Utilities(this.page);
  }

  public async fillForm(jsonData, type) {
    switch (type.toUpperCase()) {
      case "CONNECTION":
        await this.connectionPage.fillConnectionForm(jsonData);
    }
  }

  public async getCall(endpoint) {
    const context = await request.newContext({
      baseURL: process.env["API_URL"]
    });
    const resp = await context.get(endpoint, {
      headers: {
        Authorization: await this.util.decrypt(`${process.env.API_TOKEN}`)
      }
    });
    if ((await (await resp.text()).length) > 0) {
      return await resp.json();
    }
  }

  public async postCall(endpoint, reqBody) {
    const context = await request.newContext({
      baseURL: process.env["API_URL"]
    });
    const resp = await context.post(endpoint, {
      headers: {
        ContentType: "application/json",
        Authorization: await this.util.decrypt(`${process.env.API_TOKEN}`)
      },
      data: reqBody
    });
    return await resp.json();
  }

  public async putCall(endpoint, reqBody) {
    const context = await request.newContext({
      baseURL: process.env["API_URL"]
    });
    const resp = await context.put(endpoint, {
      headers: {
        ContentType: "application/json",
        Authorization: await this.util.decrypt(`${process.env.API_TOKEN}`)
      },
      data: reqBody
    });
    return await resp.json();
  }
}
