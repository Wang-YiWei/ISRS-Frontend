import React from 'react';
import ReactDOM from 'react-dom';

import SheetContainer from '../RecognitionApp/SheetContainer/SheetContainer.js';
import BtnContainer from '../RecognitionApp/BtnContainer/BtnContainer.js';

// todo : e.preventDefault();

class RecognitionApp extends React.Component {
	constructor(props) {
		super(props);
		// confirm number
		this.handleClickTotalNum = this.handleClickTotalNum.bind(this);
		this.handleChangeTotalQuesNum = this.handleChangeTotalQuesNum.bind(this);
		this.handleChangeTotalOptNum = this.handleChangeTotalOptNum.bind(this);
		
		// set problems
		this.handleChangeProblem = this.handleChangeProblem.bind(this);
		this.handleClickProbSelect = this.handleClickProbSelect.bind(this);		
		this.handleClickProblem = this.handleClickProblem.bind(this);

		// set options
		this.handleChangeOption = this.handleChangeOption.bind(this);
		this.handleClickProbSelectForOpt = this.handleClickProbSelectForOpt.bind(this);		
		this.handleClickOptSelect = this.handleClickOptSelect.bind(this);
		this.handleClickOption = this.handleClickOption.bind(this);
		
		// set title and footer
		this.handleChangeTitle = this.handleChangeTitle.bind(this);		
		this.handleChangeFooter = this.handleChangeFooter.bind(this);

		this.handleRadioChange = this.handleRadioChange.bind(this);
		
		this.handleClickGenTemplate = this.handleClickGenTemplate.bind(this);

		this.state = {
			total_ques_num : 0,
			total_opt_num : 0,
			current_prob_num:1,
			current_prob_num_for_opt:1,			
			current_opt_num:1,			
			current_problem:'',	
			current_option:'',
			ques_set:[
				{
					'prob_num' : 1,
					'problem': '請問您對櫃位所提供的「餐點選擇性」滿意度為何？',
					'options': [
						{
							opt_num : 1,
							description : '極度滿意'
						},
						{
							opt_num : 2,
							description : '滿意'
						},
						{
							opt_num : 3,
							description : '普通'
						},
						{
							opt_num : 4,
							description : '不滿意'
						},
						{
							opt_num : 5,
							description : '極度不滿意'
						}
					]
				}
			],
			sheet_title:'問卷預覽區',
			sheet_footer:'謝謝您的意見，我們會持續努力！',
			sheet_type:1,
			update_old:true			
		}
  	}
  
	handleClickTotalNum(e) {
		if(this.state.total_ques_num > 0 && this.state.total_opt_num > 0 )
		{
			showDataField(1);
		}
	}

	// tofix : check is number or not
	handleChangeTotalQuesNum(e) {
		if( 0 < (Number.parseInt(e.target.value, 10)) &&
				(Number.parseInt(e.target.value, 10) <= 100)){
			this.setState({total_ques_num: Number.parseInt(e.target.value, 10)});			
		}else{
			this.setState({total_ques_num: 0});
		}
	}
	
	handleChangeTotalOptNum(e) {
		if( 0 < (Number.parseInt(e.target.value, 10)) &&
				(Number.parseInt(e.target.value, 10) <= 100)){	
			this.setState({total_opt_num: Number.parseInt(e.target.value, 10)});
		}else{
			this.setState({total_opt_num: 0});
		}
	}

	handleChangeTitle(e) {
		if(e.target.value.length !=0){
			let sheetTitle = document.getElementsByClassName('sheet-title')[0];
			sheetTitle.style.color = "#333333";
			sheetTitle.style.borderBottom = "1px solid #333333";
		}
		this.setState({sheet_title: e.target.value});						
	}

	handleChangeFooter(e) {
		if(this.state.sheet_title == "問卷預覽區")
			this.setState({sheet_title: "請設定您的問卷標題"});			
	
		this.setState({sheet_footer: e.target.value});			
	}

	handleChangeProblem(e) {
		this.setState({current_problem: e.target.value});			
	}

	handleClickProbSelect(e) {
		this.setState({current_prob_num: Number.parseInt(e.target.value, 10)});		
	}
	 
