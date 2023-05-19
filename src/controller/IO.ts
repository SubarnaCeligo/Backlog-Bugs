import type { Page } from "@playwright/test";
import { ConnectionsPage } from "../pageFactory/pages/ConnectionsPage";
import { ExportsPage } from "../pageFactory/pages/ExportsPage";
import { HomePage } from "../pageFactory/pages/HomePage";
import { LoginPage } from "../pageFactory/pages/LoginPage";
import { MyAccountPage } from "../pageFactory/pages/MyAccountPage";
import { SettingsPage } from "../pageFactory/pages/SettingsPage";
import { FlowBuilderPage } from "@pages/FlowBuilderPage";
import { Assertions } from "@lib/Assertions";
import { Utilities } from "@lib/Utilities";
import { ImportsPage } from "@pages/ImportsPage";
import { API } from "./API";
import * as data from "../config/configData";
type formTypes = 'CONNECTION' | "EXPORT" | "IMPORT"
export class IO {
  protected page: Page;
  public connectionPage: ConnectionsPage;
  public flowBuilder: FlowBuilderPage;
  public exportsPage: ExportsPage;
  public importsPage: ImportsPage;
  public homePage: HomePage;
  public loginPage: LoginPage;
  public myAccountPage: MyAccountPage;
  public settingsPage: SettingsPage;
  public assert: Assertions;
  public util: Utilities;
  public api: API;
  public data: typeof data


  constructor(page: Page) {
    this.page = page;
    this.connectionPage = new ConnectionsPage(this.page);
    this.exportsPage = new ExportsPage(this.page);
    this.homePage = new HomePage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.myAccountPage = new MyAccountPage(this.page);
    this.settingsPage = new SettingsPage(this.page);
    this.assert = new Assertions(this.page);
    this.util = new Utilities();
    this.importsPage = new ImportsPage(this.page);
    this.flowBuilder = new FlowBuilderPage(this.page);
    this.api = new API();
    this.data = data;
  }


  public async fillForm(jsonData, type: formTypes) {
    switch (type.toUpperCase()) {
      case "CONNECTION":
        await this.connectionPage.fillConnectionForm(jsonData);
        break;
      case "EXPORT":
        await this.exportsPage.fillExportForm(jsonData);
        break;
      case "IMPORT":
        await this.importsPage.fillImportForm(jsonData);
        break;
      case "FLOWS":
        break;
    }
  }

  public async editForm(jsonData, type, id?) {
    switch (type.toUpperCase()) {
      case "CONNECTION":
        await this.connectionPage.fillConnectionForm(jsonData);
        break;
      case "EXPORT":
        await this.exportsPage.editExportForm(jsonData, id);
        break;
      case "IMPORT":
        await this.importsPage.editImportForm(jsonData, id);
        break;
      case "FLOWS":
        break;
    }
  }

  public async login() {
    await this.loginPage.login();
  }

}
