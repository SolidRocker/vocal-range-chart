import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HorizontalBar} from 'react-chartjs-2';

import {getNames, getGenders, getHighestNotes, getLowestNotes, addToChart, postChange, resetTrigger} from './chartActions';
import {noteArray} from './noteArray';
import './chart.css'

class ChartManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            C4ID: 40,           // Position of C4 in noteArray
            chartData: {},
            triggerUpdate: false
        }
        this.toNote = this.toNote.bind(this);
        this.setChartData = this.setChartData.bind(this);
    }

    componentDidUpdate() {
        console.log(this.props.newTrigger);
        if(this.state.triggerUpdate) {
            this.setState({triggerUpdate: false}, function() {
             this.setChartData();
            })
        }
        else if(this.props.newTrigger) {
            this.setState({triggerUpdate: true}, function() {
                this.props.resetTrigger();
            });
        }
    }

    toNote = (noteID) => {
        return noteArray[noteID+this.state.C4ID];
    }

    toNoteID(note)  {
        for(var i = 0; i < noteArray.length; ++i) {
            if(noteArray[i] === note) {
                return i;
            }
        }
    }

    // Sets the chart data from the 4 arrays created
    setChartData = () => {
        console.log("SET");
        this.setState({
            chartData: {
                labels: ["hi", "ee"],
                datasets: [
                {
                    label: 'Highest Note',
                    data: [6, 8],
                    backgroundColor: ["#FF0000", "#00FF00"]
                },
                {
                    label: 'Lowest Note',
                    data: [-6, -3],
                    backgroundColor: ["#FF0000",  "#00FF00"]
                }]

                /*
                chartData: {
                labels: this.props.names,
                datasets: [
                {
                    label: 'Highest Note',
                    data: this.props.highestNotes,
                    backgroundColor: this.props.genders
                },
                {
                    label: 'Lowest Note',
                    data: this.props.lowestNotes,
                    backgroundColor: this.props.genders
                }]
                */
            }
        })
    }

    render() {

        return (
           <div className="chart">
                <HorizontalBar
                    className="chart-bar"
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: true,
                            text: "Vocal Ranges",
                            fontSize: 25
                        },
                        legend: {
                            display: false,
                            position: 'bottom'
                        },
                        tooltips: {
                            mode: 'y',
                        },
                        scales: {
                            xAxes: [{
                                stacked: true,
                                ticks: {
                                    callback: function(value, index, values) {
                                        return noteArray[value+40];
                                    }
                                }
                            }],
                            yAxes: [{
                                stacked: true
                            }]
                        }
                    }}
                />
            </div>
        );
      }
}

const mapStateToProps = state => ({
    names: state.chart.names,
    genders: state.chart.genders,
    highestNotes: state.chart.highestNotes,
    lowestNotes: state.chart.lowestNotes,
    newTrigger: state.chart.newTrigger
});

export default connect(mapStateToProps, {getNames, getGenders, getHighestNotes, getLowestNotes, addToChart, postChange, resetTrigger})(ChartManager);