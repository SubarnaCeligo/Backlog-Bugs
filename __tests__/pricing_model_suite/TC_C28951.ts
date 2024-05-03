import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("C28951 Verify the concurrency limit for different license type(Free tier,professional ,Enterprise) for Sandbox account.", () => {
  test("@Zephyr-IO-T27422 @Env-QA @Priority-P2 Verify the concurrency limit for different license type(Free tier,professional ,Enterprise) for Sandbox account", async ({
    io,
  }) => {
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");

    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      {...getLicensePayload(platformLicense), tier: 'professional', sandbox: true}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTIONS);
    await io.homePage.click(`tbody tr:has-text("ftp") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
    await io.flowBuilder.click(selectors.integrationPagePO.EDIT);
    await io.homePage.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.FTP_TARGET_CONCURRENCY_LEVEL);
    const concurrencyLevel = await io.connectionPage.getElementsLength(selectors.flowBuilderPagePO.SUBLIST_A);
    expect(concurrencyLevel).toBe(5);
  });
  test("@Zephyr-IO-T27422 @Env-QA @Priority-P2 Verify the concurrency limit for different license type Enterprise for Sandbox account", async ({
    io,
  }) => {
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");

    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      {...getLicensePayload(platformLicense), tier: 'enterprise', sandbox: true}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTIONS);
    await io.homePage.click(`tbody tr:has-text("ftp") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
    await io.flowBuilder.click(selectors.integrationPagePO.EDIT);
    await io.homePage.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.FTP_TARGET_CONCURRENCY_LEVEL);
    const concurrencyLevel = await io.connectionPage.getElementsLength(selectors.flowBuilderPagePO.SUBLIST_A);
    expect(concurrencyLevel).toBe(5);
  });
  test("@Zephyr-IO-T27422 @Env-QA @Priority-P2 Verify the concurrency limit for different license type free for Sandbox account", async ({
    io,
  }) => {
    await io.homePage.reloadPage();
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");

    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      {...getLicensePayload(platformLicense), tier: 'free', sandbox: true}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTIONS);
    await io.homePage.click(`tbody tr:has-text("ftp") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
    await io.flowBuilder.click(selectors.integrationPagePO.EDIT);
    await io.homePage.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.FTP_TARGET_CONCURRENCY_LEVEL);
    const concurrencyLevel = await io.connectionPage.getElementsLength(selectors.flowBuilderPagePO.SUBLIST_A);
    await io.api.putCall(
        `v1/test/licenses/${platformLicense._id}`,
        {...getLicensePayload(platformLicense)}
      );
      expect(concurrencyLevel).toBe(5);
  });
});
