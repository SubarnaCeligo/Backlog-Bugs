import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("C28960 Verify upgrade pop-up for concurency after clicking on request upgrade.", () => {
  test("T27421  @Zephyr-IO-T28960  @Env-All @Priority-P2 Verify upgrade pop-up for concurency after clicking on request upgrade.", async ({
    io,
  }) => {
    await io.homePage.reloadPage();
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");
    const payloadFormat = {
      ...getLicensePayload(platformLicense),
      expires: "2044-04-10T13:14:33.363Z",
      apiManagement: true
    };
    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      {...getLicensePayload(platformLicense), concurrency: 10, sandbox: false, "apiManagement": true, "expires": "2044-04-10T13:14:33.363Z"}
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
    await io.homePage.loadingTime();
    await io.connectionPage.clickByText("request an upgrade.");    
    await io.assert.verifyElementIsDisplayed(selectors.homePagePO.DIALOG, "We will contact you to discuss your business needs and recommend an ideal subscription plan.");
    await io.homePage.click(selectors.basePagePO.SUBMIT_REQUEST);
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, payloadFormat);
  });
});
