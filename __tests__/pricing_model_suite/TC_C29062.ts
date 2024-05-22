import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("C29062 Verify the Concurrency level under HTTP connection should be set as per the BE concurrency value if we select the Please select in the dropdown of Target concurrency.", () => {
  test("C29062 @Zephyr-IO-T29062 @Env-QA @Priority-P2 Verify the Concurrency level under HTTP connection should be set as per the BE concurrency value if we select the Please select in the dropdown of Target concurrency.", async ({
    io,
  }) => {
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");

    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      {...getLicensePayload(platformLicense), concurrency: 12, expires: "2024-07-02T00:00:00.000", sandbox: false, "apiManagement": true}
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
    await io.connectionPage.click(selectors.connectionsPagePO.HTTP_TARGET_CONCURRENCY_LEVEL);
    const concurrencyLevel = await io.connectionPage.getText(selectors.flowBuilderPagePO.SUBLIST_A);
    await io.api.putCall(
        `v1/test/licenses/${platformLicense._id}`,
        {...getLicensePayload(platformLicense)}
      );
      expect(concurrencyLevel[concurrencyLevel.length - 1]).toBe("12");
  });
});
