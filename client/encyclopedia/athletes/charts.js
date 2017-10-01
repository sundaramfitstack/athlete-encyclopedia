import { Template } from 'meteor/templating';
import Chart from 'chart.js/src/chart.js';
import {athlete_scores_labels, athlete_scores_bg_colors, athlete_scores_border_colors} from './athlete_bar_chart_params.js';

function random() {
  return Math.floor((Math.random() * 100) + 1);
}

Template.charts.onRendered(function () {
  // Set the data
  const data = {
    labels: athlete_scores_labels,
    datasets: [
      {
        label: 'Units',
        backgroundColor: athlete_scores_bg_colors,
        borderColor: athlete_scores_border_colors,
        borderWidth: 1,
        data: [random(), random(), random(), random(), random(), random(), random(), random(), random(), random()],
      },
    ],
  };

  const myBarChart = new Chart('myChart', {
    type: 'bar',
    data,
    options: {
      maintainAspectRatio: false,
    },
  });
});