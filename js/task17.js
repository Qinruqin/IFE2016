/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};
var citySelectName = ["北京","上海","广州","深圳","成都","西安","福州","厦门","沈阳"];

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: 0
}

/**
 * 渲染图表
 */
function renderChart() {
	if(pageState.nowSelectCity == -1){
		alert('请选择城市');
		return false;
	}
	var colorArr = ['red','yellow','blue','green','orange','purple','black','pink'];
	var oTitle = document.getElementsByTagName('h3')[0];
	var oChartBox = document.getElementById('chart-box');
	oChartBox.innerHTML = '';

	for(var cityName in chartData){
		if(citySelectName[pageState.nowSelectCity] == cityName){
			oTitle.innerText = cityName;
			var data = chartData[cityName][pageState.nowGraTime];
			for(var d in data){
				var aSpan = document.createElement('span');
				aSpan.setAttribute('title',d+'：'+data[d]) ;
				aSpan.style.height = data[d] + 'px';
				if(pageState.nowGraTime == 0){
					aSpan.style.width = 10+'px';
				}else if(pageState.nowGraTime == 1){
					aSpan.style.width = 20+'px';
					aSpan.style.marginLeft = 30+'px' ;
				}else{
					aSpan.style.width = 40+'px';
					aSpan.style.marginLeft = 50+'px' ;
				}
				aSpan.style.background =colorArr[parseInt(Math.random()*5)];
				oChartBox.appendChild(aSpan)
			}
		}
	}

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
	// 确定是否选项发生了变化 
	if(e.target.tagName.toLowerCase() == 'input'){
	  	if(e.target.value === pageState.nowGraTime){
	  		return false;
	}
	  	// 设置对应数据
	    pageState.nowGraTime = e.target.value;
	}
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
    // 确定是否选项发生了变化 
	if(e.target.value === pageState.nowSelectCity){
  		return false;
  	}
    // 设置对应数据
    pageState.nowSelectCity = e.target.value;
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var graTime = document.getElementById('form-gra-time');
    graTime.attachEvent?graTime.attachEvent('onclick',graTimeChange):graTime.addEventListener('click',graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var citySelect = document.getElementById('city-select');
    var cityData = '<option>请选择城市</option>';
    var num = 0;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    for(var city in aqiSourceData){
       cityData+='<option value='+num+'>'+city+'</option>';
       num++;
    }
    citySelect.innerHTML = cityData; 
    citySelect.onclick = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  for(var cityName in aqiSourceData){
  	//chartData有3个数组，分别存储日、周、月
  	/*
  	  chartData:{'北京'：[{'2016-01-01':298,'2016-01-02':14},
  	                      {'第1周':100,'第2周':130},
  	                      {'第1月':100,'第2月':130}],
                }

  	*/
  	chartData[cityName] = [{}, {}, {}];
  	var sum = 0;
  	var n = 0;
  	var week = 1;

  	//存储日数据
  	chartData[cityName][0] = aqiSourceData[cityName];

  	//存储周数据
  	for(var d in aqiSourceData[cityName]){
  		n ++;
  		sum += aqiSourceData[cityName][d];
  		if(n%7 == 0){
  			chartData[cityName][1]['第'+week+'周'] = parseInt(sum/7);
  			week++;
  			sum = 0;
  		}else{
  			chartData[cityName][1]['第'+week+'周'] = parseInt(sum/(n%7));
  			sum = 0;
  		}
  	}
  	//存储月数据
  	for(var i = 1;i < 13 ;i++){
  		sum = 0;
  		for(var j = 0 ; j < 32; j++){
  			if(aqiSourceData[cityName]["2016-" + ((i<10) ? ('0'+i) : i) + "-" + ((j<10) ? ('0'+j) : j)]) {
  			sum += aqiSourceData[cityName]['2016-'+((i < 10) ? ('0' + i) : i)+'-'+((j < 10) ? ('0' + j) : j)];
	  		}
  		}
  		chartData[cityName][2]['第'+i+'月'] = parseInt(sum/31);
  	}
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();