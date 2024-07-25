import { expect, links, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";
test.describe("C118366_C118376_C118375_C118371_C118373_C118367", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T20188 @Zephyr-IO-T20198 @Zephyr-IO-T20197 @Zephyr-IO-T20193 @Zephyr-IO-T20195 @Zephyr-IO-T20189 C118366_C118376_C118375_C118371_C118373_C118367", async ({ io, page }) => {

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
    await io.assert.expectToContainValue('Pending - qaautomation1+a', assigneePill, 'Error is not assigned');
    await io.flowBuilder.hover(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL, 0, false);
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL_HOVERTEXT);
    const hoverText = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL_HOVERTEXT)).toString();
    await io.assert.expectToContainValue(
      'The assigned user has not yet accepted their invitation to this account.',
      hoverText,
      'Hovertext did not appear'
    );
    // await io.flowBuilder.delay(1000 * 60 * 20);
    await page.waitForTimeout(5000);
    const link = await io.emailVal.getLinkFromEmail(
      "1 error assigned: TC_C118390_DND", true, "pwqa1"
    );
console.log("this is link",link)
    const keyword = "assignedTo";

    if (Array.isArray(link)) {
      const allLinks =link.filter(str => str.includes(keyword));
      let stepName = allLinks[1].replace(/\\r|\\n|>[^\r\n]*/g, '');
      const isNotLoggedIn = await io.loginPage.checkLoginState();
      // await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
          // Navigate to default integration
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

    // Search for a flow 
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C118390_DND');
      let AccountTab=".MuiToolbar-root .MuiSvgIcon-root"
      let AccountTab1=await page.$$(".MuiToolbar-root .MuiSvgIcon-root")
      await page.waitForTimeout(20000);
      // await page.pause();
      let  last = await AccountTab1.length - 1;
      if (!isNotLoggedIn) {
        // await io.homePage.waitForElementAttached(AccountTab[last]);
        await io.myAccountPage.clickByIndex(AccountTab, last);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      }


      await page.waitForTimeout(5000);                       
      await io.homePage.navigateTo(stepName.toString());
      await io.homePage.reloadPage();
      await io.homePage.reloadPage();
      await io.loginPage.fill(selectors.loginPagePO.EMAIL, "qaautomation1+assign2@celigo.com");
      await io.loginPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
      await io.loginPage.click(selectors.basePagePO.SUBMIT);
      // await page.pause();
      
      await io.assert.verifyElementDisplayedByText(
        `Invitation to account`,
        "The text looks work"
      )



      
    }
    
 
  });
  
  test.afterEach(async ({ io,page }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    let AccountTab=".MuiToolbar-root .MuiSvgIcon-root"
    let AccountTab1=await page.$$(".MuiToolbar-root .MuiSvgIcon-root")
    const isNotLoggedIn = await io.loginPage.checkLoginState();
    let  last = await AccountTab1.length - 1;
    if (!isNotLoggedIn) {
      await io.myAccountPage.clickByIndex(AccountTab, last);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    }
    await io.homePage.reloadPage();
    await io.homePage.reloadPage();
    // await io.loginPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
    // await io.loginPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
    // await io.loginPage.click(selectors.basePagePO.SUBMIT);
    // console.log("this is username",decrypt(process.env["IO_UserName"]))
    // console.log("this is password",decrypt(process.env["IO_Password"]))
  });
});