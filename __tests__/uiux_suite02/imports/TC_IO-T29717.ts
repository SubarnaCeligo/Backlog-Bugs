import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Test to validate user is able to see two options one to create import, one is to create lookup under "What would you like to do?" section, when user tries to create azure synapse import from flowbuilder page', () => {
  test("@Env-All @Epic-IO-65860 @Zephyr-IO-T29717 @Priority-P2 " , async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
   
    await page.click(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Azure');
    await io.connectionPage.addStep("Filled the search area to search for the connection with the required name");
    await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.AZURE_SYNAPSE, "Element not displayed");
    await io.connectionPage.addStep("Validated the display for 'Microsoft Azure Synapse Analytics' ");
    await io.connectionPage.click(selectors.connectionsPagePO.AZURE_SYNAPSE);
    await io.connectionPage.addStep("Selected the Azure Synapse connector");
    await io.assert.verifyElementDisplayedByText('Import records into destination application','Import records into destination application is not visible');
    await io.assert.verifyElementDisplayedByText('Look up additional records (per record)','Look up additional records (per record) is not displaying');

  
  });
});