import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import PropTypes from "prop-types";
import data from "./DisplayGraphData";

export default function DisplayGraph(props) {
  const { emotionData } = props;
  const [lineGraphData, setLineGraphData] = useState(data);
  function convertEDataToDGData(eData) {
    const tempLabels = [];
    const tempData = [[], [], [], [], [], [], []];
    eData.forEach(measurement => {
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
    setLineGraphData(tempLineGraphData);
  }

  useEffect(() => {
    return () => convertEDataToDGData(emotionData);
  }, [emotionData]);

  return <Line data={lineGraphData} />;
}

DisplayGraph.propTypes = {
  emotionData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
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
