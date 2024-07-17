import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C57329 Verify after login, all pages should render without any redirect and should stay on the same pages", () => {
    test("@Env-All @Zephyr-IO-T17013 C57329 Connections Page.", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Connections");
        await io.homePage.addStep("Reloading the page");
        await io.homePage.reloadPage();
        await io.assert.verifyElementText(selectors.basePagePO.ADD_NEW_RESOURCE, 'Create connection');

    });
    test("@Env-All @Zephyr-IO-T17013 C57329 Imports Page.", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Imports");
        await io.homePage.addStep("Reloading the page");
        await io.homePage.reloadPage();
        await io.assert.verifyElementText(selectors.basePagePO.ADD_NEW_RESOURCE, 'Create import');
    });
    test("@Env-All @Zephyr-IO-T17013 C57329 Exports Page.", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Exports");
        await io.homePage.addStep("Reloading the page");
        await io.homePage.reloadPage();
        await io.assert.verifyElementText(selectors.basePagePO.ADD_NEW_RESOURCE, 'Create export');
    });
    test("@Env-All @Zephyr-IO-T17013 C57329 Agents Page.", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources","Agents");
        await io.homePage.addStep("Reloading the page");
        await io.homePage.reloadPage();
        await io.assert.verifyElementText(selectors.basePagePO.ADD_NEW_RESOURCE, 'Create agent');
    });

    test("@Env-All @Zephyr-IO-T17013 C57329 Integration Page.", async ({io, page}) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.waitForElementAttached(selectors.homePagePO.CLONE_INTEGRATION);
        await io.homePage.reloadPage();
        await io.homePage.loadingTime()
        await io.homePage.waitForElementAttached(selectors.homePagePO.CLONE_INTEGRATION);
        await io.assert.verifyElementIsDisplayed(selectors.homePagePO.CLONE_INTEGRATION, "clone integration is not displayed");
        await io.assert.verifyElementIsDisplayed(selectors.homePagePO.DELETE_INTEGRATION, "Delete integration is not displayed");
    });
  });