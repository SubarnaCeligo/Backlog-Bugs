import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C61155 Verify If all the NS steps in my integration are solely configured to use SuiteApp then only the SuiteApp installation step has to be shown in the install steps.`, () => {
  test.afterEach(async ({ io }) => {
    const intId = await io.api.getIntegrationDetails("Copy Zephyr-IO-T23159 DND", "_id");
    await io.api.deleteIntegration(intId);
  });
  test(`@Epic-IO-29826 @Priority-P2 @Env-All @Zephyr-IO-T23159 C61155 Verify If all the NS steps in my integration are solely configured to use SuiteApp then only the SuiteApp installation step has to be shown in the install steps.`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE);
    await io.homePage.goToMenu("Marketplace");
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.homePagePO.SEARCH_MARKETPLACE, "Zephyr-IO-T23159 DND");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.INSTALL_TEMPLATE);
    await page.getByText("Loading Template...").waitFor({ state: "hidden", timeout: 50000 });
    await io.homePage.clickByText("Install now");
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Integrator SuiteApp",
      "Integrator SuiteApp is not visible"
    );
    await io.homePage.addStep("Verified 'Integrator Bundle' is not visible");
  });
});