	handleClickProblem(e){
		if (!this.state.current_problem.length) {
			return;
		}
		var exist = 0;
		var ith = 0;
		for(ith = 0; ith < this.state.ques_set.length ; ith++){
			if(Number.parseInt(this.state.ques_set[ith].prob_num, 10) == 
				Number.parseInt(this.state.current_prob_num, 10)){
				exist = 1;
				break;
			}
		}
		if(!exist){
			const newProblem = this.state.ques_set.concat
			(
				[
					{
						prob_num : this.state.current_prob_num,
						problem : this.state.current_problem,
						options : []	
					}
				]
			)
			.sort((a, b) => a.prob_num > b.prob_num);

    		this.setState({ques_set: newProblem});
		}else{
			var newProblem = this.state.ques_set.slice();
			newProblem[ith].problem = this.state.current_problem;
			this.setState({ques_set: newProblem});			
		}	
	}

	handleChangeOption(e) {
		this.setState({current_option: e.target.value});			
	}

	handleClickProbSelectForOpt(e) {
		this.setState({current_prob_num_for_opt: Number.parseInt(e.target.value, 10)});		
	}

	handleClickOptSelect(e) {
		this.setState({current_opt_num: Number.parseInt(e.target.value, 10)});	
	}
	 
	handleClickOption(e){
		if (!this.state.current_option.length) {
			return;
		}
		var exist = 0;
		var ith = 0;
		for(ith = 0; ith < this.state.ques_set.length ; ith++){
			if(Number.parseInt(this.state.ques_set[ith].prob_num, 10) == 
				Number.parseInt(this.state.current_prob_num_for_opt, 10)){
				exist = 1;
				break;
			}
		}
		if(!exist){
			const newProblem = this.state.ques_set.concat
			(
				[
					{
						prob_num : this.state.current_prob_num_for_opt,
						problem : '',
						options : [
							{
								opt_num : this.state.current_opt_num,
								description : this.state.current_option
							}
						]	
					}
				]
			)
			.sort((a, b) => a.prob_num > b.prob_num);

    		this.setState({ques_set: newProblem});
		}else{
			var newProblem = this.state.ques_set.slice();
			var jth = 0;
			var option_exist = 0;
			for(jth = 0; jth < newProblem[ith].options.length; jth++){
				if(Number.parseInt(newProblem[ith].options[jth].opt_num, 10) == 
					Number.parseInt(this.state.current_opt_num,10)){
					option_exist = 1;
					break;
				}
			}
			if(!option_exist){
				newProblem[ith].options.push(
					{
						opt_num : this.state.current_opt_num,
						description : this.state.current_option
					}
				);
				newProblem[ith].options.sort((a, b) => a.opt_num > b.opt_num);
			}
			else{
				newProblem[ith].options[jth].opt_num = this.state.current_opt_num;
				newProblem[ith].options[jth].description = this.state.current_option;
			}
			this.setState({ques_set: newProblem});			
		}	
	}

	handleRadioChange(e){
		this.setState({
			update_old: e.target.value == "old"
		});
	}

	handleClickGenTemplate(e){
		e.preventDefault();
		// only send necessary data to backend
		var sheetData = JSON.parse(JSON.stringify(this.state));
		delete sheetData.current_prob_num_for_opt;
		delete sheetData.current_opt_num;
		delete sheetData.current_prob_num;
		delete sheetData.current_problem;
		delete sheetData.current_option;
		delete sheetData.update_old;	
		
		var ques_set_length = sheetData.ques_set.length;
		for(let i = 0 ; i < ques_set_length ; i++){
			var option_length = sheetData.ques_set[i].options.length;
			for(let j = 0 ; j < option_length ; j++){			
				delete sheetData.ques_set[i].options[j].opt_num;	
			}
		}

		for(let i = 0 ; i < ques_set_length ; i++){
			var option_length = sheetData.ques_set[i].options.length;
			for(let j = 0 ; j < option_length ; j++){	
				sheetData.ques_set[i].options[j] = sheetData.ques_set[i].options[j].description;
			}
		}

		// sheet div to pdf
		var filename = this.state.sheet_title+".pdf";		
		var doc = new jsPDF();
		var sheet = document.getElementsByClassName('sheet-container')[0];
		
		// remove css style of sheet div
		sheet.style.border = "none";
		sheet.style.boxShadow = "none";
		sheet.style.webkitBoxShadow = "none";

    	html2canvas(sheet, {
    	    onrendered: function (canvas) {
    	        var image = canvas.toDataURL("image/png");
    	        doc.addImage(image, 'JPEG', 0, 0, canvas.width/3, canvas.height/3);
    	        doc.save(filename);
    	    }
		});

		sheet.style.border = "1px solid rgba(0, 0, 0, 0.1)";
		sheet.style.boxShadow = "0px 4px 4px 1px rgba(0, 0, 0, 0.1)";
		sheet.style.webkitBoxShadow = "0px 4px 4px 1px rgba(0, 0, 0, 0.1)";
		
        console.log(sheetData);
		sendRequest(sheetData,this.state.update_old);
	}

