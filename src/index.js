import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import "antd/dist/antd.css";
import { Table, Select, Input } from "antd";
import Spinner from './spinner.js'
import Details from './details'

const { Option } = Select;
var tableCom = null;

class TableCom extends React.Component {
  state = { 
    data: [],
    mainData: [],
    cityData: [],
    loading: true
  }
  
  componentDidMount() {
    tableCom = this;
    const URL = './users.json';
    axios(URL).then((response) => {
      var cities = [],
          cityNames = []
      for(var i=0; i<response.data.length; i++) {
        if(i === 0 ) cities.push(<Option key='01' value='Reset'>Reset</Option>)
        if(!cityNames.includes(response.data[i].city)) {
          cityNames.push(response.data[i].city)
          cities.push(<Option key={i} value={response.data[i].city}>{response.data[i].city}</Option>)
        }
      }
      this.setState({data: response.data, mainData: response.data, cityData: cities, loading: false})
    })
  }

  selectRow(value) {
    ReactDOM.render(<Details value={value} />, document.getElementById("root"));
  }
  
  onChange(value) {
    if(value === 'Reset') {
      tableCom.setState({data: tableCom.state.mainData})
    } else {
      var array = [];
      for(var i=0; i < tableCom.state.mainData.length; i++) {
        if(tableCom.state.mainData[i].city.includes(value)) {
          array.push(tableCom.state.mainData[i])
        }
      }
      tableCom.setState({data: array});
    }
  }

  onSearch(obj) {
    const value = obj.target.value;
    var array = [];
    for(var i=0; i < tableCom.state.mainData.length; i++) {
      if(tableCom.state.mainData[i].name.includes(value) ||
        tableCom.state.mainData[i].last.includes(value) ||
        tableCom.state.mainData[i].email.includes(value)) {
        array.push(tableCom.state.mainData[i])
      }
    }
    tableCom.setState({data: array});
  }

  render() {
    return (
      <div>
        <Spinner style={this.state.loading ? {display: 'block'} : {display: 'none'} }/>
        <Input placeholder="Basic usage" onChange={this.onSearch}/>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a city"
          optionFilterProp="children"
          onChange={this.onChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {this.state.cityData}
        </Select>
        <Table 
          dataSource={this.state.data} 
          columns={columns} 
          onRow={(record) => ({
            onClick: () => {
              this.selectRow(record);
            },
          })}  
        />
      </div>
    );
  }
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Lastname',
    dataIndex: 'last',
    key: 'last',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
  },
];

export default TableCom;

ReactDOM.render(<TableCom />, document.getElementById("root"));
