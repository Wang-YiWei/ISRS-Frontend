import React from 'react';
import ReactDOM from 'react-dom';

import RecognitionApp from './RecognitionApp/RecognitionApp.js';

// // todo : e.preventDefault();

// class RecognitionApp extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		// confirm number
// 		this.handleClickTotalNum = this.handleClickTotalNum.bind(this);
// 		this.handleChangeTotalQuesNum = this.handleChangeTotalQuesNum.bind(this);
// 		this.handleChangeTotalOptNum = this.handleChangeTotalOptNum.bind(this);

// 		this.state = {
// 			total_ques_num : 0,
// 			total_opt_num : 0,
// 				
// 		}
//   	}

// 	handleChangeFooter(e) {
// 		if(this.state.sheet_title == "問卷預覽區")
// 			this.setState({sheet_title: "請設定您的問卷標題"});			
	
// 		this.setState({sheet_footer: e.target.value});			
// 	}


// 	render() {
// 	    return (
// 			<div className="outer-container">
// 				<SheetContainer 
// 				  ques_set={this.state.ques_set}
// 			  	  sheet_title={this.state.sheet_title}
// 				  sheet_footer={this.state.sheet_footer}		
// 				/>
// 		  	</div>
// 	    );
// 	}
// }

// ReactDOM.render(<RecognitionApp />, document.getElementById('recognition'));