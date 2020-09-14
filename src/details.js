import React from "react";
import ReactDOM from "react-dom";
import { Card, Button } from "antd";
import TableCom from './index'

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    
    clickHandle() {
        ReactDOM.render(<TableCom />, document.getElementById("root"));
    }

  render() {
      console.log(this.props)
    return (
      <div>
        <Button type="primary" shape="circle" onClick={this.clickHandle}>Back</Button>
        <Card title={this.props.value.name + ' ' + this.props.value.last} style={{ width: 300 }}>
            <p>{this.props.value.email}</p>
            <p>{this.props.value.city}</p>
        </Card>
      </div>
    );
  }
}

export default Details;