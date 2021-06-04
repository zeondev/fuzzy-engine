var windows = {
    bugcheck: {
        make: (reason) => {
            document.querySelector(".bluescreen").style.display = "block"
            if (typeof reason == 'string') {
                document.querySelector("#bluescreenReason").innerText = reason;
                var bluescreenTimer = setInterval(() => {
                    window.location = window.location
                    clearInterval(bluescreenTimer)
                }, 5000)
            }
            else {
                var str = 'engine.bugcheck.make: Invalid value passed, expected string and recieved ' + reason;
                windows.console.error(str);
                document.querySelector("#bluescreenReason").innerText = str;
            }
        },
        hide: () => {
            document.querySelector(".bluescreen").style.display = 'none'
        }
    },
    engine: {
        windowManager: {
            list: [],
            create: (window, handle) => {
                var draggable = new PlainDraggable(window);
                draggable.handle = handle;
                draggable.containment = { left: 0, top: 0, width: '200%', height: '200%' };
                windows.engine.windowManager.list.push(new Object({ "window": window, "handle": handle, "draggable": draggable }));
            },
            destroy: (window) => {
                // hello?
                var index = windows.engine.list.indexOf(window);
                if (index > -1) {
                    windows.engine.list.splice(index, 1);
                }
            },
            selection: {
                activate: () => {
                    // todo
                },
                deactivate: () => {
                    // todo
                }
            }
        },
        appearance: {
            theme: {
                value: 'dark',
                availableThemes: ['blue', 'dark', 'light', 'purple', 'red', 'green'],
                set: (thm) => {
                    if (typeof thm === 'string') {
                        if (windows.engine.appearance.theme.availableThemes.includes(thm)) {
                            document.querySelector('body').setAttribute('theme', thm)
                            windows.engine.appearance.theme.value = thm;
                        } else windows.console.error('windows.engine.appearance.theme.set: Value ' + thm + ' is not a valid theme.');
                    } else windows.console.error('windows.engine.appearance.theme.set: Invalid type for value ' + thm);
                }
            }
        },
        contextMenu: {
            element: document.querySelector('div.context-menu'),
            setup: () => {
                var contextmenu = windows.engine.contextMenu.element;
                if (typeof contextmenu == 'undefined' || contextmenu == null) {
                    contextmenu = document.querySelector('div.context-menu');
                    windows.engine.contextMenu.element = document.querySelector('div.context-menu');
                }
            },
            place: (e) => {
                windows.engine.contextMenu.setup();
                var contextmenu = windows.engine.contextMenu.element;
                contextmenu.style.visibility = 'visible';
                contextmenu.style.width = '';
                contextmenu.style.height = '';
                var calcHeight = contextmenu.offsetHeight + e.clientY;
                if (window.innerHeight <= calcHeight) {
                    console.log(true);
                    console.log(window.innerHeight + ' ' + calcHeight);
                    contextmenu.style.top = null;
                    contextmenu.style.bottom = '4px';
                    contextmenu.style.left = e.clientX + 'px';
                } else {
                    console.log(window.innerHeight + ' ' + calcHeight);
                    contextmenu.style.top = e.clientY + 'px';
                    contextmenu.style.bottom = null;
                    contextmenu.style.left = e.clientX + 'px';
                }
            },
            hide: (event = undefined) => {
                var contextmenu = windows.engine.contextMenu.element;
                if (contextmenu.style.visibility == 'visible') {
                    contextmenu.style.visibility = 'collapse';
                    contextmenu.style.width = '0px';
                    contextmenu.style.height = '0px';
                }
            }
        },
        setupWindowSystem: () => {
            windows.console.info('Window system is being setup!');
            document.querySelectorAll('.window')
                .forEach(
                    (item, index) => {
                        console.log(item); console.log(index);
                        dummyobject = item;
                        windows.engine.windowManager.create(item, item.children[0].children[0]);
                    }
                );
            PlainDraggable.draggableCursor = ['default'];
            PlainDraggable.draggingCursor = ['default'];
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
        document.querySelector('.taskbar-item').classList.add("start-menu-open");
    } else {
        document.querySelector(".start-menu").classList.remove("open");
        document.querySelector('.taskbar-item').classList.remove("start-menu-open");
    }

}

window.addEventListener("load", function () {
    windows.engine.setupWindowSystem();
    windows.engine.contextMenu.setup();
    windows.bugcheck.hide()
    windows.engine.appearance.theme.set('dark');
});
(function () {

    "use strict";

    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        windows.engine.contextMenu.place(e);
        console.log(e);
    });

    document.addEventListener('keyup', (e) => {
       console.log(e); 
    });

    document.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(e);
    });
    document.addEventListener("mousedown", function (e) {
        if (!e.target.offsetParent.classList.contains('context-menu')) {
            windows.engine.contextMenu.hide();
        }
        console.log(e);
    });
    document.addEventListener("mouseup", function (e) {
        e.preventDefault();
        console.log(e);
    });
})();
windows.console.info("Main script has started!");
