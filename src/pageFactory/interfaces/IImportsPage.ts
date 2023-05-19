export interface IImportsPage {
  fillImportForm(jsonData: any): Promise<void>;
  editImportForm(jsonData: any, importId: string):Promise<void>;
}