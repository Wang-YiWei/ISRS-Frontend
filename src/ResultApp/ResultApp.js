import React from 'react';
import ReactDOM from 'react-dom';

import ResultContainer from './ResultContainer/ResultContainer.js';

class ResultApp extends React.Component {
	constructor(props) {
        super(props);
        
        this.state = {
            'title': '',
            'question_title': [],
            'response_conclude': [],
            'valid_sheet_count' : 0
        }     
    }

    componentDidMount() {
        fetch("/action/visualize_json/"+ sessionStorage.sheet_id +"/",{
            credentials: 'include'
        })
        .then(res => res.json())
        .then(
          (result) => {
            var counter = 0;

            if(result.response_conclude.length > 0){
                var optnums = result.response_conclude[0].length;
                for(let k = 0 ; k < optnums ; k++){
                    counter += result.response_conclude[0][k].value;
                }
            }

            this.setState({
                title: result.title,
                question_title: result.question_title,
                response_conclude: result.response_conclude,
                valid_sheet_count: counter
            });
            
            for(let i = 0 ; i < this.state.response_conclude.length ; i++){
                drawBarchart(this.state.response_conclude[i],i);                
            }

          },
          (error) => {
            console.log(error);
          }
        )
    }

	render() {
	    return (
			<div className="visualization-wrapper">
                <div className="sheet-info">
                    <div id="sheet-count">有效問卷數 : {this.state.valid_sheet_count}</div>
                    <div>
                        <a className="download-icons"
                            href={"/action/response_csv/"+ sessionStorage.sheet_id}>
                            <img id="csv-img" src="/src/images/csv-download.png"/>
                        </a>
                    </div>
                </div>
                <ResultContainer 
                  title = {this.state.title}
                  quesData = {this.quesData}
                  questionTitle	= {this.state.question_title}
				/>	            
		  	</div>
	    );
	}
}

ReactDOM.render(<ResultApp />, document.getElementById('resultApp'));

function drawBarchart(data,ith){
    var margin = {
        top: 30,
        right: 20,
        bottom: 80,
        left: 60
    },
    width = 720 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom;
    
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .25, 1);
    
    var y = d3.scale.linear()
        .range([height, 0]);
    
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format("d"));

    var svg = d3.select(".visualized-ans"+ith).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    data.forEach(function (d) {
        d.value = +d.value;
    });

    x.domain(data.map(function (d) {
        return d.description;
    }));

    y.domain([0, d3.max(data, function (d) {
        return d.value;
    })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("x",5)
        .attr("y", -margin.top+5)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("(次數)");

    var optionTip = d3.tip()
        .attr('class', 'optionTip-d3-tip')
        .offset([-10, 0])
        .html(function (d) {
            return d.description + " : <span style='color:#FF7777'>" + d.value + "</span>";
        });

    svg.call(optionTip);

    svg.selectAll(".bar"+ith)
        .data(data)
        .enter().append("rect")
        .attr("class", "bar bar"+ith)
        .attr("x", function (d) {
            return x(d.description);
        })
        .attr("width", x.rangeBand())
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("height", function (d) {
            return height - y(d.value);
        })
        .on('mouseover', optionTip.show)
        .on('mouseout', optionTip.hide);

    var checkboxWidth = 30;
    var checkboxHeight = 30;

    svg.append("foreignObject")
        .attr("x", function () {
            return (width - 60) + "px";
        })
        .attr("y", function () {
            return -margin.top+"px";
        })
        .attr("width", checkboxWidth)
        .attr("height", checkboxHeight)
        .html(function () {
            return "<form><label><input type=checkbox id=input"+ith+">排序</label></form>";
        });


    d3.select("#input"+ith).on("click", change);

    function change() {
        // Copy-on-write since tweens are evaluated after a delay.
        if(this.checked){
            var x0 = x.domain(data.slice().sort(
                function (a, b) {
                    return b.value - a.value;
                })
                .map(function (d) {
                    return d.description;
                })).copy();
        }
        else{
            var x0 = x.domain(data.map(function (d) {
                return d.description;
            })).copy();
        }

        svg.selectAll(".bar"+ith)
            .sort(function (a, b) {
                return x0(a.description) - x0(b.description);
            });

        var transition = svg.transition().duration(750),
            delay = function (d, i) {
                return i * 50;
            };

        transition.selectAll(".bar"+ith)
            .delay(delay)
            .attr("x", function (d) {
                return x0(d.description);
            });

        transition.select(".x.axis")
            .call(xAxis)
            .selectAll("g")
            .delay(delay);
    }
}
