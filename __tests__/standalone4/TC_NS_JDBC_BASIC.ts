
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("NS_JDBC_BASIC", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("TC_C68640_C68719_C68637_C68638_C68992_C68641 @Env-All @Zephyr-IO-T8431 @Zephyr-IO-T8435 @Zephyr-IO-T8428 @Zephyr-IO-T8429 @Zephyr-IO-T8438 @Zephyr-IO-T8432", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.NSJDBC);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "Netsuite Jdbc Connection Basic");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SERVERNAMEFIELD, "tstdrv91672812.connect.api.netsuite.com");
    await io.homePage.fillWebPage(selectors.connectionsPagePO.JDBC_SERVER_DATA_SOURCE, "NetSuite.com");
    await io.homePage.loadingTime();

    //TC_C68719 The authentication type dropdown should not be shown for the source "NetSuite.com"
    //TC_C68637 Basic authentication should be added for the NetSuite JDBC connector when the user selects the server data source as 'NetSuite.com'
    var authDropdown = await io.homePage.isVisible(selectors.connectionsPagePO.NETSUITE_AUTH);
    await io.assert.expectToBeFalse(authDropdown,"")

    var email = await io.homePage.isVisible(selectors.flowBuilderPagePO.NSBASICEMAIL);
    await io.assert.expectToBeTrue(email, "");

    //TC_C68638 Token Based Authentication(manual) and Token Based Authentication(automatic) are removed from the Netsuite JDBC connector when the user selects the server data source as 'NetSuite.com'
    var manual = await io.homePage.isVisible( selectors.flowBuilderPagePO.MANUAL);
    await io.assert.expectToBeFalse(manual,"")
    var automatic = await io.homePage.isVisible(selectors.flowBuilderPagePO.AUTO);
    await io.assert.expectToBeFalse(automatic,"")


    //TC_C68992 Verify Help text for NS Jdbc connector with Basic auth
    //Email
    await io.homePage.click(selectors.connectionsPagePO.EMAIL_HELP_TEXT_BTN);
    const emailHelp = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await io.assert.expectToContainValue( "Email to log in into your NetSuite account", String(emailHelp),"");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);
    const emailLabel = await io.homePage.getText(selectors.flowBuilderPagePO.EMAILLABEL)
    await io.assert.expectToContainValue( "Email *",String(emailLabel), "");

    //Password
    await io.homePage.click(selectors.connectionsPagePO.PASS_HELP_TEXT_BTN);
    const passwordHelp = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await io.assert.expectToContainValue( "Password to log in into your NetSuite account", String(passwordHelp),"");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);
    const passwordLabel = await io.homePage.getText(selectors.flowBuilderPagePO.PASSWORDLABEL)
    await io.assert.expectToContainValue( "Password *", String(passwordLabel),"");

    //Account ID
    await io.homePage.click(selectors.connectionsPagePO.ACCOUNTID_HELP_TEXT_BTN);
    const accountidHelp = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await io.assert.expectToContainValue("Your NetSuite Account Id.  One way to obtain this value within NetSuite is via Setup -> Integration -> Web Services Preferences.  If this does not work then please contact NetSuite support.", String(accountidHelp),"");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);
    const accountidLabel = await io.homePage.getText(selectors.flowBuilderPagePO.ACCOUNTIDLABEL)
    await io.assert.expectToContainValue( "Account ID *", String(accountidLabel),"");

    //Role
    await io.homePage.click(selectors.connectionsPagePO.ACCOUNTROLE__TEXT_BTN);
    const roleHelp = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await io.assert.expectToContainValue( "The NetSuite Internal Id of the Role associated with the User.  To obtain this value you must first know which NetSuite Role record is associated with the User you are using for this connection.  Once you know the Role then you can navigate to Setup -> Users/Roles -> Manage Roles and if you have NetSuite Internal Ids displayed automatically it will just show in the list view, or you can open the Role in view mode and look at the URL in the browser and the id will be listed there too.  If these steps didn't work for your particular NetSuite instance then please contact NetSuite support.", String(roleHelp),"");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);
    const roleLabel = await io.homePage.getText(selectors.flowBuilderPagePO.ROLELABEL)
    await io.assert.expectToContainValue( "Role *", String(roleLabel),"");

    //TC_C68641 The error message should be displayed for Mandatory fields
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    //Email Message
    var emailmessage = await page.$$(
      selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR
    );
    var emailmessage1 = await emailmessage[0].textContent();
    await io.assert.expectToBeValue(String(emailmessage1), "A value must be provided", "");

    //Password Message
    var passwordmessage = await page.$$(
      selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR
    );
    var passwordmessage1 = await passwordmessage[1].textContent();
    await io.assert.expectToBeValue(String(passwordmessage1), "A value must be provided", "");

    //Account Id Message
    var accountidmessage = await page.$$(
      selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR
    );
    var accountidmessage1 = await accountidmessage[2].textContent();
    await io.assert.expectToBeValue(String(accountidmessage1), "A value must be provided", "");

    //Role Message
    var rolemessage = await page.$$(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR);
    var rolemessage1 = await rolemessage[3].textContent();
    await io.assert.expectToBeValue(String(rolemessage1), "A value must be provided", "");

    //TC_C68640 User is not able to authorize the connection, It will show an error
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.NSBASICEMAIL, "Dummy@celigo.com");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.NSBASICPASS, "12345678");

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.NSBASICACCOUNTID, "TSTDRV91672812");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.NSBASICEROLE, "12");

    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    await io.homePage.loadingTime();
    test.step("***  clicking on the test connection button ***", async ()=>{});
    var notifications = await page.$$(selectors.basePagePO.NOTIFICATION_ID);
    var testEle = await notifications[0].textContent();
    var success = "Your test was not successful. Check your information and try again";
    await io.assert.expectToContainValue( success, String(testEle), "");
    test.step("***  verified User is not able to authorize the connection, It will show an error ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on close  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on discard changes  ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
