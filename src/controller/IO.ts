import type { Page } from "@playwright/test";
import { ConnectionsPage } from "../pageFactory/pages/ConnectionsPage";
import { ExportsPage } from "../pageFactory/pages/ExportsPage";
import { HomePage } from "../pageFactory/pages/HomePage";
import { LoginPage } from "../pageFactory/pages/LoginPage";
import { MyAccountPage } from "../pageFactory/pages/MyAccountPage";
import { SettingsPage } from "../pageFactory/pages/SettingsPage";
import { FlowBuilderPage } from "@pages/FlowBuilderPage";
import { Assertions } from "@validations/Assertions";
import { ImportsPage } from "@pages/ImportsPage";
import { API } from "./API";
import * as data from "../config/configData";
type formTypes = "CONNECTION" | "EXPORT" | "IMPORT";
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
  public api: API;
  public data: typeof data;

  constructor(page: Page) {
    this.page = page;
    this.connectionPage = new ConnectionsPage(this.page);
    this.exportsPage = new ExportsPage(this.page);
    this.homePage = new HomePage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.myAccountPage = new MyAccountPage(this.page);
    this.settingsPage = new SettingsPage(this.page);
    this.assert = new Assertions(this.page);
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
        const expId = await this.api.createExportorImport(jsonData, "export");
        await this.exportsPage.navigateTo(
          process.env.IOURL + "/exports/" + expId
        );
        break;
      case "IMPORT":
        const impId = await this.api.createExportorImport(jsonData, "import");
        await this.importsPage.navigateTo(
          process.env.IOURL + "/imports/" + impId
        );
        break;
      case "FLOWS":
        const flowId = await this.api.createFlowFromAPI(jsonData);
        await this.flowBuilder.navigateTo(
          process.env.IO_Integration_URL + "/flowBuilder/" + flowId
        );
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
