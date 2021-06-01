var windows = {
    engine: {
        windowList: [],
        create: (window, handle) => {
            var draggable = new PlainDraggable(window);
            draggable.handle = handle;
            draggable.containment = { left: 0, top: 0, width: '100%', height: '100%' };
            windows.engine.windowList.push(new Object({ "window": window, "handle": handle, "draggable": draggable }));
        },
        destroy: (window) => {
            var index = windows.engine.windowList.indexOf(window);
            if (index > -1) {
                windows.engine.windowList.splice(index, 1);
            }
        },
        selection: {
            activate: () => {

            },
            deactivate: () => {

            }
        }
    },
    console: {
        info: (text) => {
            console.info(`%c[%cWindows%c]%c ${text}`, 'color:#595959', 'color:#008cff;', 'color:#595959', 'color:unset;')
        },
        log: (text) => {
            console.log(`%c[%cWindows%c]%c ${text}`, 'color:#595959', 'color:unset;', 'color:#595959', 'color:unset;')
        },
        error: (text) => {
            console.error(`%c[%cWindows%c]%c ${text}`, 'color:#595959', 'color:red', 'color:#595959', 'color:unset')
        },
        clear: () => {
            console.clear()
        }

    }
};

var taskbarTime = setInterval(() => {
    var taskbarDate = new Date()
    if (taskbarDate.getMinutes() < 10) {
        document.querySelector("#taskbarTime").innerHTML = `${taskbarDate.getHours()}:0${taskbarDate.getMinutes()}`
    } else {
        document.querySelector("#taskbarTime").innerHTML = `${taskbarDate.getHours()}:${taskbarDate.getMinutes()}`
    }
}, 1000);

var taskbarOpenStartMenu = () => {
    if (!document.querySelector(".start-menu").classList.contains("open")) {
        document.querySelector(".start-menu").classList.add("open");
    } else {
        document.querySelector(".start-menu").classList.remove("open");
    }

}

function setupWindowSystem() {
    document.querySelectorAll('.window')
        .forEach(
            (item, index) => {
                console.log(item); console.log(index);
                dummyobject = item;
                windows.engine.create(item, item.children[0].children[0]);
            }
        );
    PlainDraggable.draggableCursor = ['default'];
    PlainDraggable.draggingCursor = ['default'];
    windows.console.info('Window system is being setup!');
}
window.addEventListener("load", function () {
    setupWindowSystem();
});
windows.console.info("Main script has started!");

