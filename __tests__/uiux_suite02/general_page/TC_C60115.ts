import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C60115 To verify that the user is able to load integration from dev playground page.", () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T1618 C60115 To verify that the user is able to load integration from dev playground page.", async ({
    io,
    page
  }) => {
    await io.homePage.loadingTime()
    await io.homePage.goToMenu("Tools", "Playground");
    await io.homePage.loadingTime()
    await io.homePage.clickByText("Automation Flows");
    await io.homePage.clickByText("C32362_DND")
    await io.homePage.loadingTime()
    await io.homePage.clickByText("Open in Flow Builder");
    await io.homePage.loadingTime()
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.PAGE_GENERATOR, "unable to find locator")
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.PAGE_PROCESSOR, "unable to find locator")
  });
});
