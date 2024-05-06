import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C107735 from '../../../testData/inputData/FlowBuilder/C107735.json';

test.describe(`C107735`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
});
  test(`@Env-All @Zephyr-IO-T24122 C107735 check for Error tag can be deleted`, async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(C107735, "FLOWS");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.RUNFLOW);
    await io.homePage.addStep("*** Running the flow ***");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RUNFLOW);
    await io.homePage.addStep("*** Flow ran succesfully ***");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.reloadPage();
    await io.homePage.click(selectors.flowBuilderPagePO.ERROR_BUBBLE);
    await io.homePage.addStep("*** Opened Error page ***");
    await page.locator(selectors.flowBuilderPagePO.ERROR_TAG).nth(2).click();
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.ERROR_TAG_PLACEHOLDER, "107735C");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CREATE_ERROR_TAG);
    await page.locator(selectors.flowBuilderPagePO.DELETE_ERROR_TAG).first().click();
    await io.flowBuilder.click(selectors.basePagePO.DELETE);
    await page.locator(selectors.flowBuilderPagePO.ERROR_TAG).nth(2).click();
    await expect(page.getByText("107735C")).not.toBeVisible();
  });
});