    componentDidMount() {
        console.log("componentDidMount");
        fetch("/action/edit_json/"+ sessionStorage.sheet_id +"/",{
            credentials: 'include'
        })
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result.sheet_type);

            var sheetData = parseData(result);

            this.setState({
                total_ques_num : 0,
                total_opt_num : 0,
                sheet_title : sheetData.sheet_title,
                sheet_footer : sheetData.sheet_footer,
                sheet_type:sheetData.sheet_type,
                ques_set: sheetData.ques_set
            });      
            
            document.getElementById('sheet-title').value = sheetData.sheet_title;
            document.getElementById('sheet-footer').value = sheetData.sheet_footer;                     
            
            showDataField(0);            
            triggerOnChange(sheetData);            
            
            console.log("okok get data successfully");
          },
          (error) => {
            console.log(error);
          }
        )
    }

	componentDidUpdate() {
        let sheetType = Number.parseInt(updateSheetType(),10);
		if(sheetType != this.state.sheet_type){
			this.setState({sheet_type: sheetType});						
		}	
	}

	render() {
	    return (
			<div className="outer-container">
				<SheetContainer 
				  ques_set={this.state.ques_set}
			  	  sheet_title={this.state.sheet_title}
				  sheet_footer={this.state.sheet_footer}		
				/>
				<BtnContainer
				  total_ques_num={this.state.total_ques_num}
				  total_opt_num={this.state.total_opt_num}
				  handleChangeTotalQuesNum={this.handleChangeTotalQuesNum}	
				  handleChangeTotalOptNum={this.handleChangeTotalOptNum}	
				  handleClickTotalNum={this.handleClickTotalNum}

				  handleChangeProblem={this.handleChangeProblem}
				  handleClickProbSelect={this.handleClickProbSelect}
				  handleClickProblem={this.handleClickProblem}				  
				  current_prob_num={"第"+this.state.current_prob_num+"題"}

				  handleChangeOption={this.handleChangeOption}
				  handleClickProbSelectForOpt={this.handleClickProbSelectForOpt}
				  handleClickOptSelect={this.handleClickOptSelect}
				  handleClickOption={this.handleClickOption}				  				  
				  current_prob_num_for_opt={"第"+this.state.current_prob_num_for_opt+"題"}
				  current_opt_num={"第"+this.state.current_opt_num+"個選項"}				  
				  handleChangeTitle={this.handleChangeTitle}
				  handleChangeFooter={this.handleChangeFooter}

				  handleRadioChange={this.handleRadioChange} 
				  update_old={this.state.update_old}
				  
				  handleClickGenTemplate={this.handleClickGenTemplate}
				/>
		  	</div>
	    );
	}
}

ReactDOM.render(<EditApp />, document.getElementById('recognition'));

function sendRequest(sheetData,update){
	console.log(sheetData,update);
	var requestUrl = (update) ? 
		"/action/edit/" + sessionStorage.sheet_id + "/" :
		"/action/gen/";
	$.ajax({
        type: "POST",
		url: requestUrl,
        data: JSON.stringify(sheetData),
        success: showResult,
		error: onError,
		contentType: 'application/json'
    });
}

function showResult(data) {
    console.log(data);
}

function onError(error) {
    console.log("error: ", error);
}

