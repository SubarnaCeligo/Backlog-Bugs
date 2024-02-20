import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51656 from "@testData/EM2.0/TC_ C51656.json"


test.describe(
  "C53302 Verify the mappings in IA when the import step has mappings created in 2.0 ",
  () => {
    test("C53302 Verify the mappings in IA when the import step has mappings created in 2.0 ", async ({
      io,
      page
    }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.clickByText("Mapper2 IA")
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
        
        const mqpper2field = await io.flowBuilder.isVisible('text="Refresh fields"')
        await io.assert.expectToBeValue(mqpper2field.toString(), "true", "Refresh fields not present in IA")   
        const mqpper2button = await io.flowBuilder.isVisible('text="Mapper1.0"')
        await io.assert.expectToBeValue(mqpper2button.toString(), "false", "Mapper1.0 present present in IA")   
        await io.assert.verifyElementIsDisplayed(selectors.mappings.MAPPER2DOT0PO.MAPPER2GUIDE, "Mapeer2.0 is visible")

    });
  }
);