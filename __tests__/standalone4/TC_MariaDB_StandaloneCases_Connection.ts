import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("MariaDB_StandaloneCases_Connection", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
    await io.api.deleteConnectionViaName("MariaDB_Connection");
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.api.deleteConnectionViaName("MariaDB_Connection");
    await io.homePage.loadingTime();
  });
  test("C77914_C77919_C77920_C77922_C77925_C77926_C77927_C77928_C93950 @Env-All @Zephyr-IO-T7931 @Zephyr-IO-T7934 @Zephyr-IO-T7935 @Zephyr-IO-T7936 @Zephyr-IO-T7938 @Zephyr-IO-T7939 @Zephyr-IO-T7940 @Zephyr-IO-T7941 @Zephyr-IO-T7944", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.APPLICATION);
    await page.keyboard.type("MariaDB");
    // C77922 - Verify MariaDB connector in connectors list
    const displayed = await io.homePage.isVisible(selectors.flowBuilderPagePO.MARIADB);
    await io.assert.expectToBeTrue(displayed, "");

    await io.homePage.click(selectors.flowBuilderPagePO.MARIADB);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "MariaDB_Connection");
    await io.homePage.click(selectors.basePagePO.SAVE);
    // C77919 - Verify all fields are present for creating MariaDB connection
    // C99920 - Verify all mandatory fields while creating connections in MariaDB
    //Mandatory field checks
    var hostMandatoryField = await io.homePage.isVisible(selectors.flowBuilderPagePO.RDBMS_HOST);
    await io.assert.expectToBeTrue(hostMandatoryField, "");

    var databaseNameMandatoryField = await io.homePage.isVisible(selectors.flowBuilderPagePO.RDBS_DATABASE);
    await io.assert.expectToBeTrue(databaseNameMandatoryField, "");

    var usernameMandatoryField = await io.homePage.isVisible(selectors.flowBuilderPagePO.RDBMS_USER);
    await io.assert.expectToBeTrue(usernameMandatoryField, "");

    var passwordMandatoryField = await io.homePage.isVisible(selectors.flowBuilderPagePO.RDBMS_PASSWORD);
    await io.assert.expectToBeTrue(passwordMandatoryField, "");

    // C77928 - Verify all help texts in MariaDB Connection page
    //Help Texts
    await io.homePage.click(selectors.connectionsPagePO.HOST_HELP_BUTTON);
    var hostHelpText = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await io.assert.expectToContainValue( "Enter the hostname or IP address of the SQL server you are connecting to.", String(hostHelpText),"");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    await io.homePage.click(selectors.connectionsPagePO.DEFAULT_DB_HELPTEXT_BTN);
    var databaseNameHelpText = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await io.assert.expectToContainValue( "The database schema to connect to.", String(databaseNameHelpText),"");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    await io.homePage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT_CONNECTION_USERNAME);
    var usernameHelpText = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await io.assert.expectToContainValue( "Username for authentication.",String(usernameHelpText), "");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    await io.homePage.click(selectors.connectionsPagePO.PASSWORD_HELP_BUTTON);
    var passwordHelpText =  await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await io.assert.expectToContainValue( "The password for the specified Username.", String(passwordHelpText),"");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    await io.homePage.click(selectors.flowBuilderPagePO.PORTHELPTEXT);
    var portHelpText = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await io.assert.expectToContainValue( "The server port to connect to. The default value varies depending on the type of database you are connecting to.", String(portHelpText),"");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    await io.homePage.clickByIndex(selectors.connectionsPagePO.USESSL_HELP_BUTTON, 1);
    var sslHelpText = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await io.assert.expectToContainValue( "Please check this field if you want to establish a secure connection to the database. This ensures that data in transit is encrypted.",String(sslHelpText), "");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    // C77927 - Verify help document link for MariaDB
    //Connection guide link
    var mariaDBConnectionGuide = await io.homePage.isVisible(selectors.flowBuilderPagePO.MARIADBCONNECTIONGUIDE);
    await io.assert.expectToBeTrue(mariaDBConnectionGuide, "");

    // C93950 - [UI] Verify creating MariaDB connection using valid credential
    //Fill details
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HOST, "mariadb.cu9ep4kmgkck.us-east-1.rds.amazonaws.com");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.DATABASENAME, "componentTestsDB");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.USERNAME_RDBMS, "admin");
    await io.homePage.fillWebPage(selectors.connectionsPagePO.RDBMS_PASSWORD, "#2qkB9KdUPLw");

    // C77926 - Verify ""save"",""save and close"" and ""close"" while creating MariaDB connection
    // Save Save & close Close buttons
    let save = await io.homePage.isVisible(selectors.basePagePO.SAVE);
    await io.assert.expectToBeTrue(save, "");

    let saveAndClose = await io.homePage.isVisible(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.assert.expectToBeTrue(saveAndClose, "");

    let close = await io.homePage.isVisible(selectors.basePagePO.CLOSE);
    await io.assert.expectToBeTrue(close, "");

    // C77925 - Verify test connection for MariaDB
    //Test connection
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    await io.homePage.loadingTime();
    let msg= await io.homePage.getText(selectors.basePagePO.NOTIFICATION_ID)
    await io.assert.expectToContainValue("Your connection is working great! Nice Job!",String(msg),"")
    

    // C77914 - Check weather the MariaDB connection is created in a time frame
    //Save connection
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    let connectionName = await io.homePage.isVisible("//a[text()='MariaDB_Connection']");
    await io.assert.expectToBeTrue(connectionName, "");
  });
});
