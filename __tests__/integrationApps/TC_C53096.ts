import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51656 from "@testData/EM2.0/TC_ C51656.json"


test.describe(
  "C53096 Verify whether mapper1.0/mapper2.0 toggle is removed for IA's ",
  () => {
    test("C53096 Verify whether mapper1.0/mapper2.0 toggle is removed for IA's ", async ({
      io,
      page
    }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.clickByText("Mapper2 IA")
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
        
        const element = await page.$('.MuiToggleButtonGroup-root button[data-test="Mapper 1.0"]');
        expect(element).toBeNull();

    });
  }
);