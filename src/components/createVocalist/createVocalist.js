import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dropdown from 'react-dropdown'
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import {addVocalist} from './createVocalistActions';
import {genderFilter, noteFilter} from './createVocalistFilters';
import './createVocalist.css'

class CreateVocalist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameValue: "",
            genderValue: "Male",
            highestNoteValue: "Note...",
            lowestNoteValue: "Note..."
        }
        this.onNameChange = this.onNameChange.bind(this);
        this.onSelectGender = this.onSelectGender.bind(this);
        this.onSelectHighestNote = this.onSelectHighestNote.bind(this);
        this.onSelectLowestNote = this.onSelectLowestNote.bind(this);
        this.submitVocalist = this.submitVocalist.bind(this);
    }

    onNameChange(event) {
        this.setState({nameValue: event.target.value})
    }

    onSelectGender = (option) => {
        this.setState({genderValue: option.label});
    }

    onSelectHighestNote = (option) => {
        this.setState({highestNoteValue: option.label});
    }

    onSelectLowestNote = (option) => {
        this.setState({lowestNoteValue: option.label});
    }

    submitVocalist() {
        let newVocalist = {
            name: this.state.nameValue,
            isMale: this.state.genderValue === "Male" ? true : false,
            highestNote: this.toNoteID(this.state.highestNoteValue),
            lowestNote: this.toNoteID(this.state.lowestNoteValue)
        }

        this.props.addVocalist(newVocalist);
    }

    toNoteID(noteVal) {
        for(var i = 0; i < noteFilter.length; ++i) {
            if(noteFilter[i].label === noteVal) {
                return i;
            }
        }
        return -1;
    }

    render() {
        return(
            <div className="vocalist-section">
                <div className="vocalist-header">CREATE NEW VOCALIST IN DATABASE</div>
                <div>
                    <span> <input
                            className="vocalist-name"
                            type="text"
                            defaultValue="Name..."
                            value={this.state.nameValue}
                            onChange={this.onNameChange}
                            />
                    </span>
                    <span> <Dropdown
                            arrowClosed={<span className="Dropdown-icon"><IoIosArrowDown/></span>}
                            arrowOpen={<span className="Dropdown-icon"><IoIosArrowUp/></span>}
                            options={genderFilter}
                            onChange={this.onSelectGender}
                            value={this.state.genderValue}
                            placeholder="Gender..."
                            className="vocalist-gender"
                            controlClassName="Dropdown-control"
                            menuClassName="Dropdown-menu-type"
                            />
                    </span>
                    <span> <Dropdown
                            arrowClosed={<span className="Dropdown-icon"><IoIosArrowDown/></span>}
                            arrowOpen={<span className="Dropdown-icon"><IoIosArrowUp/></span>}
                            options={noteFilter}
                            onChange={this.onSelectLowestNote}
                            value={this.state.lowestNoteValue}
                            placeholder="Lowest Note..."
                            className="vocalist-note"
                            controlClassName="Dropdown-control"
                            menuClassName="Dropdown-menu-type"
                            />
                    </span>
                    <span> <Dropdown
                            arrowClosed={<span className="Dropdown-icon"><IoIosArrowDown/></span>}
                            arrowOpen={<span className="Dropdown-icon"><IoIosArrowUp/></span>}
                            options={noteFilter}
                            onChange={this.onSelectHighestNote}
                            value={this.state.highestNoteValue}
                            placeholder="Highest Note..."
                            className="vocalist-note"
                            controlClassName="Dropdown-control"
                            menuClassName="Dropdown-menu-type"
                            />
                    </span>
                </div>
                <button className='vocalist-button' onClick={this.submitVocalist}>ADD</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {addVocalist})(CreateVocalist);