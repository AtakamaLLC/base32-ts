"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCli = void 0;
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const sha1_1 = __importDefault(require("./sha1"));
const fs = __importStar(require("node:fs"));
const decoder_1 = __importDefault(require("../decoder"));
const encoder_1 = __importDefault(require("../encoder"));
const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .usage("Usage: base32 [input_file] [-o output_file] [-d|--decode] [-s|--sha]")
    .option("o", {
    type: "string",
    describe: "Output file",
    default: "-",
})
    .option("d", {
    alias: "decode",
    type: "boolean",
    describe: "Decode input",
})
    .option("s", {
    alias: ["sha", "sha1", "hash"],
    type: "boolean",
    describe: "Hash input",
})
    .option("r", {
    type: "boolean",
    describe: "Recursive hashing",
})
    .option("v", {
    type: "boolean",
    describe: "Version",
})
    .option("h", {
    alias: "help",
    type: "boolean",
    describe: "Help",
})
    .parseSync();
function isTTY(stream) {
    return "isTTY" in stream;
}
function stream(input, output, processor) {
    let out;
    input.on("data", (chunk) => {
        out = processor.update(chunk);
        if (out) {
            output.write(out);
            if (isTTY(input) && isTTY(output))
                output.write("\n");
        }
    });
    input.on("end", () => {
        out = processor.finish();
        if (out)
            output.write(out);
        if (isTTY(output))
            output.write("\n");
    });
}
function hash_file(filename, output) {
    sha1_1.default.file(filename, (err, hash) => {
        if (err && typeof err === "object") {
            if ("dir" in err) {
                if (argv.r || argv.d) {
                    fs.readdir(filename, (err, files) => {
                        if (err) {
                            return process.stderr.write(`base32: ${filename}: ${err.message}\n`);
                        }
                        for (const file of files) {
                            hash_file(`${filename}/${file}`, output);
                        }
                    });
                }
                if (!argv.r && !argv.d && "message" in err) {
                    return process.stderr.write(`base32: ${filename}: ${err === null || err === void 0 ? void 0 : err.message}\n`);
                }
            }
            return;
        }
        output.write(`${hash}  ${filename}\n`);
    });
}
// Your stream and hash_file functions should be defined here
function runCli() {
    if (argv.h) {
        yargs_1.default.showHelp();
        return;
    }
    if (argv.v) {
        console.log("v0.0.2");
        return;
    }
    let processor;
    let input;
    let output;
    if (argv.d || argv.decode) {
        processor = new decoder_1.default();
    }
    else {
        processor = new encoder_1.default();
    }
    if (argv.o && argv.o !== "-") {
        output = fs.createWriteStream(argv.o);
    }
    else {
        output = process.stdout;
    }
    if (argv._.length === 0)
        argv._.push("-");
    if (argv.s || argv.hash || argv.sha || argv.sha1) {
        if (argv._.length === 0)
            argv._ = ["-"];
        for (const filename of argv._) {
            hash_file(`${filename}`, output);
        }
        return;
    }
    for (const filename of argv._) {
        if (filename === "-") {
            input = process.stdin;
            process.stdin.resume();
        }
        else {
            input = fs.createReadStream(`${filename}`);
        }
        stream(input, output, processor);
    }
}
exports.runCli = runCli;
runCli();
//# sourceMappingURL=cli.js.map