import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import jsonData from "@testData/GENERAL/TC_C26239_Template.json";


test.describe("TC_C26239_Template", () => {
  const integrationIds = [];
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await test.step("*** Deleting Integrations which might not get deleted due to error in previous test case run ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.api.deleteIntegrationRecursively(jsonData.integrationDetails.Source_Integration);
    await io.api.deleteIntegrationNonRecursively(jsonData.integrationDetails.Source_Integration);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting Integrations  ***",()=>{});
    await io.api.deleteIntegrationRecursively(jsonData.integrationDetails.Source_Integration);
    await io.api.deleteIntegrationNonRecursively(jsonData.integrationDetails.Source_Integration);
    await test.step("*** Deleted Integrations Successfully ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T880 @Env-All TC_C26239_Template", async ({io,page}, testInfo) => {
    await test.step("*** Creating Integration Via API ***",()=>{});
    const integrationId = await io.api.createIntegrationThruAPI(jsonData.integrationDetails);
    integrationIds.push(integrationId);
    
    
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await test.step("*** Downloading Integration ***",()=>{});
    await io.integrationPage.downloadIntegrationFromUI( jsonData.downloadIntegration);

    await test.step("*** Deleting the template while installing from IO ***",()=>{});
    await io.integrationPage.deleteIntegrationWhileInstalling(  jsonData.integrationDetails, integrationIds[0] + ".zip");
    await test.step("*** Successfully Deleted Integration in the process of installing ***",()=>{});
  });
});
