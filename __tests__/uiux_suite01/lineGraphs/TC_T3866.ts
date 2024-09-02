import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`Verify X-axis should be in hours)`, () => {
    test(`@Env-All @Zephyr-IO-T3866 Verify X-axis should be in hours)`, async ({ io, page }) => {
        await io.createResourceFromAPI(testData, "FLOWS");
        await io.homePage.click(selectors.basePagePO.RUNFLOW);
        await io.flowBuilder.delay(1000);
        await io.homePage.click(selectors.flowBuilderPagePO.LINE_GRAPH_ICON);
        await io.homePage.click(selectors.flowBuilderPagePO.SELECT_DATETYPE_BUTTON);
        await io.homePage.click(selectors.flowBuilderPagePO.SELECT_CUSTOM_DATETYPE);
        await io.flowBuilder.delay(1000);
        // Get the displayed month and year
        const displayedMonthYear = await page.evaluate((selector) => {
            return document.querySelector(selector).textContent;
        }, selectors.flowBuilderPagePO.GET_MONTH);
        // Get the current date, month, and year
        const currentDate = new Date();
        const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
        const currentYear = currentDate.getFullYear().toString();

        // Extract month and year from displayedMonthYear
        var [displayedMonth, displayedYear] = displayedMonthYear.split(' ');

        // Check if we are not in the current month and year
        while (displayedMonth !== currentMonth || displayedYear !== currentYear) {
            // If the displayed year is less than the current year or the displayed month is before the current month, navigate forward
            if (parseInt(displayedYear) < parseInt(currentYear) || (displayedMonth !== currentMonth && parseInt(displayedYear) === parseInt(currentYear))) {
                await io.flowBuilder.delay(1000 * 2);
                await io.homePage.click(selectors.flowBuilderPagePO.SELECT_PREV_MONTH);
            } else {
                // Otherwise, navigate backward
                await io.flowBuilder.delay(1000 * 2);
                await io.homePage.click(selectors.flowBuilderPagePO.SELECT_NEXT_MONTH);
            }

            // Update displayedMonthYear after clicking the button
            const updatedMonthYear = await page.evaluate((selector) => {
                return document.querySelector(selector).textContent;
            }, selectors.flowBuilderPagePO.GET_MONTH);
            [displayedMonth, displayedYear] = updatedMonthYear.split(' ');

            // Adding a delay to ensure the UI updates before the next iteration
            await io.flowBuilder.delay(1000);
        }

        // Get all day buttons
        const dayButtons = await page.$$(selectors.flowBuilderPagePO.GET_DAY);

        // Find today's button and select the previous one (yesterday)
        for (let i = 0; i < dayButtons.length; i++) {
            const classNames = await dayButtons[i].getAttribute('class');
            if (classNames.includes('rdrDayToday')) {
                if (i > 0) {
                    await io.flowBuilder.delay(1000 * 2)
                    await dayButtons[i - 1].click(); // Click on the previous button (yesterday)
                    // await io.flowBuilder.delay(1000*10)
                }
                break;
            }
        }
        //    await io.flowBuilder.delay(1000*10)
        await io.homePage.click(selectors.flowBuilderPagePO.CLICK_APPLY);
        await io.flowBuilder.delay(3000);
        // Verify the time labels in the chart
        const timeLabels = await page.$$eval(
            selectors.flowBuilderPagePO.XAXIS_TEXT,
            elements => elements.map(el => el.textContent)
        );

        // Expected time labels from '00:00' to '23:00'
        const expectedTimeLabels = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0') + ':00');

        // Assertion to check if the time labels match the expected values
        for (let i = 0; i < expectedTimeLabels.length; i++) {
            await io.assert.expectToBeTrue(timeLabels.includes(expectedTimeLabels[i]), `Expected time label ${expectedTimeLabels[i]} not found`);
        }

    });
});
