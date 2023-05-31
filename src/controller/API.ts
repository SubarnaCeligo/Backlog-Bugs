import { request } from "@playwright/test";
import { decrypt,randomString } from "@utilities/stringUtil";
import { TEST_RESULT } from "../config/configData";

export class API {
    connMap: any;
    integrationMap: any;
    jobID;
    currTime;
    tempJobQueue;
    jobQueue;
    constructor(){
        this.connMap = new Map();
        this.integrationMap = new Map();
        this.tempJobQueue = new Map();
        this.jobQueue = new Map();
    }
    public async createFlowFromAPI(jsonData: any): Promise<any> {
        var pageGen = [],
            pageProc = [],
            flowJSON = {};
        await this.loadConnections();
        await this.loadIntegrations();
        if (
            jsonData.hasOwnProperty("pageGenerators") &&
            jsonData.pageGenerators.length > 0
        ) {
            for (let index = 0; index < jsonData.pageGenerators.length; index++) {
                const exportData = jsonData.pageGenerators[index].qa__export;
                var exportID = await this.createExportorImport(exportData, "export");
                // await test.step(
                //   "Created Export for flow with ID " + exportID,
                //   async () => {
                //     await this.logger("Created Export for flow with ID " + exportID);
                //   }
                // );
                var pg = {
                    _exportId: exportID
                };
                pageGen.push(pg);
                //console.log("page gen",JSON.stringify(pageGen));
            }
        }
        if (
            jsonData.hasOwnProperty("pageProcessors") &&
            jsonData.pageProcessors.length > 0
        ) {
            for (let index = 0; index < jsonData.pageProcessors.length; index++) {
                var pp, importData;
                if (jsonData.pageProcessors[index].hasOwnProperty("qa__export")) {
                    importData = jsonData.pageProcessors[index].qa__export;
                    var ppExportID = await this.createExportorImport(importData, "export");
                    // await test.step(
                    //   "Created Export for flow with ID " + ppExportID,
                    //   async () => {
                    //     await this.logger("Created Export for flow with ID " + ppExportID);
                    //   }
                    // );
                    pp = {
                        responseMapping: {
                            fields: [],
                            lists: []
                        },
                        type: "export",
                        _exportId: ppExportID
                    };
                } else {
                    importData = jsonData.pageProcessors[index].qa__import;
                    var importID = await this.createExportorImport(importData, "import");
                    // await test.step(
                    //   "Created Import for flow with ID " + importID,
                    //   async () => {
                    //     await this.logger("Created Import for flow with ID " + importID);
                    //   }
                    // );
                    pp = {
                        responseMapping: {
                            fields: [],
                            lists: []
                        },
                        type: "import",
                        _importId: importID
                    };
                }
                pageProc.push(pp);
                //console.log("page proc", JSON.stringify(pageProc));
            }
        }
        let EDIT_FLOW = {
            name: "ENTER FLOW NAME",
            disabled: false,
            _integrationId: "",
            skipRetries: false,
            pageProcessors: [],
            pageGenerators: []
        };
        flowJSON = EDIT_FLOW;
        flowJSON["_integrationId"] = this.integrationMap.get("Automation Flows");
        flowJSON["name"] = jsonData["name"];
        flowJSON["pageGenerators"] = pageGen;
        flowJSON["pageProcessors"] = pageProc;

        if (jsonData.hasOwnProperty("export") && jsonData.export.type == "simple") {
            var dlExpID = await this.createExportorImport(jsonData.export, "export");
            var dlImpID = await this.createExportorImport(jsonData.import, "import");
            flowJSON["_exportId"] = dlExpID;
            flowJSON["_importId"] = dlImpID;
            delete flowJSON["pageGenerators"];
            delete flowJSON["pageProcessors"];
        }
        //console.log("FLOWS", JSON.stringify(flowJSON));
        const response = await this.postCall("v1/flows", flowJSON);
        if (jsonData.hasOwnProperty("export") && jsonData.export.type == "simple") {
            delete flowJSON["_exportId"];
            delete flowJSON["_importId"];
        }
        //console.log("res : " + JSON.stringify(response));
        if (response.hasOwnProperty("_id")) {
            // await test.step(
            //   "Created Flow " + response.name + " with " + response._id,
            //   async () => {
            //     await this.logger(
            //       "Created Flow " + response.name + " with " + response._id
            //     );
            //   }
            // );
            console.log(JSON.stringify(response));
            return response._id;
        } else {
            throw new Error(
                "Unable to get response " + JSON.stringify(response.errors)
            );
        }
    }

