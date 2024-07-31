import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C68488 Verify no error message is displayed when user uninstall an integration during installation.', () => {
  test("@Env-All @Zephyr-IO-T17392 C68488 Verify no error message is displayed when user uninstall an integration during installation.", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(
      `${io.data.links.HOME_PAGE_URL}/installIntegration`
    );
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/SuiteApp/C61136.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await io.homePage.waitForElementAttached(selectors.basePagePO.UNINSTALL_BUTTON)
    await io.homePage.click(selectors.basePagePO.UNINSTALL_BUTTON)
    await io.homePage.waitForElementAttached(selectors.basePagePO.UNINSTALL_BUTTON2)
    await io.homePage.click(selectors.basePagePO.UNINSTALL_BUTTON2)
    await io.homePage.loadingTime()
    const text = await io.homePage.isVisible('text="My integrations"')
    await io.assert.expectToBeTrue(text, "Text is found")
  });
})