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
  io: async ({ page }, use) => {
    await use(new IO(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  connectionsPage: async ({ page }, use) => {
    await use(new ConnectionsPage(page));
  },
  assert: async ({ page }, use) => {
    await use(new Assertions(page));
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
