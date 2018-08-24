import React from 'react';
import ReactDOM from 'react-dom';

export class ProbSelector extends React.Component{
	render(){
		return (
			<option value={this.props.ith}>
			{"第" + this.props.ith + "題"}</option>
		);
	}
}

export class ProbSelectors extends React.Component{
	render(){
		let probs = [];
		for(let i = 1; i <= this.props.total_ques_num ; i++){
			probs.push(
			<ProbSelector 
				key={"prob"+i}
				ith = {i}
			/>)
		}
		return (probs);
	}
}

export class ProbSelectorsOfOption extends React.Component{
	render(){
		return (
			<option value={this.props.ith}>{"第" + this.props.ith + "題"}</option>
		);
	}
}

export class ProbSelectorsOfOptions extends React.Component{
	render(){
		let probsOfOptions = [];
		for(let i = 1; i <= this.props.total_ques_num ; i++){
			probsOfOptions.push(
			<ProbSelectorsOfOption 
				key={"probOfOption"+i}
				ith = {i}
			/>)
		}
		return (probsOfOptions);
	}
}

export class OptionSelector extends React.Component{
	render(){
		return (
			<option value={this.props.ith}>{"第" + this.props.ith + "個選項"}</option>
		);
	}
}

export class OptionSelectors extends React.Component{
	render(){
		let options = [];
		for(let i = 1; i <= this.props.total_opt_num ; i++){
			options.push(
			<OptionSelector 
				key={"OptionSelector"+i}
				ith = {i}				
			/>)
		}
		return (options);
	}
}