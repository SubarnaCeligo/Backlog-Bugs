import { test } from '@playwright/test';
import { HomePage } from '../pages/home-page'
import { SettingsPage } from '../pages/settings-page'
import { FlowBuilderPage } from '../pages/Flowbuilder-Page'


test.skip('Platform E2E || TC_610_Credit_Card_Transaction_Add', async ({ page }) => {
  const homepage = new HomePage(page);
  const settingsPage = new SettingsPage(page);
  const flowBuilderPage = new FlowBuilderPage(page);
  await homepage.open();
  await homepage.goToIntegrationTile();
  await settingsPage.goToFlowBuilder();
  await flowBuilderPage.addPageGenerator();
  await flowBuilderPage.selectApplication("FTP","FTP connection")
  await flowBuilderPage.fillExportform1();
  await flowBuilderPage.fillImportform1();
});