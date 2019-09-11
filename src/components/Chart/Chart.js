import React from 'react'
import { render } from 'react-dom'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import wordcloud from 'highcharts/modules/wordcloud'

wordcloud(Highcharts)

const Chart = (props) => {
  let data = props.topTenWords

  const chartOptions = {
    chart: {
      type: 'wordcloud'
    },
    title: {
      text: `The Top Ten Words by Appearance on ${props.url}`
    },
    colors: ['#00035c', '#510061', '#810061', '#a81a5f', '#c83f5b', '#e16458', '#f38959', '#ffb061'],
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      labelFormat: 'Words'
    },
    tooltip: {
      backgroundColor: '#181a5c',
      style: {'color': '#ffffff', 'cursor': 'default', 'fontSize': '14px', 'pointerEvents': 'none', 'whiteSpace': 'nowrap'},
      headerFormat: '',
      pointFormatter: function () {
        let name = this.name.charAt(0).toUpperCase() + this.name.slice(1)
        return `${name} appears ${this.weight} times`
      }
    },
    series: [{
      data
    }]
  }

  return (
    <div>
      {/* <h3>There are a total of 100 words on </h3> */}
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  )
}

render(<Chart />, document.getElementById('root'))

export default Chart
