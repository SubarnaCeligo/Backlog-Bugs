import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/C63011.json";

test.describe(`C61158 Verify If some of the NS steps are configured to use suiteApp and some to use SuiteBundle,then both SuiteApp and SuiteBundle Installation steps have to be dispayed in the install steps.`, () => {
  test.afterEach(async ({ io }) => {
    const intId = await io.api.getIntegrationDetails("Copy Zephyr-IO-T23159 DND", "_id");
    await io.api.deleteIntegration(intId);
  });
  test(`@Env-All @Zephyr-IO-T23162 C61158 Verify If some of the NS steps are configured to use suiteApp and some to use SuiteBundle,then both SuiteApp and SuiteBundle Installation steps have to be dispayed in the install steps.`, async ({
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
    await io.homePage.loadingTime()
    await io.assert.verifyElementDisplayedByText(
      "Integrator Bundle",
      "Integrator Bundle is not visible"
    );
  });
});
