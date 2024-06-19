import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

// function isWithinFiveMinutes(timeString: string): boolean {
//   const inputTime = new Date(timeString);
//   inputTime.toLocaleString('en-US', { timeZone: 'UTC' });
//   const currentTime = new Date();
//   currentTime.toLocaleString('en-US', { timeZone: 'UTC' });
//   const diffInMs = Math.abs(currentTime.getTime() - inputTime.getTime());
//   const diffInMinutes = diffInMs / (1000 * 60);
//   console.log({
//     timeString,
//     currentTime,
//     diffInMinutes,
//     diffInMs
//   })
//   return diffInMinutes <= 5;
// }

function isWithinFiveMinutes(timeString: string): boolean {
    const inputTime = new Date(timeString);
    const utcInputTime = new Date(inputTime.toUTCString()); // Convert to UTC string and then parse back to Date
    const currentTime = new Date();
    const utcCurrentTime = new Date(currentTime.toUTCString()); // Convert to UTC string and then parse back to Date
  
    const diffInMs = Math.abs(utcCurrentTime.getTime() - utcInputTime.getTime());
    const diffInMinutes = diffInMs / (1000 * 60);
  
    console.log({
      timeString,
      utcInputTime,
      utcCurrentTime,
      diffInMinutes,
      diffInMs
    });
  
    return diffInMinutes <= 5;
  }

test.describe("C108853", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("C108853 @Env-QA", async ({ io, page }) => {
    await io.homePage.addStep("*** Navigated to home page ***");
    await io.homePage.goToMenu("Resources", "Templates");
    await io.homePage.addStep("*** Navigated to templates page ***");
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, "C108853");

    const previousTimeString = await (
        await page.$(selectors.myAccountPagePO.RELATIVE_DATE_TIME)
      ).evaluate(el => el.textContent);

    await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.flowBuilder.clickByText("Upload template zip");
    let fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles("testData/inputData/Templates/C108853.zip");
    await io.flowBuilder.loadingTime();
    const timeString = await (
      await page.$(selectors.myAccountPagePO.RELATIVE_DATE_TIME)
    ).evaluate(el => el.textContent);
    
    // expect(isWithinFiveMinutes(timeString)).toBeTruthy();
    expect(previousTimeString).not.toEqual(timeString);
  });
});
