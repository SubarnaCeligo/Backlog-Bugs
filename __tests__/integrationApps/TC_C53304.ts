import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51656 from "@testData/EM2.0/TC_ C51656.json"


test.describe(
  "C53304 Verify the mappings in IA when the import step doesn't has mappings created in 2.0 ",
  () => {
    test("C53304 Verify the mappings in IA when the import step doesn't has mappings created in 2.0 ", async ({
      io,
      page
    }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.clickByText("Mapper1 IA")
        await io.flowBuilder.waitForElementAttached('[data-test="importMapping"]')
        await io.flowBuilder.click('[data-test="importMapping"]')
        
        const mqpper2field = await io.flowBuilder.isVisible('text="Refresh fields"')
        await io.assert.expectToBeValue(mqpper2field.toString(), "false", "Refresh fields not present in IA")   
        const mqpper2button = await io.flowBuilder.isVisible('text="Mapper2.0"')
        await io.assert.expectToBeValue(mqpper2button.toString(), "false", "Mapper2.0 fields present in IA")   

    });
  }
);