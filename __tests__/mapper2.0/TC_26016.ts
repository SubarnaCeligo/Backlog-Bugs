import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_26016.json";
import connectionPayload from "@testData/Webhook_Listeners/connectionPayload.json";

test.describe("TC_C26016 Verify able to delete the logs as expected", () => {
  test("@Env-All @Zephyr-IO-T4871 Verify able to delete the logs as expected", async ({
    io,
    page
  }) => {
    test.step("*** Creating Flow via API ***", async () => {});
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    let flowID = flows.get("TC_C26016").flowId;

    await io.flowBuilder.navigateToTheFlow(flowID);

    test.step("*** Enabling Debug Logs ***", async () => {});
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
    let baseURI = process.env["IO_API_URL"] + "v1/exports/" + exportID;
    let relativeURI = "v1/flows/" + flowID + "/" + exportID + "/requests";

    //Create a connection with webhook URL as baseURL
    connectionPayload.http.baseURI = baseURI;
    let response = await io.api.postCall("v1/connections", connectionPayload);
    let connectionID = response._id;

    //Form the ping URL
    let pingURL =
      process.env["IO_API_URL"] + "v1/connections/" + connectionID + "/ping";

    await io.api.postCall(pingURL, {});

    await io.flowBuilder.loadingTime();

    //Open debug logs
    await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
    await io.flowBuilder.loadingTime();

    //Verify if debug logs are displayed
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.ROW_SELECTED,
      "Debug logs are not displayed."
    );

    await page.getByRole("button", { name: "more" }).click();

    await io.homePage.click(selectors.flowBuilderPagePO.DELETE_DEBUG_LOG);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();

    let logs1 = await io.api.getCall(relativeURI);
    expect(logs1).toEqual({ requests: [] });
    test.step("*** Logs are deleted succesfully ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
