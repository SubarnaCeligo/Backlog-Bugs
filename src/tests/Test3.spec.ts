import { test } from "@playwright/test";
import { HomePage } from "@pages/HomePage";
import { SettingsPage } from "@pages/SettingsPage";
import { FlowBuilderPage } from "@pages/FlowBuilderPage";

test("Platform E2E || Orch_Blob_Create_Flow198_NetSuite_Customer_To_Salesforce_Account_Multiple_Attachments", async ({
  page
}) => {
  const homepage = new HomePage(page);
  const settingsPage = new SettingsPage(page);
  const flowBuilderPage = new FlowBuilderPage(page);
  await homepage.open();
  await homepage.goToIntegrationTile();
  await settingsPage.goToFlowBuilder();
  await flowBuilderPage.addPageGenerator();
  await flowBuilderPage.seleApplication("Netsuite", "NetSuite-TSTDRV1143616");
  await flowBuilderPage.fillExportform1();
  await flowBuilderPage.fillImportform1();
});
