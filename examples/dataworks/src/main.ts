import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { createLanguageModel, createJsonTranslator, processRequests } from "typechat";
import { DataWorksActions } from './dataworksActionsSchema';

dotenv.config({ path: path.join(__dirname, "../../../.env") });

const model = createLanguageModel(process.env);
const schema = fs.readFileSync(path.join(__dirname, "dataworksActionsSchema.ts"), "utf8");
const translator = createJsonTranslator<DataWorksActions>(model, schema, "DataWorksActions");
//translator.validator.stripNulls = true;

// Process requests interactively or from the input file specified on the command line
processRequests("DataWorks 助手 > ", process.argv[2], async (request) => {
    const response = await translator.translate(request);
    if (!response.success) {
        console.log(response.message);
        return;
    }
    const dataworksActions = response.data;
    console.log(JSON.stringify(dataworksActions, undefined, 2));
    if (dataworksActions.actions.some(item => item.actionType === "unknown")) {
        console.log("I didn't understand the following:");
        for (const action of dataworksActions.actions) {
            if (action.actionType === "unknown") console.log(action.text);
        }
        return;
    }
});
