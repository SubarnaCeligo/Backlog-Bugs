import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C48963 from '@testData/Flows/C48963.json';

test.describe("C48904 Verify 'Actions to take if source value not found' options functionality for Object Data type", () => {
  test("@Env-All @Zephyr-IO-T18086 C48904 Verify 'Actions to take if source value not found' options functionality for Object Data type", async ({io, page}) => {
      await io.createResourceFromAPI(C48963, "FLOWS");
      await io.homePage.loadingTime()
      await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
      await page.getByLabel("Settings").nth(4).click();
      await io.importsPage.click(selectors.mappings.MAPPER2DOT0PO.DEFAULT_MAPPING);
      await io.importsPage.click(selectors.mappings.MAPPER2DOT0PO.USE_NULL);
      await io.importsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.importsPage.waitForElementAttached(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
      await io.importsPage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
      await io.importsPage.delay(2000);
      // const val = JSON.parse(await page.locator(selectors.mappings.MAPPER2DOT0PO.RESULT).evaluate(e => {
      //   // @ts-ignore
      //   const editor = ace.edit(e);
      //   return editor.getValue();
      // }));

      // expect(val.company).toBe(null);
      await io.importsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.loadingTime()
      await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
      await io.flowBuilder.loadingTime()
      const lastRun = page.getByText('Last run');
      await lastRun.waitFor({state: 'visible', timeout: 300000});
      const error = await page.$("text='error'");
      expect(error).toBe(null);
  });
});