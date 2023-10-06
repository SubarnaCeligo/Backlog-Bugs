import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import {decrypt} from "@celigo/aut-utilities";

// test.describe("C41684 verify empty state messaging for existing user", () => {
//     test("Imports page check", async ({io, page}) => {
//         await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//         await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
//         await io.homePage.goToMenu("Resources","Imports");
//         const noImportText = await io.homePage.isVisible("text='You don’t have any imports'");
//         const importsText = await io.homePage.isVisible("text='Imports are used to insert data into an application. See all of your imports at a glance, determine where they’re being used, and make edits on this page.'");
//         await io.assert.expectToBeTrue(noImportText, "No import message not shown");
//         await io.assert.expectToBeTrue(importsText, "Imports text not shown");
//     });
//     test("Exports page check", async ({io, page}) => {
//         await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//         await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
//         await io.homePage.goToMenu("Resources","Exports");
//         const noExportText = await io.homePage.isVisible("text='You don’t have any exports'");
//         const exportsText = await io.homePage.isVisible("text='Exports are used to receive or extract data from an application. See all of your exports at a glance, determine where they’re being used, and make edits on this page.'");
//         await io.assert.expectToBeTrue(noExportText, "No export message not shown");
//         await io.assert.expectToBeTrue(exportsText, "Exports text not shown");
//     });
//     test("Agents page check", async ({io, page}) => {
//         await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//         await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
//         await io.homePage.goToMenu("Resources","Agents");
//         const noAgentsText = await io.homePage.isVisible("text='You don’t have any agents'");
//         const agentsText = await io.homePage.isVisible("text='Agents are software programs that run on your server and establishes a secure tunnel for connecting to integrator.io. See all of your agents at a glance, determine where they’re being used, and make edits on this page.'");
//         await io.assert.expectToBeTrue(noAgentsText, "No Agents message not shown");
//         await io.assert.expectToBeTrue(agentsText, "Agentss text not shown");
//     });
//   });

//   test.describe("C41699 Verify the empty state messaging after closing the create connection tab", () => {
//     test("Imports page check", async ({io, page}) => {
//         await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//         await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
//         await io.homePage.goToMenu("Resources","Imports");
//         await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
//         await io.homePage.click(selectors.basePagePO.CLOSE);
//         const noImportText = await io.homePage.isVisible("text='You don’t have any imports'");
//         const importsText = await io.homePage.isVisible("text='Imports are used to insert data into an application. See all of your imports at a glance, determine where they’re being used, and make edits on this page.'");
//         await io.assert.expectToBeTrue(noImportText, "No import message not shown");
//         await io.assert.expectToBeTrue(importsText, "Imports text not shown");
//     });
//     test("Exports page check", async ({io, page}) => {
//         await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//         await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
//         await io.homePage.goToMenu("Resources","Exports");
//         await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
//         await io.homePage.click(selectors.basePagePO.CLOSE);
//         const noExportText = await io.homePage.isVisible("text='You don’t have any exports'");
//         const exportsText = await io.homePage.isVisible("text='Exports are used to receive or extract data from an application. See all of your exports at a glance, determine where they’re being used, and make edits on this page.'");
//         await io.assert.expectToBeTrue(noExportText, "No export message not shown");
//         await io.assert.expectToBeTrue(exportsText, "Exports text not shown");
//     });
//     test("Agents page check", async ({io, page}) => {
//         await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//         await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
//         await io.homePage.goToMenu("Resources","Agents");
//         await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
//         await io.homePage.click(selectors.basePagePO.CLOSE);
//         const noAgentsText = await io.homePage.isVisible("text='You don’t have any agents'");
//         const agentsText = await io.homePage.isVisible("text='Agents are software programs that run on your server and establishes a secure tunnel for connecting to integrator.io. See all of your agents at a glance, determine where they’re being used, and make edits on this page.'");
//         await io.assert.expectToBeTrue(noAgentsText, "No Agents message not shown");
//         await io.assert.expectToBeTrue(agentsText, "Agentss text not shown");
//     });
//   });

