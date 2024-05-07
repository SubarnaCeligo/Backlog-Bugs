import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C55447 from '@testData/FlowDebugger/C55447.json';
import C55446 from '@testData/FlowDebugger/C55446.json';
import C55447_mockData from '@testData/FlowDebugger/C55447_mockData.json';

test.describe("C55447 Verify the error message when data size is more than 1 MB for export & lookup", () => {
    test("@Env-All @Zephyr-IO-T14449 C55447 Verify for export", async ({io, page}) => {
        await io.createResourceFromAPI(C55447, "FLOWS");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
        await io.flowBuilder.fill('#mockOutput .ace_text-input', JSON.stringify(C55447_mockData));
        const mockOutputErrorDiv = await page.$('#mockOutput .MuiFormHelperText-root');
        const errorText = await mockOutputErrorDiv.innerText();
        expect(errorText).toBe('Mock output cannot be larger than 1 MB. Decrease your data size and try again.')
    });

    test("@Env-All @Zephyr-IO-T14449 C55447 Verify for lookup", async ({io, page}) => {
        await io.createResourceFromAPI(C55446, "FLOWS");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
        await io.flowBuilder.fill('#mockOutput .ace_text-input', JSON.stringify(C55447_mockData));
        const mockOutputErrorDiv = await page.$('#mockOutput .MuiFormHelperText-root');
        const errorText = await mockOutputErrorDiv.innerText();
        expect(errorText).toBe('Mock output cannot be larger than 1 MB. Decrease your data size and try again.')
    });
});