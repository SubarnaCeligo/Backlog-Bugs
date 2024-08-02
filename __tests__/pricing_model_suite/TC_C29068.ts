import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("C29068 Verify the concurrency limit if user set the value from API.", () => {
  test("C29068 @Zephyr-IO-T29068  @Env-All @Priority-P2 Verify the concurrency limit if user set the value from API.", async ({
    io,
    page,
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
      {...getLicensePayload(platformLicense), "concurrency": 30, "tier": 'enterprise', "sandbox": false, "apiManagement": true, "expires": "2044-04-10T13:14:33.363Z"}
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
    await io.connectionPage.click(selectors.connectionsPagePO.HTTP_TARGET_CONCURRENCY_LEVEL);
    const concurrencyLevel = await io.connectionPage.getElementOrIndex(selectors.flowBuilderPagePO.SUBLIST_A, 30);
    const maxConcurrencyLevel = await io.connectionPage.selectTextfromDropDown(page, "25");
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, payloadFormat);
    expect(concurrencyLevel).toBe(undefined);
    expect(maxConcurrencyLevel).toBe(true);
  });
});
