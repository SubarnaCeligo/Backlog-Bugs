import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("TC_C33556", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T9701 @Env-All TC_C33556", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime()
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "HTTP ZENDESK CONNECTION");
    test.step("*** Choosing the desired HTTP connection ***", async ()=>{});

    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "HTTP Import");
    test.step("*** writing Import Name ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.EDITCLIENT);
    test.step("*** Clicking on editnewresource button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.MEDIA_TYPE);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.JSON, "JSON");
    test.step("***Selecting JSON in request media type ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BASIC_PASSWORD, decrypt(process.env["HTTP_ZENDESK_PASSWORD"])
    );
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Your connection is working great! Nice Job!",
      "Connection is not successful"
    );
    test.step("*** Verifying that the connection is successful or not ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.click(selectors.flowBuilderPagePO.REQUESTMEDIATYPE);
    test.step("*** Clicking on request media type in the import form ***", async ()=>{});
    const dropdownElements = ["JSON"];
    const loc = await selectors.myAccountPagePO.SELECTTYPE;
    for(var a = 0; a < loc.length; a++) {
      let matching = await io.homePage.getDropDownValue(loc, dropdownElements[0]);
      await io.assert.expectToBeValue(String(matching), String(false), "");
    }
    test.step("*** Verifying Media type of connection JSON is not present in media type field in the import form ***", async ()=>{});
  });
});
