// practice 01
document.getElementById('counting').onclick = function () {
    var hamPrice = 50;
    var cokePrice = 20;
    var hamNum = parseInt(document.getElementById('hamNumId').value);
    var cokeNum = parseInt(document.getElementById('cokeNumId').value);
    var total = hamNum * hamPrice + cokeNum * cokePrice;
    document.getElementById('totalNumId').textContent = total;
}

// practice 02
var el = document.querySelector('#button');
el.onclick = function (e) {
    console.log(e);
}

// practice 03
var area = document.getElementById('areaId');
var list = document.querySelector('.list');

Taiwan = [
    {
        leader: 'Koa-P',
        county: 'Taipei'
    },
    {
        leader: 'Yellow-33',
        county: 'Taipei'
    },
    {
        leader: 'Lee-3',
        county: 'Yunlin'
    }
]

area.addEventListener('change', function (e) {
    var len = Taiwan.length;
    var select = e.target.value;
    var str = "";
    for (var i = 0; i < len; i++) {
        if (select == Taiwan[i].county) {
            str += '<li>' + Taiwan[i].leader + '</li>';
        }
    }
    list.innerHTML = str;
}, false)


// practice 04
var body = document.body;

function boxkey(e) {
    switch (e.keyCode) {
        case 49:
            document.querySelector('.box1').style.left = '500px';
            break;
        case 50:
            document.querySelector('.box2').style.left = '500px';
            break;
        case 51:
            document.querySelector('.box3').style.left = '500px';
            break;
    }
};

body.addEventListener('keydown', boxkey, false);


// practice 05

function result() {
    var cookiePrice = 20;
    var juicePrice = 30;
    var cookieTotal = cookiePrice * parseInt(document.querySelector('.cookieNumId').value);
    var juiceTotal = juicePrice * parseInt(document.querySelector('.juiceNumId').value);
    var total = cookieTotal + juiceTotal;
    document.querySelector('.resultNumId').textContent = total;
}

var countBtn = document.querySelector('.count');
countBtn.addEventListener('click', result, false);

function bluralert(e) {
    var str = e.target.value;
    if (str === "") {
        alert('this input cannot be blank!');
    }
}

document.querySelector('.cookieNumId').addEventListener('blur', bluralert, false);
document.querySelector('.juiceNumId').addEventListener('blur', bluralert, false);

// practice 06

document.querySelector('.saveBtn').addEventListener('click', function (
) {
    var Name = document.querySelector('.nameArea').value;
    localStorage.setItem('myName', Name);
})

document.querySelector('.callBtn').addEventListener('click', function () {
    var str = localStorage.getItem('myName');
    alert('hello ! I am' + str);
})

// practice 07
// 指定元素
var sendData = document.querySelector('.save');
var list = document.querySelector('.listItem');
var textData = document.querySelector('.text')
var data = JSON.parse(localStorage.getItem('listData')) || [];

// 監聽事件
sendData.addEventListener('click', addData);
list.addEventListener('click', toggleDown);
textData.addEventListener('blur', textalert);
updateList(data);

// 未填寫提示
function textalert(){
    alert('此欄位不可為空');
}

// 瀏覽器資料更新
function addData(e) {
    e.preventDefault();
    var txt = document.querySelector('.text').value;
    if (txt == ''){
        alert('此欄位不可為空！')
    }
    var todo = {
        content: txt,
    };
    data.push(todo);
    localStorage.setItem('listData', JSON.stringify(data));
    updateList(data);
}

// 更新網頁畫面
function updateList(item) {
    var str = "";
    for (var i = 0; i < item.length; i++) {
        str += '<li><a href="#" data-index=' + i + '>刪除</a><span>' + data[i].content + '</span></li>';
    };
    list.innerHTML = str;
}

// 刪除清單物件
function toggleDown(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') { return };
    var index = e.target.dataset.index;
    data.splice(index, 1);
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));
}