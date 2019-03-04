import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dropdown from 'react-dropdown'
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import {populateNames} from './filterVocalistActions.js'
import {addToChart} from '../chart/chartActions.js'
import './filterVocalist.css'

class FilterVocalist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vocalistName: "Select Vocalist...",
            filterType: "Filter By..."
        }
        this.onSelectVocalist = this.onSelectVocalist.bind(this);
        this.onSelectFilter = this.onSelectFilter.bind(this);
        this.props.populateNames();
    }

    onSelectVocalist = (option) => {
        this.props.addToChart(option.label);
        this.setState({vocalistName: option.label})
    }

    onSelectFilter = (option) => {
        this.setState({filterType: option.label});

        // get all data via name
        // pass into chart.js arrays
        // update chart.js arrays
    }

    onClickAdd = () => {

    }

    render() {
        return(
            <div className="filter-vocalist-section">
                <div className="filter-vocalist-addvox"> ADD VOCALIST </div>
                <div className="filter-vocalist-addvox-dropdown">
                    <Dropdown
                        arrowClosed={<span className="Dropdown-icon"><IoIosArrowDown/></span>}
                        arrowOpen={<span className="Dropdown-icon"><IoIosArrowUp/></span>}
                        options={this.props.nameList}
                        onChange={this.onSelectVocalist}
                        value={this.state.vocalistName}
                        placeholder="Select Vocalist..."
                        className="filter-vocalist-list"
                        controlClassName="Dropdown-control"
                        menuClassName="Dropdown-menu-type"
                        />
                </div>
                <div className="filter-vocalist-addvox-button">
                    <button className='filter-vocalist-button' onClick={this.submitVocalist}>ADD</button>
                </div>

                <div className="filter-vocalist-filter"> FILTER BY </div>
                <div className="filter-vocalist-filter-dropdown">
                    <Dropdown
                        arrowClosed={<span className="Dropdown-icon"><IoIosArrowDown/></span>}
                        arrowOpen={<span className="Dropdown-icon"><IoIosArrowUp/></span>}
                        options={[1, 2]}
                        onChange={this.onSelectFilter}
                        value={this.state.filterType}
                        placeholder="Filter By..."
                        className="filter-vocalist-list"
                        controlClassName="Dropdown-control"
                        menuClassName="Dropdown-menu-type"
                        />
                </div>
                <div className="filter-empty">
                    <button className='filter-vocalist-button-fake'>ADD</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    /*users: state.collections.items,
    userIDs: state.collections.IDs,
    shareList: state.collections.shareList,
    isLoggedIn: state.login.isLoggedIn,
    cUser: state.login.cUser*/
    nameList: state.filterVocalist.names
});

export default connect(mapStateToProps, {populateNames, addToChart})(FilterVocalist);
