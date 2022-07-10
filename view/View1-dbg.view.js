sap.ui.define(function () {
    return sap.ui.jsview("ns.projectfinal1.view.View1", {
        getControllerName: function () {
            return "ns.projectfinal1.controller.View1";
        },

        createContent: function (oController) {
            return new sap.m.Shell({
                app: new sap.m.App({
                    pages: new sap.m.Page({
                        title: 'Groceries table',
                        content: [
                            new sap.m.HBox(this.createId('generic-container'), {
                                justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                alignItems: sap.m.FlexAlignItems.Center,
                                items: [
                                    new sap.m.VBox(this.createId('left-container'), {
                                        alignItems: sap.m.FlexAlignItems.Left,
                                        items: [
                                            new sap.m.HBox(this.createId('filter-category'), {
                                                alignItems: sap.m.FlexAlignItems.Center,
                                                width: '80%',
                                                items: [
                                                    new sap.m.ComboBox(this.createId("categoryFilter"), {
                                                        showClearIcon: true,
                                                        change: oController.onCategoryFilterChange.bind(oController)
                                                    }),
                                                    new sap.m.Label({ text: "Category Filter" }),
                                                ],
                                            }),
                                            new sap.m.HBox(this.createId('filter-um'), {
                                                alignItems: sap.m.FlexAlignItems.Center,
                                                width: '75%',
                                                items: [
                                                    new sap.m.ComboBox(this.createId("umFilter"), {
                                                        showClearIcon: true,
                                                        change: oController.onUmFilterChange.bind(oController)
                                                    }),
                                                    new sap.m.Label({ text: "Unit measure Filter" }),
                                                ],
                                            }),
                                            new sap.m.HBox(this.createId('addRowContainer'), {
                                                items: [
                                                    new sap.m.Button(this.createId('addRowButton'), {
                                                        text: "{i18n>Add row}",
                                                        icon: "sap-icon://add",
                                                        press: oController.onRowAddClick.bind(oController)
                                                    }),
                                                ]
                                            }),
                                        ]
                                    }).addStyleClass('left-container'),
                                    new sap.m.VBox(this.createId('right-container'), {
                                        alignItems: sap.m.FlexAlignItems.FlexEnd,
                                        items: [
                                            new sap.m.Button(this.createId('user-btn'), {
                                                alignItems: sap.m.FlexAlignItems.Right,
                                                text: "{i18n>User profile}",
                                                icon: "sap-icon://account",
                                                press: oController.onUserProfileClick.bind(oController)
                                            }).addStyleClass('user-profile-btn'),
                                            new sap.m.HBox(this.createId('search'), {
                                                alignItems: sap.m.FlexAlignItems.Left,
                                                width: "75%",
                                                items: [
                                                    new sap.m.SearchField(this.createId("searchInput"), {
                                                        liveChange: oController.onSearchInput.bind(oController)
                                                    }),
                                                ]
                                            }),
                                        ]
                                    }).addStyleClass('right-container'),
                                ]
                            }).addStyleClass('generic-container'),
                            new sap.m.Table(this.createId('groceriesTable'), {
                                selectionMode: sap.ui.table.SelectionMode.Single,
                                items: {
                                    path: "/tableData",
                                    template: new sap.m.ColumnListItem({
                                        type: "Active",
                                        cells: [
                                            new sap.m.Text({ text: "{id}" }),
                                            new sap.m.Text({ text: "{name}" }),
                                            new sap.m.Text({ text: "{quantity}" }),
                                            new sap.m.Text({ text: "{unitMeasure}" }),
                                            new sap.m.CheckBox({ selected: "{isPurchased}" , editable: false}),
                                            new sap.m.Text({ text: "{category}" }),
                                            new sap.m.Button({
                                                text: "Edit",
                                                icon: "sap-icon://edit",
                                                press: oController.onRowClick.bind(oController),
                                            }),
                                            new sap.m.Button({
                                                text: "Delete",
                                                icon: "sap-icon://delete",
                                                press: oController.onRowDelete.bind(oController)
                                            }),
                                        ],
                                    })
                                },
                            }),
                        ]
                    }).addStyleClass('page-container'),
                })
            })
        }
    })
})

