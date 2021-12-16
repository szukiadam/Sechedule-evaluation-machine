import React from 'react';
import moment from 'moment';

const DayNames = {
  0: 'Mon',
  1: 'Tue',
  2: 'Wed',
  3: 'Thu',
  4: 'Fri'
};

const cellSize = 15; // don't increase this too much

function Cell({ color }) {
  let style = {
    backgroundColor: color,
    width: cellSize,
    height: cellSize
  };

  return (
    <div className='timeline-cells-cell' style={style}></div>
  )
}

function Hour({ startDate, index }) {
  let date = moment(startDate).add(index, 'hour');
  let hourName = date.format('hh');

  return (
    <div className={`timeline-months-month ${hourName}`}>
      {hourName}
    </div>
  )
}

function WeekDay({ index }) {
    let style = {
        width: cellSize,
        height: cellSize
    };

  return (
    <div className='timeline-weekdays-weekday' style={style}>
      {DayNames[index]}
    </div>
  )
}

function Timeline({ range, data, colorFunc }) {
  let hours = Math.abs(range[0].diff(range[1], 'hours'));
  let cells = Array.from(new Array(hours * 5));
  let weekDays = Array.from(new Array(5));
  let months = Array.from(new Array(Math.floor(hours)));

  let min = Math.min(0, ...data.map(d => d.value));
  let max = Math.max(...data.map(d => d.value));

  let colorMultiplier = 1 / (max - min);

  let startDate = range[0];
  const DayFormat = 'hh';

  return (
    <div className='timeline'>

      <div className="timeline-months">
        {months.map((_, index) => <Hour key={index} index={index} startDate={startDate} />)}
      </div>

      <div className="timeline-body">

        <div className="timeline-weekdays">
          {weekDays.map((_, index) => <WeekDay key={index} index={index} startDate={startDate} />)}
        </div>

        <div className="timeline-cells">
          {cells.map((_, index) => {
            let date = moment(startDate).add(index, 'hour');
            let dataPoint = data.find(d => moment(date).format(DayFormat) === moment(d.date).format(DayFormat));
            let alpha = colorMultiplier * dataPoint.value;
            let color = colorFunc({ alpha });

            return (
              <Cell
                key={index}
                index={index}
                date={date}
                color={color}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

class GithubDensityPlot extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    // 1 year range
    console.log(this.props.data);
    return (
      <>
        <Timeline range={this.props.dateRange} data={this.props.data} colorFunc={({ alpha }) => `rgba(3, 160, 3, ${alpha})`} />
      </>
    );
  }
}

export default GithubDensityPlot;
//ReactDOM.render(<App />, document.getElementById('container'));