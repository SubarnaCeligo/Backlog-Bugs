import { test} from "@celigo/ui-core-automation";

test.describe("TC_33695", () => {
  test("@Env-All @Zephyr-IO-T3057|To verify /Tiles route is returning integration description,LastModified and lastErrorAt values for DIY integrations and IA tile", async ({io}) => {
    test.step("*** Retreiving data through API call ***", async ()=>{});
    const tiles = await io.api.getTilesThruAPI("");
    test.step("*** checking whether tiles that have errors in them have lastErrorAt, lastModified, description defined ***", async ()=>{});
    const result = tiles.some(checkFunction);
    function checkFunction(integration) {
      const { lastErrorAt, lastModified, description } = integration;
      return(lastErrorAt != undefined && lastModified != undefined && description != undefined);
    }
    await io.assert.expectToBeTrue(result, "");
  });
});