
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import AMAZON from "@testData/STANDALONE/TC_C31515.json";

test.describe("TC_C31515_SubmitFeedExport_Without_MessageID_Field", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9681 @Env-All TC_C31515_SubmitFeedExport_Without_MessageID_Field", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});
    var conn = 'HTTP AMAZON CONNECTION';

    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(conn);
    await io.homePage.clickByText(conn);

    test.step("*** Choosing the desired connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, AMAZON.pageProcessors[0].qa__import.name);
    test.step("*** Renaming the PageProcessor ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD);
    test.step("*** clicking on the Post methed ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);

    var relativeURI = AMAZON.pageProcessors[0].qa__import.http.relativeURI[0];
    await io.homePage.fill(selectors.flowBuilderPagePO.HTTP_GET_RELATIVEURL, relativeURI);
    test.step("*** entered relative URI ***", async ()=>{});

    var requestBody = AMAZON.pageProcessors[0].qa__import.http.body;

    await io.homePage.fillWebPage(selectors.importPagePO.BODY, requestBody);

    test.step("*** entered the request body ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    var errorMsg = await io.homePage.getText(selectors.basePagePO.NOTIFICTION_BAR);
    await io.assert.expectToBeTrue(errorMsg.includes( 'Import body template should contain the MessageID node in the format "{{{add @index 1}}}".'), 'message is not as expected');
    test.step("*** error message is displayed if the message ID is not present for submit feeds ***", async ()=>{});
  });
});
