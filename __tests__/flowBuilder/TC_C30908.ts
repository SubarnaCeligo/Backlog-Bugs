import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as data from '../../testData/inputData/FlowBuilder/C14925_Conn.json';
import TC from '../../testData/inputData/FlowBuilder/C14925.json';
import TC_C20061 from "@testData/FlowBuilder/TC_C20061.json";

test.describe("@Env- All @Zephyr-IO-T2947|@Env- All @Zephyr-IO-T2910", () => {

  test("@Env- All @Zephyr-IO-T2947| To verify warning icon is present in connections when connection is offline", async ({ io }) => {
    //TC_C15171 | To verify warning icon is present in connections when connection is offline
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.connections.createConnectionViaAPI(data);
    await io.homePage.loadingTime();
    await io.createResourceFromAPI(TC, "FLOWS");
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICATION_ID, "The connection associated with this resource is currently offline and configuration is limited.Fix your connectionto bring it back online.");
  });

  // TC_C15577 | Custom settings - Script should have button to insert "formInit" function -> removed as it was obsolete

  test("@Env- All @Zephyr-IO-T2910|Run button is enabled even if the flow is disabled for DL flows.", async ({ io, page }) => {
    //TC_C30908 | Run button is enabled even if the flow is disabled for DL flows.
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.homePage.goToMenu("Tools", "Data loader");
    await io.flowBuilder.loadingTime();
    //Add Source
    await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.DATA_LOADER, 1);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);
    await io.flowBuilder.clickByText("XLSX");
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/dataloader/C69768.xlsx");
    await io.homePage.addStep("Uploaded xlsx file");
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE);
    await io.homePage.loadingTime();
    await io.flowBuilder.click('[data-test="Add destination"]');
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP ZENDESK CONNECTION');
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST, 0);
    await io.flowBuilder.fill(selectors.importPagePO.NAME, 'T32987 import');
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.FLOWSETTING);
    await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C30908');
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, 'TC_C30908');
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByText('Standalone flows');
    await io.homePage.loadingTime();
    await io.myAccountPage.fill(selectors.integrationPagePO.HOME_SEARCH, 'TC_C30908');
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.basePagePO.OFF_ON, 0);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.myAccountPagePO.CONFIRMDISABLE);
    await io.homePage.loadingTime();
    const runBtn = await page.locator(selectors.flowBuilderPagePO.RUN_DL_FLOW);
    await expect(runBtn).toHaveAttribute('disabled');
  });


test("@Env-All @Zephyr-IO-T2955|", async ({ io, page }) => {
  //TC_C20061 | Escape button doesn't work when the mappings are selected from flow builder page,rather works in the settings page.
 await io.createResourceFromAPI(TC_C20061, "FLOWS");
  let flowId = await io.api.getFlowId("TC_C20061");
  await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  await io.homePage.loadingTime();
  await page.locator(selectors.integrationPagePO.HOME_SEARCH).fill("TC_C20061");
  await io.homePage.loadingTime();
  await io.homePage.clickByText('Automation Flows');
  await io.homePage.loadingTime();
  await page.locator(selectors.integrationPagePO.HOME_SEARCH).fill("TC_C2006");
  await io.homePage.loadingTime();
  await io.homePage.clickByIndex('[aria-label="Edit mapping"]',0);
  await io.homePage.loadingTime();
  await io.homePage.click(selectors.flowBuilderPagePO.FIELD_MAPPING_SOURCE);
  await page.keyboard.press("Escape");
  await io.homePage.loadingTime();
  const closeBtn = await page.locator(selectors.basePagePO.CLOSE_RIGHT_DRAWER).nth(1);
  expect(closeBtn).toBeVisible();
  await page.locator(selectors.basePagePO.CLOSE_RIGHT_DRAWER).nth(1).click();
  await io.homePage.loadingTime();
  await io.homePage.clickByText("TC_C20061");
  await io.homePage.loadingTime();
  await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
  await io.flowBuilder.loadingTime();
  await io.homePage.click(selectors.flowBuilderPagePO.FIELD_MAPPING_SOURCE);
  await page.keyboard.press("Escape");
  await io.homePage.loadingTime();
  expect(closeBtn).toBeVisible();
  await io.api.deleteFlowsWithId(flowId);
});

});

