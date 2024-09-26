import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C26153.json";

test.describe("TC_C26153 Verify able to fetch the logs when debug mode is enabled for XML data", () => {
  let flowID;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowID);
  });

  test("@Env-All @Zephyr-IO-T4887  Verify able to fetch the logs when debug mode is enabled for XML data", async ({ io, page }) => {
    flowID = await io.createResourceFromAPI(TC, "FLOWS");
    await io.homePage.loadingTime();

    test.step("*** Enabling Debug Logs ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.SF_LISTENER_BUTTON);

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FLOWSTEPLOGS);

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_RECORD_TYPE);
    await page.getByRole("button", { name: "Apply" }).click();

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSELOGS);

    let resp = await io.api.getCall("v1/flows/" + flowID);
    let exportID = resp.pageGenerators[0]._exportId;

    let body =
      '<?xml version="1.0" encoding="utf-8"?>' +
      "<note>" +
      "<to>Tove</to>" +
      "<from>Jani</from>" +
      "<heading>Reminder</heading>" +
      "<body>Do forget me this weekend!</body>" +
      "</note>";

    test.step("*** Invoking Webhook ***", async () => {});
    await io.api.getCall(
      "v1/exports/" + exportID + "/data",
      undefined,
      undefined,
      body
    ); 

    test.step("*** Fetching & Verifying Logs ***", async () => {});

    await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.ROW_SELECTED,
      "Debug logs are not displayed."
    );
  });
});
