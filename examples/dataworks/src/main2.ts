import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { createLanguageModel, processRequests, createProgramTranslator, getData } from "typechat";

dotenv.config({ path: path.join(__dirname, "../../../.env") });

const model = createLanguageModel(process.env);
const schema = fs.readFileSync(path.join(__dirname, "dataworksProgramSchema.ts"), "utf8");
const translator = createProgramTranslator(model, schema);

// Process requests interactively or from the input file specified on the command line
processRequests("DataWorks Copilot > ", process.argv[2], async (request) => {
    const response = await translator.translate(request);
    if (!response.success) {
        console.log(response.message);
        return;
    }
    const program = response.data;
    console.log(getData(translator.validator.createModuleTextFromJson(program)));
    //console.log("Running program:");
    //const result = await evaluateJsonProgram(program, handleCall);
    //console.log(`Result: ${typeof result === "number" ? result : "Error"}`);
});
