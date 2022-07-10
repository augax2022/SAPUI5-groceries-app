// sap.ui.define(["sap/ui/base/Object", "ns/projectbtp/utils/constants"], function (Object, Constants) {

//     const NORTHWIND_API = "V2/Northwind/Northwind.svc/"

//     let oServices = Object.extend("ns.projectbtp.utils.services", {
//         constructor: function (ownerComponent) {
//             this.NORTHWIND_URL = ownerComponent.getManifestEntry(Constants.NORTHWIND);
//         }
//     })

//     oServices.prototype.getNorthwindData = async function () {
//         let oNorthwindData = null;

//         let oResponse = await fetch(`${this.NORTHWIND_URL}${NORTHWIND_API}`, {
//             method: 'GET'
//         })

//         if (oResponse.ok) {
//             oNorthwindData = oResponse;
//         }

//         return oNorthwindData;
//     }
// })