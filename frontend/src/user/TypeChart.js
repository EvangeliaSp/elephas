import React, {Component} from 'react';
import BarChart from 'react-bar-chart';

class Example extends Component {

    data = [
        {text: 'Bracelets', value: 500},
        {text: 'Rings', value: 300},
        {text: 'Necklaces', value: 500},
        {text: 'Earrings', value: 300}
    ];

    margin = {top: 20, right: 20, bottom: 30, left: 40};


        getInitialState() {
            return { width: 500 };
        }

        componentDidMount () {
            window.onresize = () => {
                this.setState({width: this.refs.root.offsetWidth});
            };
        }

        handleBarClick(element, id){
            console.log(`The bin ${element.text} with id ${id} was clicked`);
        }

        render() {
            return (
                <div ref='root'>
                    <div style={{width: '50%'}}>
                        <BarChart ylabel='Quantity'
                                  width={this.margin}
                                  height={500}
                                  margin={this.margin}
                                  data={this.data}
                                  onBarClick={this.handleBarClick}/>
                    </div>
                </div>
            );
        };


}
export default Example;