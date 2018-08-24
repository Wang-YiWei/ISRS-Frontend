var response_conclude = [{
        '選項1-1': 5,
        '選項1-2': 3,
        '選項1-3': 2,
        '選項1-4': 7,
        '選項1-5': 4
    },
    {
        '選項2-1': 1,
        '選項2-2': 3,
        '選項2-3': 2,
        '選項2-4': 3,
        '選項2-5': 5
    }, {
        '選項3-1': 2,
        '選項3-2': 3,
        '選項3-3': 4,
        '選項3-4': 7,
        '選項3-5': 8
    },
    {
        '選項4-1': 1,
        '選項4-2': 3,
        '選項4-3': 2,
        '選項4-4': 2,
        '選項4-5': 6
    }
];

var myquesData = parseData(response_conclude);

function parseData(response_conclude) {

    var quesData = [];
    for (let i = 0; i < response_conclude.length; ++i) {
        quesData[i] = [];
    }

    for (let i = 0; i < response_conclude.length; i++) {
        keys = Object.keys(response_conclude[i]);
        values = Object.values(response_conclude[i]);
        for (let j = 0; j < keys.length; j++) {
            quesData[i].push({
                description: keys[j],
                value: values[j]
            });
        }
    }
    return quesData;
}

console.log(myquesData);


//----------------------------- 


var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1, 1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);
var svg = d3.selectAll(".visualized-ans").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", function (error, data) {
    console.log(data);
    /**
     * 
     * data format : [
     *                  [{"desription":xxxx,"count:12"},{},{},{},{}],
     *                  [{},{},{},{},{}],
     *                  [{},{},{},{},{}],
     *               ]
     */
    data.forEach(function (d) {
        d.frequency = +d.frequency;
    });

    x.domain(data.map(function (d) {
        return d.letter;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.frequency;
    })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.letter);
        })
        .attr("width", x.rangeBand())
        .attr("y", function (d) {
            return y(d.frequency);
        })
        .attr("height", function (d) {
            return height - y(d.frequency);
        });

    var checkboxWidth = 30;
    var checkboxHeight = 30;

    svg.append("foreignObject")
        .attr("x", function () {
            return (width - 100) + "px";
        })
        .attr("y", function () {
            return "0px";
        })
        .attr("width", checkboxWidth)
        .attr("height", checkboxHeight)
        .html(function () {
            return "<input type=checkbox>排序";
        });

    d3.select("input").on("click", change);

    function change() {
        // Copy-on-write since tweens are evaluated after a delay.
        var x0 = x.domain(data.sort(this.checked ?
                    function (a, b) {
                        return b.frequency - a.frequency;
                    } :
                    function (a, b) {
                        return d3.ascending(a.letter, b.letter);
                    })
                .map(function (d) {
                    return d.letter;
                }))
            .copy();

        svg.selectAll(".bar")
            .sort(function (a, b) {
                return x0(a.letter) - x0(b.letter);
            });

        var transition = svg.transition().duration(750),
            delay = function (d, i) {
                return i * 50;
            };

        transition.selectAll(".bar")
            .delay(delay)
            .attr("x", function (d) {
                return x0(d.letter);
            });

        transition.select(".x.axis")
            .call(xAxis)
            .selectAll("g")
            .delay(delay);
    }
});