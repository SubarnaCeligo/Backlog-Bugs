export class FlowBuilderPagePO {
  PAGE_GENERATOR = '[data-test="addGenerator"]';
  EXPORT_TRANSFORMATION = '[data-test="exportTransformation"]';
  TRANSFORM_GENERATE_MAP = '[data-test="generate-';
  TRANSFORM_DESTINATION_MAP = "#extract-";
  PAGE_PROCESSOR = '[data-test="addProcessor"]';
  DATA_PROCESSOR = '[data-test="addDataProcessor"]';
  EXPORT_FILTER = '[data-test="exportFilter"]';
  FILTER_CONTAINER = 'select[name$="_filter"]';
  FILTER_OPERATOR = 'select[name$="_operator"]';
  FILTER_VALUE = 'input[name$="_value_0"]';
  EXPORT_HOOK = '[data-test="exportHooks"]';
  ADD_SCRIPT = '[data-test="preSavePage.script"]';
  SCRIPT_CONTENT = "#content-inline";
  SCRIPT_NAME = '[name="script-preSavePage"]';
  EXPORT_SCHEDULE = '[data-test="exportSchedule"]';
  EXPORT_SCHEDULE_START_TIME = '[data-test="startTime"]';
  EXPORT_SCHEDULE_END_TIME = '[data-test="endTime"]';
  APP_NAME_INPUT = '[data-test="application"] input[id*="react-select-"]';
  ADD_RULE = '[data-add="rule"]';
  DESTINATION_MAPPING = '[data-test="text-fieldMappingGenerate-';
  SOURCE_MAPPING = '[data-test="text-fieldMappingExtract-';
}
