import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`@Author-MayankOmar IO-T6768 Verify the  help text of the newly added Feed type field`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("IO-T6768 @Epic-IO-62193 @Zephyr-IO-T6768 @Env-QA Verify the  help text of the newly added Feed type field", async ({ io, page }) => {
    await io.homePage.addStep("*** Navigated to home page ***");
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Imports");
    await io.homePage.addStep("*** Navigated to Imports page ***");
    await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
    await io.homePage.addStep("*** Clicked on Create new Import ***");
    await io.homePage.loadingTime();
    await io.homePage.fill(
      selectors.connectionsPagePO.CONNECTION_SEARCH,
      "Amazon Seller Central"
    );
    await io.connectionPage.click(selectors.flowBuilderPagePO.AMAZONSELLER);
    await io.homePage.addStep(
      "*** Select the Amazon Seller Central Import Option from Applications ***"
    );
    await io.homePage.loadingTime();
    await io.exportsPage.fill(
      selectors.exportsPagePO.CONNECTIONS_DROPDOWN,
      "Amazon Connection"
    );
    await io.homePage.addStep("*** Clicked on connection Dropdown ***");
    await io.homePage.clickByText('Amazon Connection');
    await io.homePage.loadingTime();
    await io.homePage.addStep(
      "*** Select first option from connection Dropdown  ***"
    );
    await io.exportsPage.fill(
      selectors.exportsPagePO.NAME,
      "Amazon_Seller_Central_export_new"
    );
    await io.homePage.addStep("*** Enter or fill the Export Name ***");
    await io.exportsPage.click(selectors.basePagePO.SAVE);
    await io.homePage.addStep("*** Clicked on Save button ***");

    await io.exportsPage.waitForElementAttached(
      selectors.flowBuilderPagePO.EXISTINGRECORDSIMPORT
    );

    await io.homePage.addStep(
      "*** Wait For How would you like the records imported? to be in document  ***"
    );

    await io.flowBuilder.click(selectors.importPagePO.SELECTHTTPMETHOD);
    await io.homePage.addStep("*** Click on Http Method Dropdown  ***");

    await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
    await io.homePage.addStep(
      "*** Select Post Method From Http Method Dropdown  ***"
    );

    await io.exportsPage.fill(
      selectors.flowBuilderPagePO.HTTP_GET_RELATIVEURL,
      "/feeds/2021-06-30/documents"
    );
    await io.homePage.addStep(
      "*** Fill the relative uri in Relative Uri field  ***"
    );

    await io.assert.verifyElementDisplayedByText(
      "Feed type",
      "Feed type is not present"
    );

    await io.homePage.addStep(
      "*** Verify whether Feed Type Field is Present or not?  ***"
    );

    await io.exportsPage.click( selectors.importPagePO.FEED_TYPE_HELP_ICON_SELECTOR);
    await io.homePage.addStep("*** Click on Help Icon  ***");

    const helpTextPopOverTitleSelector =
      selectors.exportsPagePO.HELP_TEXT_POPOVER_TITLE_EXPORT;

    const element = await page.$(helpTextPopOverTitleSelector);
    await io.homePage.addStep(
      "*** Getting the title Selector of help popover ***"
    );

    const textContent = await element.textContent();
    await io.homePage.addStep("*** Getting the Element Text content  ***");

    expect(textContent).toBe("Feed type");
    await io.homePage.addStep("*** Verified the Title  ***");

    await io.assert.verifyElementDisplayedByText(
      "The type of the feed.",
      "Help text is incorrect"
    );
    await io.homePage.addStep("*** Verified the Help Text Body  ***");

    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.addStep("*** Going back to homepage ***");
  });
});
