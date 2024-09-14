import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C25903.json";

test.describe("C25903", () => {
  test("@Zephyr-IO-T1408 @Env-All  C25903", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.goToFlowsPage();

    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);
   

    var id = await io.api.getFlowId(FTP.name);

    // await io.flowBuilder.navigateToTheFlow( id);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(id);
    await test.step("***Click on flow  ***",()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 1);
    await test.step("***Clicked on import ***",()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.FILENAMEFIELD, 1);
    await test.step("***Clicked on filename preview ***",()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    await test.step("***Clicked on preview ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    
    var datemessage  = await io.homePage.getText(selectors.flowBuilderPagePO.RESPONSE_CONTENT)
    expect(datemessage[4]).toBeTruthy()
    await test.step("***verified the date is displayed ***",()=>{});
  });
});
