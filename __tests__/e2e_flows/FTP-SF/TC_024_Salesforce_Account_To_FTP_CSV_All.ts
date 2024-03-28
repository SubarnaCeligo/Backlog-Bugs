import { test, expect } from "@celigo/ui-core-automation";
import * as SFtoFTP from "@testData/Flows/create/salesforce/43_FTP_Flow_12_SF_to_FTP_CSV.json"

import * as FTPtoFTP from "@testData/Flows/create/ftp/Create_118_FTP_to_FTP_MultifieldExpressions.json"
import * as FTPtoSF from "@testData/Flows/create/ftp/110.FTP_Xml_Export_To_SF_Imp.json"
import NS from "@testData/Flows/create/salesforce/12_SF_Flow_01_SF_Account_to_NS_Cust_All_E2E_with_Verify.json"
import NStoSF from "@testData/Flows/create/netsuite/03.Flow-3-NS-CUST-SF-ACC-UPSERT-AUTO.json"
import * as FTPtoSF1 from "@testData/Flows/create/ftp/103.SF_Flow_FTP_JSON_to_SF_Account_Multifields.json";
import * as SFtoFTP1 from "@testData/Flows/create/salesforce/Create_NS_to_EDI_Macy_870.json"
import * as SFtoFTP2 from "@testData/Flows/create/salesforce/Create_NS_to_Fixedwidth_EDI.json"
import * as SFtoFTP3 from "@testData/Flows/create/salesforce/NS_Export_MultiFIlter_To_FTP_All.json"
import * as FTPtoFTP2 from "@testData/Flows/create/ftp/TC_493_FTP_To_FTP_Import_With_Skip_Aggregation_True.json"
import * as SFtoFTP4 from "@testData/Flows/create/salesforce/TC_642_NS_CustomServerScriptLog_To_FTP.json"
import * as FTPtoS3 from "@testData/Flows/create/ftp/TC15136_FTP_SF_Composite_records.json";
import * as FTPtoFTP5 from "@testData/Flows/create/ftp/TC28689_FTP_Compression_Algorithm.json";
import * as FTPtoFTP6 from "@testData/Flows/create/ftp/TC_C1972_FTP_FTP_EDIFACT_FileDefinition.json"
import * as FTPtoFTP7 from "@testData/Flows/create/ftp/TC_C1976_Verify_Flow_Not_Get_stalled_Corrupted_File_isPresent.json"
import * as FTPtoFTP8 from "@testData/Flows/create/ftp/TC_C2496_FTP_FTP_Edit_File_Definition.json"
import * as FTPtoFTP9 from "@testData/Flows/create/ftp/TC_C2656_FTP_EDI_FTP_EDIT_RowDelimeter.json";
import * as FTPtoFTP10 from "@testData/Flows/create/ftp/TC_C2661_FTP_FTP_EDI_Verify_Composite_Element.json"
import * as FTPtoFTP11 from "@testData/Flows/create/ftp/TC_C2810_Verify_Ftp_import_CSV_with_headers.json"
import * as FTPtoFTP12 from "@testData/Flows/create/ftp/TC_C2810_Verify_Ftp_import_CSV_without_headers.json"
import * as FTPtoFTP13 from "@testData/Flows/create/ftp/TC_C22774_FTP_FTP_File_Handlebars.json"
import * as FTPtoFTP14 from "@testData/Flows/create/ftp/TC_C22867_FTP_FTP_SkipAgg.json"
import * as FTPtoFTP15 from "@testData/Flows/create/ftp/TC_C23023_FTP_TO_FTP_Zip.json"
import * as FTPtoFTP16 from "@testData/Flows/create/ftp/TC_C25871_FTP_EDI_RowDelimeter_R.json"
import * as FTPtoFTP17 from "@testData/Flows/create/ftp/TC_C25873_FTP_FTP_EDI_Verify_ParseData.json"
import * as FTPtoFTP18 from "@testData/Flows/create/ftp/TC_C29587_FTP_Missing_Field_In_Record_Group.json"
import * as FTPtoFTP19 from "@testData/Flows/create/ftp/TC_C29588_FTP_Multiple_Sort_Group_field.json"
import * as FTPtoFTP20 from "@testData/Flows/create/ftp/TC_C30813_C14524_FTP_Sorting_mapping.json"
import * as FTPtoFTP21 from "@testData/Flows/create/ftp/TC_C30821_FTP_SortAndGroup_FTP_CSV_JSON.json";
import * as FTPtoFTP22 from "@testData/Flows/create/ftp/TC_C35980_FTP_Export_FTP_Import.json";
import * as FTP from "@testData/Flows/create/ftp/Create_81_Sftp_XlSX_To_Netsuite_Customer_Using_FileType_XLSX.json"
import NS1 from "@testData/Flows/create/netsuite/TC_311_Multifilter_AND_OR_Operator_equals_notequals_greaterthan.json"
import NS2 from "@testData/Flows/create/netsuite/TC_313_Multifilter_GROUP_NOT_Operator_equals_notequals.json"
import NS3 from "@testData/Flows/create/netsuite/TC_314_filterwithrows.json"
import NS4 from "@testData/Flows/create/ftp/TC_316_FTPExport_GroupedData_InputFilter.json"
import NS5 from "@testData/Flows/create/netsuite/TC_317_InputFilter_With_Rows_Data_With_NS_Export.json"
import NS6 from "@testData/Flows/create/netsuite/TC_318_InputFilter_With_Record_Data_With_NS_Export.json"
import NS7 from "@testData/Flows/create/ftp/TC_487_FTP_SortByFields_Descending_To_FTP_Import.json"
import FTP1 from "@testData/Flows/create/ftp/TC_488_FTP_SortByFields_Ascending_To_FTP_Import.json"
import FTP2 from "@testData/Flows/create/ftp/TC_489_FTP_Without_SortAndGroup_To_FTP_Import.json"
import FTP3 from "@testData/Flows/create/ftp/TC_490_FTP_GroupByFields_To_FTP_Import.json"
import FTP4 from "@testData/Flows/create/ftp/TC_491_FTP_SortAndGroup_To_FTP_Import.json"
import FTP5 from "@testData/Flows/create/ftp/TC_492_FTP_SortAndGroup_NestedJson_To_FTP_Import.json"
import FTP6 from "@testData/Flows/create/ftp/TC_493_FTP_To_FTP_Import_With_Skip_Aggregation_True.json"
import FTP7 from "@testData/Flows/create/ftp/TC_701_FTP_TO_FTPimport_Dir_path_as_handlebar.json"
import FTP8 from "@testData/Flows/create/ftp/TC_708_Skip_Row_Validation.json"
import FTP9 from "@testData/Flows/create/ftp/TC_710_FTP_Export_Encoding_UTF8.json"
import FTP10 from "@testData/Flows/create/ftp/TC_711_FTP_Export_Encoding_WIN1252.json"
import FTP11 from "@testData/Flows/create/ftp/TC_C20794_FTP_Huge_Header_Export_And_Import.json"
import FTP12 from "@testData/Flows/create/ftp/TC_C37478_FTP_InvalidHandlebarErrorValidation.json"

