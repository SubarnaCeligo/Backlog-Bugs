
import { test, expect } from "@celigo/ui-core-automation";
  
test.describe("TC_C20880_Verify_Connection_related_to_same_application_shown", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4596 TC_C20880_Verify_Connection_related_to_same_application_shown", async ({io,page}, testInfo) => {
    test.step("*** Clciking on create flow ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("FTP CONNECTION");
    let response =  await io.api.getCall('/v1/connections/'+connId);
    await expect(response.type).toEqual("ftp");
    
  });
});
