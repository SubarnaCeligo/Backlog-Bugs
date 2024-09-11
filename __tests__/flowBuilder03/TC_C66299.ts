import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/FlowBuilder/C66299.json";

test.describe(`C66299 Verify the display text will auto adjust to the full character length of the username field in Run history`, () => {
  test(`@Env-All @Zephyr-IO-T20427 C66299 Verify the display text will auto adjust to the full character length of the username field in Run history`, async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.homePage.loadingTime();
    const randomString = "Automation Acc Automation Acc Automation Acc Automation Acc Automation Acc Automation Acc" + Math.random().toString(36).substring(7);
    await io.myAccountPage.click(`${selectors.signUpPagePO.NAME} input`);
    await io.myAccountPage.fill(`${selectors.signUpPagePO.NAME} input`, randomString);
    const element = page.getByText('Save');
    await element.scrollIntoViewIfNeeded();
    await io.myAccountPage.clickByText('Save');
    await io.homePage.reloadPage();
    await io.createResourceFromAPI(testData, "FLOWS");
    await io.flowBuilder.loadingTime()
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await page.getByLabel("Cancel flow run").click();
    await io.flowBuilder.clickByText("Cancel run");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText("Run history");
    // clickByIndex is not working here
    await page.locator(selectors.basePagePO.TOOLTIP).first().click();
    await io.flowBuilder.addStep("Clicked on Canceled Info icon");
    await io.assert.verifyElementDisplayedByText(
      `Canceled by ${randomString}`,
      "Canceled by username not found"
    );
    //reset Name
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.homePage.loadingTime();
    await io.myAccountPage.click(`${selectors.signUpPagePO.NAME} input`);
    await io.myAccountPage.fill(`${selectors.signUpPagePO.NAME} input`, 'Automation Acc');
    const saveBtn = page.getByText('Save');
    await saveBtn.scrollIntoViewIfNeeded();
    await io.myAccountPage.clickByText('Save');
  });
});