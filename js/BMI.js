var btn = document.querySelector('.calc-btn');
var list = document.querySelector('.list');
var clear = document.querySelector('.clear');
var data = JSON.parse(localStorage.getItem('itemData')) || [];
var resultBtn = document.querySelector('.resultBtn');
var refresh = document.querySelector('.refresh');
var left = document.querySelector('.left');
var alertWord = document.querySelector('.alert');
var height = document.getElementById('height');
var weight = document.getElementById('weight');


btn.addEventListener('click', counting);
clear.addEventListener('click', clearhistory);
refresh.addEventListener('click', restart);

// blank alert
function blankAlert(){

}

// clear history
function clearhistory(e) {
    e.preventDefault();
    list.innerHTML = "";
    localStorage.clear();
    data = [];
}

// refresh
function restart(e) {
    e.preventDefault();
    height.value = "";
    weight.value = "";
    btn.style.display = 'block';
    resultBtn.style.display = 'none';
    left.removeAttribute('class');
    refresh.removeAttribute('class');
    alertWord.removeAttribute('class');
}

// local storage update
function counting(e) {
    e.preventDefault();

    var result = weight.value / (height.value * height.value * 0.0001)
    result = Math.round(result * 100) / 100;

    if(result == "NaN" || result == "null") {
        alert('請輸入正確的數值!');
        return;
    }else if (height.value== '') {
        alert("您尚未輸入身高！");
        return;
    }else if (weight.value == '') {
        alert ("您尚未輸入體重！");
        return;
    }

    btn.style.display = 'none';

    var item = {
        content: result,
        H: height,
        W: weight,
    };
    data.unshift(item);
    localStorage.setItem('itemData', JSON.stringify(data));
    updateList(data);
    resultContent(data);
}

// result content
function resultContent(item) {
    resultBtn.style.display = 'flex';
    var BMInum = document.querySelector('.BMInum');
    var BMI = item[0].content;
    BMInum.textContent = BMI;

    if (BMI > 35) {
        left.setAttribute('class', 'red red-border');
        alertWord.setAttribute('class', 'red');
        refresh.setAttribute('class', 'red-bg');
        alertWord.textContent = '重度肥胖';
    }
    else if (BMI > 30 && BMI <= 35) {
        left.setAttribute('class', 'orange-d orange-d-border');
        alertWord.setAttribute('class', 'orange-d');
        refresh.setAttribute('class', 'orange-d-bg');
        alertWord.textContent = '中度肥胖';
    }
    else if (BMI > 27 && BMI <= 30) {
        left.setAttribute('class', 'orange-d orange-d-border');
        alertWord.setAttribute('class', 'orange-d');
        refresh.setAttribute('class', 'orange-d-bg');
        alertWord.textContent = '輕度肥胖';
    }
    else if (BMI > 24 && BMI <= 27) {
        left.setAttribute('class', 'orange-l orange-l-border');
        alertWord.setAttribute('class', 'orange-l');
        refresh.setAttribute('class', 'orange-l-bg');
        alertWord.textContent = '過重';
    }
    else if (BMI > 18.5 && BMI <= 24) {
        left.setAttribute('class', 'green green-border');
        alertWord.setAttribute('class', 'green');
        refresh.setAttribute('class', 'green-bg');
        alertWord.textContent = '理想';
    }
    else if (BMI>0 && BMI <= 18.5) {
        left.setAttribute('class', 'blue blue-border');
        alertWord.setAttribute('class', 'blue');
        refresh.setAttribute('class', 'blue-bg');
        alertWord.textContent = '過輕';
    }
}

// web update
function updateList(item) {
    var str = "";
    for (var i = 0; i < item.length; i++) {
        var BMI = item[i].content
        if (BMI > 35) {
            var severe = '重度肥胖';
            str +=
                `<li class="item danger">${severe}
                    <div class="number">
                        <span class="BMI-num">${BMI}</span>
                        <span class="weight-num">${item[i].W}kg</span>
                        <span class="height-num">${item[i].H}cm</span>
                    </div>
                </li>`
        }
        else if (BMI > 30 && BMI <= 35) {
            var moderate = '中度肥胖';
            str +=
                `<li class="item too-fat">${moderate}
                    <div class="number">
                        <span class="BMI-num">${BMI}</span>
                        <span class="weight-num">${item[i].W}kg</span>
                        <span class="height-num">${item[i].H}cm</span>
                    </div>
                </li>
                `
        }
        else if (BMI > 27 && BMI <= 30) {
            var mild = '輕度肥胖';
            str +=
                `<li class="item too-fat">${mild}
                    <div class="number">
                        <span class="BMI-num">${BMI}</span>
                        <span class="weight-num">${item[i].W}kg</span>
                        <span class="height-num">${item[i].H}cm</span>
                    </div>
                </li>
                `
        }
        else if (BMI > 24 && BMI <= 27) {
            var overweight = '過重';
            str +=
                `<li class="item fat">${overweight}
                    <div class="number">
                        <span class="BMI-num">${BMI}</span>
                        <span class="weight-num">${item[i].W}kg</span>
                        <span class="height-num">${item[i].H}cm</span>
                    </div>
                </li>
                `
        }
        else if (BMI > 18.5 && BMI <= 24) {
            var normal = '理想';
            str +=
                `<li class="item safe">${normal}
                    <div class="number">
                        <span class="BMI-num">${BMI}</span>
                        <span class="weight-num">${item[i].W}kg</span>
                        <span class="height-num">${item[i].H}cm</span>
                    </div>
                </li>
                `
        }
        else if (BMI <= 18.5) {
            var skinny = '過輕';
            str +=
                `<li class="item light">${skinny}
                    <div class="number">
                        <span class="BMI-num">${BMI}</span>
                        <span class="weight-num">${item[i].W}kg</span>
                        <span class="height-num">${item[i].H}cm</span>
                    </div>
                </li>
                `
        }
        list.innerHTML = str;
    }

}
