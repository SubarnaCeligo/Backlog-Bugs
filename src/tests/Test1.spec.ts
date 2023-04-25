import { test } from "@playwright/test";
import { HomePage } from "@pages/HomePage";
import { SettingsPage } from "@pages/SettingsPage";
import { FlowBuilderPage } from "../pageFactory/pageRepository/FlowBuilderPage";

test.skip("Platform E2E || Shopify Order to NetSuite Sales Order Sync for Every 30 minutes (Test1)", async ({
  page
}) => {
  const homepage = new HomePage(page);
  const settingsPage = new SettingsPage(page);
  const flowBuilderPage = new FlowBuilderPage(page);
  await homepage.open();
  await homepage.goToIntegrationTile();
  await settingsPage.goToFlowBuilder();
  await flowBuilderPage.addPageGenerator();
  await flowBuilderPage.selectApplication("Shopify", "");
  await flowBuilderPage.fillExportForm();
  await flowBuilderPage.fillImportForm();
});
