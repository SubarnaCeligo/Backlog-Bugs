import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T1087 Verify when clicked on create password link in(/set-initial-password:token?) in Activate account email error should be thrown if there is an active session in browser", () => {
  test("@Epic-IO-86262 @Priority-P2 @Zephyr-IO-T1087 @Env-All Verify when clicked on create password link in(/set-initial-password:token?) in Activate account email error should be thrown if there is an active session in browser", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.signInPage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "set-initial-password/123123");
    await io.homePage.loadingTime();
    let sessionActiveMsg = await page.getByText("You already have an active session running. Please sign out from the account and try again.");
    expect(await sessionActiveMsg.isVisible()).toBeTruthy();
  });
}
);