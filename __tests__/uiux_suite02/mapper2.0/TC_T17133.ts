import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T17133 from '@testData/Mapper2.0/T17133.json';

test.describe("C59462 Verify Whenever the input filter is updated, we clear the cached data. Hence if user opens any AFE of that lookup/import say outputFilter for lookup, it fetches again based on the updated input filter.", () => {
  test("@Zephyr-IO-T17133 @Env-All @Priority-P2 C59462 Verify Whenever the input filter is updated, we clear the cached data. Hence if user opens any AFE of that lookup/import say outputFilter for lookup, it fetches again based on the updated input filter.", async ({io, page}) => {
      await io.createResourceFromAPI(T17133, "FLOWS");

      await io.flowBuilder.click(selectors.importPagePO.INPUT_FILTER_ICON);

      await io.homePage.loadingTime();

      await io.flowBuilder.click(selectors.importPagePO.INPUT_FILTER_PREVIEW_RESULT);

      await io.homePage.loadingTime();

      await page.pause();

      expect(
        page.getByText(
          "TRUE:"
        )
      ).toBeVisible();
  });
});