    public async createExportorImport(body, type) {
        let uri;
        if (type == "export") {
            uri = "v1/exports";
        } else if (type == "import") {
            uri = "v1/imports";
        }
        body.name = "AutomationStandalone_" + (await randomString(5));
        body._connectionId = await this.connMap.get(body._connectionId);
        const response = await this.postCall(uri, body);
        //console.log("res : " + JSON.stringify(response));
        if (response.hasOwnProperty("_id")) {
            return response._id;
        } else {
            var ids = [];
            for (var i = 0; i < response.length; i++) {
                ids.push(response[i]._id);
            }
            return ids;
        }
    }

    public async getCall(endpoint) {
        const context = await request.newContext({
          baseURL: process.env["IO_API_URL"]
        });
        const resp = await context.get(endpoint, {
          headers: {
            Authorization: await decrypt(`${process.env.IO_Token}`)
          }
        });
        if ((await (await resp.text()).length) > 0) {
            return await resp.json();
        }
    }

    public async postCall(endpoint, reqBody) {
        const context = await request.newContext({
          baseURL: process.env["IO_API_URL"]
        });
        const resp = await context.post(endpoint, {
          headers: {
            ContentType: "application/json",
            Authorization: await decrypt(`${process.env.IO_Token}`)
          },
          data: reqBody
        });
        return await resp.json();
    }

    public async putCall(endpoint, reqBody) {
        const context = await request.newContext({
          baseURL: process.env["IO_API_URL"]
        });
        const resp = await context.put(endpoint, {
          headers: {
            ContentType: "application/json",
            Authorization: await decrypt(`${process.env.IO_Token}`)
          },
          data: reqBody
        });
        return await resp.json();
    }

    public async loadConnections() {
        try {
            var response = await this.getCall("v1/connections");
            for (var index in response) {
                var connection_name = response[index]["name"];
                var conn_id = response[index]["_id"];
                this.connMap.set(connection_name, conn_id);
            }

            //console.log("Map for the connection is", this.connMap);
        } catch (error) {
            console.log("Unable to fetch connections", error);
        }
    }

    public async loadIntegrations() {
        try {
            var response = await this.getCall("v1/integrations");
            for (const index in response) {
                var integration_name = response[index]["name"];
                if (integration_name === "Automation Flows") {
                    this.integrationMap.set(integration_name, response[index]["_id"]);
                }
            }

            //console.log("Map for the Integration is",this.connMap)
        } catch (error) {
            console.log("Unable to fetch Integrations", error);
        }
    }

    /****
     * Waits for Flow to be completed and verifies job status in Dashboard
     * @param flowName Name of data flow
     * @param dashBoardCounts Array of Job status count for Success, Error & Ignore
     * @returns Success message of successful or boolean flag if error
     */
    public async verifyFlowStatusThroughAPI(
        flowName: string,
        flowID,
        dashBoardCounts: any
    ): Promise<any> {
        var completeStatus = new Map();
        var status = await this.getFlowStatusThroughAPI(flowID);
        // console.log("$$$$$$$$$", status);
        if (status) {
            completeStatus = await this.verifyFlowCompleteStatusThroughAPI(
                flowName,
                dashBoardCounts
            );
            // console.log("&&&&&&", completeStatus);
            return completeStatus;
        } else {
            // flow not completed within the given time
            return completeStatus.set(false, "[Job Not Found From Dashboard !!]");
        }
    }

