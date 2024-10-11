import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C22581_general_custom_fields_forms.json";
import FTP1 from "@testData/GENERAL/TC_C22581_general_custom_fields_forms_1.json";
import test1 from "@testData/GENERAL/TC_C22581.json";

test.describe("TC_C22581", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T2252 @Env-All TC_C22581", async ({ io, page }, testInfo) => {
    const intId = await io.api.getIntegrationId("TC_C22581-DND");

    var resp = await io.api.getCall(`v1/integrations/${intId}`);
    console.log(resp);
  
    const flowGroupings = resp.flowGroupings;
    let settingsFormPresent = false;
  
    for (let group of flowGroupings) {
      if ('settingsForm' in group) {
        settingsFormPresent = true;
        break;
      }
    }
  
    await io.assert.expectToBeTrue(settingsFormPresent, "");
  

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
