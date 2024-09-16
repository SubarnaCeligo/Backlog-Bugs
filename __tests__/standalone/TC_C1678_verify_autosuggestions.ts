
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/TC_C1678_verify_autosuggestions.json";

test.describe("TC_C1678_verify_autosuggestions", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T9917 TC_C1678_verify_autosuggestions", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.loadingTime();
    test.step("*** Clicked on Add Source ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    var conn = HTTP[0]["connectionId"];
    await io.homePage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.CONNECTION_DROPDOWN, conn);
    await io.homePage.loadingTime();
    test.step("*** Choosing the HTTP ZD connection at export side ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C1678_export side");
    await io.homePage.click(selectors.importPagePO.SELECTHTTPMETHOD);
    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);
    await io.homePage.click(selectors.exportsPagePO.HTTP_BODY);
    await io.homePage.loadingTime();
    var request = await page.locator(selectors.flowBuilderPagePO.REQUESTBODY);
    await request.fill("{{");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    
    await page.waitForSelector(selectors.basePagePO.HANDLEBAR_POPPER);
    const suggestions = await io.homePage.getElement(selectors.basePagePO.HANDLEBAR_POPPER);
    await expect(suggestions).toBeDefined();
    test.step("*** verified the  autosuggestions at import side ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    var conn1 = HTTP[0]["connectionId"];

    await io.homePage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.CONNECTION_DROPDOWN, conn1);
    await io.homePage.loadingTime();
    test.step("*** Choosing the HTTP ZD connection at export side ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C1678_import side");
    await io.homePage.click(selectors.importPagePO.SELECTHTTPMETHOD);
    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);
    await io.homePage.click(selectors.exportsPagePO.HTTP_BODY);
    test.step("*** clicked on HTTP request body ***", async ()=>{});

    var flow = await page.locator(selectors.flowBuilderPagePO.REQUESTBODY);
    await request.fill("{{");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await page.waitForSelector(selectors.basePagePO.HANDLEBAR_POPPER);
    const suggestionsExport = await io.homePage.getElement(selectors.basePagePO.HANDLEBAR_POPPER);
    await expect(suggestionsExport).toBeDefined();
    test.step("*** verified the autosuggestions at import side ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
