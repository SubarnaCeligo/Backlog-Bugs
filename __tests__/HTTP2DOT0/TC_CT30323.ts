import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, replaceENVData } from "@celigo/aut-utilities";
import * as jsonCreds from "@testData/Connections/Create/C71705.json";

test.describe('CT30323', () => {
    let connectionDoc;
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    
    test('@Env-All @Zephyr-IO-T30323 verify connection form should not be saved and agent value is not selected  ', async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    const creds = replaceENVData(jsonCreds);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilderDashboard.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "MYSQL"
    );
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MYSQL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MYSQL);
    await io.flowBuilder.fill(selectors.exportsPagePO.BQNAME,"C71705");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ON_PREMISE_MODE);
    await io.flowBuilder.fill(selectors.connectionsPagePO.HOST,creds.HOST);
    await io.flowBuilder.fill(selectors.connectionsPagePO.MYSQLDBNAME,creds.DATABASENAME);
    await io.flowBuilder.fill(selectors.connectionsPagePO.MYSQLUSERNAME,creds.USERNAME);
    await io.flowBuilder.fill(selectors.connectionsPagePO.MYSQLPASSWORD,creds.USERNAME);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.loadingTime();
    await expect(page.getByText('A value must be provided')).toBeVisible();


    });
    
  
  
  
      
});