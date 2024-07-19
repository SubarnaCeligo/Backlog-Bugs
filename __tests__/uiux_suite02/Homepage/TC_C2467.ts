import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C2467 from '@testData/Flows/C2467.json';

test.describe("C2467 Verified all the possible pop-ups and they are closed on click.", () => {
    test("@Env-All @Zephyr-IO-T872 C2467 Verified the delete integration pop up", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime()
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
        await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION, "Automation Flows")
        await io.homePage.loadingTime()
        await io.homePage.delay(1000)
        await io.homePage.clickByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 0);
        await io.homePage.click(selectors.homePagePO.DELETE_INTEGRATION);
        await io.homePage.addStep('Verifying pop up to appear');
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.DIALOG_BOX, 'Pop up did not appear');
    });
    test("@Env-All @Zephyr-IO-T872 C2467 Verified the Flow level pop-up", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime()
        await io.createResourceFromAPI(C2467, 'FLOWS');
        await io.homePage.addStep('Clicking on cross icon to remove export');
        await io.homePage.click(selectors.flowBuilderPagePO.REMOVE_PAGE_GENERATOR);
        await io.homePage.addStep('Verifying pop up to appear');
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.DIALOG_BOX, 'Pop up did not appear');
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON);
        await io.homePage.addStep('Clicking on cross icon to remove import');
        await io.homePage.click(selectors.flowBuilderPagePO.REMOVE_PAGE_PROCESSOR);
        await io.homePage.addStep('Verifying pop up to appear');
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.DIALOG_BOX, 'Pop up did not appear');
    });
  });