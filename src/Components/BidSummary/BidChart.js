
import React, {useState, useEffect, useRef} from "react";
import Chart from "chart.js";

const BidChart = () => {

    const chartRef = useRef()
    
    useEffect(() =>{
        const bidChartRef = chartRef.current.getContext("2d");
        
        new Chart(bidChartRef, {
            type: "bar",
            data: {
                labels: ["Materials", "Labor", "Overhead"],
                datasets: [{
                        label: "Cost",
                        data: [2086, 767, 100],
                        backgroundColor: ["#022b3a", "#36a2eb", "#9bbc5b"],
                        borderColor: "#022b3a"
                }]
            },
            options: {
            }
        });
    },[])


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