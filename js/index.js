var request = window.indexedDB.open("admin", 1);

var db;

request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore('admin', { keyPath: 'id',autoIncrement: true });
    objectStore.createIndex('email', 'email', { unique: true });
    objectStore.createIndex('password', 'password', { unique: false });
  }

request.onsuccess = function (event) {
  db = request.result;
  console.log('数据库打开成功');
  add();
};



function add() {
    var request = db.transaction(['admin'], 'readwrite')
      .objectStore('admin')
      .add({ email: 'zhangsan@example.com',password:"1234567" });
  
    request.onsuccess = function (event) {
      console.log('数据写入成功');
    };
  
    request.onerror = function (event) {
      console.log('数据写入失败');
    }
  }
  
  