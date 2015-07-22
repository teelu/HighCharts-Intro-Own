$(document).ready(function () {

  var ChartMaker = function () {
    this.amznXYData = [];
    this.googXYData = [];
  }

  ChartMaker.prototype.getAjax = function () {
    //amazn
    $.ajax({
      context: this,
      type: "GET",
      url: "https://www.quandl.com/api/v1/datasets/YAHOO/AMZN.json?auth_token=sdi7yeMe64ggTCLfzMdH",
      success: function (response) {
        var items = response.data.sort();
        for (var i = 0; i < items.length; i++) {
          this.amznXYData.push({
            x: new Date(items[i][0]),
            y: items[i][1]
          });
        }
        this.makeChart();
      }
    });
    //google
    $.ajax({
      context: this,
      type: "GET",
      url: "https://www.quandl.com/api/v1/datasets/YAHOO/GOOGL.json?auth_token=sdi7yeMe64ggTCLfzMdH",
      success: function (response) {
        var items = response.data.sort();
        for (var i = 0; i < items.length; i++) {
          this.googXYData.push({
            x: new Date(items[i][0]),
            y: items[i][1]
          });
        }
        this.makeChart();
      }
    });
  }

  ChartMaker.prototype.makeChart = function () {
    var highChartConfig = {
      chart: {
        plotBackgroundColor:"#FCFFC5",
        plotBorderColor:"#000000"
      },
      title: {
        text: "Amazon and Google Stock Price"
      },
      subtitle: {
        text: "AMZN:Amazon stock price and Goog:Google Stock price from Yahoo! Finance"
      },
      xAxis: {
        type: 'datetime'
      },
      series: [{
        turboThreshold: 5000,
        name: 'AMZN',
        data: this.amznXYData
      }, {
      turboThreshold: 5000,
        name: 'Goog',
        data: this.googXYData
      }],
    }
    $('#chart').highcharts(highChartConfig);
  };

  var newChart = new ChartMaker();
  newChart.getAjax();
});
