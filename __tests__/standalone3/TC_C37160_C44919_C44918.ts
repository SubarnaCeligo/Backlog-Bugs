import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C37160_C44919_C44918", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T1702 @Zephyr-IO-T18701 @Zephyr-IO-T18700 @Env-All TC_C37160_C44919_C44918", async ({io,page}, testInfo) => {
    test.step("*** Click on create flow ***", async ()=>{});
    await io.homePage.loadingTime();
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
    await io.homePage.click(await selectors.flowBuilderPagePO.ADVANCE);
    test.step("*** Validating the default value in Override media type for success response  ***", async ()=>{});
    var data = await io.homePage.getText(selectors.flowBuilderPagePO.WEBHOOKHTTPMEDIA);
    await io.assert.expectToContainValue("Do not override",String(data), "");
    
    test.step("*** Click on Verification type for webhook export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.VERIFICATION);
    test.step("*** Select HMAC as verification type ***", async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD, "HMAC");
    test.step("*** Click on HMAC Algorithm for webhook export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ALGORITHM);
    test.step("*** Select SHA-384 as Algorithm ***", async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD, "SHA-384");
    test.step("*** Validating the SHA-384 option is being slected from dropdown ***", async ()=>{});
    data = await io.homePage.getText(selectors.flowBuilderPagePO.ALGORITHM)
    
    await io.assert.expectToContainValue("SHA-384",String(data), "");

    test.step("*** Click on HMAC Algorithm for webhook export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ALGORITHM);
    test.step("*** Select SHA-512 as Algorithm ***", async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD, "SHA-512");
    test.step("*** Validating the SHA-512 option is being slected from dropdown ***", async ()=>{});
    data = await io.homePage.getText(selectors.flowBuilderPagePO.ALGORITHM)
    await io.assert.expectToContainValue("SHA-512",String(data), "");
    test.step("*** cloisg the export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
  });
});