    /*****
     * Gets all Queue flows in IO job queue via API and checks if particular flow is in it.
     * @param flowID ID of flow that should be trigerred
     * @returns boolean flag for successful & failure
     ****/
    private async getInQueueFlows(flowID) {
        var flowStatusResponse = null;
        flowStatusResponse = await this.getCall(
            "v1/jobs?status=queued&_flowId=" + flowID
        );
        //console.log("FLOW RESPONSE", flowStatusResponse.data, this.baseURL, TOKEN);
        if (flowStatusResponse !== undefined) {
            if (flowStatusResponse.hasOwnProperty("_id")) {
                //var inqueuesFlows = JSON.parse(flowStatusResponse.data.toString());
                this.jobID = flowStatusResponse._id;
                //console.log("JOB ID", this.jobID);
                return true;
            }
        }
        return false;
    }
    /*****
     * Gets all inprogress flows in IO job queue via API and checks if particular flow is in it.
     * @param flowID ID of flow that should be trigerred
     * @returns boolean flag for successful & failure
     ****/
    private async getInProgressFlows(flowID) {
        var flowStatusResponse = await this.getCall(
            "v1/jobs?status=running&_flowId=" + flowID
        );
        //console.log("FLOW INPROGRESS RESPONSE", flowStatusResponse.data);
        if (flowStatusResponse !== undefined) {
            if (flowStatusResponse.hasOwnProperty("_id")) {
                //var inProgressFlows = JSON.parse(flowStatusResponse.data.toString());
                this.jobID = flowStatusResponse._id;
                //console.log("JOB ID", this.jobID);
                return true;
            }
        }
        return false;
    }

    /*****
     * Gets all Completed flows in IO job queue via API and checks if particular flow is in it.
     * @param flowID ID of flow that should be trigerred
     * @returns boolean flag for successful & failure
     ****/
    private async getCompletedFlows(flowID) {
        var flowStatusResponse = await this.getCall(
            "v1/jobs?status=completed&_flowId=" + flowID
        );
        // console.log("%%%%", flowStatusResponse.data);
        if (flowStatusResponse !== undefined) {
            if (flowStatusResponse.hasOwnProperty("_id")) {
                //var completedflows = JSON.parse(flowStatusResponse.data.toString());
                this.jobID = flowStatusResponse._id;
                //console.log("JOB ID", this.jobID);
                return true;
            }
        }
        return false;
    }
    /*****
     * Verifies when a particular flow gets completed and compares job status count appearing on dashboard
     * @param flowName Name of the flow to be verfied
     * @param dashBoardCounts array of numbers to validate Success, Error & Ignore counts
     * @returns boolean flag for successful or failure
     ****/
    public async verifyFlowCompletedStatusThroughAPI(
        flowName: string,
        dashBoardCounts: number[] = TEST_RESULT.IO_DASHBOARD_JOBCOUNT_FAILURE
    ) {
        var flag = true;
        var time = 0,
            maxWait = 400;
        var id = this.jobID;
        do {
            time += 2;
            await this.delay(500);
            process.stdout.write(". ");

            var jobResponse = await this.getCall("v1/jobs/" + id);
            var job_result = jobResponse.data;
            if (
                job_result.status === "completed" ||
                (job_result.status === "failed" && job_result.hasOwnProperty("numError"))
            ) {
                flag = false;
                break;
            }
        } while (flag && time < maxWait);
        if (flag) {
            return false;
        } else {
            // await test.step(
            //   flowName +
            //     " Flow completed with status => " +
            //     "Success :: " +
            //     job_result.numSuccess +
            //     " | Ignore :: " +
            //     job_result.numIgnore +
            //     " | Err :: " +
            //     job_result.numError,
            //   async () => {
            //     await this.logger(
            //       flowName +
            //         " Flow completed with status => " +
            //         "Success :: " +
            //         job_result.numSuccess +
            //         " | Ignore :: " +
            //         job_result.numIgnore +
            //         " | Err :: " +
            //         job_result.numError
            //     );
            //   }
            // );
            process.stdout.write("\n");
            if (
                job_result.numSuccess >= dashBoardCounts[0] &&
                job_result.numIgnore >= dashBoardCounts[1] &&
                job_result.numError <= dashBoardCounts[2]
            ) {
                return true;
            } else {
                return false;
            }
        }
    }

