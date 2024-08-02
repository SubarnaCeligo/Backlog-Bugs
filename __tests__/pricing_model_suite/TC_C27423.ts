import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("C27423 Verify the endpoint under subscription page when it dont exceed the limit.", () => {
  test("C27423 @Zephyr-IO-T27423 @Env-All @Priority-P2 Verify the endpoint under subscription page when it dont exceed the limit.", async ({
    io,
    page
  }) => {

    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");
    const payloadFormat = {
      ...getLicensePayload(platformLicense),
      tier: 'enterprise',
      expires: "2044-04-10T13:14:33.363Z",
      apiManagement: true
    };

    await io.api.putCall(`v1/test/licenses/${platformLicense._id}`, {
      ...payloadFormat,
      numEndpoints: 6
    });

    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SUBSCRIPTION);  
    await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    await page.waitForLoadState();

    const bgColorList = await io.homePage.getBackgroundColors(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR
    );
    await io.assert.expectArrayToBeInArray(
      bgColorList,
      [
        "rgb(29, 118, 199)",
        "rgb(29, 118, 199)",
        "rgb(29, 118, 199)",
        "rgb(29, 118, 199)",
        "rgb(29, 118, 199)",
        "rgb(29, 118, 199)"
      ],
      "The status is not correctly colored"
    );
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, payloadFormat);
  });
});
