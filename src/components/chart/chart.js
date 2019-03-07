import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HorizontalBar} from 'react-chartjs-2';

import {
    addToChart,
    postChange,
    resetTrigger,
    removeVocalist,
    resetRemoveTrigger,
    addRange
} from './chartActions';

import {noteArray} from './noteArray';
import './chart.css'

class ChartManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            C4ID: 40,           // Position of C4 in noteArray
            chartData: {},
            triggerUpdate: false,
            triggerRemove: false,
        }
        this.toNote = this.toNote.bind(this);
        this.setChartData = this.setChartData.bind(this);
    }

    componentDidUpdate() {

        // Add Bar Handler
        // Listen for changes in this.props.newTrigger has changed.
        // If there is, update this.state.triggerUpdate, which then sets chart data.
        // Also stops infinite loop via unsetting this.state.triggerUpdate.
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

        // Remove Bar Handler. Same logic as adding.
        if(this.state.triggerRemove) {
            this.setState({triggerRemove: false}, function() {
             this.setChartData();
            })
        }
        else if(this.props.removeTrigger) {
            this.setState({triggerRemove: true}, function() {
                this.props.resetRemoveTrigger();
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

    getVocalistData(dataType) {
        let output = [];
        for(var i = 0; i < this.props.vocalists.length; ++i) {

            if(dataType === "name") {
                output.push(this.props.vocalists[i].name);
            }
            else if(dataType === "gender") {
                output.push(this.props.vocalists[i].gender);
            }
            else if(dataType === "highestNote") {
                output.push(this.props.vocalists[i].highestNote);
            }
            else if(dataType === "lowestNote") {
                output.push(this.props.vocalists[i].lowestNote);
            }
        }
        return output;
    }

    // Sets the chart data from the 4 arrays created
    setChartData = () => {
        this.setState({
            chartData: {
                labels: this.getVocalistData("name"),
                datasets: [
                {
                    label: 'Highest Note',
                    data: this.getVocalistData("highestNote"),
                    backgroundColor: this.getVocalistData("gender")
                },
                {
                    label: 'Lowest Note',
                    data: this.getVocalistData("lowestNote"),
                    backgroundColor: this.getVocalistData("gender")
                }]
            }
        })
    }

    clickElem = (elems) => {    
        if(elems[0]) {
            this.props.removeVocalist(elems[0]._index);
        }
    }

    displayInstructions() {
        let disp = null;
        if(this.props.currentEntryCount > 0) {
            return "Click on the vocalist's bar to remove them from chart";
        }
        return disp;
    }

    render() {
        return (
            <div className="chart">
                <HorizontalBar
                    className="chart-bar"
                    data={this.state.chartData}
                    onElementsClick={elems => {this.clickElem(elems)}}
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
                            displayColors: false,
                            backgroundColor: "black",
                            enabled: true,
                            mode: "single",
                            cornerRadius: 4,
                            callbacks: {
                              title: (tooltipItems) => {
                                return tooltipItems[0].yLabel;
                              },
                              label: (tooltipItems, data) => {
                                  return "Range: "
                                    + this.toNote(data.datasets[1].data[0])
                                    + " to "
                                    + this.toNote(data.datasets[0].data[0]);
                              }
                            }
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
                <div className="explain-text">
                    {this.displayInstructions()}
                </div>
            </div>
        );
      }
}

const mapStateToProps = state => ({
    vocalists: state.chart.vocalists,
    newTrigger: state.chart.newTrigger,
    removeTrigger: state.chart.removeTrigger,
    currentEntryCount: state.chart.currentEntryCount
});

export default connect(mapStateToProps, {
    addToChart,
    postChange,
    resetTrigger,
    removeVocalist,
    resetRemoveTrigger, addRange}
)(ChartManager);