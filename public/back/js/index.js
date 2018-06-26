// 基于准备好的dom，初始化echarts实例
var echart_1 = echarts.init(document.querySelector('.echart_1'));

// 指定图表的配置项和数据
var option = {
  title: {
    text: '2017年注册人数'
  },
  tooltip: {}, //提示框组件
  legend: {
    //data 里的内容必须和数据项的name组合使用,一一比对
    data: ['人数']
  },
  xAxis: { //x轴坐标
    data: ["一月", "二月", "三月", "四月", "五月", "六月"]
  },
  yAxis: {}, //y轴坐标,y轴一般不需要设置刻度,根据数据自动生成
  //数据项
  series: [{
    name: '人数',
    type: 'bar', //柱状图 line表示折线图,pie表示饼图
    data: [5, 20, 36, 10, 10, 20]
  }]
};

// 使用刚指定的配置项和数据显示图表。
echart_1.setOption(option);


// 基于准备好的dom，初始化echarts实例
var echart_2 = echarts.init(document.querySelector('.echart_2'));

// 指定图表的配置项和数据
var option2 = {
  title: {
    text: '热门品牌销售',
    subtext: '2018年6月',
    x: 'center' //水平方向
  },
  tooltip: { //提示框组件
    trigger: 'item', //数据项触发
    formatter: "{a} <br/>{b} : {c} ({d}%)" //字符串模板
    // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['耐克', '阿迪', '新百伦', '李宁', '阿迪王']
  },
  series: [{
    name: '访问来源',
    type: 'pie', //饼图
    radius: '55%', //圆直径的长度
    center: ['50%', '60%'], //圆心的位置
    data: [{
        value: 335,
        name: '耐克'
      },
      {
        value: 310,
        name: '阿迪'
      },
      {
        value: 234,
        name: '新百伦'
      },
      {
        value: 135,
        name: '李宁'
      },
      {
        value: 1548,
        name: '阿迪王'
      }
    ],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
};

// 使用刚指定的配置项和数据显示图表。
echart_2.setOption(option2);