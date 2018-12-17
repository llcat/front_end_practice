const convert = require('xml-js');
const fs = require('fs');
const crlf = require('crlf')

module.exports = {
    loadXml: function (filePath) {
        let fsStats = fs.statSync(filePath);
        let xmlData = null;
        if(fsStats.isDirectory()){
            console.log("please select a file");
        }else {
            xmlData = fs.readFileSync(filePath, "utf8");
        }
        return xmlData;
    },
    convertXmlToObject: function (xml) {
        let obj = convert.xml2js(xml,{compact:true, spaces:2});
        return obj;
    },
    convertObjectToXml: function (obj) {
        let xml = convert.js2xml(obj, {compact: true, spaces:2});
        return xml;
    },
    checkFileData(data) {
        let regex = /<\/configuration>/g
        return (data.toLowerCase().search(regex))!=-1?true:false
    },
    saveXmlFile(path,data) {
        if(data && path){
            fs.writeFileSync(path, data, "utf8");
            crlf.set(path,"CRLF",function(err,endingType){
                console.log(endingType)
            })
        }
    },
    getTemplateConfiguration(){
        let data = `
<CONFIGURATION NAME="HDD FirmwareTable">
  <DECLARATION NAME="T1">
    <INSTANCE>
      <PROPERTY NAME="ModelFirmware" TYPE="string" MATCHCASE="false" COMPARISON="Include">
        <VALUE></VALUE>
      </PROPERTY>
      <PROPERTY NAME="REFERENCE"><VALUE></VALUE></PROPERTY>
    </INSTANCE>
  </DECLARATION>
  <DECLARATION NAME="T2">
    <INSTANCE>
      <PROPERTY NAME="ModelFirmware" TYPE="string" MATCHCASE="false" COMPARISON="Include">
        <VALUE></VALUE>
      </PROPERTY>
    </INSTANCE>
  </DECLARATION>      
</CONFIGURATION>
`
        return this.convertXmlToObject(data)
    }
}