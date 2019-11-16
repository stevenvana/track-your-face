import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import PropTypes from "prop-types";
import data from "./DisplayGraphData";

export default function DisplayGraph(props) {
  const { emotionData } = props;
  const [lineGraphData, setLineGraphData] = useState(data);
  const convertEDataToDGData = useCallback(() => {
    const tempLabels = [];
    const tempData = [[], [], [], [], [], [], []];
    emotionData.forEach(measurement => {
      tempLabels.push(moment(measurement.date).calendar());
      tempData[0].push(Math.round(measurement.emotion.anger));
      tempData[1].push(Math.round(measurement.emotion.disgust));
      tempData[2].push(Math.round(measurement.emotion.fear));
      tempData[3].push(Math.round(measurement.emotion.happiness));
      tempData[4].push(Math.round(measurement.emotion.neutral));
      tempData[5].push(Math.round(measurement.emotion.sadness));
      tempData[6].push(Math.round(measurement.emotion.surprise));
    });
    const tempDatasets = data.datasets.map((emotionObject, i) => {
      return { ...emotionObject, data: tempData[i] };
    });
    const tempLineGraphData = {
      ...data,
      labels: tempLabels,
      datasets: tempDatasets
    };
    return tempLineGraphData;
  }, [emotionData]);

  useEffect(() => {
    const graphData = convertEDataToDGData();
    setLineGraphData(graphData);
  }, [convertEDataToDGData]);
  const options = {
    maintainAspectRatio: false
  };
  return <Line data={lineGraphData} options={options} />;
}

DisplayGraph.propTypes = {
  emotionData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.number.isRequired,
      emotion: PropTypes.shape({
        anger: PropTypes.number.isRequired,
        disgust: PropTypes.number.isRequired,
        fear: PropTypes.number.isRequired,
        happiness: PropTypes.number.isRequired,
        neutral: PropTypes.number.isRequired,
        sadness: PropTypes.number.isRequired,
        surprise: PropTypes.number.isRequired
      })
    })
  ).isRequired
};
