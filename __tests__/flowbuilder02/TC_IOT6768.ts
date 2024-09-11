import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`@Author-MayankOmar IO-T6768 Verify the  help text of the newly added Feed type field`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("IO-T6768 @Epic-IO-62193 @Zephyr-IO-T6768 @Env-All Verify the  help text of the newly added Feed type field", async ({ io, page }) => {
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
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.addStep("*** Going back to homepage ***");
  });
});
