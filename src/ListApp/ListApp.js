import React from 'react';
import ReactDOM from 'react-dom';

class ListApp extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            'sheet_titles': [],
            'sheet_ids': [],
        }     
    }

    componentDidMount() {
        fetch("/action/list_json/",{
            credentials: 'include'
        })
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
                sheet_titles: result.sheet_titles,
                sheet_ids: result.sheet_ids,
            });         
          },
          (error) => {
            console.log(error);
          }
        )
    }

	render() {
	    return (
			<div className="sheetList-wrapper">
                <div className="sheet-list">
                    {
                        this.state.sheet_titles.map((sheet,index) =>(
                            <div key={sheet+index} className="mySheet">
                                <div className="sheet-title">
                                    {sheet}
                                </div>
                                <div className="sheet-id">
                                    id : {this.state.sheet_ids[index]}
                                </div>
                                <div className="sheet-btns">
                                    <a className="list-btn visual-btn" href={"/visualize/"+this.state.sheet_ids[index]+"/"} target="_blank">
                                        查看結果
                                    </a>
                                    <a className="list-btn edit-btn" href="/" target="_blank">編輯問卷</a>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
	    );
	}
}

ReactDOM.render(<ListApp />, document.getElementById('listApp'));
