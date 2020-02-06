const dbName = "iosTest";
const dbVersion = 1;
//name:表名  key:主键 ,cursorIndex 索引
const store = {
    staticResource: {
        name: "STATIC_RESOURCE",
        key: "id",
        cursorIndex: [{
            name: "url",
            unique: true
        }, {
            name: "value",
            unique: false
        }, {
            name: "version",
            unique: false
        }]
    }
};
const IDB = {
    // indexedDB兼容
    indexedDB: window.indexedDB ||
        window.webkitindexedDB ||
        window.msIndexedDB ||
        window.mozIndexedDB,
    async initDB() {
        let that = this;
        let request = this.indexedDB.open(dbName, dbVersion);
        request.onerror = function () {
            console.log("打开数据库失败");
        };

        request.onsuccess = function (event) {
            console.log("打开数据库成功");
            // that.createTable(event);
        };
        request.onupgradeneeded = function (event) {
            that.createTable(event);
        };
    },
    createTable: function(event) {
        console.log('create table!');
        let db = event.target.result;
            for (var t in store) {
                if (!db.objectStoreNames.contains(store[t].name)) {
                    var objectStore = db.createObjectStore(store[t].name, {
                        keyPath: store[t].key,
                        autoIncrement: true
                    });
                    for (let i = 0; i < store[t].cursorIndex.length; i++) {
                        const element = store[t].cursorIndex[i];
                        objectStore.createIndex(element.name, element.name, {
                            unique: element.unique
                        });
                    }
                }
            }
    },
    // 打开数据库
    openDB: function () {
        return new Promise((resolve, reject) => {
            let request = this.indexedDB.open(dbName, dbVersion);

            request.onerror = function (event) {
                reject("IndexedDB数据库打开错误，" + event);
            };
            request.onsuccess = function (event) {
                resolve(event.target.result);
            };
        });
    },
    // 删除表
    deleteDB: function (table) {
        let deleteQuest = this.indexedDB.deleteDatabase(table);
        deleteQuest.onerror = function () {
            return Promise.resolve(false);
        };
        deleteQuest.onsuccess = function () {
            return Promise.resolve(true);
        };
    },
    // 关闭数据库
    closeDB: async function (db) {
        try {
            let d;
            if (!db) {
                d = await this.openDB();
            }
            let closeQuest = d.closeDB();
            return new Promise(resolve => {
                closeQuest.onerror = function () {
                    resolve(false);
                };
                closeQuest.onsuccess = function () {
                    resolve(true);
                };
            });
        } catch (error) {
            return Promise.resolve(false);
        }
    },
    // 添加数据，add添加新值
    insert: async function (tableName, data) {
        try {
            let init = await this.initDB();
            let db = await this.openDB();
            // 存入IDB之前对\做转义处理
            // debugger
            // for(let ip in data) {
            //     data[ip] = data[ip].replace(/\\/g, '\\\\');
            // }
            let request = db
                .transaction(tableName, "readwrite")
                .objectStore(tableName)
                .add(data);

            return new Promise((resolve, reject) => {
                request.onerror = function () {
                    reject("添加数据出错");
                };
                request.onsuccess = function () {
                    resolve(true);
                };
            });
        } catch (error) {
            console.log(error);
            return Promise.resolve(false);
        }
    },
    // 更新
    update: async function (tableName, data) {
        try {
            let db = await this.openDB();
            let request = db
                .transaction(tableName, "readwrite")
                .objectStore(tableName)
                .put(data);
            return new Promise(resolve => {
                request.onerror = function () {
                    resolve(false);
                };
                request.onsuccess = function () {
                    resolve(true);
                };
            });
        } catch (error) {
            return Promise.resolve(false);
        }
    },
    // 删除数据
    delete: async function (tableName, keyValue) {
        try {
            let db = await this.openDB();
            let request = db
                .transaction(tableName, "readwrite")
                .objectStore(tableName)
                .delete(keyValue);
            return new Promise(resolve => {
                request.onerror = function () {
                    resolve(false);
                };
                request.onsuccess = function () {
                    resolve(true);
                };
            });
        } catch (error) {
            return Promise.resolve(false);
        }
    },
    // 清空数据
    clear: async function (tableName) {
        let db = await this.openDB();
        let store = db.transaction(tableName, "readwrite").objectStore(tableName);
        store.clear();
    },
    // 查询数据 表名 索引值 索引 key  没有value key为key 而不是索引
    get: async function (tableName, keyValue, indexCursor) {
        try {
            let init = await this.initDB();
            let db = await this.openDB();
            let store = db
                .transaction(tableName, "readonly")
                .objectStore(tableName);
            let request;
            request = !keyValue ?
                store.openCursor() :
                indexCursor ?
                store.index(indexCursor).get(keyValue) :
                store.get(keyValue);
            let data = [];
            return new Promise(resolve => {
                request.onerror = function () {
                    resolve("查询数据失败");
                };
                request.onsuccess = function (event) {
                    if (!keyValue && !indexCursor) {
                        if (event.target.result) {
                            data.push(event.target.result.value);
                            event.target.result.continue();
                        } else {
                            resolve(data);
                        }
                    } else {
                        resolve([event.target.result]);
                    }
                };
            });
        } catch (error) {
            return Promise.reject(error);
        }
    },
    //   通过游标操作数据, callback中要有游标移动方式
    handleDataByCursor: async function (table, keyRange) {
        try {
            let kRange = keyRange || "";
            let db = await this.openDB();
            let store = db.transaction(table, "readwrite").objectStore(table),
                request;
            request = store.openCursor(kRange);
            return new Promise(resolve => {
                request.onerror = function () {
                    resolve("通过游标获取数据报错");
                };
                request.onsuccess = function (event) {
                    let cursor = event.target.result;
                    resolve(cursor);
                };
            });
        } catch (error) {
            return Promise.reject(error);
        }
    },
    // 通过索引游标操作数据, callback中要有游标移动方式
    handleDataByIndex: async function (table, keyRange, sursorIndex) {
        try {
            let kRange = keyRange || "";
            let db = await this.openDB();
            let store = db.transaction(table, "readwrite").objectStore(table),
                request;
            request = store.index(sursorIndex).openCursor(kRange);
            return new Promise(resolve => {
                request.onerror = function () {
                    resolve("通过索引游标获取数据报错");
                };
                request.onsuccess = function (event) {
                    let cursor = event.target.result;
                    if (cursor) {
                        resolve(cursor);
                    }
                };
            });
        } catch (error) {
            return Promise.reject(error);
        }
    },
    // 创建游标索引
    createCursorIndex: async function (table, cursorIndex, unique) {
        var db = await this.openDB();
        let store = db.transaction(table, "readwrite").objectStore(table);
        store.createIndex(cursorIndex, cursorIndex, {
            unique: unique
        });
        return Promise.resolve();
    }
};
window.IDB = IDB;
// 支持vue等使用
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = IDB;
    }
    exports.IDB = IDB;
}