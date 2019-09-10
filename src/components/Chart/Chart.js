import React from 'react'
import { render } from 'react-dom'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

const Chart = (props) => {
  let data = props.textData

  const chartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: `The Top Ten Words on ${props.url}`
    },
    legend: {
      title: {
        text:
          '<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>'
      },
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    xAxis: {
      labels: {
        formatter: function () {
          let format
          let value = this.value
          data.forEach(function (word, index) {
            if (index === value) {
              format = word.name.charAt(0).toUpperCase() + word.name.slice(1)
            }
          })
          return format
        }
      }
    },
    yAxis: {
      title: {
        text: '# of Times Word Appears on Site'
      }
    },
    tooltip: {
      pointFormatter: function () {
        let name = this.name.charAt(0).toUpperCase() + this.name.slice(1)
        return `${name}: ${this.y}`
      }
    },
    plotOptions: {
      area: {
        stacking: 'percent',
        marker: {
          enabled: false,
          symbol: 'circle'
        }
      }
    },
    series: [{
      data
    }]
  }

  console.log(chartOptions.series[0])
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  )
}

render(<Chart />, document.getElementById('root'))

export default Chart
