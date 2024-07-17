import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C119818 from "../../../testData/inputData/transformation/C119818.json";

test.describe("C119818-Verify that Flowbranching input panel data shows Transformed data, when mock is populated at export with grouping", () => {
  test("@Env-All @Zephyr-IO-T8090 C119818- Flowbranching input panel data shows Transformed data", async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(C119818, "FLOWS");
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.PLUS_BUTTONS
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.PLUS_BUTTONS,
      0
    );
    await io.flowBuilder.getByRoleClick("menuitem", "Add branching");
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    let divTextContent = await io.flowBuilder.getText(
      selectors.basePagePO.ACE_CONTENT
    );
    let jsonData = JSON.stringify(divTextContent);
    await io.assert.expectToContainValue(
      "https://celigoqa.zendesk.com/api/v2/tickets/126.json",
      jsonData,
      "Data missing from input panel"
    );
  });
});
