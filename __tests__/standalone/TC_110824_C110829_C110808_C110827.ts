import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_110824_C110829_C110808_C110827.json";

test.describe("TC110824,C110808,C110829,C110827", () => {
  var flows;

  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    flows = await io.api.createImpOrExpAndFlowsThruAPI(HTTP);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });


  test("@Env-All @Zephyr-IO-T14162 TC110824", async ({ io, page }, testInfo) => {
    await test.step("*** Created Flows :" + flows.get(HTTP.name)["flowName"], async () => { }
    );

    test.step("*** Opening the flow ***", async () => { });
    await io.flowBuilder.navigateToTheFlow(flows.get(HTTP.name)["flowId"]
    );
    await io.homePage.loadingTime();

    test.step("*** Opening the import ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();

    var element = await page.$$(
      '[data-test="connection"] .MuiSvgIcon-root'
    );
    var chevron = await element[1].isVisible();
    await io.assert.expectToBeTrue(chevron, "");
    test.step("*** Drop down chevron icon should be displayed next to search icon on the right side of Connection field ***", async () => { });

    await expect(await (await page.locator(selectors.integrationPagePO.ADDNEWRESOURCE)
    ).isVisible()
    ).toBeTruthy();
    await expect(await (await page.locator(selectors.connectionsPagePO.EDIT_RESOURCE)
    ).isVisible()
    ).toBeTruthy();
    await test.step("*** -'+' and pencil (edit) icon should be displayed on the right side of field outside the field ***"
      , async () => { });

    await io.homePage.click(selectors.basePagePO.CONNECTION);
    test.step("*** Clicking on the dropdown ***", async () => { });
    await io.homePage.loadingTime();
    let platform = process.platform;
    if (platform.toUpperCase().indexOf("DARWIN") > -1) {
      await io.homePage.keyboard("Meta+A");
      await io.homePage.keyboard("Delete");
    } else {
      await io.homePage.keyboard("Control+A");
      await io.homePage.keyboard("Delete");
    }
    await io.homePage.loadingTime();
    await page.keyboard.type("ABC");
    await io.homePage.loadingTime();

    const noDataEl = await page.getByText("No available connections match your search");
    await noDataEl.waitFor({ state: 'visible', timeout: 90000 });
    await expect(noDataEl).toBeVisible();
  });

  test("@Env-All @Zephyr-IO-T14161 TC110808", async ({ io, page }, testInfo) => {
    await test.step("*** Created Flows :" + flows.get(HTTP.name)["flowName"], async () => { }
    );

    test.step("*** Opening the flow ***", async () => { });
    await io.flowBuilder.navigateToTheFlow(flows.get(HTTP.name)["flowId"]
    );
    await io.homePage.loadingTime();

    test.step("*** Opening the export ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();

    var element = await page.$$(
      '[data-test="connection"] .MuiSvgIcon-root'
    );
    var chevron = await element[1].isVisible();
    await io.assert.expectToBeTrue(chevron, "");
    test.step("*** Drop down chevron icon should be displayed next to search icon on the right side of Connection field ***", async () => { });

    await expect(await (await page.locator(selectors.integrationPagePO.ADDNEWRESOURCE)
    ).isVisible()
    ).toBeTruthy();
    await expect(await (await page.locator(selectors.integrationPagePO.EDITRESOURCE)
    ).isVisible()
    ).toBeTruthy();
    await test.step("*** -'+' and pencil (edit) icon should be displayed on the right side of field outside the field ***"
      , async () => { });

    await io.homePage.click(selectors.basePagePO.CONNECTION);
    test.step("*** Clicking on the dropdown ***", async () => { });
    await io.homePage.loadingTime();
    let platform;
    platform = process.platform;
    if (platform.toUpperCase().indexOf("DARWIN") > -1) {
      await io.homePage.keyboard("Meta+A");
      await io.homePage.keyboard("Delete");
    } else {
      await io.homePage.keyboard("Control+A");
      await io.homePage.keyboard("Delete");
    }
    await io.homePage.loadingTime();

    await page.keyboard.type("ABC");
    await io.homePage.loadingTime();

    const noDataEl = await page.getByText("No available connections match your search");
    await noDataEl.waitFor({ state: 'visible', timeout: 90000 });
    await expect(noDataEl).toBeVisible();
  });

  test("@Env-All @Zephyr-IO-T14164 TC110829", async ({ io, page }, testInfo) => {
    await test.step("*** Created Flows :" + flows.get(HTTP.name)["flowName"], async () => { }
    );

    await io.homePage.loadingTime();
    var exportId = flows.get(HTTP.name)["exportId"];
    var exportJson1 = await io.api.getExportById(exportId);

    var exportName = exportJson1["name"];
    test.step("Get Export details by export ID", async () => { });

    test.step("*** Navigating to export page ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Exports");
    await io.homePage.loadingTime();
    test.step("** Entered exports Page **", async () => { });
    await io.homePage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);

    test.step("*** Searching export with name ***", async () => { });
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, exportName);
    await io.homePage.loadingTime();
    await page.waitForTimeout(4000);
    test.step("*** Open export ***", async () => { });
    //Updated the locator
    await io.homePage.clickButtonByIndex("th a", 0);
    await io.homePage.loadingTime();
    var element = await page.$$(`${selectors.exportsPagePO.CREATE_SELECT_CONNECTION} .MuiSvgIcon-root`);
    var chevron = await element[1].isVisible();
    await io.assert.expectToBeTrue(chevron, "");
    test.step("*** Drop down chevron icon should be displayed next to search icon on the right side of Connection field ***", async () => { });
    let isAddNewResource = await io.homePage.isVisible(selectors.integrationPagePO.ADDNEWRESOURCE)
    await io.assert.expectToBeTrue(isAddNewResource, "")
    let isEditResource = await io.homePage.isVisible(selectors.integrationPagePO.EDITRESOURCE)
    await io.assert.expectToBeTrue(isEditResource, "")
    await test.step("*** -'+' and pencil (edit) icon should be displayed on the right side of field outside the field ***"
      , async () => { });

    await io.homePage.click(selectors.basePagePO.CONNECTION);
    test.step("*** Clicking on the dropdown ***", async () => { });
    await io.homePage.loadingTime();

    let platform = process.platform;
    if (platform.toUpperCase().indexOf("DARWIN") > -1) {
      await io.homePage.keyboard("Meta+A");
      await io.homePage.keyboard("Delete");
    } else {
      await io.homePage.keyboard("Control+A");
      await io.homePage.keyboard("Delete");
    }
    await io.homePage.loadingTime();

    await page.keyboard.type("ABC");
    await io.homePage.loadingTime();

    const noDataEl = await page.getByText("No available connections match your search");
    await noDataEl.waitFor({ state: 'visible', timeout: 90000 });
    await expect(noDataEl).toBeVisible();
  });

  test("@Env-All @Zephyr-IO-T14163 TC110827", async ({ io, page }, testInfo) => {
    await test.step("*** Created Flows :" + flows.get(HTTP.name)["flowName"], async () => { }
    );

    await io.homePage.loadingTime();
    var importId = flows.get(HTTP.name)["importId"];
    var importJson1 = await io.api.getImportById(importId);

    var importName = importJson1["name"];
    test.step("Get Import details by import ID", async () => { });

    test.step("*** Navigating to import page ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Imports");
    await io.homePage.loadingTime();
    test.step("** Entered import Page **", async () => { });
    await io.homePage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);

    test.step("*** Searching import with name ***", async () => { });
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, importName);
    test.step("*** Open import ***", async () => { });
    //Updated the locator
    await io.homePage.clickButtonByIndex("th a", 0);
    await io.homePage.loadingTime();
    var element = await page.$$(
      '[data-test="connection"] .MuiSvgIcon-root'
    );
    var chevron = await element[1].isVisible();
    await io.assert.expectToBeTrue(chevron, "");
    test.step("*** Drop down chevron icon should be displayed next to search icon on the right side of Connection field ***", async () => { });

    let isAddNewResource = await io.homePage.isVisible(selectors.integrationPagePO.ADDNEWRESOURCE)
    await io.assert.expectToBeTrue(isAddNewResource, "")
    let isEditResource = await io.homePage.isVisible(selectors.integrationPagePO.EDITRESOURCE)
    await io.assert.expectToBeTrue(isEditResource, "")
    await test.step("*** -'+' and pencil (edit) icon should be displayed on the right side of field outside the field ***"
      , async () => { });

    await io.homePage.click(selectors.basePagePO.CONNECTION);
    test.step("*** Clicking on the dropdown ***", async () => { });
    await io.homePage.loadingTime();

    let platform = process.platform;
    if (platform.toUpperCase().indexOf("DARWIN") > -1) {
      await io.homePage.keyboard("Meta+A");
      await io.homePage.keyboard("Delete");
    } else {
      await io.homePage.keyboard("Control+A");
      await io.homePage.keyboard("Delete");
    }
    await io.homePage.loadingTime();

    await page.keyboard.type("ABC");
    await io.homePage.loadingTime();

    const noDataEl = await page.getByText("No available connections match your search");
    await noDataEl.waitFor({ state: 'visible', timeout: 90000 });
    await expect(noDataEl).toBeVisible();
  });

});
