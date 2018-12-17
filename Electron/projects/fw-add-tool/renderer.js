const xml_util = require('./src/xml_util')
const highlight = require('highlight.js')
const { dialog } = require('electron').remote

const openXMLFile = document.getElementById("open-file")
const openedFilePath = document.getElementById("operate-file-path")
const fileSave = document.getElementById("file-save")
const fileSaveAs = document.getElementById("file-save-as")
const decalarationSelector = document.getElementById("declaration-selector")
const selectedContainer = document.getElementById("selected-container")
const multipleAddOperate = document.getElementById("switch-multiple-operate")
const multipleContainer = document.getElementById("multiple-operate-container")
const multipleSelectedList = document.getElementById("multiple-selected-list")

let saveFilePath = null;
let configurationModel = null;
let selectedList = [];
let isMultiplePlatform = false;

let templateConfiguration = xml_util.getTemplateConfiguration()
let hasReferenceTemplate = templateConfiguration.CONFIGURATION.DECLARATION[0]
let noReferenceTemplate = templateConfiguration.CONFIGURATION.DECLARATION[1]

fileSave.addEventListener("click",(event)=>{
    if(saveFilePath!=null && configurationModel!=null){
        xml_util.saveXmlFile(saveFilePath, xml_util.convertObjectToXml(configurationModel))
        alert("文件保存成功")
    }else{
        alert("不可保存~请检查后再操作!")
    }
})

fileSaveAs.addEventListener("click",(event)=>{
    if(configurationModel!=null){
        let path = dialog.showSaveDialog()
        console.log(path)
        if(path!=undefined){
            xml_util.saveXmlFile(path, xml_util.convertObjectToXml(configurationModel))
            alert("文件另存为成功")
        }
    }else{
        alert("不可另存为~请检查后再操作!")
    }
})

multipleAddOperate.addEventListener("click", (event) => {
    if (!isMultiplePlatform) {
        isMultiplePlatform = true;
        selectedContainer.style.display = "none"
        multipleContainer.style.display = "flex"
        updateMultipleSelectedList()
    } else {
        isMultiplePlatform = false;
        multipleContainer.style.display = "none"
        selectedContainer.style.display = "flex"
    }
})

addInputClear(multipleContainer)

multipleContainer
    .querySelector("#add-multiple-btn")
    .addEventListener("click", (event)=>{
        let model = multipleContainer.querySelector("#model-input").value;
        let fw = multipleContainer.querySelector("#fw-input").value;
        model = model.trim();
        fw = fw.trim();
        multipleContainer.querySelector("#model-input").value = model;
        multipleContainer.querySelector("#fw-input").value = fw;
        selectedList.forEach(s=>{
            handleModelFwAdd(model, fw, s);
        })
    })


openXMLFile.addEventListener("click", (event) => {
    const fileName = dialog.showOpenDialog({
        properties: ["openFile", "promptToCreate"]
    })
    if (fileName) {
        openedFilePath.textContent = `当前打开文件：${fileName[0]}`;
        saveFilePath = fileName[0];
        let data = xml_util.loadXml(fileName[0]);
        updateXmlPreview(data);
        if (xml_util.checkFileData(data)) {
            reOpenCheck();
            configurationModel = xml_util.convertXmlToObject(data);
            updateDeclarationSelector(configurationModel)
            multipleAddOperate.classList.remove("hidden")
            decalarationSelector.insertAdjacentHTML("beforebegin", createDeclarationAddForm())
            document.querySelector("#add-declaration-form button").addEventListener("click", (event) => {
                let declarationInput = document.querySelector("#add-declaration-form input");
                handleAddDeclarationClick(declarationInput.value);
            })
            document.querySelector("#add-declaration-form .img-question").addEventListener("click", (event) => {
                alert("如果Declaration存在Refenence,请按照Declaration>>Reference的格式填入!\neg:SATA 3G>>SATA 6G")
            })
            let removeInput = document.querySelector("#add-declaration-form img")
            removeInput.addEventListener("click", (event) => {
                document.querySelector("#add-declaration-form input").value = "";
                removeInput.classList.add("hidden")
            })
            document.querySelector("#add-declaration-form input").addEventListener("input", (event) => {
                if (event.target.value !== "") {
                    removeInput.classList.remove("hidden")
                } else {
                    removeInput.classList.add("hidden")
                }
            })
        } else {
            reOpenCheck()
            alert(`can't parse ${fileName[0]}`)
        }
    }
})

