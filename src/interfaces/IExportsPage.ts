export interface IExportsPage {
  fillQueryParameters(map: Map<any, any>): Promise<void>;
  selectConnection(connectionName: string): Promise<void>;
  fillExportForm(jsonData: any): Promise<void>;
  editExportForm(jsonData: any, exportId: string): Promise<void>;
}
