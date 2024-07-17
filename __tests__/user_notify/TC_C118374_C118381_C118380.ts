import { expect, links, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118374_C118381_C118380", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T20196 @Zephyr-IO-T20203 @Zephyr-IO-T20202 C118374_C118381_C118380", async ({ io, page }) => {

    // Navigate to default integration
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

    // Search for a flow 
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C118390_DND');
    //Wait for search to complete
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);

    //Open the flow
    await io.flowBuilder.clickByText('TC_C118390_DND');

    //Open errors dashborad
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);

    //Assign one error to a user
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    //Fill the email ID
    await io.flowBuilder.fill(selectors.em2DotOLineGraphPO.NEW_USER_EMAIL, "qaautomation1+assign2@celigo.com");

    await io.homePage.clickByText("Assign");
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);

    const assigneePill = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)).toString();
    await io.assert.expectToContainValue('Pending - qaautomation1+', assigneePill, 'Error is not assigned');
    await io.flowBuilder.hover(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL, 0, false);
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL_HOVERTEXT);
    const hoverText = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL_HOVERTEXT)).toString();
    await io.assert.expectToContainValue(
      'The assigned user has not yet accepted their invitation to this account.',
      hoverText,
      'Hovertext did not appear'
    );
    await io.flowBuilder.delay(1000 * 60 * 15);

    const link = await io.emailVal.getLinkFromEmail(
      "1 error assigned: TC_C118390_DND", true, "pwqa1"
    );

    const keyword = "assignedTo";

    if (Array.isArray(link)) {
      const allLinks =link.filter(str => str.includes(keyword));
      let stepName=allLinks[0].replace(/\\r|\\n/g, '')
      let OneTomany=allLinks[1].replace(/\\r|\\n/g, '')
      let ViewErrors=allLinks[2].replace(/\\r|\\n/g, '')

      await io.homePage.navigateTo(stepName.toString());

      let validateKeywords=await io.emailVal.validateKeywordsInMail(
        "1 error assigned: TC_C118390_DND", ['Assigned errors','Message','Flow step name'],"pwqa1",
      );

        expect(validateKeywords).toBeTruthy();
    }
    
 
  });
  
  test.afterEach(async ({ io }) => {
    //Get user ID
    const response = await io.api.getCall("v1/ashares");
    JSON.stringify(response);
    const emailToFind = "qaautomation1+assign2@celigo.com";
    const foundObject = response.find(obj => obj.sharedWithUser.email === emailToFind);
    const UserId = foundObject._id;

    //Delete user from the account
    const endPoint = "v1/ashares/" + UserId
    await io.api.deleteCall(endPoint);

  });
});