function parseData(result){

    var sheetData = {     
        total_ques_num : 0,
        total_opt_num : 0,
        sheet_title:'問卷預覽區',
        sheet_footer:'謝謝您的意見，我們會持續努力！',
        sheet_type:1,
        ques_set:[]			
    }
    
    sheetData.sheet_title = result.sheet_title;
    sheetData.sheet_footer = result.sheet_footer;
    sheetData.sheet_type = result.sheet_type;
    sheetData.total_opt_num = result.total_opt_num;
    sheetData.total_ques_num = result.total_ques_num;
    
    for(let i = 0 ; i < result.ques_set.length ; i++){
        var ques = {
            'prob_num' : i+1,
            'problem': result.ques_set[i].problem,
            'options': []
        }
        for(let j = 0 ; j < result.ques_set[i].options.length ; j++){
            var option = {
                opt_num : j+1,
                description : result.ques_set[i].options[j].description
            }
            ques.options.push(option);
        }
        sheetData.ques_set.push(ques);
    }

    return sheetData;
}

function triggerOnChange(sheetData){
    const probNumEvent = new Event('input', { bubbles: true });
    const probNumInput = document.querySelector('#prob-num');
    setNativeValue(probNumInput, sheetData.total_ques_num);
    probNumInput.dispatchEvent(probNumEvent);
    
    const optionNumEvent = new Event('input', { bubbles: true });           
    const optionNumInput = document.querySelector('#option-num');
    setNativeValue(optionNumInput, sheetData.total_opt_num);
    optionNumInput.dispatchEvent(optionNumEvent);
}

function setNativeValue(element, value) {
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
    
    if (valueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(element, value);
    } else {
        valueSetter.call(element, value);
    }
}

function updateSheetType(){
	let optionSet = document.getElementsByClassName("option-container");
	let options = document.getElementsByClassName("option-item");
	let probNums = 	document.getElementsByClassName("prob-num");
	let rowHeight = 50;

	recoverLayout();

	for(let i = 0 ; i < optionSet.length ; i++){
		if(optionSet[i].clientHeight > rowHeight){
			for(let j = 0; j < optionSet.length ; j++){
				optionSet[j].style.flexDirection = "column";			
			}
			for(let j = 0; j < probNums.length ; j++){
				probNums[j].style.border = "5px solid #333333";
				probNums[j].style.borderRadius = "100%";
				probNums[j].style.fontSize = "18px";				
			}
			for(let j = 0; j < options.length ; j++){
				options[j].style.marginLeft = "30px";
			}
			return 2;
		}
	}

	// 沒有2列以上的問題集
	// tofix:沒進過
	recoverLayout();
	return 1;
}

function recoverLayout(){

	let optionSet = document.getElementsByClassName("option-container");
	let options = document.getElementsByClassName("option-item");
	let probNums = 	document.getElementsByClassName("prob-num");

	for(let i = 0; i < optionSet.length ; i++){
		optionSet[i].style.flexDirection = "row";
	}

	for(let i = 0; i < probNums.length ; i++){
		probNums[i].style.border = "none";
		probNums[i].style.borderRadius = "0";
		probNums[i].style.fontSize = "22px";		
		
	}

	for(let i = 0; i < options.length ; i++){
		options[i].style.marginLeft = "0px";
	}
}

function showDataField(disableInput){
    if(disableInput){
        document.getElementById('prob-num').disabled = "disabled";
	    document.getElementById('option-num').disabled = "disabled";			
		document.getElementById('confirm-num-btn').disabled = true;
        console.log("in");
    }

	var problems = document.getElementsByClassName("problem-setting");
	var options = document.getElementsByClassName("option-setting");
	var seletors = document.getElementsByClassName("select-setting");
	var btns = document.getElementsByClassName("btn-setting");
	var textAreas = document.getElementsByTagName("textarea");
	var genTemplate = document.getElementsByClassName("gen-template")[0];
	var radioForm = document.getElementsByClassName("radio-form")[0];
	
	for (let i = 0; i < problems.length; i++)
        problems[i].style.display = "flex";
    for (let i = 0; i < options.length; i++)
        options[i].style.display = "flex"
    for (let i = 0; i < seletors.length; i++)
        seletors[i].style.display = "flex";
    for (let i = 1; i < btns.length; i++)
        btns[i].style.display = "flex";
    for (let i = 0; i < textAreas.length; i++)
        textAreas[i].style.display = "flex";
		
	radioForm.style.display = "flex";
    genTemplate.style.display = "flex";
}
