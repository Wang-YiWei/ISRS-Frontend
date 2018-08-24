import React from 'react';

import {
	ProbSelector,
	ProbSelectors,
	ProbSelectorsOfOption,
	ProbSelectorsOfOptions,
	OptionSelector,
	OptionSelectors
} from './Selectors/Selectors.js';

const BtnContainer = (props) => (
	<div className="btn-container">
		<div className="btn-info">請在此區設定問卷內容</div>
		<form className="title-setting">
			<p>問卷標題名稱 :</p>
            <textarea id="sheet-title" onChange={props.handleChangeTitle}></textarea>
        </form>
        <form className="footer-setting">
			<p>問卷頁底資訊 :</p>		
            <textarea id="sheet-footer" onChange={props.handleChangeFooter}></textarea>
        </form>
		<form className="num-setting">
            <p>問卷總題數 :</p>
			<input id="prob-num"
				onChange={props.handleChangeTotalQuesNum} />
            <p>每題至多幾個選項 :</p>
			<input id="option-num" 
				onChange={props.handleChangeTotalOptNum}/>
			<button type="button"
					id="confirm-num-btn"
					className="btn-setting" 
					onClick={props.handleClickTotalNum}>確認
			</button>
        </form>
		<form className="problem-setting">
            <textarea onChange={props.handleChangeProblem}></textarea>
			<select 
			onChange={props.handleClickProbSelect}
			className="select-setting" 
			name="problem-selector">
				<ProbSelectors 
				  total_ques_num={props.total_ques_num} 
				/>
            </select>
			<button 
			type="button"
			className="btn-setting"
			onClick={props.handleClickProblem}>設定該題題目</button>
        </form>
		<form className="option-setting">
            <textarea onChange={props.handleChangeOption}></textarea>
			<select 
			onChange={props.handleClickProbSelectForOpt}			
			className="select-setting" 
			name="problem-selector">
				<ProbSelectorsOfOptions
					total_ques_num={props.total_ques_num} 
		  		/>
            </select>
			<select 
			onChange={props.handleClickOptSelect}
			className="select-setting" 
			name="option-selector">
				<OptionSelectors
					total_opt_num={props.total_opt_num} 
				/>
            </select>
			<button type="button"
					className="btn-setting"
					onClick={props.handleClickOption}>設定該選項</button>
        </form>
		<form className="radio-form">
			<div className = "radio-input">			
				<input type="radio" 
				name="saveType" 
				value="old" 
				checked={props.update_old}
				onChange={props.handleRadioChange}				
				/> 更新此問卷內容 (舊有問卷內容及結果將被<span className="warning">&nbsp;刪除&nbsp;</span>)
			</div>
			<div className = "radio-input">
				<input type="radio" 
				name="saveType" 
				value="new" 
				checked={!props.update_old}
				onChange={props.handleRadioChange}
				/> 新建一張問卷 (舊有問卷內容及結果將被<span className="success">&nbsp;保存&nbsp;</span>，並為您新建一張問卷)
			</div>		
		</form>

		<button 
			type="button"
			className="btn-setting gen-template"
			onClick={props.handleClickGenTemplate}>生成問卷</button>		
    </div>
)

export default BtnContainer;