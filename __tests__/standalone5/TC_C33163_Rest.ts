
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("Verification of leave popup dialogue in create lookup page", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T2623 @Env-All TC_C33163_Rest", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.RESTAPIHTTP);
    test.step("*** Selected REST API as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});

    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    var conn = "HTTP ZENDESK CONNECTION";

    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(conn);
    await io.homePage.clickByText(conn);
    test.step("*** Choosing the desired REST-API connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});

    await io.homePage.click(selectors.exportsPagePO.HTTP_BODY);
    test.step("*** Clicked on open handlebars editor ***", async ()=>{});

    await io.homePage.click("[data-test='http.lookups']");
    test.step("*** Clicked on create lookup ***", async ()=>{});

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.STATICLOOKUP);
    test.step("*** Selected static lookup as lookup type ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 2);
    test.step("*** Clicked on close ***", async ()=>{});

    const leavePopupMessage = await io.homePage.getText("//div[contains(text(), 'Are you sure you want to leave this page and lose your unsaved changes?')]")
    await io.assert.expectToBeValue(String(leavePopupMessage), "Are you sure you want to leave this page and lose your unsaved changes?", "");
  });
});
