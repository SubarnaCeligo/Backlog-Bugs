import { Page, test as baseTest } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import BasePage from "@pages/BasePage";
import { HomePage } from "@pages/HomePage";
import { SettingsPage } from "@pages/SettingsPage";
import { FlowBuilderPage } from "@pages/FlowBuilderPage";
import { MyAccountPage } from "@pages/MyAccountPage";
import { Assertions } from "@lib/Assertions";
import { ConnectionsPage } from "@pages/ConnectionsPage";
import { ExportsPage } from "@pages/ExportsPage";
import { Utilities } from "@lib/Utilities";
import { ExportTestdata } from "@testData/Exports";
import { MyAccountTestData } from "@testData/MyAccount";
import { ConnectionsTestData } from "@testData/CONNECTIONS";
import { IO } from "@controller/IO";

export const test = baseTest.extend<{
  basePage: BasePage;
  assert: Assertions;
  loginPage: LoginPage;
  homePage: HomePage;
  settingsPage: SettingsPage;
  flowBuilderPage: FlowBuilderPage;
  myAccountPage: MyAccountPage;
  connectionsPage: ConnectionsPage;
  exportsPage: ExportsPage;
  util: Utilities;
  exportTD: ExportTestdata;
  myAccountTD: MyAccountTestData;
  connectionTD: ConnectionsTestData;
  io: IO;
}>({
  io: async ({}, use) => {
    await use(new IO());
  },
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
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
  exportsPage: async ({ page }, use) => {
    await use(new ExportsPage(page));
  },
  util: async ({ page }, use) => {
    await use(new Utilities(page));
  },
  exportTD: async ({}, use) => {
    await use(new ExportTestdata());
  },
  myAccountTD: async ({}, use) => {
    await use(new MyAccountTestData());
  },
  connectionTD: async ({}, use) => {
    await use(new ConnectionsTestData());
  }
});

export default test;
export { expect } from "@playwright/test";
