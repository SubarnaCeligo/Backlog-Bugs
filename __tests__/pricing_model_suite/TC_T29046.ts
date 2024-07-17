import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("T29046 Verify the flow entitlements for platform license for sandbox account.", () => {
  test("T29046 @Zephyr-IO-T29046  @Env-All @Priority-P2 Verify the flow entitlements for platform license for sandbox account.", async ({
    io,
    page
  }) => {
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");
    const payloadFormat = {
      ...getLicensePayload(platformLicense),
      expires: "2044-04-10T13:14:33.363Z",
      apiManagement: true,
    };
    await io.homePage.addStep(
      "Updating license to standard tier and enabled sandbox."
    );
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, {
      ...payloadFormat,
      tier: "standard",
      sandbox: true,
      numSandboxEndpoints: 0,
      numSandboxFlows: 0,
    });


    await io.homePage.addStep("Switching to sandbox mode.");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
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
    await io.homePage.loadingTime()
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    await page.waitForLoadState("load", { timeout: 60000 });

    await io.homePage.addStep("Verifying Endpoints Entitlements.");
    await page.locator(selectors.connectionsPagePO.FIX_CONNECTION).nth(3).click();
    let url = await page.url();
    expect(url).toMatch(/\/sandbox\/endpoints$/);
    await io.myAccountPage.click(
      selectors.integrationPagePO.CLOSE_RIGHT_DRAWER_BUTTON
    );

    await io.homePage.addStep("Verifying Flow Entitlements.");
    await page.locator(selectors.connectionsPagePO.FIX_CONNECTION).nth(4).click();
    url = await page.url();
    expect(url).toMatch(/\/sandbox\/flows$/);
    await io.myAccountPage.click(
      selectors.integrationPagePO.CLOSE_RIGHT_DRAWER_BUTTON
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
    await io.homePage.waitForElementAttached(selectors.homePagePO.INTEGRATION_TILES);
    await io.flowBuilder.clickByText("Automation_flows");   
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
    await io.homePage.addStep("Reverting license changes.");
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, payloadFormat);
  });
});
