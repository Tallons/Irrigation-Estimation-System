import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const BidChart = (props) => {

    const chartRef = useRef()
    
    useEffect(() =>{
        const bidChartRef = chartRef.current.getContext("2d");
        
        new Chart(bidChartRef, {
            type: "doughnut",
            data: {
                labels: ["Materials", "Labor", "Overhead"],
                datasets: [{
                        label: "Cost",
                        data:[props.matCost, props.laborCost, props.overheadCost],
                        backgroundColor: ["#022b3a", "#36a2eb", "#9bbc5b"],
                        borderColor: "#022b3a"
                }]
            },
            options: {
            }
        });
    },[props.matCost, props.laborCost, props.overheadCost])



console.log(props)
        return (
            <div>
                <canvas
                    id="bid-chart"
                    ref={chartRef}
                />
            </div>
        )

}
export default BidChart;