//   test.describe("C41700 Verify the empty state messaging for Home page", () => {
//     test("C41700 Verify the empty state messaging for Home page.", async ({io, page}) => {
//         await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//         await io.homePage.waitForElementAttached(selectors.homePagePO.CREATE_FLOW);
//         const noHomePageText = await io.homePage.isVisible("text='Jumpstart your data integrations'");
//         const homePageText = await io.homePage.isVisible("text='Flows move and transform data between applications. Flows are stored inside the Standalone flows tile, or within integrations, which you can manage on this page.'");
//         await io.assert.expectToBeTrue(noHomePageText, "No Home page message not shown");
//         await io.assert.expectToBeTrue(homePageText, "Home page text not shown");
//     });
//   });

//   test.describe("C45830 Verify if the message is generated correctly when the user clicks on Reset MFA.", () => {
//     test("C45830 Verify if the message is generated correctly when the user clicks on Reset MFA.. ", async ({io, page}) => {
//         await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
//         await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
//         await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
//         await io.myAccountPage.click("button:has-text('Reset')");
//         await io.assert.verifyElementText(selectors.mappings.Mapper2dot0PO.CONFIRMDIALOGBODY, "Are you sure you want to reset MFA? You'll need to re-associate your authenticator app and configure your device in integrator.io.");
//         await io.assert.verifyElementIsDisplayed(selectors.basePagePO.RESET, "Reset button is not displayed");
//         await io.assert.verifyElementIsDisplayed(selectors.mappings.Mapper2dot0PO.CLOSEBUTTON, "Cancel button is not displayed");
//     });
//   });

  test.describe("C50895 Verify the trusted device message for account owner", () => {
    test.beforeEach('check sign out', async({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        const isNotLoggedIn = await io.loginPage.checkLoginState();
        if(!isNotLoggedIn){
            await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
            await page.hover(selectors.basePagePO.ACCOUNT);
            await io.homePage.click(selectors.basePagePO.SIGN_OUT);
        }
    })
    test("C50895 Verify the trusted device message for account owner. ", async ({io, page}) => {
        await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
        await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
        await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
        await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
        await io.assert.verifyElementContainsText(selectors.loginPagePO.CLIENT_SNACKBAR, 'You are signing in from a new device. Enter your passcode to verify your account.');
    });

  });

  test.describe("C50907 Verify if the user can trust the device from the OTP page window.", () => {
    test.beforeEach('check sign out', async({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        const isNotLoggedIn = await io.loginPage.checkLoginState();
        if(!isNotLoggedIn){
            await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
            await page.hover(selectors.basePagePO.ACCOUNT);
            await io.homePage.click(selectors.basePagePO.SIGN_OUT);
        }
    })
    test("C50907 Verify if the user can trust the device from the OTP page window.. ", async ({io, page}) => {
        await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
        await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
        await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
        await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
        await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.TRUST_DEVICE, 'Trust device is not displayed');
    });
  });

//   test.describe("C57327 Verify if we refresh the MFA verify page we should be staying on the same page and not navigated to other pages", () => {
//     test.beforeEach('check sign out', async({io, page}) => {
//         await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
//         const isNotLoggedIn = await io.loginPage.checkLoginState();
//         if(!isNotLoggedIn){
//             await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
//             await page.hover(selectors.basePagePO.ACCOUNT);
//             await io.homePage.click(selectors.basePagePO.SIGN_OUT);
//         }
//     })
//     test("C57327 Verify if we refresh the MFA verify page we should be staying on the same page and not navigated to other pages. ", async ({io, page}) => {
//         await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
//         await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
//         await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
//         await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
//         await io.signInPage.waitForElementAttached(':has-text("Trust this device")');
//         await page.reload()
//         await io.assert.verifyElementDisplayedByText('Authenticate with one-time passcode', 'Authenticate with one-time passcode is not displayed');
//         await io.assert.verifyElementDisplayedByText('Trust this device', 'Trust this device is not displayed');
//     });
//   });