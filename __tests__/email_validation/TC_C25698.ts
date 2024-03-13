import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C25698 from '@testData/email_validations/C25698.json'

test.describe("C25698 Verify the link on the email on resolved errors", () => {

  test("C25698 Verify the link on the email on resolved errors", async ({ io, page }) => {

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    const id = await io.createResourceFromAPI(C25698, "FLOWS");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_SETTINGS);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SETTINGS);
    await io.flowBuilder.click(`${selectors.flowBuilderPagePO.NOTIFY_ME_ON_FLOW_ERROR} ${selectors.basePagePO.VALUE_TRUE}`);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await page.getByRole('row', { name: 'Message Code Source' }).getByRole('checkbox').check();
    await io.homePage.clickByText('Resolve & next');
    await io.flowBuilder.delay(1000 * 60 * 15);
    const res = await io.emailVal.getLinkFromEmail("1 resolved error: TC_C25698", true, 'pwqa1');
    // testing the flow link
    await io.homePage.navigateTo(res[0].split(`\\`)[0]);
    await io.homePage.waitForElementAttached("text='TC_C25698'");
    await io.assert.verifyElementIsDisplayed("text='TC_C25698'", 'Flow Link not loading properly');
    // testing the Unsubscribe link
    await io.homePage.navigateTo(res[7].split(`\\`)[0]);
    await io.homePage.waitForElementAttached("text='Notify me of flow error'");
    await io.assert.verifyElementIsDisplayed("text='TC_C25698'", 'Unsubscribe link not loading properly');
    // testing export name 

    await io.homePage.navigateTo(res[2].split('>')[0]);
    await io.homePage.waitForElementAttached("text='TC_C25698'");
    await io.assert.verifyElementIsDisplayed("text='TC_C25698'", 'export name link not  loading properly');
    // testing the View import record link
    await io.homePage.navigateTo(res[5].split(`\\`)[0]);
    await io.homePage.waitForElementAttached("text='Sign in to Celigo'");
    await io.assert.verifyElementIsDisplayed("text='Sign in to Celigo'", 'View import record link not loading properly');
        // testing the View export record link
    await io.homePage.navigateTo(res[4].split(`\\`)[0]);
    await io.homePage.waitForElementAttached("text='Sign in to Celigo'");
    await io.assert.verifyElementIsDisplayed("text='Sign in to Celigo'", 'View export record link not loading properly');
  });
});