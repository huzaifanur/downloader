//https://www.winmarkremote.com/reports/Reserved.ReportViewerWebPart.axd?ReportSession=jp3i0nbpqzeiefqyxsclbq55&Culture=1033&CultureOverrides=True&UICulture=1033&UICultureOverrides=True&ReportStack=1&ControlID=02da760e4a0e40518b71c5b71133fea5&OpType=Export&FileName=Item+Buy+Detail&ContentDisposition=OnlyHtmlInline&Format=CSV

const fs = require("fs");

function getData(data) {
  try {
    const sessionPattern = /"KeepAliveBody":"([^"]+)"/;
    const reportSession = data.match(sessionPattern);
    const sessoinID = reportSession[1];

    const regexPattern = /ControlID=([^\\"]+)/;
    const match = data.match(regexPattern);
    const controlID = match[1];

    const pl = {
      sessoinID,
      controlID,
    };
    //console.log({ pl });
    return pl;
  } catch (error) {
    console.error("Error reading file:", error.message);
    return null;
  }
}

module.exports = { getData };
