define([
    'runner',
    'ports',
    'autorun',
    'samples'
], function(runner, ports, autorun, samples) {
    var _ = codebox.require("hr/utils");
    var operations = codebox.require("core/operations");
    var app = codebox.require("core/app");
    var box = codebox.require("core/box");
    var menu = codebox.require("core/commands/menu");
    var dialogs = codebox.require("utils/dialogs");
    var alerts = codebox.require("utils/alerts");

    // Add samples submenu
    menu.getById("file").menuSection([
        samples.command
    ])

    // Add menu
    menu
        .register("project", {
            title: "Nodes",
            offline: false
        })
        .menuSection(autorun.nodes)
        .menuSection([
            {
                'id': "project.ports.refresh",
                'category': "Project",
                'title': "Refresh Ports",
                'offline': false,
                'action': ports.update
            },
            ports.command
        ]);

    // Auto-updates
    box.on("box:project:define", function() {
        runner.update();
    });

    // Updates list
    runner.update();
    ports.update();
    samples.update();
});
