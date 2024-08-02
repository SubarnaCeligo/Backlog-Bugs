import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"311_Multifilter_AND_OR_Operator_equals_notequals_greaterthan",
"313_Multifilter_GROUP_NOT_Operator_equals_notequals",
"314_Filter_Rows_Data",
"316_FTPExport_GroupedData_InputFilter",
"317_InputFilter_With_Rows_Data_With_NS_Export",
"318_InputFilter_With_Record_Data_With_NS_Export",
"487_FTP_SortByFields_Descending_To_FTP_Import",
"488_FTP_SortByFields_Ascending_To_FTP_Import",
"489_FTP_Without_SortAndGroup_To_FTP_Import",
"490_FTP_GroupByFields_To_FTP_Import",
"491_FTP_SortAndGroup_To_FTP_Import",
"492_FTP_SortAndGroup_NestedJson_To_FTP_Import",
"493_FTP_To_FTP_Import_With_Skip_Aggregation_True",
"701_FTP_TO_FTPimport_Dir_path_as_handlebar",
"708_Skip_Row_Validation",
"710_FTP_Export_Encoding_UTF8",
"711_FTP_Export_Encoding_WIN1252",
"C20794_FTP_Huge_Header_Export_And_Import",
"C37478_FTP_InvalidHandlebarErrorValidation",
"043_Create_81_Sftp_XlSX_To_Netsuite_Customer_Using_FileType_XLSX",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases,"FTP-NS");
})();