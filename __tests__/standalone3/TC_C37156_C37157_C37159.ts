import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C37156_C37157_C37159", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T1698 @Zephyr-IO-T1699 @Zephyr-IO-T1701 @Env-All TC_C37156_C37157_C37159", async ({io,page}, testInfo) => {
    test.step("*** Click on create flow ***", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("*** Click on add source option ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Click on add source option ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.WEBHOOK);

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    test.step("*** Click on advance option ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADVANCE);
    test.step("*** Validating the default value in HTTP success code ***", async ()=>{});
    var data = await io.homePage.getText(selectors.flowBuilderPagePO.WEBHOOKHTTPSTATUSCODE);
    await io.assert.expectToContainValue("Do not override",String(data), "");
    test.step("*** Validating the drop down values in HTTP success code ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.WEBHOOKHTTPSTATUSCODE);
    var dropDown: any[] = ["Do not override", "200", "202"];
    var dropDownResult = await io.homePage.getText(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD);
    await io.assert.expectArrayToBeInArray(dropDown,dropDownResult, "");
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD, 0);

    test.step("*** Validating the drop down values in Override media type for success responses ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.WEBHOOKHTTPMEDIA);
    dropDown = ["Do not override", "XML", "Plaintext"];
    dropDownResult = await io.homePage.getText(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD);
    await io.assert.expectArrayToBeInArray(dropDown,dropDownResult,"")
    test.step("*** closing the export ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD, 0);
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