function updateMultipleSelectedList(){
    let allp = selectedList.map((s)=>{
        return `<p>${s}</p>`
    }).join("")
    multipleSelectedList.innerHTML=`
<h3>已选择:${selectedList.length}个</h3>
<div class="added-container">
${allp}
</div>
`
}
function addInputClear(container) {
    container
        .querySelectorAll(".normal-text-input")
        .forEach(element => {
            element.addEventListener("input", (event) => {
                if (event.target.value !== "") {
                    element.nextElementSibling.classList.remove("hidden")
                } else {
                    element.nextElementSibling.classList.add("hidden")
                }
            })
        })

    container
        .querySelectorAll(".remove-input")
        .forEach(element => {
            element.addEventListener("click", (event) => {
                element.previousElementSibling.value = "";
                element.classList.add("hidden")
            })
        })
}

function reOpenCheck() {
    if (configurationModel) configurationModel = null;
    if (selectedList.length > 0) selectedList = [];
    if (isMultiplePlatform) isMultiplePlatform = false;
    if (decalarationSelector.innerHTML) decalarationSelector.innerHTML = null;
    if (selectedContainer.innerHTML) selectedContainer.innerHTML = null;
    let adf = document.getElementById("add-declaration-form")
    if (adf) adf.remove();
    multipleAddOperate.classList.add("hidden");
    if(multipleSelectedList.innerHTML) multipleSelectedList.innerHTML = null;
}

function updateXmlPreview(xmlData) {
    let codeXml = document.querySelector("#xml-preview pre code");
    codeXml.textContent = xmlData;
    highlight.highlightBlock(codeXml);
}

function createDeclarationAddForm() {
    return `
<div id="add-declaration-form">
  <span>Declaration:</span>
  <input class="normal-text-input" type="text"/>
  <img class="remove-input hidden" src="./assets/png/remove-32.png"/>
  <button class="normal-btn">add</button>
  <img class="img-question" src="./assets/png/question-32.png">
</div>
`
}

function reUpdateDeclarationSelector(configurationModel) {
    updateDeclarationSelector(configurationModel);
    decalarationSelector.querySelectorAll(".declaration").forEach((e) => {
        if (selectedList.includes(e.dataset.name)) {
            e.classList.replace("declaration", "declaration-selected")
        }
    })
}

function updateDeclarationSelector(configurationModel) {
    let selector = "";
    const declarations = configurationModel.CONFIGURATION.DECLARATION
    declarations.forEach(element => {
        let name = `
<div class="declaration" data-name="${element._attributes.NAME}">
  <p>${element._attributes.NAME}</p>
</div>`
        selector += name;
    });
    decalarationSelector.innerHTML = selector

    decalarationSelector.querySelectorAll(".declaration").forEach((e) => {
        e.addEventListener("click", (event) => {
            if (selectedList.find(s => s === e.dataset.name) == undefined) {
                selectedList.push(e.dataset.name)
                e.classList.replace("declaration", "declaration-selected")
                selectedContainer.insertAdjacentHTML("afterbegin", createInstanceContainer(e.dataset.name))
                let instanceContainer = selectedContainer.querySelector(`div[data-name="${e.dataset.name}"]`)
                addInputClear(instanceContainer)
                updateMultipleSelectedList()
                instanceContainer
                    .querySelector("#add-property-btn")
                    .addEventListener("click", (event) => {
                        let model = instanceContainer.querySelector("#model-input").value;
                        let fw = instanceContainer.querySelector("#fw-input").value;
                        model = model.trim();
                        fw = fw.trim();
                        instanceContainer.querySelector("#model-input").value = model;
                        instanceContainer.querySelector("#fw-input").value = fw;
                        let declaration = instanceContainer.dataset.name;
                        handleModelFwAdd(model, fw, declaration)
                    })
                instanceContainer
                    .querySelector("#query-property-btn")
                    .addEventListener("click", (event) => {
                        let condition = instanceContainer.querySelector("#condition-input").value;
                        condition = condition.trim();
                        instanceContainer.querySelector("#condition-input").value = condition;
                        let declaration = instanceContainer.dataset.name;
                        handleConditionQuery(condition, declaration)
                    })
                instanceContainer
                    .querySelector("#reset-query-btn")
                    .addEventListener("click", (event) => {
                        let declaration = instanceContainer.dataset.name
                        let p = findProperty(declaration)
                        updatePropertyContainer(declaration, p)
                    })
                instanceContainer
                    .querySelectorAll(".model-fw-container")
                    .forEach(e => {
                        e.querySelector(".model-fw-delete").addEventListener("click", (event) => {
                            handleDeleteProperty(event.target.dataset)
                            e.remove()
                        })
                    })
            } else {
                selectedList = selectedList.filter(s => s !== e.dataset.name)
                e.classList.replace("declaration-selected", "declaration")
                selectedContainer.querySelector(`div[data-name="${e.dataset.name}"]`).remove()
                updateMultipleSelectedList()
            }
        })
    })
}

