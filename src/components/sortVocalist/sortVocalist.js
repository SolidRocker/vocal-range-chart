import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dropdown from 'react-dropdown'
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import {populateNames} from './sortVocalistActions'
import {addToChart, postChange} from '../chart/chartActions.js'
import {compareName, compareWidestRange, compareHighestNote, compareLowestNote} from './sortVocalistContainers';
import './sortVocalist.css'
import { join } from 'path';

const sortBy = [
    "A-Z",
    "Z-A",
    "Widest Range",
    "Highest Note",
    "Lowest Note"
];

class SortVocalist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vocalistName: "Select Vocalist...",
            sortType: "Sort By...",
            maxEntryCount: 15,
        }
        this.onSelectVocalist = this.onSelectVocalist.bind(this);
        this.onSelectSort = this.onSelectSort.bind(this);
        this.props.populateNames();
    }

    onSelectVocalist = (option) => {  
        if(this.props.currentEntryCount < this.state.maxEntryCount) {
            this.props.addToChart(option.label);
            this.setState({vocalistName: option.label})
        }
    }
    
    onSelectSort = (option) => {
        this.setState({sortType: option.label}, function() {
            this.sortEntries();
        });
    }

    sortEntries = () => {
        // Check what sorting we use, and manipulate the array order.
        switch(this.state.sortType) {
            case "A-Z":
                this.props.vocalists.sort(compareName);
                this.props.postChange();
                break;
            case "Z-A":
                this.props.vocalists.sort(compareName);
                this.props.vocalists.reverse();
                this.props.postChange();
                break;
            case "Widest Range":
                this.props.vocalists.sort(compareWidestRange);
                this.props.postChange();
                break;
            case "Highest Note":
                this.props.vocalists.sort(compareHighestNote);
                this.props.postChange();
                break;
            case "Lowest Note":
                this.props.vocalists.sort(compareLowestNote);
                this.props.postChange();
                break;
            default:
                break;
        }
    }

    render() {
        return(
            <div className="sort-vocalist-section">
                <div className="sort-vocalist-addvox"> ADD VOCALIST </div>
                <div className="sort-vocalist-addvox-dropdown">
                    <Dropdown
                        arrowClosed={<span className="Dropdown-icon"><IoIosArrowDown/></span>}
                        arrowOpen={<span className="Dropdown-icon"><IoIosArrowUp/></span>}
                        options={this.props.nameList}
                        onChange={this.onSelectVocalist}
                        value={this.state.vocalistName}
                        placeholder="Select Vocalist..."
                        className="sort-vocalist-list"
                        controlClassName="Dropdown-control"
                        menuClassName="Dropdown-menu-type"
                        />
                </div>

                <div className="sort-vocalist-sort"> FILTER BY </div>
                <div className="sort-vocalist-sort-dropdown">
                    <Dropdown
                        arrowClosed={<span className="Dropdown-icon"><IoIosArrowDown/></span>}
                        arrowOpen={<span className="Dropdown-icon"><IoIosArrowUp/></span>}
                        options={sortBy}
                        onChange={this.onSelectSort}
                        value={this.state.sortType}
                        placeholder="Sort By..."
                        className="sort-vocalist-list"
                        controlClassName="Dropdown-control"
                        menuClassName="Dropdown-menu-type"
                        />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    nameList: state.sortVocalist.names,
    currentEntryCount: state.chart.currentEntryCount,
    vocalists: state.chart.vocalists
});

export default connect(mapStateToProps, {populateNames, addToChart, postChange})(SortVocalist);
