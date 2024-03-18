import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93655.json";
import CIO27737 from '@testData/Imports/CIO27737.json';


test.describe('Verify if MIME type is correctly saved by saving and re-opening', () => {
  test('Verify if MIME type is correctly saved by saving and re-opening', async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(CIO27737, "FLOWS");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    const defaultData = await io.importsPage.getText(selectors.importPagePO.MIMETYPE);
    expect(defaultData).toBe('Google Audio');
  });
});