function createInstanceContainer(name) {
    const declarations = configurationModel.CONFIGURATION.DECLARATION
    const instance = declarations.find((d) => name === d._attributes.NAME).INSTANCE
    let property = instance.PROPERTY
    if (!Array.isArray(instance.PROPERTY)) {
        property = [instance.PROPERTY]
    }
    let propertyContainer = property.filter(p => p._attributes.NAME === "ModelFirmware")
        .map(p => ({ declaration: name, modelfw: p }))
        .map(createPropertyContainer)
        .join("")
    return `
<div class="instance-container" data-name="${name}">
  <h3 class="instance-title">${name}</h3>
  <div class="property-add-form">
    <div class="form-field-set">
      <div class="form-field">
        <span>model:</span>
        <input id="model-input" class="normal-text-input" name="model" type="text" placeholder="输入model"/>
        <img class="remove-input hidden" src="./assets/png/remove-32.png"/>
      </div>
      <div class="form-field">
        <span>fireware:</span>
        <input id="fw-input" class="normal-text-input" name="fw" type="text" placeholder="输入fw"/>
        <img class="remove-input hidden" src="./assets/png/remove-32.png"/>
      </div>
    </div>
    <div class="form-field">
      <button id="add-property-btn" class="normal-btn" data-name="${name}">add</button>
    </div>
  </div>
  <div class="property-query-form">
    <div class="form-field">
      <span>condition:</span>
      <input id="condition-input" class="normal-text-input" type="text" placeholder="输入model或fw查询"/>
      <img class="remove-input hidden" src="./assets/png/remove-32.png"/>
      <button id="query-property-btn" class="normal-btn" data-name="${name}">query</button>
      <img id="reset-query-btn" class="reset-query" src="./assets/png/reset-32.png"/>
    </div>
  </div>
  ${propertyContainer}
</div>
`
}

function getModelFwList(text) {
    let modelFirewareList = text.split("|").map(function (v) {
        let m = v.split("/")
        if (m[0] && m[1] && m[0] !== "" && m[1] !== "") {
            return {
                model: m[0],
                fw: m[1]
            }
        }
    })
    modelFirewareList = modelFirewareList.filter(mfw => mfw != undefined)
    return modelFirewareList;
}

function convertModelFwListToText(mfwList) {
    let text = mfwList.map(mfw => `${mfw.model}/${mfw.fw}`).join("|")
    return text;
}

function createPropertyContainer(property) {

    let declaration = property.declaration;
    const name = property.modelfw._attributes.NAME
    const value = property.modelfw.VALUE._text;

    let modelFirewareList = getModelFwList(value)

    let modelFwContainer = modelFirewareList.map(mfw => {
        return `
<div class="model-fw-container">
  <p class="model-content">${mfw.model}</p>
  <p class="fw-content">${mfw.fw}</p>
  <button class="model-fw-delete" data-declaration="${declaration}" data-model="${mfw.model}" data-fw="${mfw.fw}">delete</button>
</div>
`
    }).join("")

    let container = `
<div class="property-container" data-declaration="${declaration}">
  <h4>${name}(共计${modelFirewareList.length}个)</h4>
  <div class="all-model-fw">
    ${modelFwContainer}
  </div>
</div>
`
    return container
}

function updatePropertyContainer(declaration, property) {
    let newContainer = createPropertyContainer({ declaration: declaration, modelfw: property })
    let instanceContainer = document.querySelector(`#selected-container div[data-name="${declaration}"]`)
    instanceContainer.querySelector(`div[data-declaration="${declaration}"]`).remove()
    instanceContainer.insertAdjacentHTML("beforeend", newContainer)
    instanceContainer.querySelectorAll(".model-fw-container").forEach(e => {
        e.querySelector(".model-fw-delete").addEventListener("click", (event) => {
            handleDeleteProperty(event.target.dataset)
            e.remove()
        })
    })
}

