export interface IFlowBuilderPage {
  elePGButton;
  eleAppSelection;
  navigateToFlows(): Promise<void>;
  fillFlowsForm(jsonData: any): Promise<void>;
  addPageGenerator(jsonData: any): Promise<void>;
  addPageProcessor(jsonData: any): Promise<void>;
  loadTemplate(appName, obj, type): Promise<any>;
  selectApplication(appname: string, connname: string): Promise<void>;
  updateImportMappings(map: Map<any, any>): Promise<void>;
  enableFlow(): Promise<void>;
  disableFlow(): Promise<void>;
  waitForFlowToComplete(): Promise<void>;
  runFlow(): Promise<void>;
  deleteFlow(): Promise<void>;
  refreshErrorsDashboard(): Promise<boolean>;
  navigateToJobErrorDashboard(jobName: string): Promise<void>;
  navigateToEm2Flow(flowID: string, flowType: string): Promise<void>;
  waitForErrorMsgToAppear(): Promise<void>;
  waitTillColumnsAppear(num: number): Promise<void>;
  changeErrorDrawerView(): Promise<void>;
  openErrorDetailsSection(): Promise<void>;
  clickButtonAtTopOfArray(locator: string): Promise<void>;
  closeErrorModalPopup(): Promise<void>;
  navigateToFlowBuilderInEM2(flowID): Promise<void>;
}