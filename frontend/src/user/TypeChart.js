import React, {Component} from 'react';
import BarChart from 'react-bar-chart';

class TypeChart extends Component {

    state = {};

    constructor(props) {
        super(props);

        this.state = {
            rings: '',
            bracelets: '',
            necklaces: '',
            earrings: '',
            data: this.loadTypeDataFromServer,
            isLoading: true
        }
    }

    margin = {top: 20, right: 20, bottom: 30, left: 40};

    componentDidMount () {
        this.loadTypeDataFromServer();
        window.onresize = () => {
            this.setState({width: this.refs.root.offsetWidth});
        };
    }

    loadTypeDataFromServer = () => {
        fetch(`/order/orderItemsSizeByType?type=1`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    bracelets: data
                });
                fetch(`/order/orderItemsSizeByType?type=2`)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({
                            rings: data
                        });
                        fetch(`/order/orderItemsSizeByType?type=3`)
                            .then(response => response.json())
                            .then(data => {
                                this.setState({
                                    earrings: data
                                });
                                fetch(`/order/orderItemsSizeByType?type=4`)
                                    .then(response => response.json())
                                    .then(data => {
                                        this.setState({
                                            necklaces: data
                                        });
                                        this.state.data = [
                                            {text: 'Bracelets', value: this.state.bracelets},
                                            {text: 'Rings', value: this.state.rings},
                                            {text: 'Necklaces', value: this.state.necklaces},
                                            {text: 'Earrings', value: this.state.earrings}
                                        ];
                                        this.setState({isLoading: false})
                                    })
                            });
                    });

            });
    };

    handleBarClick(element, id){
        console.log(`The bin ${element.text} with id ${id} was clicked`);
    }

    render() {
        const  {isLoading} = this.state;

        if (isLoading)
            return <div className="loading">
                <div className="loader"></div>
            </div>;

        return (
            <div ref='root'>
                <div style={{width: '50%'}}>
                    <BarChart
                        // colorBars
                        colorByLabel={false}
                        ylabel='Quantity'
                        width={1000}
                        height={500}
                        margin={this.margin}
                        data={this.state.data}
                        onBarClick={this.handleBarClick}/>
                </div>
            </div>
        );
    };

}
export default TypeChart;