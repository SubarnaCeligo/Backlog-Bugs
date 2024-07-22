import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C93561 HTTP request body is not retaining the data for 2.0 framework assistants`, () => {
  test(`@Env-All @Zephyr-IO-T22254 C93561 HTTP request body is not retaining the data for 2.0 framework assistants`, async ({
    io,
    page
  }) => {
    await io.importsPage.navigateTo(io.data.links.IMPORTS_PAGE_URL);
    await io.importsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
    await io.importsPage.click(selectors.connectionsPagePO.ORDERFUL);
    await io.importsPage.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.exportsPage.click(
      selectors.connectionsPagePO.CONNECTION_OPTION_TEXT
    );
    await io.flowBuilder.fill(selectors.exportsPagePO.NAME, "Orderful Import");
    await io.exportsPage.click(selectors.basePagePO.SAVE);
    await page
      .getByText("How would you like the records imported?")
      .waitFor({ state: "visible" });
    await io.flowBuilder.click(
      selectors.importPagePO.ASSISTANT_METADATA_RESOURCE
    );
    await io.flowBuilder.clickByText("Transaction");
    await io.flowBuilder.click(
      selectors.importPagePO.ASSISTANT_METADATA_OPERTAION
    );
    await io.flowBuilder.clickByText("Create a Transaction");
    await io.flowBuilder.click(selectors.importPagePO.HTTP_IMPORT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.flowBuilder.click(selectors.importPagePO.HTTP_IMPORT);
    await page.locator('[id="http.body"].ace_editor').evaluate(e => {
      // @ts-ignore¸
      const editor = ace.edit(e);
      return editor.setValue("{{record}}");
    });
    await io.flowBuilder.addStep("Set value as {{record}}");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.clickByTextByIndex("Orderful Import", 0);
    await io.flowBuilder.click(selectors.importPagePO.HTTP_IMPORT);
    const httpBody = await page
      .locator('[id="http.body"].ace_editor')
      .evaluate(e => {
        // @ts-ignore
        const editor = ace.edit(e);
        return editor.getValue();
      });
    await io.assert.expectToBeValue(
      "{{record}}",
      httpBody,
      "HTTP request body text is not retained"
    );
    await io.flowBuilder.addStep("Verified HTTP request body text is retained");
  });
});
