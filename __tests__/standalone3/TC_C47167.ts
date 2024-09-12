import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C47167 Creating http connection with some conditions", () => {
  test("@Zephyr-IO-T7547 @Env-All TC_C47167", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Clicking on add new connection and selecting adaptor as HTTP ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "wrongJSON");
    test.step("*** Giving name to the connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.BASE_URL, "https://celigoqa.zendesk.com");
    test.step("*** Writing base url ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.AUTHORIZATIONTYPE, "basic");
    test.step("*** Selecting authorization as Basic ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.BASICUSERNAME, await process.env["HTTP_ZENDESK_USER"]);
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BASIC_PASSWORD, await process.env["HTTP_ZENDESK_PASSWORD"]);

    await io.homePage.click(selectors.flowBuilderPagePO.HOWTOTESTCONN);
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPMETHOD, "POST");
    await io.homePage.fill(selectors.flowBuilderPagePO.RELATIVEURIFIELD, "/api/v2/tickets.json");
   
    await io.homePage.click(selectors.flowBuilderPagePO.CLICK_CONNECTION_REQUEST_BODY);
    var sourcefield = await page.locator(selectors.flowBuilderPagePO.SOURCEFIELD);

    await sourcefield.dblclick();
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.SOURCEFIELD)

    var handlebar1 = await page.locator(selectors.flowBuilderPagePO.REQUESTBODY);
    await handlebar1.fill("{");

    let saveAndClose = await page.$$(selectors.basePagePO.SAVE_AND_CLOSE);
    await(await saveAndClose[1]).click();

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.TEST_CONNECTION);

    await io.assert.verifyElementDisplayedByText(
      `An invalid JSON is sent in the request.body, error: please ensure that you have wrapped all JSON property names in quotes. details: Unexpected end of JSON input`,
      "Connection should fail"
    );
    test.step("*** Verifying that the connection error message is correct ***", async ()=>{});
  });
});
