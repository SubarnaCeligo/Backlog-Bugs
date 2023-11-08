import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Flows/C22915_testdata1.json"


test.describe("C27637 Verify Date and Time Icons for Start date/time field on the Delta flow modal", () => {
    test("C27637 Verify Date for Start date/time field on the Delta flow modal", async ({io, page}) => {
        await io.createResourceFromAPI(testData, "FLOWS");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW)
        const expectedDateIcon = page.locator('[placeholder="⁦⁨MM⁩ / ⁨DD⁩ / ⁨YYYY⁩⁩"]')
        await  expectedDateIcon.waitFor({ state: "visible" });
        await expect(expectedDateIcon).toHaveScreenshot();
         
    });
    test("C27637 Verify Time Icons for Start date/time field on the Delta flow modal", async ({io, page}) => {
        await io.createResourceFromAPI(testData, "FLOWS");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW)
        const expectedTimeIcon = page.locator('[placeholder="⁦⁨hh⁩:⁨mm⁩:⁨ss⁩⁩ ⁦⁨aa⁩⁩"]')
        await  expectedTimeIcon.waitFor({ state: "visible" });
        await expect(expectedTimeIcon).toHaveScreenshot();

         
    });
  });