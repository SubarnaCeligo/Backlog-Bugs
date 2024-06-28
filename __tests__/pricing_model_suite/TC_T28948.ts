import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("T28948 Verify the audit log retention if user set the value from API", () => {
  test("T28948 @Zephyr-IO-T28948  @Env-All @Priority-P2 Verify the audit log retention if user set the value from API", async ({
    io,
    page
  }) => {
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");
    const payloadFormat = {
      ...getLicensePayload(platformLicense),
      expires: "2044-04-10T13:14:33.363Z",
      apiManagement: true
    };

    await io.homePage.addStep(
      "Updating license to enterprise tier with 2 years audit log retention period."
    );
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, {
      ...payloadFormat,
      tier: "enterprise",
      auditLogRetentionYears: 2
    });

    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.myAccountPagePO.AUDIT_LOG);
    await page.waitForLoadState("load", { timeout: 90000 });

    await page.locator("button").filter({ hasText: "Download" }).click();
    await io.homePage.clickByText("Custom");

    for (let i = 0; i < 24; i++) {
      await io.flowBuilder.click(selectors.flowBuilderPagePO.CALENDER_PREVIOS);
    }

    let buttonList = await page.$$(
      selectors.flowBuilderPagePO.CALENDER_DAY_SELECTOR
    );

    let startDate;
    for (const button of buttonList) {
      const isDisabled = await button.evaluate(button =>
        button.classList.contains("rdrDayDisabled")
      );
      if (!isDisabled) {
        startDate = button;
        break;
      }
    }
    await startDate.click();
    await io.homePage.addStep(
      "Selected start date as 2 years before from today."
    );

    for (let i = 0; i < 24; i++) {
      await io.flowBuilder.click(selectors.flowBuilderPagePO.CALENDAR_NEXT);
    }

    buttonList = await page.$$(selectors.flowBuilderPagePO.CALENDER_DAY_SELECTOR);

    let endDate;
    for (const button of buttonList) {
      const isDisabled = await button.evaluate(button =>
        button.classList.contains("rdrDayDisabled")
      );
      if (isDisabled) {
        break;
      }
      endDate = button;
    }
    await endDate.click();
    await io.homePage.addStep("Selected end date as today.");

    await io.homePage.addStep("Capturing api request for requesting audit logs.");
    const req = page.waitForRequest(request =>
      request.url().includes("/api/audit/signedURL")
    );
    await io.homePage.addStep("Clicking Download button.");
    await page.locator("button").filter({ hasText: "Download" }).last().click();

    const finalReq = await req;

    const fromDate = new Date(finalReq.url().split("=")[1]).valueOf();
    const today = new Date().valueOf();

    expect(today - fromDate).toBeGreaterThanOrEqual(
      1000 * 60 * 60 * 24 * 365 * 2
    );
    await io.homePage.addStep(
      "Verified. Able to request audit logs of 2 years from UI."
    );

    await io.homePage.addStep("Reverting license changes.");
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, payloadFormat);
  });
});
