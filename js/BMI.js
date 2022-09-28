var btn = document.querySelector('.calc-btn');
var resultBtn = document.querySelector('.resultBtn');
var list = document.querySelector('.list');
var clear = document.querySelector('.clear');
var refresh = document.querySelector('.refresh');
var left = document.querySelector('.left');
var alertWord = document.querySelector('.alert');
var data = JSON.parse(localStorage.getItem('itemData')) || [];


btn.addEventListener('click', counting);
clear.addEventListener('click', clearhistory);
refresh.addEventListener('click', counting);


// clear history
function clearhistory(e) {
    e.preventDefault();
    list.innerHTML = "";
    localStorage.clear();
    data = [];
}

// local storage update
function counting(e) {
    e.preventDefault();

    var height = document.getElementById('height');
    var weight = document.getElementById('weight');
    var status = '';
    var bar = '';

    // 計算BMI公式
    var result = weight.value / (height.value * height.value * 0.0001)
    // 取小數點後兩位
    result = Math.round(result * 100) / 100;

    // 判斷輸入匡內的數值是否為空值或0
    if (height.value == '' || height.value == 0) {
        alert("請輸入正確的數值，且不可為0");
        return;
    } else if (weight.value == '' || weight.value == 0) {
        alert("請輸入正確的數值，且不可為0");
        return;
    }

    // default按鈕消失
    btn.style.display = 'none';
    // 計算後狀態按鈕顯示
    resultBtn.style.display = 'flex';
    // 將計算的BMI值帶入按鈕中
    var BMInum = document.querySelector('.BMInum');
    BMInum.textContent = result;

    // 判斷BMI值的區間及按鈕顯示的狀態
    if (result > 35) {
        status = '重度肥胖';
        bar = 'danger'
        left.setAttribute('class', 'red red-border');
        alertWord.setAttribute('class', 'red');
        refresh.setAttribute('class', 'red-bg');
        alertWord.textContent = status;
    }
    else if (result > 30 && result <= 35) {
        status = '中度肥胖';
        bar = 'too-fat';
        left.setAttribute('class', 'orange-d orange-d-border');
        alertWord.setAttribute('class', 'orange-d');
        refresh.setAttribute('class', 'orange-d-bg');
        alertWord.textContent = status;
    }
    else if (result > 27 && result <= 30) {
        status = '輕度肥胖';
        bar = 'too-fat';
        left.setAttribute('class', 'orange-d orange-d-border');
        alertWord.setAttribute('class', 'orange-d');
        refresh.setAttribute('class', 'orange-d-bg');
        alertWord.textContent = status;
    }
    else if (result > 24 && result <= 27) {
        status = '過重';
        bar = 'fat';
        left.setAttribute('class', 'orange-l orange-l-border');
        alertWord.setAttribute('class', 'orange-l');
        refresh.setAttribute('class', 'orange-l-bg');
        alertWord.textContent = status;
    }
    else if (result > 18.5 && result <= 24) {
        status = '理想';
        bar = 'safe';
        left.setAttribute('class', 'green green-border');
        alertWord.setAttribute('class', 'green');
        refresh.setAttribute('class', 'green-bg');
        alertWord.textContent = status;
    }
    else if (result <= 18.5) {
        status = '過輕';
        bar = 'light';
        left.setAttribute('class', 'blue blue-border');
        alertWord.setAttribute('class', 'blue');
        refresh.setAttribute('class', 'blue-bg');
        alertWord.textContent = status;
    }


    var item = {
        content: result,
        H: height.value,
        W: weight.value,
        S: status,
        B: bar,
    }

    data.unshift(item);
    localStorage.setItem('itemData', JSON.stringify(data));
    updateList(data);
}

// web update
function updateList(item) {
    var str = "";
    for (var i = 0; i < item.length; i++) {
        str +=
            `<li class="item ${item[i].B}">${item[i].S}
                    <div class="number">
                        <span class="BMI-num">${item[i].content}</span>
                        <span class="weight-num">${item[i].W}kg</span>
                        <span class="height-num">${item[i].H}cm</span>
                    </div>
                </li>`
    }
    list.innerHTML = str;
}
