import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("C28955 Verify the Concurrency level under HTTP connection should be set as per the BE concurrency value if auto-retry checkbox is not checked.", () => {
  test("C28955 @Zephyr-IO-T28955 @Env-QA @Priority-P2 Verify the Concurrency level under HTTP connection should be set as per the BE concurrency value if auto-retry checkbox is not checked.", async ({
    io,
    page,
  }) => {
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");

    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      {...getLicensePayload(platformLicense), "concurrency": 10, "tier": 'standard', "sandbox": false, "apiManagement": true, "expires": "2044-04-10T13:14:33.363Z"}
    );
    await io.homePage.reloadPage();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTIONS);
    await io.homePage.click(`tbody tr:has-text("sssss") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
    await io.flowBuilder.click(selectors.integrationPagePO.EDIT);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await io.flowBuilder.clickByText('Auto-recover rate limit errors');
    await io.connectionPage.fill(selectors.connectionsPagePO.PASSWORD, 'test');
    await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.click(`tbody tr:has-text("sssss") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
    await io.flowBuilder.click(selectors.integrationPagePO.EDIT);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await io.connectionPage.click(selectors.connectionsPagePO.HTTP_TARGET_CONCURRENCY_LEVEL);
    const maxConcurrencyLevel = await io.connectionPage.selectTextfromDropDown(page, "10");
    const inValidconcurrencyLevel = await io.connectionPage.selectTextfromDropDown(page, "11");
    expect(maxConcurrencyLevel).toBe(true);
    expect(inValidconcurrencyLevel).toBe(false);
    await io.flowBuilder.clickByText('Auto-recover rate limit errors');
  });
});
