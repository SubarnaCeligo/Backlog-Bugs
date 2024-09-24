import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C60401 Verify whether data types(select,integer) are supporting for path parameters in 2.0(ex:ADP) for resource type Talent and api endpoint Get specific talent of a worker", () => {
    test("@Env-All @Zephyr-IO-T23199 @Priority-P2 C60401 Verify whether data types(select,integer) are supporting for path parameters in 2.0(ex:ADP) for resource type Talent and api endpoint Get specific talent of a worker", async ({io, page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.homePage.loadingTime()
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
      await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'ADP');
      await io.flowBuilder.click(selectors.connectionsPagePO.ADP_CONNECTION);
      await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
      await io.flowBuilder.loadingTime()
      await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
      await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'ADP CONNECTION');
      await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
      await io.flowBuilder.click(selectors.basePagePO.SAVE);
      await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
      await io.flowBuilder.clickByText('Talent');
      await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
      await io.flowBuilder.clickByText('Get all talents for a worker');
      await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_PATH_PARAMS_LISTNAME);
      await io.assert.verifyElementIsDisplayed(`${selectors.basePagePO.LIST_BOX} ul`, 'Array list is not displayed as per the type');
    });
  });