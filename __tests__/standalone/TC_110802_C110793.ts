import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_110802_C110793", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
  });
  test("@Env-All @Zephyr-IO-T14160 TC_110802", async ({io,page}, testInfo) => {
    test.step("*** Clicking on create flow ***", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("*** Clicking on create export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime();
    var element = await page.$$(
      '[data-test="connection"] .MuiSvgIcon-root'
    );
    var chevron = await element[1].isVisible();
    await io.assert.expectToBeTrue(chevron, "");
    test.step("*** Drop down chevron icon should be displayed next to search icon on the right side of Connection field ***", async ()=>{});

    await expect(await ( await page.locator(selectors.integrationPagePO.ADDNEWRESOURCE)
      ).isVisible()
    ).toBeTruthy();
    await expect(await ( await page.locator(selectors.connectionsPagePO.EDIT_RESOURCE)
      ).isVisible()
    ).toBeTruthy();
    await test.step("*** -'+' and pencil (edit) icon should be displayed on the right side of field outside the field ***"
    ,async ()=>{});
    
    await io.homePage.loadingTime();
    //Locator.hover did not work on disabled element, replaced with method available in the framework
    await io.homePage.hover(selectors.integrationPagePO.EDITRESOURCE, 0, true);
    await io.homePage.loadingTime();
    test.step("*** Observing tooltip of edit icon ***", async ()=>{});
    let tooltip = (await io.flowBuilder.getText(selectors.mappings.TOOLTIP)).toString()
    //Updated expected result
    await io.assert.expectToContainValue( "Select a connection to edit it",tooltip, "");

    test.step("*** click new connection in placeholder ***", async ()=>{});
    await io.homePage.click('[data-test="connection"]>div>div>p>div');

    await io.homePage.loadingTime();
    test.step("*** checking app element in connection drawer ***", async ()=>{});
    var applicationElement = await page.locator(
      selectors.flowBuilderPagePO.APPLICATION
    );
    var appdropDown = await applicationElement.isVisible();
    await io.assert.expectToBeTrue(appdropDown, "");

    test.step("*** close connection drawer ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.importPagePO.IMPORT_CLOSE_DRAWER, 1);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("***  Navigating to Home Page ***", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T14159 TC_110793", async ({io,page}, testInfo) => {
    test.step("*** Clicking on create flow ***", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("*** Clicking on create import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    await io.homePage.loadingTime();
    io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Import Records into Destination Application ***", async ()=>{});
    await io.homePage.loadingTime();

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    var element = await page.$$(
      '[data-test="connection"] .MuiSvgIcon-root'
    );
    var chevron = await element[1].isVisible();
    await io.assert.expectToBeTrue(chevron, "");
    test.step("*** Drop down chevron icon should be displayed next to search icon on the right side of Connection field ***", async ()=>{});

    await expect(await ( await page.locator(selectors.integrationPagePO.ADDNEWRESOURCE)
      ).isVisible()
    ).toBeTruthy();
    await expect(await ( await page.locator(selectors.integrationPagePO.EDITRESOURCE)
      ).isVisible()
    ).toBeTruthy();
    await test.step("*** -'+' and pencil (edit) icon should be displayed on the right side of field outside the field ***"
    ,async ()=>{});

    await io.homePage.loadingTime();
     //Locator.hover did not work on disabled element, replaced with method available in the framework
    await io.homePage.hover(selectors.integrationPagePO.EDITRESOURCE, 0, true);
    await io.homePage.loadingTime();
    test.step("*** Observing tooltip of edit icon ***", async ()=>{});
    let tooltip = (await io.flowBuilder.getText(selectors.mappings.TOOLTIP)).toString()
     //Updated expected result
    await io.assert.expectToContainValue( "Select a connection to edit it",tooltip, "");

    test.step("*** click new connection in placeholder ***", async ()=>{});
    await io.homePage.click('[data-test="connection"]>div>div>p>div');

    await io.homePage.loadingTime();
    test.step("*** checking app element in connection drawer ***", async ()=>{});
    var applicationElement = await page.locator(
      selectors.flowBuilderPagePO.APPLICATION
    );
    var appdropDown = await applicationElement.isVisible();
    await io.assert.expectToBeTrue(appdropDown, "");

    test.step("*** close connection drawer ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.importPagePO.IMPORT_CLOSE_DRAWER, 1);

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("***  Navigating to Home Page ***", async ()=>{});
  });
});
