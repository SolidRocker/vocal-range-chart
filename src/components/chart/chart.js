import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HorizontalBar} from 'react-chartjs-2';

import {getNames, getGenders, getHighestNotes, getLowestNotes} from './chartActions';
import {noteArray} from './noteArray';
import './chart.css'

class ChartManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            C4ID: 40,           // Position of C4 in noteArray
            chartData: {},
            maleColor: 'rgb(0, 0, 255)',
            femaleColor: 'rgb(255, 0, 0)',
        }
        this.toNote = this.toNote.bind(this);
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
    setChartData() {
        this.setState({
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
            }
        })
    }

    testClick = () => {
        this.props.getNames();
        this.props.getGenders(this.state.maleColor, this.state.femaleColor);
        this.props.getHighestNotes();
        this.props.getLowestNotes();
        this.setChartData();
    }

    render() {
       return (
           <div className="chart" onClick={this.testClick}>
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
});

export default connect(mapStateToProps, {getNames, getGenders, getHighestNotes, getLowestNotes})(ChartManager);