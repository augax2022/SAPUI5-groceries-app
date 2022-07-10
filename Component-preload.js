//@ui5-bundle ns/projectfinal1/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"ns/projectfinal1/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","ns/projectfinal1/model/models"],function(e,t,i){"use strict";return e.extend("ns.projectfinal1.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"ns/projectfinal1/controller/View1.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";const t=(e,t)=>{if(t===""){e.setValueState(sap.ui.core.ValueState.Error)}else{e.setValueState(sap.ui.core.ValueState.Success)}};return e.extend("ns.projectfinal1.controller.View1",{onInit:async function(){const e=new sap.ui.model.json.JSONModel;const t=()=>fetch("https://mocki.io/v1/be954200-f8ad-46f7-b57a-511674ebc4fb");const n=await t().then(e=>e.json());const a=this.getView().byId("groceriesTable");n[0]={...n[0],editColumn:"editColumn",deleteColumn:"deleteColumn"};Object.keys(n[0]).forEach(e=>{if(e==="deleteColumn"||e==="editColumn"){a.addColumn(new sap.m.Column({header:new sap.m.Label({text:""})}))}else{a.addColumn(new sap.m.Column({header:new sap.m.Label({text:e})}))}});const s=n.map(e=>e.category);const i=n.map(e=>e.unitMeasure);const o=new Set(s);const l=new Set(i);const r=this.getView().byId("categoryFilter");o.forEach((e,t)=>{const n=new sap.ui.core.Item({key:e+t,text:e});r.addItem(n)});const u=this.getView().byId("umFilter");l.forEach((e,t)=>{const n=new sap.ui.core.Item({key:e+t,text:e});u.addItem(n)});a.setModel(e);e.setData({tableData:n});a.setModel(e)},onUserProfileClick:function(){var e=new sap.ushell.services.UserInfo;const t=new sap.m.Dialog({title:"User info",content:[new sap.m.Label({text:"Email Address: "+(e.getEmail()?e.getEmail():"User has no email")}),new sap.m.Label({text:"Full Name: "+e.getFullName()})],beginButton:new sap.m.Button({text:"OK",press:function(){t.close()}.bind(this)}),endButton:new sap.m.Button({text:"Close",press:function(){t.close()}.bind(this)})}).addStyleClass("user-dialog");t.open()},onRowAddClick:function(){const e=this.getView().byId("groceriesTable");const n=e.getModel();const a=n.getData().tableData;const s={id:"",name:"",quantity:"",unitMeasure:"",isPurchased:false,category:""};const i=new sap.m.Dialog({direction:sap.m.FlexDirection.Column,title:"Add row",content:[new sap.m.HBox({alignItems:sap.m.FlexAlignItems.Center,justifyContent:sap.m.FlexJustifyContent.SpaceBetween,items:[new sap.m.Label({text:"Add Id: "}),new sap.m.Input({type:sap.m.InputType.Number,placeholder:"Id",required:true,liveChange:function(e){const n=e.getParameter("newValue");t(this,n);s["id"]=n}})]}),new sap.m.HBox({alignItems:sap.m.FlexAlignItems.Center,justifyContent:sap.m.FlexJustifyContent.SpaceBetween,items:[new sap.m.Label({text:"Add name: "}),new sap.m.Input({placeholder:"Name",required:true,liveChange:function(e){const n=e.getParameter("newValue");t(this,n);s["name"]=n}})]}),new sap.m.HBox({alignItems:sap.m.FlexAlignItems.Center,justifyContent:sap.m.FlexJustifyContent.SpaceBetween,items:[new sap.m.Label({text:"Add quantity: "}),new sap.m.Input({type:sap.m.InputType.Number,placeholder:"Quantity",required:true,liveChange:function(e){const n=e.getParameter("newValue");t(this,n);s["quantity"]=n}})]}),new sap.m.HBox({alignItems:sap.m.FlexAlignItems.Center,justifyContent:sap.m.FlexJustifyContent.SpaceBetween,items:[new sap.m.Label({text:"Add Unit Measure: "}),new sap.m.Input({placeholder:"Unit Measure",required:true,liveChange:function(e){const n=e.getParameter("newValue");t(this,n);s["unitMeasure"]=n}})]}),new sap.m.HBox({alignItems:sap.m.FlexAlignItems.Center,items:[new sap.m.Label({text:"Is purchased: "}),new sap.m.CheckBox({select:function(e){const t=e.getParameter("selected");s["isPurchased"]=t}})]}),new sap.m.HBox({alignItems:sap.m.FlexAlignItems.Center,justifyContent:sap.m.FlexJustifyContent.SpaceBetween,items:[new sap.m.Label({text:"Add Category: "}),new sap.m.Input({placeholder:"Category",required:true,liveChange:function(e){const n=e.getParameter("newValue");t(this,n);s["category"]=n}})]})],beginButton:new sap.m.Button({text:"OK",press:function(e){if(Object.values(s).some(e=>e==="")){sap.m.MessageToast.show("Please fill all the required data",{duration:"1000"});return}a.push(s);n.refresh();i.close()}.bind(this)}),endButton:new sap.m.Button({text:"Close",press:function(){i.close()}.bind(this)})}).addStyleClass("dialog-container");i.open()},onRowClick:function(e){const n=e.getSource().getBindingContext().getObject();const a=new sap.m.Dialog({title:"Edit row",content:[new sap.m.HBox({alignItems:sap.m.FlexAlignItems.Center,justifyContent:sap.m.FlexJustifyContent.SpaceBetween,items:[new sap.m.Label({text:"Edit Id: "}),new sap.m.Input({type:sap.m.InputType.Number,placeholder:"Id",value:n["id"],required:true,liveChange:function(e){const a=e.getParameter("newValue");t(this,a);n["id"]=a}})]}),new sap.m.HBox({alignItems:sap.m.FlexAlignItems.Center,justifyContent:sap.m.FlexJustifyContent.SpaceBetween,items:[new sap.m.Label({text:"Edit name: "}),new sap.m.Input({placeholder:"Name",required:true,value:n["name"],liveChange:function(e){const a=e.getParameter("newValue");t(this,a);n["name"]=a}})]}),new sap.m.HBox({alignItems:sap.m.FlexAlignItems.Center,justifyContent:sap.m.FlexJustifyContent.SpaceBetween,items:[new sap.m.Label({text:"Edit quantity: "}),new sap.m.Input({type:sap.m.InputType.Number,placeholder:"Quantity",required:true,value:n["quantity"],liveChange:function(e){const a=e.getParameter("newValue");t(this,a);n["quantity"]=a}})]}),new sap.m.HBox({alignItems:sap.m.FlexAlignItems.Center,justifyContent:sap.m.FlexJustifyContent.SpaceBetween,items:[new sap.m.Label({text:"Edit Unit Measure: "}),new sap.m.Input({placeholder:"Unit Measure",required:true,value:n["unitMeasure"],liveChange:function(e){const a=e.getParameter("newValue");t(this,a);n["unitMeasure"]=a}})]}),new sap.m.HBox({alignItems:sap.m.FlexAlignItems.Center,items:[new sap.m.Label({text:"Is purchased: "}),new sap.m.CheckBox({selected:n["isPurchased"],select:function(e){const t=e.getParameter("selected");n["isPurchased"]=t}})]}),new sap.m.HBox({alignItems:sap.m.FlexAlignItems.Center,justifyContent:sap.m.FlexJustifyContent.SpaceBetween,items:[new sap.m.Label({text:"Edit Category: "}),new sap.m.Input({placeholder:"Category",required:true,value:n["category"],liveChange:function(e){const a=e.getParameter("newValue");t(this,a);n["category"]=a}})]})],beginButton:new sap.m.Button({text:"Save",press:function(e){if(Object.values(n).some(e=>e==="")){sap.m.MessageToast.show("Please fill all the required data",{duration:1e3});return}const t=this.getView().byId("groceriesTable");const s=t.getModel();s.refresh();a.close()}.bind(this)}),endButton:new sap.m.Button({text:"Cancel",press:function(){a.close()}.bind(this)})}).addStyleClass("dialog-container");a.open()},onRowDelete:function(e){const t=this.getView().byId("groceriesTable");const n=t.getModel();const a=n.getData().tableData;let s;const i=e.getSource().getBindingContext().getObject();const o=new sap.m.Dialog({title:"Delete row confirmation",content:[new sap.m.Label({text:"Are you sure you want to delete this row?"})],beginButton:new sap.m.Button({text:"Ok",press:function(){a.filter((e,t)=>{if(e==i){s=t}});a.splice(s,1);n.refresh();o.close()}.bind(this)}),endButton:new sap.m.Button({text:"Cancel",press:function(){o.close()}.bind(this)})});o.open()},onCategoryFilterChange:function(e){const t=this.getView().byId("groceriesTable");let n="";const a=this.getView().byId("categoryFilter");const s=document.querySelector("#"+e.getSource().getId()+' [aria-label="Clear"]');const i=a.getSelectedItem();if(i){n=i.getText()}$(document).on("click.categoryFilter",s,function(){l.filter([])});var o=new sap.ui.model.Filter("category",sap.ui.model.FilterOperator.Contains,n);var l=t.getBinding("items");l.filter([o])},onUmFilterChange:function(e){const t=this.getView().byId("groceriesTable");let n="";const a=document.querySelector("#"+e.getSource().getId()+' [aria-label="Clear"]');const s=this.getView().byId("umFilter");const i=s.getSelectedItem();if(i){n=i.getText()}$(document).on("click.umFilter",a,function(){l.filter([])});var o=new sap.ui.model.Filter("unitMeasure",sap.ui.model.FilterOperator.EQ,n);var l=t.getBinding("items");l.filter([o])},onSearchInput:function(){const e=this.getView().byId("groceriesTable");let t="";const n=this.getView().byId("searchInput");const a=n.getValue();if(a.length>2){t=a}var s=new sap.ui.model.Filter("name",sap.ui.model.FilterOperator.Contains,t);var i=e.getBinding("items");i.filter([s])}})});
},
	"ns/projectfinal1/i18n/i18n.properties":'# This is the resource bundle for ns.projectfinal1\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=App Title\n\n#YDES: Application description\nappDescription=A Fiori application.\n#XTIT: Main view title\ntitle=App Title\n\nflpTitle=Groceries app\n\nflpSubtitle=\n',
	"ns/projectfinal1/manifest.json":'{"_version":"1.32.0","sap.app":{"id":"ns.projectfinal1","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","dataSources":{"groceries":{"uri":"../a9781d7b-ac47-4400-b39a-17828a56abf7.ns-projectfinal1.nsprojectfinal1/groceries/"}},"crossNavigation":{"inbounds":{"ns-projectfinal1-inbound":{"signature":{"parameters":{},"additionalParameters":"allowed"},"semanticObject":"groceries","action":"display","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","icon":""}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.99.0","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"ns.projectfinal1.i18n.i18n"}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"JS","async":true,"viewPath":"ns.projectfinal1.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteView1","pattern":"RouteView1","target":["TargetView1"]}],"targets":{"TargetView1":{"viewType":"JS","transition":"slide","clearControlAggregation":false,"viewId":"View1","viewName":"View1"}}},"rootView":{"viewName":"ns.projectfinal1.view.View1","type":"JS","async":true,"id":"View1"}},"sap.cloud":{"public":true,"service":"ns.projectfinal1"}}',
	"ns/projectfinal1/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"ns/projectfinal1/utils/constants.js":function(){sap.ui.define(function(){});
},
	"ns/projectfinal1/utils/locate-reuse-libs.js":'(function(e){var t=function(e){var t=e;var n="";var r=["sap.apf","sap.base","sap.chart","sap.collaboration","sap.f","sap.fe","sap.fileviewer","sap.gantt","sap.landvisz","sap.m","sap.ndc","sap.ovp","sap.rules","sap.suite","sap.tnt","sap.ui","sap.uiext","sap.ushell","sap.uxap","sap.viz","sap.webanalytics","sap.zen"];function a(e,t){Object.keys(e).forEach(function(e){if(!r.some(function(t){return e===t||e.startsWith(t+".")})){if(t.length>0){t=t+","+e}else{t=e}}});return t}return new Promise(function(r,i){$.ajax(t).done(function(e){if(e){if(e["sap.ui5"]&&e["sap.ui5"].dependencies){if(e["sap.ui5"].dependencies.libs){n=a(e["sap.ui5"].dependencies.libs,n)}if(e["sap.ui5"].dependencies.components){n=a(e["sap.ui5"].dependencies.components,n)}}if(e["sap.ui5"]&&e["sap.ui5"].componentUsages){n=a(e["sap.ui5"].componentUsages,n)}}r(n)}).fail(function(t){i(new Error("Could not fetch manifest at \'"+e))})})};e.registerComponentDependencyPaths=function(e){return t(e).then(function(e){if(e&&e.length>0){var t="/sap/bc/ui2/app_index/ui5_app_info?id="+e;var n=jQuery.sap.getUriParameters().get("sap-client");if(n&&n.length===3){t=t+"&sap-client="+n}return $.ajax(t).done(function(e){if(e){Object.keys(e).forEach(function(t){var n=e[t];if(n&&n.dependencies){n.dependencies.forEach(function(e){if(e.url&&e.url.length>0&&e.type==="UI5LIB"){jQuery.sap.log.info("Registering Library "+e.componentId+" from server "+e.url);jQuery.sap.registerModulePath(e.componentId,e.url)}})}})}})}})}})(sap);var scripts=document.getElementsByTagName("script");var currentScript=document.getElementById("locate-reuse-libs");if(!currentScript){currentScript=document.currentScript}var manifestUri=currentScript.getAttribute("data-sap-ui-manifest-uri");var componentName=currentScript.getAttribute("data-sap-ui-componentName");var useMockserver=currentScript.getAttribute("data-sap-ui-use-mockserver");sap.registerComponentDependencyPaths(manifestUri).catch(function(e){jQuery.sap.log.error(e)}).finally(function(){sap.ui.getCore().attachInit(function(){jQuery.sap.require("jquery.sap.resources");var e=sap.ui.getCore().getConfiguration().getLanguage();var t=jQuery.sap.resources({url:"i18n/i18n.properties",locale:e});document.title=t.getText("appTitle")});if(componentName&&componentName.length>0){if(useMockserver&&useMockserver==="true"){sap.ui.getCore().attachInit(function(){sap.ui.require([componentName.replace(/\\./g,"/")+"/localService/mockserver"],function(e){e.init();sap.ushell.Container.createRenderer().placeAt("content")})})}else{sap.ui.require(["sap/ui/core/ComponentSupport"]);sap.ui.getCore().attachInit(function(){jQuery.sap.require("jquery.sap.resources");var e=sap.ui.getCore().getConfiguration().getLanguage();var t=jQuery.sap.resources({url:"i18n/i18n.properties",locale:e});document.title=t.getText("appTitle")})}}else{sap.ui.getCore().attachInit(function(){sap.ushell.Container.createRenderer().placeAt("content")})}});sap.registerComponentDependencyPaths(manifestUri);',
	"ns/projectfinal1/utils/services.js":function(){
},
	"ns/projectfinal1/view/View1.view.js":function(){sap.ui.define(function(){return sap.ui.jsview("ns.projectfinal1.view.View1",{getControllerName:function(){return"ns.projectfinal1.controller.View1"},createContent:function(e){return new sap.m.Shell({app:new sap.m.App({pages:new sap.m.Page({title:"Groceries table",content:[new sap.m.HBox(this.createId("generic-container"),{justifyContent:sap.m.FlexJustifyContent.SpaceBetween,alignItems:sap.m.FlexAlignItems.Center,items:[new sap.m.VBox(this.createId("left-container"),{alignItems:sap.m.FlexAlignItems.Left,items:[new sap.m.HBox(this.createId("filter-category"),{alignItems:sap.m.FlexAlignItems.Center,width:"80%",items:[new sap.m.ComboBox(this.createId("categoryFilter"),{showClearIcon:true,change:e.onCategoryFilterChange.bind(e)}),new sap.m.Label({text:"Category Filter"})]}),new sap.m.HBox(this.createId("filter-um"),{alignItems:sap.m.FlexAlignItems.Center,width:"75%",items:[new sap.m.ComboBox(this.createId("umFilter"),{showClearIcon:true,change:e.onUmFilterChange.bind(e)}),new sap.m.Label({text:"Unit measure Filter"})]}),new sap.m.HBox(this.createId("addRowContainer"),{items:[new sap.m.Button(this.createId("addRowButton"),{text:"{i18n>Add row}",icon:"sap-icon://add",press:e.onRowAddClick.bind(e)})]})]}).addStyleClass("left-container"),new sap.m.VBox(this.createId("right-container"),{alignItems:sap.m.FlexAlignItems.FlexEnd,items:[new sap.m.Button(this.createId("user-btn"),{alignItems:sap.m.FlexAlignItems.Right,text:"{i18n>User profile}",icon:"sap-icon://account",press:e.onUserProfileClick.bind(e)}).addStyleClass("user-profile-btn"),new sap.m.HBox(this.createId("search"),{alignItems:sap.m.FlexAlignItems.Left,width:"75%",items:[new sap.m.SearchField(this.createId("searchInput"),{liveChange:e.onSearchInput.bind(e)})]})]}).addStyleClass("right-container")]}).addStyleClass("generic-container"),new sap.m.Table(this.createId("groceriesTable"),{selectionMode:sap.ui.table.SelectionMode.Single,items:{path:"/tableData",template:new sap.m.ColumnListItem({type:"Active",cells:[new sap.m.Text({text:"{id}"}),new sap.m.Text({text:"{name}"}),new sap.m.Text({text:"{quantity}"}),new sap.m.Text({text:"{unitMeasure}"}),new sap.m.CheckBox({selected:"{isPurchased}",editable:false}),new sap.m.Text({text:"{category}"}),new sap.m.Button({text:"Edit",icon:"sap-icon://edit",press:e.onRowClick.bind(e)}),new sap.m.Button({text:"Delete",icon:"sap-icon://delete",press:e.onRowDelete.bind(e)})]})}})]}).addStyleClass("page-container")})})}})});
}
}});
