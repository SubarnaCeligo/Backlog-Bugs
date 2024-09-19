import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C26152.json";
import connectionPayload from "@testData/Webhook_Listeners/connectionPayload.json";

test.describe("TC_C26152 Verify able to fetch the logs when debug mode is enabled for JSON data", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test("@Env-All @Zephyr-IO-T4886  Verify able to fetch the logs when debug mode is enabled for JSON data", async ({ io, page }) => {

    flowId = await io.createResourceFromAPI(TC, "FLOWS");
    await io.flowBuilder.loadingTime();

    test.step("*** Enabling Debug Logs ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.SF_LISTENER_BUTTON);

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FLOWSTEPLOGS);

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_RECORD_TYPE);
    await page.getByRole("button", { name: "Apply" }).click();

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSELOGS);

    let resp = await io.api.getCall("v1/flows/" + flowId);
    let exportID = resp.pageGenerators[0]._exportId;
    let baseURI = process.env["IO_API_URL"] + "v1/exports/" + exportID;

    //Create a connection with webhook URL as baseURL
    connectionPayload.http.baseURI = baseURI;
    let response = await io.api.postCall("v1/connections", connectionPayload);
    let connectionID = response._id;

    //Form the ping URL
    let pingURL =
      process.env["IO_API_URL"] + "v1/connections/" + connectionID + "/ping";

    for (let i = 0; i < 70; i++) {
      await io.api.postCall(pingURL, {});
    }
    await io.flowBuilder.loadingTime();

    //Open debug logs
    await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
    await io.flowBuilder.loadingTime();

    //Verify if debug logs are displayed
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.ROW_SELECTED,
      "Debug logs are not displayed."
    );
  });
});
