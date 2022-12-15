const { XMLParser } = require("fast-xml-parser");

const xmlparser = (xml) => {
  const options = {
    ignoreAttributes: false,
    ignoreNameSpace: false,
  }
  const parser = new XMLParser(options);
  const jsObj = parser.parse(xml);
  return jsObj;
}

module.exports = { xmlparser }