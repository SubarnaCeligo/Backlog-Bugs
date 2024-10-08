
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C26325_C26915", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T5035 @Zephyr-IO-T5055 TC_C26325", async ({io,page}, testInfo) => {
    await test.step("*** TC_C26325_C26915 Test case validation ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    test.step("*** Clicked on Profile Menu ***", async ()=>{});

    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    test.step("*** Clicked on My account ***", async ()=>{});
    
    await io.homePage.click(selectors.integrationPagePO.USERSTAB);
    await io.homePage.click(selectors.basePagePO.INVITEUSER);
    await io.homePage.loadingTime();
    test.step("*** Clicked on Invite user ***", async ()=>{});
    
    await io.homePage.fill(selectors.homePagePO.USERNAMEINPUT, "harish.reddy+4@celigo.com");
    test.step("*** Entering the email ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 1);
    test.step("*** Selecting Manage access ***", async ()=>{});
    
    await io.homePage.click(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED);
    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    await io.homePage.loadingTime();
    test.step("*** Invite User ***", async ()=>{});

    const userEl = await page.getByText("harish.reddy+4@celigo.com").first();
    await userEl.waitFor({ state: 'visible', timeout: 10000 });
    await expect(userEl).toBeVisible();
    test.step("*** Validating Invite User ***", async ()=>{})

    await io.myAccountPage.deleteUsersBasedOnEmail("harish.reddy+4@celigo.com");
    await io.homePage.loadingTime();
    test.step("*** Deleting the Invited User ***", async ()=>{})

    await io.homePage.click(selectors.basePagePO.INVITEUSER);
    test.step("*** Clicked on Invite user ***", async ()=>{});
    await io.homePage.fill(selectors.homePagePO.USERNAMEINPUT, "harish.reddy+4@celigo.com");
    test.step("*** Entering the email ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN,3);
    await io.homePage.click(selectors.basePagePO.MANAGEINTEGRATION);
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.NEW_ERROR_VIEW_OPTION);
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
    test.step("*** Selecting manage/monitor access ***", async ()=>{});

    await io.homePage.click(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED);
    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    await io.homePage.loadingTime();
    test.step("*** Invite User ***", async ()=>{});

    const userEl2 = await page.getByText("harish.reddy+4@celigo.com").first();
    await userEl2.waitFor({ state: 'visible', timeout: 10000 });
    await expect(userEl2).toBeVisible();
    test.step("*** Validating Invite User ***", async ()=>{})

    await io.myAccountPage.deleteUsersBasedOnEmail("harish.reddy+4@celigo.com");
    await io.homePage.loadingTime();
    test.step("*** Deleting the Invited User ***", async ()=>{})

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T5132 @Zephyr-IO-T5125 TC_C28576_C27496", async ({io,page}, testInfo) => {
    await test.step("*** TC_C28576 Test case validation SSO Name ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    test.step("*** Clicked on Profile Menu ***", async ()=>{});
    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    test.step("*** Clicked on My account ***", async ()=>{});
    
    await io.homePage.click(selectors.myAccountPagePO.SECURITY);
    const resultEl = await page.getByText("Single sign-on (SSO)").first();
    await resultEl.waitFor({ state: 'visible', timeout: 10000 });
    await expect(resultEl).toBeVisible();
    test.step("*** Validate Single sign-on (SSO) Label ***", async ()=>{})

    await io.homePage.click(selectors.integrationPagePO.USERSTAB);
    await io.homePage.click(selectors.basePagePO.INVITEUSER);
    await io.homePage.loadingTime();
    test.step("*** Clicked on Invite user ***", async ()=>{});
    
    await io.homePage.fill(selectors.homePagePO.USERNAMEINPUT, "harish.reddy+5@celigo.com");
    test.step("*** Entering the email ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 1);
    test.step("*** Selecting Manage access ***", async ()=>{});
    
    await io.homePage.click(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED);
    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    await io.homePage.loadingTime();
    test.step("*** Invite User ***", async ()=>{});

    const requieMFALocator = `//tbody/tr/td[1][contains(text(),'harish.reddy+5@celigo.com')]/../td[5]`;
    await io.homePage.click(requieMFALocator);
    // await page.
    // var result = await io.homePage.getTextFromElement(selectors.basePagePO.NOTIFICATION_ID, "MFA is no longer required for harish.reddy@celigo.com.");
    const mfaDisabledResultEl = await page.getByText("MFA is no longer required for harish.reddy+5@celigo.com.");
    await mfaDisabledResultEl.waitFor({ state: 'visible', timeout: 10000 });
    await expect(mfaDisabledResultEl).toBeVisible();
    test.step("*** Owner is able to enable the SSORequried for a Monitor/Manage user ***",async ()=>{});

    await io.myAccountPage.deleteUsersBasedOnEmail("harish.reddy+5@celigo.com");
    await io.homePage.loadingTime();
    test.step("*** Deleting the Invited User ***", async ()=>{})

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T5123 TC_C27494", async ({io,page}, testInfo) => {
    test.step("*** TC_C27494 Test case validation ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    test.step("*** Clicked on Profile Menu ***", async ()=>{});
    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    test.step("*** Clicked on My account ***", async ()=>{});
    
    await io.homePage.click(selectors.integrationPagePO.USERSTAB);
    await io.homePage.click(selectors.basePagePO.INVITEUSER);
    await io.homePage.loadingTime();
    test.step("*** Clicked on Invite user ***", async ()=>{});
    
    await io.homePage.fill(selectors.homePagePO.USERNAMEINPUT, "harish.reddy+6@celigo.com");
    test.step("*** Entering the email ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 1);
    test.step("*** Selecting Manage access ***", async ()=>{});
    
    await io.homePage.click(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED);
    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    await io.homePage.loadingTime();
    test.step("*** Invite User ***", async ()=>{});
    
    const ActionMenu = `//tbody/tr/td[1][contains(text(),'harish.reddy+6@celigo.com')]/../td[6]`;

    (await page.locator(ActionMenu)).first().click();
    test.step("*** Clicked on Action Menu for user ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.MANAGEPERMISSION);
    test.step("*** Clicked on manage permission ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN,0);
    await test.step("*** Changing Permission to Administrator ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    test.step("*** Clicked on Save button ***", async ()=>{});
    
    const userEl2 = await page.getByText("harish.reddy+6@celigo.com").first();
    await userEl2.waitFor({ state: 'visible', timeout: 10000 });
    await expect(userEl2).toBeVisible();
    test.step("*** Validating Invite User ***", async ()=>{})

    await io.myAccountPage.deleteUsersBasedOnEmail("harish.reddy+6@celigo.com");
    await io.homePage.loadingTime();
    test.step("*** Deleting the Invited User ***", async ()=>{})

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  // This will be fixed as part of SSO related test cases
  // test("@Env-All @Zephyr-IO-T5115 TC_27274", async ({io,page}, testInfo) => {
  //   await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  //   await io.homePage.loadingTime();
  //   await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
  //   test.step("*** Clicked on Profile Menu ***", async ()=>{});
  //   await io.homePage.click(selectors.myAccountPagePO.PROFILE);
  //   test.step("*** Clicked on My account ***", async ()=>{});

  //   await io.homePage.click(selectors.myAccountPagePO.SECURITY);
  //   await io.homePage.loadingTime();
  //   await io.homePage.click(`${selectors.integrationPagePO.ENABLEOIDCHELPBTN}${selectors.flowBuilderPagePO.FLOW_TOGGLE}`);
  //   let orgId = 'celigo';

  //   if(process.env["ENVIRONMENT"] == "IAQA") {
  //     orgId = 'celigo1';
  //   } else if(process.env["ENVIRONMENT"] == "PLATFORMFIVE") {
  //     orgId = 'Celigo1';
  //   }

  //   await io.homePage.fill(selectors.basePagePO.ORGID, orgId);
  //   test.step("*** Providing already exisitngs OrgID ***", async ()=>{});
  //   await io.homePage.loadingTime();
  //   await io.homePage.isPageReady();

  //   const messageEl = await page.getByText("already exists.");
  //   await messageEl.waitFor({ state: 'visible', timeout: 10000 });
  //   await page.pause();
  //   await expect(messageEl).toBeVisible();
  //   // await expect(messageEl).toBeVisible();
  //   test.step("*** Validating the error text ***", async ()=>{});
    
  //   await io.homePage.click(`${selectors.integrationPagePO.ENABLEOIDCHELPBTN}${selectors.flowBuilderPagePO.FLOW_TOGGLE}`);
  //   await io.homePage.loadingTime();
  //   await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  // });



  // This will be fixed as part of SSO related test cases
  // test("@Env-All @Zephyr-IO-T5115 TC_C26317", async ({io,page}, testInfo) => {
  //   await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  //   await io.homePage.loadingTime();
  //   await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
  //   test.step("*** Clicked on Profile Menu ***", async ()=>{});
  //   await io.homePage.click(selectors.myAccountPagePO.PROFILE);
  //   test.step("*** Clicked on My account ***", async ()=>{});

  //   await io.homePage.click(selectors.flowBuilderPagePO.DASHBOARD);
  //   test.step("*** Clicked on User Tab ***", async ()=>{});
  //   var Text = await (await page.locator("//tbody/tr/td[1][contains(text(),'revathi.dasari+1@celigo.com')]/../td[6]/div")).getAttribute(
  //     "title"
  //   );
  //   // console.log(await Text);
  //   await io.assert.expectToBeValue("This user is already linked to another account’s SSO",String(Text),"")
    
  // });
});
