import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93655.json";
import CIO27737 from '@testData/Imports/CIO27737.json';


test.describe('CIO27737 & CIO27739 Verify if MIME type is correctly saved by saving and re-opening and run the flow', () => {
  test('@Env-All Verify if MIME type is correctly saved by saving and re-opening and run the flow', async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(CIO27737, "FLOWS");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    const defaultData = await io.importsPage.getText(selectors.importPagePO.MIMETYPE);
    expect(defaultData).toContain('Google Audio');
    await io.flowBuilder.fill(selectors.importPagePO.NAME, 'import');
    await io.flowBuilder.clickByText("Save & close");
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RUNFLOW);
    await io.flowBuilder.click(selectors.basePagePO.RUNFLOW);
  });
});