import allure from "allure-playwright";
test.describe.configure({mode:"serial"})
test.describe("E2E Flows", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_024_Salesforce_Account_To_FTP_CSV_All", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            await io.pageGenerator(allure, SFtoFTP);
        });

        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            await io.pageProcessor(allure, SFtoFTP);
        });

        //Save, Enable and Run the Flow
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, SFtoFTP.qa__expectedDashboardCount)
        });
    });

    test("TC_223_Create_118_FTP_to_FTP_MultifieldExpressions", async ({
        io
    }, testInfo) => {

        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            await io.pageGenerator(allure, FTPtoFTP);
        });
        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            await io.pageProcessor(allure, FTPtoFTP);
        });
        //Save, Enable and run the Flow ***
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            //TODO : Save the flow with test title     
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP.qa__expectedDashboardCount)
        });
    });

    test("TC_247_FTP_Xml_Export_To_SF_Import", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator
        await test.step("*** Creating PageGenerator ***", async () => {
            await io.pageGenerator(allure, FTPtoSF);
        });

        //Creating PageProcessor
        await test.step("*** Creating PageProcessor ***", async () => {
            await io.pageProcessor(allure, FTPtoSF);
        });

        //Enable and run the Flow ***
        await test.step("*** Enable and run the Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, FTPtoSF.qa__expectedDashboardCount)
        });
    });

    test("TC_251_FTP_JSON_To_Salesforce_Account_Multifield", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating PageGenerator ***", async () => {
            await io.pageGenerator(allure, FTPtoSF1);
        });

        //Creating PageProcessor
        await test.step("*** Creating PageProcessor ***", async () => {
            await io.pageProcessor(allure, FTPtoSF1);
        });

        //Enable and run the Flow ***
        await test.step("*** Enable and run the Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, FTPtoSF1.qa__expectedDashboardCount)
        });
    });

    test("TC_303_Create_NS_to_EDI_Macy_870", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            await io.pageGenerator(allure, SFtoFTP1);
        });

        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            await io.pageProcessor(allure, SFtoFTP1);
        });

        //Save, Enable and Run the Flow
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, SFtoFTP1.qa__expectedDashboardCount)
        });
    });

    test("TC_304_Create_NS_to_Fixedwidth_EDI", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            await io.pageGenerator(allure, SFtoFTP2);
        });

        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            await io.pageProcessor(allure, SFtoFTP2);
        });

        //Save, Enable and Run the Flow
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, SFtoFTP2.qa__expectedDashboardCount)
        });
    });


    test("TC_308_NS_Export_MultiFIlter_To_FTP_All", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            await io.pageGenerator(allure, SFtoFTP3);
        });

        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            await io.pageProcessor(allure, SFtoFTP3);
        });

        //Save, Enable and Run the Flow
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, SFtoFTP3.qa__expectedDashboardCount)
        });
    });

    test("TC_493_FTP_To_FTP_Import_With_Skip_Aggregation_True1", async ({
        io
    }, testInfo) => {

        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            await io.pageGenerator(allure, FTPtoFTP2);
        });
        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            await io.pageProcessor(allure, FTPtoFTP2);
        });
        //Save, Enable and run the Flow ***
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            //TODO : Save the flow with test title     
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP2.qa__expectedDashboardCount)
        });
    });

    test("TC_642_NS_CustomServerScriptLog_To_FTP", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            await io.pageGenerator(allure, SFtoFTP4);
        });

        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            await io.pageProcessor(allure, SFtoFTP4);
        });

        //Save, Enable and Run the Flow
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, SFtoFTP4.qa__expectedDashboardCount)
        });
    });

    test("TC15136_FTP_SF_Composite_records", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating PageGenerator ***", async () => {
            await io.pageGenerator(allure, FTPtoS3);
        });

        //Creating PageProcessor
        await test.step("*** Creating PageProcessor ***", async () => {
            await io.pageProcessor(allure, FTPtoS3);
        });

        //Enable and run the Flow ***
        await test.step("*** Enable and run the Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, FTPtoS3.qa__expectedDashboardCount)
        });
    });

    test("TC28689_FTP_Compression_Algorithm", async ({
        io
    }, testInfo) => {
        //Creating PageGenerator 
        await test.step("*** Creating PageGenerator ***", async () => {
            await io.pageGenerator(allure, FTPtoFTP5);
        });

        //Creating PageProcessor
        await test.step("*** Creating PageProcessor ***", async () => {
            await io.pageProcessor(allure, FTPtoFTP5);
        });

        //Enable and run the Flow ***
        await test.step("*** Enable and run the Flow *** ", async () => {
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP5.qa__expectedDashboardCount)
        });
    });

    test("TC_C1972_FTP_FTP_EDIFACT_FileDefinition", async ({
        io
    }, testInfo) => {

        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            await io.pageGenerator(allure, FTPtoFTP6);
        });
        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            await io.pageProcessor(allure, FTPtoFTP6);
        });
        //Save, Enable and run the Flow ***
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            //TODO : Save the flow with test title     
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP6.qa__expectedDashboardCount)
        });
    });

    test("TC_C1976_Verify_Flow_Not_Get_stalled_Corrupted_File_isPresent", async ({
        io
    }, testInfo) => {

        //Creating PageGenerator 
        await test.step("*** Creating Page Generator ***", async () => {
            await io.pageGenerator(allure, FTPtoFTP7);
        });
        //Creating PageProcessor
        await test.step("*** Creating Page Processor ***", async () => {
            await io.pageProcessor(allure, FTPtoFTP7);
        });
        //Save, Enable and run the Flow ***
        await test.step("*** Save, Enable And Run The Flow *** ", async () => {
            //TODO : Save the flow with test title     
            await io.flowBuilder.saveandRunFlow(testInfo.title)
            await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP7.qa__expectedDashboardCount)
        });
    });

    test("TC_C2496_FTP_FTP_Edit_File_Definition", async ({
        io
        }, testInfo) => {
    
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTPtoFTP8);
            });
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTPtoFTP8);
            });
            //Save, Enable and run the Flow ***
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                //TODO : Save the flow with test title     
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP8.qa__expectedDashboardCount)
            });
        });

        test("TC_C2656_FTP_EDI_FTP_Editing_RowDelimeter", async ({
            io
        }, testInfo) => {
    
            //Creating PageGenerator 
            await test.step("*** Creating PageGenerator ***", async () => {
                await io.pageGenerator(allure, FTPtoFTP9);
            });
            //Creating PageProcessor
            await test.step("*** Creating PageProcessor ***", async () => {
                await io.pageProcessor(allure, FTPtoFTP9);
            });
            //Enable and run the Flow ***
            await test.step("*** Enable and run the Flow *** ", async () => {
                //TODO : Save the flow with test title     
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP9.qa__expectedDashboardCount)
            });
        });

        test("TC_C2661_FTP_FTP_EDI_Verify_Composite_Element", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTPtoFTP10);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTPtoFTP10);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP10.qa__expectedDashboardCount)
            });
        });

        test("TC_C2810_Verify_Ftp_import_CSV_with_headers", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTPtoFTP11);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTPtoFTP11);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP11.qa__expectedDashboardCount)
            });
        });

        test("TC_C2810_Verify_Ftp_import_CSV_without_headers", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTPtoFTP12);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTPtoFTP12);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP12.qa__expectedDashboardCount)
            });
        });

        test("TC_C22774_FTP_FTP_File_Handlebars", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTPtoFTP13);
            });
            
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTPtoFTP13);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP13.qa__expectedDashboardCount)
            });
        });

        test("TC_C22867_FTP_FTP_SkipAggs", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTPtoFTP14);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTPtoFTP14);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP14.qa__expectedDashboardCount)
            });
        });

        test("TC_C23023_FTP_To_FTP_skipagg_Zip.ts-SF/", async ({
            io
        }, testInfo) => {
    
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTPtoFTP15);
            });
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTPtoFTP15);
            });
            //Save, Enable and run the Flow ***
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                //TODO : Save the flow with test title     
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP15.qa__expectedDashboardCount)
            });
        });

        test("TC_C25871_FTP_EDI_RowDelimeter_CR", async ({
            io
        }, testInfo) => {
    
            //Creating PageGenerator 
            await test.step("*** Creating PageGenerator ***", async () => {
                await io.pageGenerator(allure, FTPtoFTP16);
            });
            //Creating PageProcessor
            await test.step("*** Creating PageProcessor ***", async () => {
                await io.pageProcessor(allure, FTPtoFTP16);
            });
            //Enable and run the Flow ***
            await test.step("*** Enable and run the Flow *** ", async () => {
                //TODO : Save the flow with test title     
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP16.qa__expectedDashboardCount)
            });
        });

        test("TC_C25873_FTP_FTP_EDI_Verify_ParseData", async ({
            io
        }, testInfo) => {
    
            //Creating PageGenerator 
            await test.step("*** Creating PageGenerator ***", async () => {
                await io.pageGenerator(allure, FTPtoFTP17);
            });
            //Creating PageProcessor
            await test.step("*** Creating PageProcessor ***", async () => {
                await io.pageProcessor(allure, FTPtoFTP17);
            });
            //Enable and run the Flow ***
            await test.step("*** Enable and run the Flow *** ", async () => {
                //TODO : Save the flow with test title     
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP17.qa__expectedDashboardCount)
            });
        });

        test("TC_C29587_FTP_Missing_Field_In_Record_Group", async ({
            io
        }, testInfo) => {
    
            //Creating PageGenerator 
            await test.step("*** Creating PageGenerator ***", async () => {
                await io.pageGenerator(allure, FTPtoFTP18);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating PageProcessor ***", async () => {
                await io.pageProcessor(allure, FTPtoFTP18);
            });
    
            //Enable and run the Flow ***
            await test.step("*** Enable and run the Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP18.qa__expectedDashboardCount)
            });
        });

        test("TC_C29588_FTP_Multiple_Sort_Group_field", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTPtoFTP19);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTPtoFTP19);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP19.qa__expectedDashboardCount)
            });
        });

        test("TC_C30813_C14524_FTP_Sorting_mapping", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTPtoFTP20);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTPtoFTP20);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP20.qa__expectedDashboardCount)
            });
        });

        test("TC_C30821_FTP_SortAndGroup_FTP_CSV_JSON", async ({
            io
        }, testInfo) => {
    
            //Creating PageGenerator 
            await test.step("*** Creating PageGenerator ***", async () => {
                await io.pageGenerator(allure, FTPtoFTP21);
            });
            //Creating PageProcessor
            await test.step("*** Creating PageProcessor ***", async () => {
                await io.pageProcessor(allure, FTPtoFTP21);
            });
            //Enable and run the Flow ***
            await test.step("*** Enable and run the Flow *** ", async () => {
                //TODO : Save the flow with test title     
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP21.qa__expectedDashboardCount)
            });
        });

        test("TC_C35980_FTP_To_FTP", async ({
            io
        }, testInfo) => {
    
            //Creating PageGenerator 
            await test.step("*** Creating PageGenerator ***", async () => {
                await io.pageGenerator(allure, FTPtoFTP22);
            });
            //Creating PageProcessor
            await test.step("*** Creating PageProcessor ***", async () => {
                await io.pageProcessor(allure, FTPtoFTP22);
            });
            //Enable and run the Flow ***
            await test.step("*** Enable and run the Flow *** ", async () => {
                //TODO : Save the flow with test title     
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTPtoFTP22.qa__expectedDashboardCount)
            });
        });

        test("TC_043_Create_81_Sftp_XlSX_To_Netsuite_Customer_Using_FileType_XLSX", async ({
            io
        },testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating PageGenerator ***", async () => {
                await io.pageGenerator(allure, FTP);
            });
            //Creating PageProcessor
            await test.step("*** Creating PageProcessor ***", async () => {
                await io.pageProcessor(allure, FTP);
            });
            //Enable and run the Flow ***
            await test.step("*** Enable and run the Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title);
                await io.api.validateJobCountFromAPI(testInfo.title, FTP.qa__expectedDashboardCount)
            });
        });

        test("TC_311_Multifilter_AND_OR_Operator_equals_notequals_greaterthan", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, NS1);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, NS1);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, NS1.qa__expectedDashboardCount)
            });
        });

        test("TC_313_Multifilter_GROUP_NOT_Operator_equals_notequals", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, NS2);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, NS2);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, NS2.qa__expectedDashboardCount)
            });
        });

        test("TC_314_Filter_Rows_Data", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, NS3);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, NS3);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, NS3.qa__expectedDashboardCount)
            });
        });

        test("TC_316_FTPExport_GroupedData_InputFilter", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, NS4);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, NS4);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, NS4.qa__expectedDashboardCount)
            });
        });

        test("TC_317_InputFilter_With_Rows_Data_With_NS_Export", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, NS5);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, NS5);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, NS5.qa__expectedDashboardCount)
            });
        });

        test("TC_318_InputFilter_With_Record_Data_With_NS_Export", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, NS6);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, NS6);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, NS6.qa__expectedDashboardCount)
            });
        });

        test("TC_487_FTP_SortByFields_Descending_To_FTP_Import", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, NS7);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, NS7);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, NS7.qa__expectedDashboardCount)
            });
        });

        test("TC_488_FTP_SortByFields_Ascending_To_FTP_Import", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTP1);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTP1);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTP1.qa__expectedDashboardCount)
            });
        });

        test("TC_489_FTP_Without_SortAndGroup_To_FTP_Import", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTP2);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTP2);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTP2.qa__expectedDashboardCount)
            });
        });

        test("TC_490_FTP_GroupByFields_To_FTP_Import", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTP3);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTP3);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTP3.qa__expectedDashboardCount)
            });
        });

        test("TC_491_FTP_SortAndGroup_To_FTP_Import", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTP4);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTP4);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTP4.qa__expectedDashboardCount)
            });
        });

        test("TC_492_FTP_SortAndGroup_NestedJson_To_FTP_Import", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTP5);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTP5);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTP5.qa__expectedDashboardCount)
            });
        });

        test("TC_493_FTP_To_FTP_Import_With_Skip_Aggregation_True", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTP6);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTP6);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTP6.qa__expectedDashboardCount)
            });
        });

        test("TC_701_FTP_TO_FTPimport_Dir_path_as_handlebar", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTP7);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTP7);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTP7.qa__expectedDashboardCount)
            });
        });

        test("TC_708_Skip_Row_Validation", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTP8);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTP8);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTP8.qa__expectedDashboardCount)
            });
        });

        test("TC_710_FTP_Export_Encoding_UTF8", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTP9);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTP9);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTP9.qa__expectedDashboardCount)
            });
        });

        test("TC_711_FTP_Export_Encoding_WIN1252", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTP10);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTP10);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTP10.qa__expectedDashboardCount)
            });
        });

        test("TC_C20794_FTP_Huge_Header_Export_And_Import", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTP11);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTP11);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTP11.qa__expectedDashboardCount)
            });
        });

        test("TC_C37478_FTP_InvalidHandlebarErrorValidation", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, FTP12);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, FTP12);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, FTP12.qa__expectedDashboardCount)
            });
        });

        test("TC_C27003 Verify api/profile should return authTypeSSO", async ({
            io
          }, testInfo) => {
            await test.step("*** GET /profile and validate ***", async () => {
              const profileResponse = await io.api.getCall("api/profile");
              await io.flowBuilder.loadingTime();
              let flag = await profileResponse.hasOwnProperty("authTypeSSO")
              await io.assert.expectToBeTrue(
                flag,
                "authType SSO key is not present in Profile response"
              );
            });
          });

          test("TC_059_SF_ACC_TO_NS_CUST_ADD", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, NS);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, NS);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, NS.qa__expectedDashboardCount)
            });
        });

        test("TC_076_NS-CUST-SF-ACC-UPSERT", async ({
            io
        }, testInfo) => {
            //Creating PageGenerator 
            await test.step("*** Creating Page Generator ***", async () => {
                await io.pageGenerator(allure, NStoSF);
            });
    
            //Creating PageProcessor
            await test.step("*** Creating Page Processor ***", async () => {
                await io.pageProcessor(allure, NStoSF);
            });
    
            //Save, Enable and Run the Flow
            await test.step("*** Save, Enable And Run The Flow *** ", async () => {
                await io.flowBuilder.saveandRunFlow(testInfo.title)
                await io.api.validateJobCountFromAPI(testInfo.title, NStoSF.qa__expectedDashboardCount)
            });
        });
});