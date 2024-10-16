
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import NS from "@testData/STANDALONE/NS_amortization.json";

test.describe("Checking the helptext of NS", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T2221 @Env-All TC_001_C30585_Checking_the_helptext_of_NS", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.homePage.loadingTime();
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.NETSUITE);
    await io.homePage.loadingTime();
    test.step("*** Selected NETSUITE as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    await io.homePage.loadingTime();
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});

    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    var conn = NS["connectionId"];
    //  ;

    await io.homePage.fillWebPage(selectors.basePagePO.CONNECTION_DROPDOWN, conn);
    await io.homePage.loadingTime();
    test.step("*** Choosing the desired NETSUITE connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "NS_helptext");
    test.step("*** Renaming the PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_RECORD_TYPE);
    await io.homePage.loadingTime();

    test.step("*** Refreshing the RecordType of NETSUITE ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RECORD_TYPE, "account");
    await io.homePage.loadingTime();
    test.step("*** Selecting the desired RecordType ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_RADIO_BUTTON);
    await io.homePage.loadingTime();
    test.step("*** Selecting Add Button ***", async ()=>{});

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    await io.homePage.loadingTime();
    test.step("*** Clicking on the Advanced section ***", async ()=>{});

    await io.homePage.loadingTime();

    var ele = await page.$(selectors.importPagePO.BATCH_SIZE_QUESTION_MARK);
    await ele.scrollIntoViewIfNeeded();
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.importPagePO.BATCH_SIZE_QUESTION_MARK);
    test.step("*** The button is clickable or not ***", async ()=>{});

    let res = await io.homePage.isVisible(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW);
    await io.assert.expectToBeTrue(res, "");

    test.step("*** Checking that the helptext is getting displayed or not ***", async ()=>{});
  });
});
