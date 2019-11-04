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
      tempData[0].push(measurement.emotion.anger);
      tempData[1].push(measurement.emotion.disgust);
      tempData[2].push(measurement.emotion.fear);
      tempData[3].push(measurement.emotion.happiness);
      tempData[4].push(measurement.emotion.neutral);
      tempData[5].push(measurement.emotion.sadness);
      tempData[6].push(measurement.emotion.surprise);
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
  return <Line data={lineGraphData} />;
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
