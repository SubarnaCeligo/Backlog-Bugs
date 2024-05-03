import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("C28960 Verify upgrade pop-up for concurency after clicking on request upgrade.", () => {
  test("C28960 @Zephyr-IO-T28960 @Env-QA @Priority-P2 Verify upgrade pop-up for concurency after clicking on request upgrade.", async ({
    io,
  }) => {
    await io.homePage.reloadPage();
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");

    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      {...getLicensePayload(platformLicense), concurrency: 10, sandbox: false}
    );

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.RESOURCES);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTIONS);
    await io.homePage.click(`tbody tr:has-text("sssss") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
    await io.flowBuilder.click(selectors.integrationPagePO.EDIT);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await io.connectionPage.click(selectors.connectionsPagePO.HTTP_TARGET_CONCURRENCY_LEVEL);
    await io.connectionPage.clickByText("request an upgrade.", { tag: "a" });   
    await io.assert.verifyElementIsDisplayed(selectors.homePagePO.DIALOG, "We will contact you to discuss your business needs and recommend an ideal subscription plan.");
    await io.homePage.click(selectors.basePagePO.SUBMIT_REQUEST);
    await io.api.putCall(
        `v1/test/licenses/${platformLicense._id}`,
        {...getLicensePayload(platformLicense)}
      );
  });
});
