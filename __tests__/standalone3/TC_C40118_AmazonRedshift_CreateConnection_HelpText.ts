import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C40118_AmazonRedshift_Connection_HelpText", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T1913 @Env-All TC_C40118_AmazonRedshift_Connection_HelpText", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** Navigated to Connections Page ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Clicked on Create New Connection ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT);
    test.step("*** Selected Amazon Redshift as the adaptor ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT_CONNECTION_REGION);
    const region = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue( "The default Amazon Redshift region is [us-east-1]. To change the region, select the region for this Redshift account", String(region),"");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);
    test.step("*** Validate Region field help text", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT_SECRET_ACCESS_KEY);
    await io.homePage.loadingTime()
    const secretAccessKey = await page.locator(
      selectors.connectionsPagePO.CONNHELPTEXT
    ).textContent();
    await io.assert.expectToContainValue("When you create an access key in your Amazon Redshift account, AWS will display both the access key ID and the secret access key. The secret access key will be available only once, and you should immediately copy it to a secure location and paste it into this setting. Multiple layers of protection, including AES 256 encryption, are in place to keep your secret access key safe. When editing this connection, you must re-enter this value each time; it is stored only when the connection is saved and never displayed as text.",String(secretAccessKey), "");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);
    test.step("*** Validated SecretAccessKey field help text ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT_CONNECTION_USERNAME);
    const username = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue("Enter your Identity and access management (IAM) database username. For more information, see Create a database user.",String(username),""
    );
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);
    test.step("*** Validated Username field help text ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.DEFAULT_CLUSTER_HELPTEXT_BTN);
    const clustername = await page.locator(
      selectors.connectionsPagePO.CONNHELPTEXT
    ).textContent();
    await io.assert.expectToContainValue("Enter the default Redshift cluster name. For more information, see Find your cluster connection.", String(clustername),"");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);
    test.step("*** Validated Clustername field help text ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT_CONNECTION_DATABASE);
    const databasename = await page.locator(
      selectors.connectionsPagePO.CONNHELPTEXT
    ).textContent();
    await io.assert.expectToContainValue("Enter the default Redshift database name that you want to connect to.", String(databasename),"");
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);
    test.step("*** Validated Databasename field help text ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT_ACCESS_KEY_ID);
    const accessKeyId = await page.locator(
      selectors.connectionsPagePO.CONNHELPTEXT
    ).textContent();
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);
    await io.assert.expectToContainValue( "Many Amazon APIs require an access key, and you must enter its ID in this setting for Redshift authentication. Refer to the AWS guides for more info about access keys and how to generate or find them in your AWS account.", String(accessKeyId),"");
    test.step("*** Validated AccessKeyId field help text ***", async ()=>{});
  });
});
