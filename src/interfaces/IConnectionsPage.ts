export interface IConnectionsPage {
  eleAppSelection: any;
  selectApplication(appname: string): Promise<void>;
  fillConnectionForm(data: any): Promise<void>;
  editConnectionForm(data: any, connectionId: string): Promise<void>;
}
