import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C45370", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5334 @Env-All TC_C45370", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    test.step("*** Selected FTP as the adaptor ***", async ()=>{});  
    
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "FTP CONNECTION");
    test.step("***Choosing the desired FTP connection ***", async ()=>{});

    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "FTP_export");
    await io.homePage.click(selectors.flowBuilderPagePO.PARSEFILENO);
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    await io.homePage.click(selectors.flowBuilderPagePO.FILEBATCHSIZEHELPTEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});

    const batchsizehelptext = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue("Set this field to limit the number of files processed in a single batch request. Setting this field will not limit the total number of files you can process in a flow. This field allows you to optimize for really big files where bigger batches might experience network timeout errors vs. really small files where processing 1000 files in a single batch keeps the flow more performant. 1000 is the max value allowed.", String(batchsizehelptext),"");

    test.step("*** Verified the helptext for batch size on FTP blob export***", async ()=>{});
    test.step("*** Clicking on close ****", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Homepage ****", async ()=>{});
  });
});
