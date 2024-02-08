
import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import {decrypt} from "@celigo/aut-utilities";


test.describe.skip("C57327 C50895 C50907", () => {
    test.beforeEach('check sign out', async({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        const isNotLoggedIn = await io.loginPage.checkLoginState();
        if(!isNotLoggedIn){
            await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
            await io.homePage.hover(selectors.basePagePO.ACCOUNT);
            await io.homePage.click(selectors.basePagePO.SIGN_OUT);
        }
    })
    test("C57327 C50895 C50907", async ({io, page}) => {
        await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
        await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
        await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
        await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
        await io.signInPage.waitForElementAttached(':has-text("Trust this device")');
        await io.signInPage.reloadPage();
        await io.signInPage.waitForElementAttached(':has-text("Trust this device")');

        await test.step("C57327 Verify if we refresh the MFA verify page we should be staying on the same page and not navigated to other pages",async ()=>{
            await io.assert.verifyElementDisplayedByText('Authenticate with one-time passcode', 'Authenticate with one-time passcode is not displayed');
            await io.assert.verifyElementDisplayedByText('Trust this device', 'Trust this device is not displayed');
        });

        await test.step("C50895 Verify the trusted device message for account owner.",async ()=>{
            await io.assert.verifyElementContainsText('[id="notification"]', 'You are signing in from a new device. Enter your passcode to verify your account.');
        });

        await test.step("C50907 Verify if the user can trust the device from the OTP page window..",async ()=>{
            await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.TRUST_DEVICE, 'Trust device is not displayed');
        });
        
    });

  });