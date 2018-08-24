import React from 'react';

const SheetContainer = (props) => (
	<div className="sheet-container">
		<div className="sheet-title">
            {props.sheet_title}
        </div>
		{
			props.ques_set.map((question) => (
				<div key={"ques"+question.prob_num} className="question-container">
					<div key={"prob"+question.prob_num} className="problem">
						<span className="prob-num">{question.prob_num}</span>{question.problem}						
					</div>
					<div key={"optionSetOfProb"+question.prob_num} className="option-container">
						{
							question.options.map((opt) => (
								<div key={question.prob_num + "optionItem" + opt.opt_num} className="option-item">
									<div key={"option-checkbox" + question.prob_num + "-" + opt.opt_num} 
										className="option-checkbox">
                    				</div>
									<div key={"option-desciption" + question.prob_num + "-" + opt.opt_num} 
										className="option-desciption">
										{opt.description}
                    				</div>
								</div>
							))
						}
					</div>
				</div>
			))
		}
		<div className="sheet-footer">
			{props.sheet_footer}
    	</div>
    </div>
)

export default SheetContainer;
