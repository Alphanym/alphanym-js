/**
*
* Alphanym.js
*
*/

import React from 'react';
import { get, trim, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside'

const Version = '1.0.0';

const Container = styled.div`
  width: 100%;
  min-width: 310px;
`;

const TextInput = styled.input`
  -webkit-appearance: none;
  text-decoration: none;
  outline: none;
  flex: 1;  
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  border-radius: 2px;
  border-width: 1px;  
  border-color: #ddd9eb;
  border-style: solid;  
  padding: 6px 10px;
  background: white;
`;

const NameInput = styled(DebounceInput)`
  -webkit-appearance: none;
  text-decoration: none;
  border-color: #ddd9eb;
  border-style: solid;
  background: white;
  outline: none;    
  padding: 6px 0px 6px 10px;
  flex: 1;  
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  border-width: 0;
  border-radius: 0;
  width: 100%;
`;

const NameConfirmationInput = styled(TextInput)`
  -webkit-appearance: none;
  text-decoration: none;
  border-color: #ddd9eb;
  border-style: solid;
  background: white;
  border-radius: 2px;
  outline: none;    
  border-width: 0 0 1px 0;
  border-radius: 0;      
  border-color: #ddd9eb; 
  text-align: center;
  padding: 4px 0;
`;

const Dropdown = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch
  overflow-y: visible;  
  height: 0;

  .content {
    min-height: 108px;
    display: none;
    //position: relative;    
    background: white;
    box-shadow: 2px 4px 1px 0px rgba(0, 0, 0, 0.15);
    z-index: 1;
    border-width: 1px 1px 1px 1px;
    border-radius: 0px 0px 2px 2px;
    border-color: rgb(232, 232, 236); 
    border-style: solid;
    padding: 0 12px;
  }
  
  .content.show {
    display: block;
  }
`;

const VCenterWrapper = styled.div`
  display: flex;  
  align-items: center;
  justify-content: center;
  height: 108px;
`;

const Indicator = styled.div`
  width: 100%;
  height: 2px;
  background: #c2b0e2;  
  border-radius: 0px 0px 2px 2px;
  
  position: relative;
  overflow: hidden;
  
  &.complete {
    background: #673ab7;
  }
  
  &.loading {
    background: #c2b0e2;
  }
  
  &.loading:before{
    display: block;
    position: absolute;
    content: "";
    left: -200px;
    width: 200px;
    height: 4px;
    background: #673ab7;
    animation: loading 2s linear infinite;
  }

  @keyframes loading {
      from {left: -200px; width: 30%;}
      50% {width: 30%;}
      70% {width: 70%;}
      80% {left: 50%;}
      95% {left: 120%;}
      to {left: 100%;}
  }
`;

const FieldWrapper = styled.div`
  border-width: 1px 1px 0px 1px;
  border-color: rgb(232, 232, 236);
  border-style: solid;
  background: white;
  border-radius: 2px 2px 0px 0px;
  align-items: stretch;
  display: flex;
`;

const ConfirmNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const DropdownMessage = styled.p`
  text-align: left;
  font-size: 0.9em;
  margin: 0 0 0.75em 0;
  text-align: center;
`;

const NameConfirmationQuestionWrapper = styled.div`  
  white-space: nowrap;
`;

const NameConfirmationInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  margin-top: -0.4em;
  flex-grow: 2;
`;

const ConfirmButton = styled.a`  
  cursor: pointer;
  margin-left: 0.75em;
  user-select: none;
  font-size: 0.9em;
  color: #56dd8e;
  flex-grow: 1;
  text-decoration: none;

  &:hover {
    color: #03cc56;
    text-decoration: none;
  }
`;

const AlphanymLink = styled.a`  
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  font-size: 0.9em;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  display: flex;
  align-items: center;
  padding: 0 12px 0 4px;   
  
  &:focus {
    outline: none;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Icon SVG embedded in a React component hack. Motivation is no webpack fiddling when using the library, and no
// external HTTP resources required.
class LogoDark extends React.Component {
  render() {
    return (
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" style={ {width: '12px'} }>
          <g>
            <path style={ {fill: '#673ab7'} } d="M94.1,250.9c-27.7,0-50-10.5-66.8-31.5C10.4,198.4,2,168.8,2,130.6c0-19.7,2.9-37.4,8.6-53
              C16.3,62.1,24,48.9,33.5,38.3C43,27.6,54,19.4,66.4,13.7s25.3-8.6,38.7-8.6c14,0,27,4.1,39.1,12.2c12.1,8.1,21.8,22,29.1,41.8h1.9
              l8.6-48.2h54.4c-3.2,14.3-6.5,29.5-10,45.6c-3.5,16.1-6.8,31.9-9.8,47.5c-3,15.6-5.5,30.2-7.4,43.9c-1.9,13.7-2.9,25.5-2.9,35.3
              c0,8,2.2,13.8,6.7,17.4c4.5,3.7,9.9,5.5,16.2,5.5c4.5,0,9.7-1.1,15.7-3.3l7.2,41c-3.8,1.9-8.7,3.6-14.6,5c-5.9,1.4-13,2.1-21.2,2.1
              c-15.3,0-27.5-3.3-36.7-10c-9.2-6.7-14.8-17.7-16.7-32.9h-1.9C146,236.6,123.1,250.9,94.1,250.9z M106.5,205.6
              c6.4,0,12.6-1.6,18.9-4.8c6.2-3.2,11.7-7.6,16.5-13.1c4.8-5.6,8.7-12.1,11.9-19.6c3.2-7.5,5.1-15.5,5.7-24.1l3.3-42
              c-5.7-19.7-13-33.2-21.7-40.6c-8.8-7.3-18.2-11-28.4-11c-6.7,0-13.3,1.6-19.8,4.8c-6.5,3.2-12.3,8.1-17.4,14.8
              c-5.1,6.7-9.2,15-12.4,25.1c-3.2,10-4.8,21.7-4.8,35.1c0,24.8,4.3,43.6,12.9,56.3C79.8,199.2,91.6,205.6,106.5,205.6z"/>
          </g>
        </svg>
    );
  }
}

class LogoLight extends React.Component {
  render() {
    return (
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" style={ {width: '12px'} }>
          <g>
            <path style={ {fill: '#c2b0e2'} } d="M94.1,250.9c-27.7,0-50-10.5-66.8-31.5C10.4,198.4,2,168.8,2,130.6c0-19.7,2.9-37.4,8.6-53
              C16.3,62.1,24,48.9,33.5,38.3C43,27.6,54,19.4,66.4,13.7s25.3-8.6,38.7-8.6c14,0,27,4.1,39.1,12.2c12.1,8.1,21.8,22,29.1,41.8h1.9
              l8.6-48.2h54.4c-3.2,14.3-6.5,29.5-10,45.6c-3.5,16.1-6.8,31.9-9.8,47.5c-3,15.6-5.5,30.2-7.4,43.9c-1.9,13.7-2.9,25.5-2.9,35.3
              c0,8,2.2,13.8,6.7,17.4c4.5,3.7,9.9,5.5,16.2,5.5c4.5,0,9.7-1.1,15.7-3.3l7.2,41c-3.8,1.9-8.7,3.6-14.6,5c-5.9,1.4-13,2.1-21.2,2.1
              c-15.3,0-27.5-3.3-36.7-10c-9.2-6.7-14.8-17.7-16.7-32.9h-1.9C146,236.6,123.1,250.9,94.1,250.9z M106.5,205.6
              c6.4,0,12.6-1.6,18.9-4.8c6.2-3.2,11.7-7.6,16.5-13.1c4.8-5.6,8.7-12.1,11.9-19.6c3.2-7.5,5.1-15.5,5.7-24.1l3.3-42
              c-5.7-19.7-13-33.2-21.7-40.6c-8.8-7.3-18.2-11-28.4-11c-6.7,0-13.3,1.6-19.8,4.8c-6.5,3.2-12.3,8.1-17.4,14.8
              c-5.1,6.7-9.2,15-12.4,25.1c-3.2,10-4.8,21.7-4.8,35.1c0,24.8,4.3,43.6,12.9,56.3C79.8,199.2,91.6,205.6,106.5,205.6z"/>
          </g>
        </svg>
    );
  }
}

class LogoComplete extends React.Component {
  render() {
    return (
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" style={ {width: '12px'} }>
          <g>
            <path style={ {fill: '#673ab7'} } d="M94.1,250.9c-27.7,0-50-10.5-66.8-31.5C10.4,198.4,2,168.8,2,130.6c0-19.7,2.9-37.4,8.6-53
              C16.3,62.1,24,48.9,33.5,38.3C43,27.6,54,19.4,66.4,13.7s25.3-8.6,38.7-8.6c14,0,27,4.1,39.1,12.2c12.1,8.1,21.8,22,29.1,41.8h1.9
              l8.6-48.2h54.4c-3.2,14.3-6.5,29.5-10,45.6c-3.5,16.1-6.8,31.9-9.8,47.5c-3,15.6-5.5,30.2-7.4,43.9c-1.9,13.7-2.9,25.5-2.9,35.3
              c0,8,2.2,13.8,6.7,17.4c4.5,3.7,9.9,5.5,16.2,5.5c4.5,0,9.7-1.1,15.7-3.3l7.2,41c-3.8,1.9-8.7,3.6-14.6,5c-5.9,1.4-13,2.1-21.2,2.1
              c-15.3,0-27.5-3.3-36.7-10c-9.2-6.7-14.8-17.7-16.7-32.9h-1.9C146,236.6,123.1,250.9,94.1,250.9z M106.5,205.6
              c6.4,0,12.6-1.6,18.9-4.8c6.2-3.2,11.7-7.6,16.5-13.1c4.8-5.6,8.7-12.1,11.9-19.6c3.2-7.5,5.1-15.5,5.7-24.1l3.3-42
              c-5.7-19.7-13-33.2-21.7-40.6c-8.8-7.3-18.2-11-28.4-11c-6.7,0-13.3,1.6-19.8,4.8c-6.5,3.2-12.3,8.1-17.4,14.8
              c-5.1,6.7-9.2,15-12.4,25.1c-3.2,10-4.8,21.7-4.8,35.1c0,24.8,4.3,43.6,12.9,56.3C79.8,199.2,91.6,205.6,106.5,205.6z"/>
          </g>
        </svg>
    );
  }
}

class FeedbackDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feedback: null,
    };
  }

  isUncertain(results) {
    return get(results || this.props.results, ['name-uncertain'], false);
  }

  componentDidUpdate(prevProps) {
    const changeCertain = !isEmpty(this.props.results) && this.isUncertain(prevProps.results) && !this.isUncertain();
    const setResults = isEmpty(prevProps.results) && !isEmpty(this.props.results) && !this.isUncertain();

    if (changeCertain || setResults) {
      this.handleComplete.bind(this)();
    }
  }

  reset() {
    this.setState({
      feedback: null,
    });
  }

  getDropdownState() {
    if (this.isUncertain()) {
      return 'confirm';
    } else {
      return 'hide';
    }
  }

  getFeedback() {
    if (get(this.state, 'feedback', null) === null) {
      return get(this.props, 'results.betanym', '');
    } else {
      return get(this.state, 'feedback', '');
    }
  }

  getBetanym() {
    return trim(this.getFeedback().replace(/\s+/g,' '));
  }

  handleComplete() {
    const names = {
      version: Version,
      name: this.props.results.name,
      betanym: this.getBetanym(),
    };

    if (this.props.onFeedback !== undefined && this.state.feedback !== null) {
      this.props.onFeedback(names);
    }

    this.props.onComplete(names);
  }

  handleClickOutside(event) {
    if (this.getDropdownState.bind(this)() === 'confirm') {
      return this.handleComplete.bind(this)();
    }
  }

  handleEnterFeedback(event) {
    if (event.charCode == 13) {
      return this.handleComplete.bind(this)();
    }
  }

  editFeedback(event) {
    this.setState({
      feedback: event.target.value,
    });
  }

  render() {
    const dropdown = this.getDropdownState.bind(this)();
    const font = this.props.font;

    return (
      <Dropdown>
        <div className={ dropdown == 'hide' ?  'content' : 'show content' }>
          <VCenterWrapper>
            <ConfirmNameWrapper className={dropdown == 'confirm' ?  '' : 'hide'}>
              <NameConfirmationInputWrapper>
                <DropdownMessage style={ {font: font} }>What name would you prefer to go by?<br/></DropdownMessage>
                <NameConfirmationQuestionWrapper>
                  <NameConfirmationInput
                   type='text'
                   style={ {font: font} }
                   value={ this.getFeedback.bind(this)() }
                   onChange={ this.editFeedback.bind(this) }
                   onKeyPress={ this.handleEnterFeedback.bind(this) }
                   spellCheck={ false }
                   autoComplete="off"
                   />
                </NameConfirmationQuestionWrapper>
              </NameConfirmationInputWrapper>
              <ConfirmButton style={ {font: font} } onClick={ this.handleComplete.bind(this) }>Ok</ConfirmButton>
            </ConfirmNameWrapper>
          </VCenterWrapper>
        </div>
      </Dropdown>
    );
  }
}

FeedbackDropdown.propTypes = {
  onComplete: PropTypes.func.isRequired,
  font: PropTypes.string.isRequired,
  results: PropTypes.object.isRequired,

  onFeedback: PropTypes.func,
};

const AlphanymFieldFeedbackDropdown = onClickOutside(FeedbackDropdown);

export class AlphanymField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      complete: false,
    };
  }

  reset() {
    this.setState({complete: false});

    if (this._dropdown) {
      this._dropdown.instanceRef.reset();
    }
  }

  handleChange(event) {
    const queryText = trim(event.target.value);

    this.reset.bind(this)();

    if (queryText.length) {
      this.props.onQuery.bind(this)(queryText);
    }
  }

  handleEnter(event) {
    if (event.charCode == 13) {
      if (this._dropdown && this._dropdown.instanceRef.getDropdownState() === 'confirm') {
        this.reset.bind(this)();
        return this._dropdown.instanceRef.handleComplete();
      } else {
        return this.handleChange.bind(this)(event);
      }
    }
  }

  handleComplete(results) {
    this.setState({complete: true});
    return this.props.onComplete(results);
  }

  render() {
    const isLoading = this.props.loading;
    const defaultFontCssValue = "16px \"Open Sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif";
    const font = this.props.font || defaultFontCssValue;
    const Logo = this.props.loading ? LogoDark : (this.state.complete ? LogoComplete : LogoLight);
    const debounceTimeout = typeof this.props.debounceTimeout === 'number' ? this.props.debounceTimeout : 500;

    return (
      <Container>
        <FieldWrapper>
          <NameInput
           type='text'
           placeholder='Full Name'
           style={ {font: font} }
           debounceTimeout={ debounceTimeout }
           onKeyPress={ this.handleEnter.bind(this) }
           onChange={ this.handleChange.bind(this) }
           spellCheck={ false }
           autoComplete="off"
           />
          <AlphanymLink href='https://www.alphanym.com' tabIndex='-1'>
            <LogoWrapper>
              <Logo/>
            </LogoWrapper>
          </AlphanymLink>
        </FieldWrapper>
        <AlphanymFieldFeedbackDropdown
          font={ font }
          onComplete={ this.handleComplete.bind(this) }
          onFeedback={ this.props.onFeedback }
          results={ this.props.results }
          ref={ (e) => this._dropdown = e }
         />
        <Indicator className={ isLoading ? 'loading' : (this.state.complete ? 'complete' : '') } />
      </Container>
    );
  }
}

AlphanymField.propTypes = {
  onQuery: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,

  results: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,

  onFeedback: PropTypes.func,
  font: PropTypes.string,
  debounceTimeout: PropTypes.number,
};

export default AlphanymField;
