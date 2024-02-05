
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C1104_error_flows_redirections.json";

test.describe("TC_C1104", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Delete intergation ***", async ()=>{});
    await io.api.deleteIntegrationRecursively("Don't use");
  });
  test("TC_C1104", async ({io,page}, testInfo) => {
    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Don't use");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.isPageLoaded();
    var intId = await io.api.getIntegrationId("Don't use");

    FTP.qa__api_tdata[0].createFlow._integrationId = intId;
    await io.api.createImpOrExpAndFlowsThruAPI(FTP);
    var id = await io.api.getFlowId(FTP.name);
    await io.api.checkJobStatusFromAPI( FTP.name, id);
    await io.flowBuilder.validateJobCountFromDashBoard(FTP.name, FTP.qa__expectedDashboardCount);

    FTP.qa__api_tdata[0].createFlow._integrationId = "";


    await io.integrationPage.navigateToDynamicIntegrationFlow(intId, id);
    await io.homePage.reloadPage();
    await io.homePage.reloadPage();
    await io.homePage.isPageLoaded();
    await io.flowBuilder.validateJobCountFromDashBoard(FTP.name, FTP.qa__expectedDashboardCount);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    await io.homePage.reloadPage();
    await io.homePage.isPageLoaded();

    var loc = await page.$$(selectors.integrationPagePO.INTEGRATIONNAME);
    var integrationNameIndex;
    looping: for(var i = 0; i < loc.length; i++) {
      if((await loc[i].textContent()) == "Don't use") {
        integrationNameIndex = i + 2;
        break looping;
      }
    }
   
    expect(await ( await page.$$(selectors.myAccountPagePO.INVITEUSER)[
          integrationNameIndex
        ]
      ).textContent()
    ).toEqual("1 error");
    await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.INVITEUSER, integrationNameIndex);

    var url = await io.homePage.getCurrentUrl();
    expect(url).toContain("/integrations/" + String(intId) + "/flows");


    await io.api.deleteFlowViaAPI(  id);
    await io.api.deleteIntegration(intId);
    
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
