import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C51611 Verify the name field for under connection", () => {
    test("@Env-All @Zephyr-IO-T18930 @Priority-P2 C51611 Verify the name field for under connection   ", async ({io, page}) => {
      await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL)
      await io.connectionPage.clickByText("Create connection")
      await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.LOOP_RETURN_CONNECTION)
      await io.connectionPage.click(selectors.connectionsPagePO.LOOP_RETURN_CONNECTION)
      await io.connectionPage.loadingTime()
      const labelName = await io.connectionPage.isVisible("text='Name your connection'")
      await io.assert.expectToBeTrue(labelName, "Name your connection field is not present")
       

    });
  });
