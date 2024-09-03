import { test, expect } from "@celigo/ui-core-automation";
import TC from "@testData/js-runtime/testdata/TC_C36568_Connection_Export_Pagesize.json";

test.describe("TC_C36568_Connection_Export_pagess", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T8156 @Env-All TC_C36568_Connection_Export_pages", async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test ***", async ()=>{});
    test.step("*** Creating Script1 ***", async ()=>{});
    var connMap = await io.api.loadConnections();
    const conn= await connMap.get(TC._connectionId)
    const response = await io.api.postCall( `/v1/connections/${conn}/export/pages`, TC.createAPIBody)
    test.step("*** Verifying Response to have pageIndex ***", async ()=>{});
    var hasPageState = response.hasOwnProperty("pagedExportState") ? true : false;
    await io.assert.expectToBeTrue(hasPageState,"")
  });
});
