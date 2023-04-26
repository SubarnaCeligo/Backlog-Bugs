import { test as baseTest } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import { WebActions } from "@lib/WebActions";
import { HomePage } from "@pages/HomePage";
import { SettingsPage } from "@pages/SettingsPage";
import { FlowBuilderPage } from "@pages/FlowBuilderPage";
import { Assertions } from "@lib/Assertions";

const test = baseTest.extend<{
  webActions: WebActions;
  assert: Assertions;
  loginPage: LoginPage;
  homePage: HomePage;
  settingsPage: SettingsPage;
  flowBuilderPage: FlowBuilderPage;
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
  }
});

export default test;
