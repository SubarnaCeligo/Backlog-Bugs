
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C26328", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1885 TC_C26328", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    test.step("*** Navigate to My Account ***", async ()=>{});
    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    test.step("*** Navigate to My Profile ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.integrationPagePO.USERSTAB);
    test.step("*** Clicked on Users Tab ***", async ()=>{});
    var user = await io.homePage.click(selectors.myAccountPagePO.INVITEUSER);
    test.step("*** Clicked On Invite User Button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.myAccountPagePO.INVITE_USER_ACCESS_LEVEL + " " + selectors.flowBuilderPagePO.HELP_TEXT_ICON);
    test.step("*** Clicking on the question mark ***", async ()=>{});

    var emailhelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await io.assert.expectToContainValue("Edit account settings, all resources and integrations (current and future)", String(emailhelptext), "");
    await io.assert.expectToContainValue("Invite/manage users", String(emailhelptext), "");
    await io.assert.expectToContainValue("Troubleshoot flow errors", String(emailhelptext), "");
    await io.assert.expectToContainValue("Manage account owner permissions", String(emailhelptext), "");
    await io.assert.expectToContainValue("Transfer account ownership", String(emailhelptext), "");
    
    test.step("*** Verified the help texts for each field.   ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
  });
});
