import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import _ from 'lodash';

test.describe("C117998_C118283 Verify if user filter section is added to filter dialog ", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Epic-IO-38602 @Priority-P2 @Zephyr-IO-T20052 @Env-All C117998_C118283 Verify if user filter section is added to filter dialog", async ({
    io,
    page,
  }) => {
     //Navigate to default integration
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

    // Search for a flow
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "Filter_Automation01_DND"
    );

    //Wait for search to complete
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
 
    //Open the flow
    await io.flowBuilder.clickByText( "Filter_Automation01_DND");

    //Open errors dashborad
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
  
    //Click on Filter Icon
    await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);

    //Validate the contents
    await io.homePage.waitForElementAttached("text='Assigned to'")
    const label = await io.homePage.isVisible("text='Assigned to'")
    await io.assert.expectToBeTrue(label, "Label not found")
     
    await io.assert.checkElementState(selectors.filterErrorTag.ALLERRORSCHECKBOX, 'isChecked')
    
    await io.assert.verifyElementIsDisplayed(
        selectors.filterErrorTag.ARIALABELSEARCHUSER,
        "Search bar is not displayed"
      );

    //Verify Sorting 
    const expectedList = ['Admin User1', 'Custom User1', 'Custom User2','CustomUser NoAccess','Disabled User', 'Manage User', 'Monitor User1', 'Same UserName', 'Same UserName'];
    const userNames = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_NAME)).toString();
    const userNamesArray: string[] = userNames.split(',');
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const actualList = userNamesArray.filter(email => !emailRegex.test(email));

    //Verify that Myself and Unassigned are the first 2 items in the filter and remaining users are sorted alphabetically 
    await io.assert.expectToBeValue(actualList[0], 'Myself', 'Myself is not the first value');
    await io.assert.expectToBeValue(actualList[1], 'Unassigned', 'Unassigned is not the second value');

    //Remove default entries from array to validate sorting - commenting sorting as new users added to the account will affect validation.
    // actualList.splice(0, 2);
    // actualList.pop();
    // await io.assert.expectToBeTrue(_.isEqual(expectedList, actualList), 'Users are not sorted');
  });
});