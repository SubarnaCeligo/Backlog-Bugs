import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C55446 from '@testData/FlowDebugger/C55446.json';
import C55445_mockData from '@testData/FlowDebugger/C55445_mockData.json';

test.describe("C55446 Verify the data size limit for each flow step should be maximum 1 MB - lookup", () => {
    test("@Env-All @Zephyr-IO-T14448 C55446 Verify the data size limit for each flow step should be maximum 1 MB - lookup", async ({io, page}) => {
        await io.createResourceFromAPI(C55446, "FLOWS");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
        await io.flowBuilder.fill('#mockOutput .ace_text-input', JSON.stringify(C55445_mockData));
        const mockOutputErrorDiv = await page.$('#mockOutput .MuiFormHelperText-root');
        expect(mockOutputErrorDiv).toBe(null)
    });
});