    /*****
     * Verifies when a particular flow gets completed and compares job status count appearing on dashboard
     * @param flowName Name of the flow to be verfied
     * @param dashBoardCounts array of numbers to validate Success, Error & Ignore counts
     * @returns boolean flag for successful or failure
     ****/
    public async verifyFlowCompleteStatusThroughAPI(
        flowName: string,
        dashBoardCount: any
    ): Promise<any> {
        var flag = true;
        var new_flag = true;
        var resultmap = new Map();
        var V;
        var time = 0,
            maxWait = 400;
        var id = this.jobID;
        do {
            time += 2;
            await this.delay(500);
            process.stdout.write(". ");
            var jobResponse = await this.getCall("v1/jobs/" + id);
            var job_result = jobResponse.data;
            if (
                job_result.status === "completed" ||
                (job_result.status === "failed" && job_result.hasOwnProperty("numError"))
            ) {
                flag = false;
                break;
            }
        } while (flag && time < maxWait);
        if (flag) {
            return resultmap.set(false, ["Job Struck in Queue on Dashboard !!"]);
        } else {
            console.log(
                flowName +
                " Flow completed with status => " +
                "Success :: " +
                job_result.numSuccess +
                " | Ignore :: " +
                job_result.numIgnore +
                " | Err :: " +
                job_result.numError
            );
            process.stdout.write("\n");
            if (
                dashBoardCount.hasOwnProperty("Pages") &&
                job_result.numPagesGenerated != dashBoardCount.pages
            ) {
                new_flag = false;
            }
            V =
                flowName +
                "| " +
                job_result.status +
                " " +
                job_result.numSuccess +
                " " +
                job_result.numIgnore +
                " " +
                job_result.numError +
                "| Pages " +
                job_result.numPagesGenerated +
                "| " +
                job_result.endedAt;
            if (
                job_result.numSuccess == dashBoardCount.successCount &&
                job_result.numIgnore == dashBoardCount.ignoreCount &&
                job_result.numError == dashBoardCount.errorCount &&
                new_flag
            ) {
                // console.log(
                //   "$$$",
                //   job_result.numSuccess,
                //   job_result.numIgnore,
                //   job_result.numError,
                //   dashBoardCount.successCount,
                //   dashBoardCount.ignoreCount,
                //   dashBoardCount.errorCount,
                //   new_flag
                // );
                console.log("Correct Job status from API >> " + [V]);
                return resultmap.set(true, [V]);
            } else {
                // console.log(
                //   "%%%%",
                //   job_result.numSuccess,
                //   job_result.numIgnore,
                //   job_result.numError,
                //   dashBoardCount.successCount,
                //   dashBoardCount.ignoreCount,
                //   dashBoardCount.errorCount,
                //   new_flag
                // );
                console.log("Incorrect Job status from API >> " + [V]);
                return resultmap.set(false, [V]);
            }
        }
    }

