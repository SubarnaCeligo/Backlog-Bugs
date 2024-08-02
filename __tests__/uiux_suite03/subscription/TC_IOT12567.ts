import { test, expect } from "@celigo/ui-core-automation";
import payload from "@testData/edi_suite/LicenseUpdate.json";

test.describe("TC_IOT12567 Test to validate the EDI text on subscriptions page if EDI license is disabled", () => {
  test.beforeEach(async ({ io }) => {
    //get licensce ID
    let licenses = await io.api.getCall("v1/licenses");
    let licenseID = licenses[0]._id;
    let type = licenses[0].type;

    // Update license
    let endPoint = "v1/test/licenses/" + licenseID;
    payload.edi = false;
    payload.type = type;
    await io.api.putCall(endPoint, payload);
  });
  test("@Env-All @Zephyr-IO-T12567 C103920 Test to validate the EDI text on subscriptions page if EDI license is disabled", async ({
    io,
    page
  }) => {
    // //Go to Dashboard
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.navigateTo(
      `${process.env["IO_UI_CONNECTOR_URL"]}myAccount/subscription`
    );
    
    await io.homePage.loadingTime();
    const ediTextElement = page.locator("text=EDI");

    const color = await ediTextElement.evaluate(el => {
      return window.getComputedStyle(el).color;
    });
    //Checking color is greyed out for EDI text
    expect(color).toBe("rgb(177, 198, 215)");
  });

  test.afterEach(async ({ io }) => {
    //get licensce ID
    let licenses = await io.api.getCall("v1/licenses");
    let licenseID = licenses[0]._id;
    let type = licenses[0].type;

    // Update license
    let endPoint = "v1/test/licenses/" + licenseID;
    payload.edi = true;
    payload.type = type;
    await io.api.putCall(endPoint, payload);
  });
});
