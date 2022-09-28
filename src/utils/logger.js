const log4js = require("log4js");
const env = require("../config/config");

log4js.configure({
  appenders: {
    consola: { type: "console" },
    warnLogs: { type: "file", filename: "warn.log" },
    erroLogs: { type: "file", filename: "error.log" },
    loggerConsola: {
      type: "logLevelFilter",
      appender: "consola",
      level: "info"
    },
    loggerWarn: { type: "logLevelFilter", appender: "warnLogs", level: "warn" },
    loggerError: {
      type: "logLevelFilter",
      appender: "erroLogs",
      level: "error"
    }
  },
  categories: {
    default: {
      appenders: ["loggerConsola", "loggerWarn", "loggerError"],
      level: "all"
    }
  }
});

let logger = null;

if (env.node_env === "PROD") {
  logger = log4js.getLogger("prod");
} else {
  logger = log4js.getLogger();
}

module.exports = logger;
