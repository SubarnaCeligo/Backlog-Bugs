import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/monitorSuite/monitor_few_manage_few.json";

test.describe(`C1570 Verify a user with monitor integrationAccessLevel only should not be able to generate a template, view recycle bin or data loader`, () => {
  test(`@Zephyr-T6902 @Env-All C1570 Verify a user with monitor integrationAccessLevel only should not be able to generate a template, view recycle bin or data loader`, async ({io, page}) => {
    const res = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      testData
    );
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByText("Tools");
    await io.homePage.delay(1000);
    const dataLoader = await page.getByText("Data loader");
    await io.assert.expectToBeFalse(await dataLoader.isVisible(), "data loader is not visible");
    const resources = await page.getByText("Resources");
    const templates = await page.getByText("Templates");
    const recycleBin = await page.getByText("Recycle Bin");
    await io.assert.expectToBeFalse(await resources.isVisible(), "Resources is not visible");
    await io.assert.expectToBeFalse(await templates.isVisible(), "templates is not visible");
    await io.assert.expectToBeFalse(await recycleBin.isVisible(), "recycle bin is not visible");
  });
});
