
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/Mapper2.0/TC_C51141.json";
import { allure } from "allure-playwright";

test.describe("TC_C51141", () => {
  test("@Env-All @Zephyr-IO-T22364 TC_C51141", async ({io,page}, testInfo) => {
    test.step("*** Creating Flows ***", async ()=>{});
    let flowId = await io.createResourceFromAPI(TC, 'FLOWS');

    const flowData = await io.api.getFlowById(flowId);

    const importId = flowData.pageProcessors[0]._importId;
    var importJson1 = await io.api.getImportById(importId);

    await io.assert.expectToBeValue(String(importJson1.mappings[1]?.status), "Draft", "");
    await io.assert.expectToBeValue(String(importJson1.mappings[1]?.buildArrayHelper[0].mappings[0].buildArrayHelper[0].mappings[0].status), "Active", "");
  });
});
