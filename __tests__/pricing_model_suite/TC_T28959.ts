import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("T28959 Verify upgrade pop-up for audit log after clicking on request upgrade.", () => {
  test("T28959 @Zephyr-IO-T28959  @Env-All @Priority-P2 Verify upgrade pop-up for audit log after clicking on request upgrade.", async ({
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

    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, {
      ...payloadFormat,
      tier: "standard"
    });
    await io.homePage.addStep(
      "Updating license to standard tier to show request upgrade notification."
    );

    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.myAccountPagePO.AUDIT_LOG);
    await page.waitForLoadState("load", { timeout: 60000 });

    //  Verifying Cancel Button
    await io.homePage.addStep(
      "Clicking on 'Upgrade your account' link from inline notification."
    );
    await page.locator(selectors.basePagePO.NOTIFICTION_BAR).locator("a").click();

    await io.homePage.addStep("Verifying dialog box is opened.");
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON);
    await io.homePage.addStep("Verifying snackbar is not displayed.");
    await io.assert.verifyElementNotBeFound(
      selectors.flowGroupingPagePO.ALERT_MESSAGE
    );

    //  Verifying Submit request Button
    await io.homePage.addStep(
      "Clicking on 'Upgrade your account' link from inline notification."
    );
    await page.locator(selectors.basePagePO.NOTIFICTION_BAR).locator("a").click();
    await io.homePage.addStep("Verifying dialog box is opened.");
    await io.homePage.click(selectors.basePagePO.SUBMIT_REQUEST);

    await io.homePage.addStep(
      "Verifying snackbar is displayed with confirmation message."
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.flowGroupingPagePO.ALERT_MESSAGE,
      "Confirmation message not displayed."
    );

    //  Reverting license changes
    await io.homePage.addStep("Reverting license changes.");
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, payloadFormat);
  });
});
