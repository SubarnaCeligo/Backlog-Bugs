
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import NS from "@testData/STANDALONE/TC_C20640.json";

test.describe("TC_C20640", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Env-All @Zephyr-IO-T2958 @Zephyr-IO-T3864 TC_C20640", async ({io,page}, testInfo) => {
    test.step("*** Verification for FTP adaptor  ***", async ()=>{});

    let connMap = await io.api.loadConnections();
    const connId = await connMap.get(NS.connectionId)

    const resp = await io.api.getCall(`v1/netsuite/metadata/suitescript/connections/${connId}/recordTypes?refreshCache=true`);
    
    console.log("response data ", resp);

    await expect(resp).not.toBeNull();
    test.step("Validating the json with the response", async ()=>{});
  });
});