function findProperty(declaration) {
    let allDeclaration = configurationModel.CONFIGURATION.DECLARATION
    let p = allDeclaration.find(d => d._attributes.NAME === declaration)
    if (Array.isArray(p.INSTANCE.PROPERTY)) {
        p = p.INSTANCE.PROPERTY[0]
    } else {
        p = p.INSTANCE.PROPERTY
    }
    return p;
}

function handleDeleteProperty(dataset) {
    let p = findProperty(dataset.declaration)
    let modelFirewareList = getModelFwList(p.VALUE._text)
    modelFirewareList = modelFirewareList.filter(mfw => {
        if (mfw.model === dataset.model && mfw.fw === dataset.fw) {
            return false;
        } else {
            return true;
        }
    })
    p.VALUE._text = convertModelFwListToText(modelFirewareList)
    let instanceContainer = selectedContainer.querySelector(`div[data-name="${dataset.declaration}"]`)
    let title = instanceContainer.querySelector("h4")
    let index1 = title.textContent.indexOf("计")
    let index2 = title.textContent.indexOf("个")
    let num = Number.parseInt(title.textContent.substring(index1 + 1, index2))
    num = num - 1;
    title.textContent = `${p._attributes.NAME}(共计${num}个)`
    updateXmlPreview(xml_util.convertObjectToXml(configurationModel))
}

function handleConditionQuery(condition, declaration) {
    if (condition !== "") {
        let p = findProperty(declaration)
        p = deepCopy(p)
        let modelFirewareList = getModelFwList(p.VALUE._text)
        modelFirewareList = modelFirewareList.filter(mfw => {
            return (mfw.model.toLowerCase().includes(condition.toLowerCase()) || mfw.fw.toLowerCase().includes(condition.toLowerCase()))
        })
        let text = convertModelFwListToText(modelFirewareList)
        p.VALUE._text = text;
        updatePropertyContainer(declaration, p)
    } else {
        alert("请输入查询条件~")
    }
}

function handleModelFwAdd(model, fw, declaration) {
    if (model !== "" && fw !== "") {
        let p = findProperty(declaration)
        if (!checkModelFwExist(model, fw, p.VALUE._text)) {
            p.VALUE._text = `${model}/${fw}|${p.VALUE._text}`
            updatePropertyContainer(declaration, p)
            updateXmlPreview(xml_util.convertObjectToXml(configurationModel));
        } else {
            alert(`Declaration:${declaration}\nmodel:${model}\nfw:${fw}\n已存在!`)
        }
    } else {
        alert("请输入合理的model和fw")
    }
}

function checkModelFwExist(model, fw, all) {
    let modelFirewareList = getModelFwList(all)
    return modelFirewareList.findIndex(mfw => mfw.model === model && mfw.fw === fw) > -1
}

function handleAddDeclarationClick(value) {
    if (value !== "") {
        let r = handleValue(value);
        if (r.declaration != null) {
            if (!checkDeclarationExist(r.declaration)) {
                let template = {};
                if (r.reference != null) {
                    template = deepCopy(hasReferenceTemplate);
                    template._attributes.NAME = r.declaration;
                    template.INSTANCE.PROPERTY[0].VALUE._text = "";
                    template.INSTANCE.PROPERTY[1].VALUE._text = r.reference;
                } else {
                    template = deepCopy(noReferenceTemplate)
                    template._attributes.NAME = r.declaration;
                    template.INSTANCE.PROPERTY.VALUE._text = "";
                }
                configurationModel.CONFIGURATION.DECLARATION = [template, ...configurationModel.CONFIGURATION.DECLARATION]
                updateXmlPreview(xml_util.convertObjectToXml(configurationModel));
                reUpdateDeclarationSelector(configurationModel);
            } else {
                alert("Declaration已存在!")
            }
        } else {
            alert("请正确填写Declaration!")
        }
    }
}

function handleValue(value) {
    let t = value.split(">>")
    let r = {
        declaration: null,
        reference: null
    }
    if (t.length === 1 && t[0].length > 0) {
        r.declaration = t[0]
    } else if (t.length === 2 && t[0].length > 0) {
        r.declaration = t[0]
        if (t[1].length > 0) {
            r.reference = t[1]
        }
    }
    return r
}

function checkDeclarationExist(name) {
    let declarations = configurationModel.CONFIGURATION.DECLARATION;
    let index = declarations.findIndex((d) => {
        return d._attributes.NAME === name
    })
    return index > -1;
}

function deepCopy(object) {
    return JSON.parse(JSON.stringify(object))
}