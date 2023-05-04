import { Page, test as baseTest } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import { WebActions } from "@lib/WebActions";
import { HomePage } from "@pages/HomePage";
import { SettingsPage } from "@pages/SettingsPage";
import { FlowBuilderPage } from "@pages/FlowBuilderPage";
import { MyAccountPage } from "@pages/MyAccountPage";
import { Assertions } from "@lib/Assertions";
import { ConnectionsPage } from "@pages/ConnectionsPage";
import { LoginPagePO } from "@objects/LoginPagePO";
import { HomePagePO } from "@objects/HomePagePO";
import { MyAccountPagePO } from "@objects/MyAccountPagePO";
import { SettingsPagePO } from "@objects/SettingsPagePO";
import { CommonPagePO } from "@objects/CommonPagePO";
import { FlowBuilderPagePO } from "@objects/FlowBuilderPagePO";
import { ConnectionsPagePO } from "@objects/ConnectionsPagePO";
import { ExportsPagePO } from "@objects/ExportsPagePO";

export const test = baseTest.extend<{
  webActions: WebActions;
  assert: Assertions;
  loginPage: LoginPage;
  homePage: HomePage;
  settingsPage: SettingsPage;
  flowBuilderPage: FlowBuilderPage;
  myAccountPage: MyAccountPage;
  connectionsPage: ConnectionsPage;
  loginPagePO: LoginPagePO;
  myAccountPO: MyAccountPagePO;
  homePagePO: HomePagePO;
  settingsPagePO: SettingsPagePO;
  commonPagePO: CommonPagePO;
  flowBuilderPagePO: FlowBuilderPagePO;
  concPagePO: ConnectionsPagePO;
  exportsPagePO: ExportsPagePO;
}>({
  webActions: async ({ page }, use) => {
    await use(new WebActions(page));
  },
  assert: async ({ page }, use) => {
    await use(new Assertions(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  },
  flowBuilderPage: async ({ page }, use) => {
    await use(new FlowBuilderPage(page));
  },
  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },
  connectionsPage: async ({ page }, use) => {
    await use(new ConnectionsPage(page));
  },
  myAccountPO: async ({}, use) => {
    await use(new MyAccountPagePO());
  },
  loginPagePO: async ({}, use) => {
    await use(new LoginPagePO());
  },
  homePagePO: async ({}, use) => {
    await use(new HomePagePO());
  },
  settingsPagePO: async ({}, use) => {
    await use(new SettingsPagePO());
  },
  commonPagePO: async ({}, use) => {
    await use(new CommonPagePO());
  },
  flowBuilderPagePO: async ({}, use) => {
    await use(new FlowBuilderPagePO());
  },
  concPagePO: async ({}, use) => {
    await use(new ConnectionsPagePO());
  },
  exportsPagePO: async ({}, use) => {
    await use(new ExportsPagePO());
  }
});

export default test;
export { expect } from "@playwright/test";
