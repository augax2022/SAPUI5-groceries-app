sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        const validationHelper = (context, value) => {
            if (value === '') {
                context.setValueState(sap.ui.core.ValueState.Error);
            } else {
                context.setValueState(sap.ui.core.ValueState.Success);
            }
        };

        return Controller.extend("ns.projectfinal1.controller.View1", {
            onInit: async function () {
                const oTableData = new sap.ui.model.json.JSONModel();
                const getApiData = () => {
                    return fetch('https://mocki.io/v1/be954200-f8ad-46f7-b57a-511674ebc4fb')
                };
                const apiData = await getApiData().then((res) => res.json());

                const tableSelector = this.getView().byId('groceriesTable');
                apiData[0] = { ...apiData[0], 'editColumn': 'editColumn', 'deleteColumn': 'deleteColumn' };
                Object.keys(apiData[0]).forEach((column) => {
                    if (column === 'deleteColumn' || column === 'editColumn') {
                        tableSelector.addColumn(new sap.m.Column({ header: new sap.m.Label({ text: '' }) }));
                    } else {
                        tableSelector.addColumn(new sap.m.Column({ header: new sap.m.Label({ text: column }) }));
                    }
                });

                const categoryValues = apiData.map((value) => value.category);
                const umValues = apiData.map(value => value.unitMeasure);
                const updatedValues = new Set(categoryValues);
                const updatedUm = new Set(umValues);

                const oSelect = this.getView().byId("categoryFilter");
                updatedValues.forEach((category, index) => {
                    const newItem = new sap.ui.core.Item({ key: category + index, text: category });
                    oSelect.addItem(newItem);
                });

                const oSelectUm = this.getView().byId("umFilter");
                updatedUm.forEach((um, index) => {
                    const newItem = new sap.ui.core.Item({ key: um + index, text: um });
                    oSelectUm.addItem(newItem);
                });
                tableSelector.setModel(oTableData);
                oTableData.setData({ tableData: apiData });
                tableSelector.setModel(oTableData);
            },
            onUserProfileClick: function () {
                var userData = new sap.ushell.services.UserInfo();
                const defaultDialog = new sap.m.Dialog({
                    title: "User info",
                    content: [
                        new sap.m.Label({
                            text: 'Email Address: ' + (userData.getEmail() ? userData.getEmail() : 'User has no email')
                        }),
                        new sap.m.Label({
                            text: 'Full Name: ' + userData.getFullName()
                        }),
                    ],
                    beginButton: new sap.m.Button({
                        text: "OK",
                        press: function () {
                            defaultDialog.close();
                        }.bind(this)
                    }),
                    endButton: new sap.m.Button({
                        text: "Close",
                        press: function () {
                            defaultDialog.close();
                        }.bind(this)
                    })
                }).addStyleClass('user-dialog');

                defaultDialog.open();
            },
            onRowAddClick: function () {
                const tableSelector = this.getView().byId('groceriesTable');
                const tableModel = tableSelector.getModel();
                const tableData = tableModel.getData().tableData;
                const values = {
                    "id": '',
                    "name": "",
                    "quantity": '',
                    "unitMeasure": "",
                    "isPurchased": false,
                    "category": "",
                };

                const addRowDialog = new sap.m.Dialog({
                    direction: sap.m.FlexDirection.Column,
                    title: "Add row",
                    content: [
                        new sap.m.HBox({
                            alignItems: sap.m.FlexAlignItems.Center,
                            justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                            items: [
                                new sap.m.Label({
                                    text: 'Add Id: ',
                                }),
                                new sap.m.Input({
                                    type: sap.m.InputType.Number,
                                    placeholder: 'Id',
                                    required: true,
                                    liveChange: function (oEvent) {
                                        const value = oEvent.getParameter('newValue');
                                        validationHelper(this, value);
                                        values['id'] = value;
                                    }
                                }),
                            ]
                        }),
                        new sap.m.HBox({
                            alignItems: sap.m.FlexAlignItems.Center,
                            justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                            items: [
                                new sap.m.Label({
                                    text: 'Add name: '
                                }),
                                new sap.m.Input({
                                    placeholder: 'Name',
                                    required: true,
                                    liveChange: function (oEvent) {
                                        const value = oEvent.getParameter('newValue');
                                        validationHelper(this, value);
                                        values['name'] = value;
                                    }
                                }),
                            ]
                        }),
                        new sap.m.HBox({
                            alignItems: sap.m.FlexAlignItems.Center,
                            justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                            items: [
                                new sap.m.Label({
                                    text: 'Add quantity: '
                                }),
                                new sap.m.Input({
                                    type: sap.m.InputType.Number,
                                    placeholder: 'Quantity',
                                    required: true,
                                    liveChange: function (oEvent) {
                                        const value = oEvent.getParameter('newValue');
                                        validationHelper(this, value);
                                        values['quantity'] = value;
                                    }
                                }),
                            ]
                        }),
                        new sap.m.HBox({
                            alignItems: sap.m.FlexAlignItems.Center,
                            justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                            items: [
                                new sap.m.Label({
                                    text: 'Add Unit Measure: '
                                }),
                                new sap.m.Input({
                                    placeholder: 'Unit Measure',
                                    required: true,
                                    liveChange: function (oEvent) {
                                        const value = oEvent.getParameter('newValue');
                                        validationHelper(this, value);
                                        values['unitMeasure'] = value;
                                    }
                                }),
                            ]
                        }),
                        new sap.m.HBox({
                            alignItems: sap.m.FlexAlignItems.Center,
                            items: [
                                new sap.m.Label({
                                    text: 'Is purchased: '
                                }),
                                new sap.m.CheckBox({
                                    select: function (oEvent) {
                                        const value = oEvent.getParameter('selected');
                                        values['isPurchased'] = value;
                                    }
                                }),
                            ]
                        }),
                        new sap.m.HBox({
                            alignItems: sap.m.FlexAlignItems.Center,
                            justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                            items: [
                                new sap.m.Label({
                                    text: 'Add Category: '
                                }),
                                new sap.m.Input({
                                    placeholder: 'Category',
                                    required: true,
                                    liveChange: function (oEvent) {
                                        const value = oEvent.getParameter('newValue');
                                        validationHelper(this, value);
                                        values['category'] = value;
                                    }
                                }),
                            ]
                        }),
                    ],
                    beginButton: new sap.m.Button({
                        text: "OK",
                        press: function (oEvent) {
                            if (Object.values(values).some((value) => value === '')) {
                                sap.m.MessageToast.show("Please fill all the required data", { duration: '1000' });
                                return;
                            }
                            tableData.push(values);
                            tableModel.refresh();
                            addRowDialog.close();
                        }.bind(this)
                    }),
                    endButton: new sap.m.Button({
                        text: "Close",
                        press: function () {
                            addRowDialog.close();
                        }.bind(this)
                    })
                }).addStyleClass('dialog-container');

                addRowDialog.open();
            },
            onRowClick: function (oEvent) {
                const selectedData = oEvent.getSource().getBindingContext().getObject();

                const editRowDialog = new sap.m.Dialog({
                    title: "Edit row",
                    content: [
                        new sap.m.HBox({
                            alignItems: sap.m.FlexAlignItems.Center,
                            justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                            items: [

                                new sap.m.Label({
                                    text: 'Edit Id: ',
                                }),
                                new sap.m.Input({
                                    type: sap.m.InputType.Number,
                                    placeholder: 'Id',
                                    value: selectedData['id'],
                                    required: true,
                                    liveChange: function (oEvent) {
                                        const value = oEvent.getParameter('newValue');
                                        validationHelper(this, value);
                                        selectedData['id'] = value;
                                    }
                                }),
                            ]
                        }),
                        new sap.m.HBox({
                            alignItems: sap.m.FlexAlignItems.Center,
                            justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                            items: [
                                new sap.m.Label({
                                    text: 'Edit name: '
                                }),
                                new sap.m.Input({
                                    placeholder: 'Name',
                                    required: true,
                                    value: selectedData['name'],
                                    liveChange: function (oEvent) {
                                        const value = oEvent.getParameter('newValue');
                                        validationHelper(this, value);
                                        selectedData['name'] = value;
                                    }
                                }),
                            ]
                        }),
                        new sap.m.HBox({
                            alignItems: sap.m.FlexAlignItems.Center,
                            justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                            items: [
                                new sap.m.Label({
                                    text: 'Edit quantity: '
                                }),
                                new sap.m.Input({
                                    type: sap.m.InputType.Number,
                                    placeholder: 'Quantity',
                                    required: true,
                                    value: selectedData['quantity'],
                                    liveChange: function (oEvent) {
                                        const value = oEvent.getParameter('newValue');
                                        validationHelper(this, value);
                                        selectedData['quantity'] = value;
                                    }
                                }),
                            ]
                        }),
                        new sap.m.HBox({
                            alignItems: sap.m.FlexAlignItems.Center,
                            justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                            items: [
                                new sap.m.Label({
                                    text: 'Edit Unit Measure: '
                                }),
                                new sap.m.Input({
                                    placeholder: 'Unit Measure',
                                    required: true,
                                    value: selectedData['unitMeasure'],
                                    liveChange: function (oEvent) {
                                        const value = oEvent.getParameter('newValue');
                                        validationHelper(this, value);
                                        selectedData['unitMeasure'] = value;
                                    }
                                }),
                            ]
                        }),
                        new sap.m.HBox({
                            alignItems: sap.m.FlexAlignItems.Center,
                            items: [
                                new sap.m.Label({
                                    text: 'Is purchased: '
                                }),
                                new sap.m.CheckBox({
                                    selected: selectedData['isPurchased'],
                                    select: function (oEvent) {
                                        const value = oEvent.getParameter('selected');
                                        selectedData['isPurchased'] = value;
                                    }
                                }),
                            ]
                        }),
                        new sap.m.HBox({
                            alignItems: sap.m.FlexAlignItems.Center,
                            justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                            items: [
                                new sap.m.Label({
                                    text: 'Edit Category: '
                                }),
                                new sap.m.Input({
                                    placeholder: 'Category',
                                    required: true,
                                    value: selectedData['category'],
                                    liveChange: function (oEvent) {
                                        const value = oEvent.getParameter('newValue');
                                        validationHelper(this, value);
                                        selectedData['category'] = value;
                                    }
                                }),
                            ]
                        }),
                    ],
                    beginButton: new sap.m.Button({
                        text: "Save",
                        press: function (oEvent) {
                            if (Object.values(selectedData).some((value) => value === '')) {
                                sap.m.MessageToast.show("Please fill all the required data", { duration: 1000 });
                                return;
                            }
                            const tableSelector = this.getView().byId('groceriesTable');
                            const tableModel = tableSelector.getModel();

                            tableModel.refresh();
                            editRowDialog.close();
                        }.bind(this)
                    }),
                    endButton: new sap.m.Button({
                        text: "Cancel",
                        press: function () {
                            editRowDialog.close();
                        }.bind(this)
                    })
                }).addStyleClass('dialog-container');
                editRowDialog.open();
            },
            onRowDelete: function (oEvent) {
                const tableSelector = this.getView().byId('groceriesTable');
                const tableModel = tableSelector.getModel();
                const tableData = tableModel.getData().tableData;
                let selectedItemIndex;
                const selectedRow = oEvent.getSource().getBindingContext().getObject();

                const confirmationDialog = new sap.m.Dialog({
                    title: "Delete row confirmation",
                    content: [
                        new sap.m.Label({
                            text: 'Are you sure you want to delete this row?'
                        })
                    ],
                    beginButton: new sap.m.Button({
                        text: "Ok",
                        press: function () {
                            tableData.filter((row, index) => {
                                if (row == selectedRow) {
                                    selectedItemIndex = index;
                                }
                            });
                            tableData.splice(selectedItemIndex, 1);
                            tableModel.refresh();
                            confirmationDialog.close();
                        }.bind(this)
                    }),
                    endButton: new sap.m.Button({
                        text: "Cancel",
                        press: function () {
                            confirmationDialog.close();
                        }.bind(this)
                    })
                });
                confirmationDialog.open();
            },
            onCategoryFilterChange: function (oEvent) {
                const tableSelector = this.getView().byId('groceriesTable');
                let selectedItemText = '';
                const oSelect = this.getView().byId("categoryFilter");
                const clearButton = document.querySelector('#' + oEvent.getSource().getId() + ' [aria-label="Clear"]');
                const selectedValue = oSelect.getSelectedItem();
                if (selectedValue) {
                    selectedItemText = selectedValue.getText();
                }

                $(document).on("click.categoryFilter", clearButton, function () {
                    oBinding.filter([]);
                });

                var filterCategory = new sap.ui.model.Filter("category", sap.ui.model.FilterOperator.Contains, selectedItemText);
                var oBinding = tableSelector.getBinding("items");

                oBinding.filter([filterCategory]);
            },
            onUmFilterChange: function (oEvent) {
                const tableSelector = this.getView().byId('groceriesTable');
                let selectedItemText = '';
                const clearButton = document.querySelector('#' + oEvent.getSource().getId() + ' [aria-label="Clear"]');
                const oSelect = this.getView().byId("umFilter");
                const selectedValue = oSelect.getSelectedItem();
                if (selectedValue) {
                    selectedItemText = selectedValue.getText();
                }

                $(document).on("click.umFilter", clearButton, function () {
                    oBinding.filter([]);
                });

                var filterUM = new sap.ui.model.Filter("unitMeasure", sap.ui.model.FilterOperator.EQ, selectedItemText);
                var oBinding = tableSelector.getBinding("items");
                oBinding.filter([filterUM]);
            },
            onSearchInput: function () {
                const tableSelector = this.getView().byId('groceriesTable');
                let searchText = '';

                const oSearch = this.getView().byId("searchInput");
                const searchValue = oSearch.getValue();
                if (searchValue.length > 2) {
                    searchText = searchValue;
                }

                var searchInput = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, searchText);
                var oBinding = tableSelector.getBinding("items");
                oBinding.filter([searchInput]);
            }
        });
    });
