
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_14526", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T4589 TC_14526_Error1", async ({io,page}, testInfo) => {
    const data = await io.api.postCall( "/v1/netsuite/userroles",  JSON.stringify({})
    );
    await io.assert.expectToBeValue(String(data.errors[0].message), "Email is required.", "");
    test.step(" Verifying error Email is required ", async ()=>{});
  });

  test("TC_14526_Error2", async ({io,page}, testInfo) => {
    const data1 = await io.api.postCall( "/v1/netsuite/userroles",  JSON.stringify({ email: "dfghj@hhk.in" })
    );
    await io.assert.expectToBeValue(String(data1), "Current password is required", "");
    test.step(" Verifying error Current password is required ", async ()=>{});
  });
});
