import {  test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T5842 - To verify 404 page is not displayed when clicked on the access token link provided in email.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T5842 - To verify 404 page is not displayed when clicked on the access token link provided in email.  ", async ({ io, page }) => {


    await io.homePage.goToMenu("Resources", "API tokens");
    await io.assert.verifyElementDisplayedByText('Create API token', "App crashed");
    await page.getByText("Create API token").click();
    const res = await io.emailVal.getLinkFromEmail("ALERT: API token was created",false,
    "pwqa1");
    console.log({res});
    await page.locator('[data-test="name"]').getByRole('textbox').click();
    await page.locator(selectors.basePagePO.ADD_NAME).getByRole('textbox').fill('T5842');
    await page.locator(selectors.connectionsPagePO.AUTOPURGETOKEN).getByLabel('Please select').click();
    await page.getByRole('menuitem', { name: '1 Hour' }).click();
     await page.pause();
    await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).click();
    await page.pause();
  });

}
)  

