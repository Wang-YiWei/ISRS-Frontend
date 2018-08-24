import React from 'react';

const ResultContainer = (props) => (
    <div className="ques-list">
	<div className="result-title">{props.title}</div>
    {
		props.questionTitle.map((question,index) => (
			<div key={question+(index+1)} className="ques">
				<div className="problem">
                    {index+1}.&ensp;{question}
                </div>
                <div className={"visualized-ans visualized-ans"+index}>
                </div>
			</div>
		))
	}
    </div>
)

export default ResultContainer;