    /*****
     * Checks when a particular flow is triggrerred in IO job queue
     * @param flowName Name of flow for which flow status is to be monitored
     * @returns boolean flag for successful or failure
     ****/
    private async getFlowStatusThroughAPI(flowID: string) {
        var inProgressStatus = false;
        var inQueueStatus = false;
        var inCompleteStatus = false;
        var time = 0,
            maxWait = 80;
        do {
            inQueueStatus = await this.getInQueueFlows(flowID);
            if (inQueueStatus) {
                return true;
            }
            inProgressStatus = await this.getInProgressFlows(flowID);
            if (inProgressStatus) {
                return true;
            }
            inCompleteStatus = await this.getCompletedFlows(flowID);
            if (inCompleteStatus) {
                return true;
            }
            time += 2;
            process.stdout.write(".");
            await this.delay(750);
        } while (time <= maxWait);
        if (time > maxWait) {
            console.log(TEST_RESULT.ERR_JOB_COMPLETED_IN_IO_NOT_OK);
            return false;
        }
        return inCompleteStatus;
    }

    /*****
     * Triggers a flow via API in IO and Checks if flow ran
     * @param flowName Name of  Flow to be triggered
     ****/
    public async runBatchFlowViaAPI(flowName: string, flowID) {
        //console.log("Flowname : " + flowName + " | FlowId >> " + flowID);
        var allFlowsResponse = await this.postCall(
            "v1/flows/" + flowID + "/run",
            "{}"
        );
        console.log(
            "Flow - " + flowName + " triggerred | " + JSON.stringify(allFlowsResponse)
        );
        // await test.step(flowName + " triggerred successfully", async () => {
        //   await this.logger(flowName + " triggerred successfully");
        // });
    }

    public async checkJobStatusFromAPI(
        flowName: string,
        flowID: any,
        expectedDashboardCount?: number[]
    ): Promise<void> {
        // run flow from API
        await this.waitForBatchFlowToBeCompleted(
            flowName,
            flowID,
            expectedDashboardCount
        );
    }

    /****
     * Trigger and check status of flows via API
     * @param flowName for triggerring specific flow
     * @param expectedDashBoardCount for validating Dashboard job status counts
     */
    public async waitForBatchFlowToBeCompleted(
        flowName: string,
        flowID,
        expectedDashBoardCount: number[]
    ) {
        await this.runBatchFlowViaAPI(flowName, flowID);
        var ioFlowResult = await this.verifyFlowStatus(
            flowName,
            flowID,
            expectedDashBoardCount
        );
        return ioFlowResult;
    }

    public async verifyFlowStatus(
        flowName: string,
        flowID,
        dashBoardCounts: number[]
    ) {
        var status = await this.getFlowReadyStatusThroughAPI(flowID);
        if (status) {
            var completeStatus = await this.verifyFlowCompletedStatusThroughAPI(
                flowName,
                dashBoardCounts
            );
            if (completeStatus) {
                return TEST_RESULT.JOB_COMPLETED_IN_IO_OK;
            } else {
                return false;
            }
        } else {
            // flow not completed within the given time
            return false;
        }
    }

    /*****
     * Checks when a particular flow is triggrerred in IO job queue
     * @param flowName Name of flow for which flow status is to be monitored
     * @returns boolean flag for successful or failure
     ****/
    private async getFlowReadyStatusThroughAPI(flowID: string) {
        var inProgressStatus = false;
        var inQueueStatus = false;
        var time = 0,
            maxWait = 80;
        do {
            inQueueStatus = await this.getInQueueFlows(flowID);
            if (inQueueStatus) {
                return true;
            }
            inProgressStatus = await this.getInProgressFlows(flowID);
            if (inProgressStatus) {
                return true;
            }
            time += 2;
            process.stdout.write(".");
            await this.delay(750);
        } while (time <= maxWait);
        if (time > maxWait) {
            console.log(TEST_RESULT.ERR_JOB_COMPLETED_IN_IO_NOT_OK);
            return false;
        }
        return inProgressStatus;
    }
    /**
   * Asynchronously waits for the given amount of time.
   * @param time The time to wait, in milliseconds.
   * @returns A Promise that resolves after `time` milliseconds.
   */

    async delay(time: number): Promise<void> {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }

}