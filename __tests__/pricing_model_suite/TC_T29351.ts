import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";
import testMode from "@testData/Flows/C107604.json"

test.describe("T29351 Verify user is able to enable the flow if disable overage set from true to false)", () => {
  test("T29351 @Zephyr-IO-T29351  @Env-All @Priority-P2 Verify user is able to enable the flow if disable overage set from true to false", async ({
    io,
    page
  }) => {

    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");
    const payloadFormat = {
      ...getLicensePayload(platformLicense),
      expires: "2044-04-10T13:14:33.363Z",
      apiManagement: true
    };
    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      {
        ...payloadFormat,
        tier: 'professional',
        numEndpoints: 1,
        numFlows: 1,
        "disableOverage": true,
      }
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
    await io.homePage.waitForElementAttached(selectors.homePagePO.INTEGRATION_TILES);
    await io.flowBuilder.clickByText("Automation_flows");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.homePage.loadingTime()
    const enableFlow = await page.$(selectors.flowBuilderPagePO.FLOW_ENABLE)
    if (enableFlow) {
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ENABLE);
    }
    else {
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
      await io.homePage.loadingTime()
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ENABLE);
    }
    await test.step("C29351 Verify request upgrade option will be shown if disable overage is true", async () => {
      // await io.connectionPage.clickByText("Request upgrade");
    })
    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      {
        ...payloadFormat,
        tier: 'professional',
        "disableOverage": false,
      }
    );
    await io.homePage.reloadPage();
    await io.homePage.reloadPage();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.homePage.loadingTime()
    await test.step("C29351 Verify user is able to enable the flow if disable overage is false", async () => {
      if (enableFlow) {
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ENABLE);
      }
      else {
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.homePage.loadingTime()
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ENABLE);
      }
    })
    //Reverting to initial state
    await io.homePage.loadingTime()
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.homePage.loadingTime()
    const disableFlow = await page.$(selectors.flowBuilderPagePO.FLOW_DISABLE)
    if (disableFlow) {
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    }
    else {
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ENABLE);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
      await io.homePage.loadingTime()
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    }

  })
});    
