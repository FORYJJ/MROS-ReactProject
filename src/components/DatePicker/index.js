

import React, { Component } from 'react'
import './index.scss'
import connect from '../../modules/connect'

import moment from 'moment';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }

  return result;
}

function disabledDate(current) {
  // 未来七天可以选择
  return current < moment().subtract(1, 'days') || current > moment().add(6, 'days');
}

function disabledRangeTime(_, type) {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 24).filter(hour => hour < 8 || hour > 22),
    };
  }
  return {
    disabledHours: () => range(0, 24).filter(hour => hour < 8 || hour > 22),
  };
}

class _DatePicker extends Component {
  constructor(props) {
    super(props)
    this.getDate = this.getDate.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  state = { starDate: '', endDate: '' }

  getDate(_, value) {
    let starDate = value[0]
    let endDate = value[1]
    this.setState({ starDate, endDate })
  }

  handleClick(e) {
    let now = new Date()
    console.log(moment(now).format('YYYY-MM-DD HH:mm:ss'))
    console.log(this.state)
    // 存入store
    
  }


  render() {
    return (
      <div className="app-date-picker">
        <div>
          <RangePicker
            disabledDate={disabledDate}
            disabledTime={disabledRangeTime}
            showTime={{
              hideDisabledOptions: true,
              defaultValue: [moment('08:00:00', 'HH:mm:ss'), moment('18:00:00', 'HH:mm:ss')],
            }}
            format="YYYY-MM-DD HH:mm:ss"
            // open={false}
            allowClear={false}
            onOk={this.handleClick}
            onChange={this.getDate}
          />
        </div>
      </div>
    )
  }

}

export default connect(_DatePicker)