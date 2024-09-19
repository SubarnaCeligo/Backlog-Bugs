
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import Test from "@testData/STANDALONE/TC_C20053.json";

test.describe("TC_C20053", () => {
  test("@Env-All @Zephyr-IO-T7084 TC_C20053", async ({io,page}, testInfo) => {
    test.step("*** Clicking on Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on Home Page ***", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.click(selectors.flowBuilderPagePO.SNOWFLAKE);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    let conn = Test._connectionId;
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "SNOWFLAKE CONN");
    await io.homePage.clickByTextByIndex(conn, 0);

    test.step("*** Choosing the desired HTTP connection ***", async ()=>{});
    await io.homePage.loadingTime()
    
    await io.homePage.fillWebPage(selectors.exportsPagePO.QUERY1, "copy into @demo_abc/test from JSON_4_QUERY");
    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Validating the error message ***", async ()=>{});
    var Result = await io.homePage.getTextFromElement(selectors.importPagePO.PREVIEWDATA, "Preview data is not available for COPY INTO command");
    expect(Result).toBeTruthy();
    test.step("*** Closing the window ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
