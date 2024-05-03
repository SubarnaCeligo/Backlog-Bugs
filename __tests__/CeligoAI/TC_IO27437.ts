import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("@Author-Sudhanshukumar T27437 Verify the Knowledge bot icon is Visible on All Screens.", () => {
    test.beforeEach(async ({ io}) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime();
    });
    test.skip("C27437 Verify the Knowledge bot icon is Visible on All Screens. @Epic-IO-69807 @Priority-P2 @Zephyr-IO-T27437 @Zephyr-IO-T27438 @Zephyr-IO-T27439 @Zephyr-IO-T27440 @Zephyr-IO-T27441 @Zephyr-IO-T27442 @Zephyr-IO-T27443 @Zephyr-IO-T27444 @Zephyr-IO-T27445 @Zephyr-IO-T27446 @Zephyr-IO-T27447 @Zephyr-IO-T27448 @Zephyr-IO-T27449 @Zephyr-IO-T27450 @Env-QA", async ({ io, page, context }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON);
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.exportsPage.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_ICON, "Knowledge bot icon is not displayed");
        await io.flowBuilder.hover(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_ICON);
        //IO-T27439
        await io.assert.verifyElementDisplayedByText('Celigo AI', 'Celigo AI is not displayed"');
        //IO-T27438
        await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_ICON);
        await io.exportsPage.loadingTime();
        await expect(page.getByText("Welcome to Celigo AI")).toBeVisible();
        await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT);
        await io.homePage.click(selectors.basePagePO.CHAT_BOT);
        await expect(page.getByText("Welcome to Celigo AI")).not.toBeVisible();
        await io.assert.verifyElementDisplayedByText('Submit a ticket', 'Submit a ticket is not displayed"');
        await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_ICON);
        await expect(page.getByText("Submit a ticket")).not.toBeVisible();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_COLLAPSE, "Knowledge bot collapse icon is not displayed");
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_CLOSE, "Knowledge bot close icon is not displayed");
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_INPUT, "Knowledge bot input is not displayed");
        await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_INPUT, "placeholder", "What would you like to learn about our features?");
        await io.assert.expectToBeTrue(await (await page.$(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_SEND)).isDisabled(), "Send is not disabled");
        await io.importsPage.fill(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_INPUT, "What is Transformation, Mapping, Filter, Javascript,Hooks, Aliases, Audit log, Response mapping,Output Filter");
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_SEND, "Knowledge bot send button is not displayed");
        await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_SEND);
        //IO-T27445
        await io.assert.verifyElementDisplayedByText('Thinking', 'Thinking is not displayed"');
        await io.exportsPage.loadingTime();
        // IO-T27442
        await io.assert.verifyElementDisplayedByText('Oh no! Timeout error', 'Timeout error not displayed"');
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_RETRY, "Knowledge bot Retry Query button is not displayed");
        await io.homePage.reloadPage();
        await expect(page.getByText("Oh no! Timeout erro")).not.toBeVisible();
        await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_ICON);
        await io.importsPage.fill(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_INPUT, "I'm facing issues with updating the export schema via API in Celigo Integrator IO. Can you guide me on how to update the export schema programmatically? Additionally, I encountered an error stating 'Element value exceeds the fixed length of 30'. How is it possible that records are imported successfully when the Success status is marked as N/A?Furthermore, in Microsoft Dynamics 365 Business Central, I'm encountering the error message Activity was deadlocked with another user. What steps should I take to resolve this deadlock issue? In another integration scenario involving Salesforce real-time exports, I'm encountering the error Integrator Distributed Adaptor package not installed. How can I fix this error and ensure smooth real-time data exports from Salesforce?Moreover, I'm encountering JavaScript errors in a filter or hook within Celigo Integrator IO. What are the common causes of such errors, and how can they be resolved effectively?Lastly, while working with handlebars templates, I encountered a parse err");
        //IO-T27446 1024 Char
        await io.assert.verifyElementDisplayedByText('You have reached the maximum of 1024 characters', '1024 Error message is not displayed"');
        await io.importsPage.fill(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_INPUT, "What is Flow in IO");
        await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_SEND);
        await io.exportsPage.loadingTime();
        await expect(page.getByText("transfer of data between")).toBeVisible();
        const exportFunction = page.getByText('Anything else Celigo AI can help with?').nth(0);
        while (!(await exportFunction.isVisible())) {
            await page.mouse.wheel(0, 800);
        }
        await io.exportsPage.loadingTime();
        //user can provide feedback thumbs up IO-T27448
        await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_YES);
        await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_YES)).toHaveAttribute('color', '#5CB85C');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_NO);
        await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_NO)).toHaveAttribute('color', '#FF3C3C');
        // IO-T27449
        await io.flowBuilder.clickByText("Understand the Salesforce - NetSuite dependent flows");
        await io.homePage.loadingTime()
        const allPages = context.pages();
        await allPages[1].bringToFront();
        await allPages[1].waitForLoadState();
        const currentUrl = await allPages[1].url();
        const expectedUrl = 'Understand-the-Salesforce-NetSuite-dependent-flows';
        const func = currentUrl.toString().includes(expectedUrl)
        await io.assert.expectToBeTrue(func, "urls doesn't match")
        await allPages[0].bringToFront();
        await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_CLOSE);
        // Imports in Resources IO-T27072
        await io.homePage.goToMenu("Resources", "Imports");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON, "Flow description is not displayed");
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_ICON, "Knowledge bot icon is not displayed");
        // Exports in Resources
        await io.homePage.goToMenu("Resources", "Exports");
        await io.exportsPage.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.FLOW_DESCRIPTION_BUTTON, "Flow description is not displayed");
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.KNOWLEDGE_BOT_ICON, "Knowledge bot icon is not displayed");
    });
});



