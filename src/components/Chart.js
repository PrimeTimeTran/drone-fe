import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'


class Chart extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            type: 'Chart',
            data: {
                labels: ['First Quiz', 'Second Quiz', 'Third Quiz', 'Fourth Quiz', 'Fifth Quiz', 'Sixth Quiz'],
                datasets: [{
                    label: '% Score of Quiz Taken',
                    data: [79, 74, 32, 57, 65, 40],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderWidth: 1
                }]
            }
        }
    }
    
static defaultProps ={
    displayTitle: false 
}

    render() {
        console.log(this.state.data)
        return (
            <div className="chart">
                <Bar
                
                    data={this.state.data}
                    options={{}}
                />
            </div>
        )
    }
    
}





export default Chart;