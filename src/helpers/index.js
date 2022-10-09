import variables from '@/assets/styles/exports/variables.scss';
import { store } from '@/store';
import Vue from 'vue';

const colors = [
  `${variables.colorChartPink}`,
  `${variables.colorChartYellow}`,
  `${variables.colorChartGreen}`,
  `${variables.colorChartPurple}`,
  `${variables.colorChartOrange}`,
  `${variables.colorChartBlue}`,
]

const jsonCopy = (param) => {
  return JSON.parse(JSON.stringify(param));
}

const constructSignalsData = (mainParam, labels, prepend, append) => {
  let data = {
    series: [],
    labelPrepend: prepend,
    labelAppend: append,
  };
  labels.forEach((el) => {
    data.series.push({ label: el, data: mainParam[el] });
  })
  return data;
}

const getStoreValue = (controlArea, attributeName) => {
  return store.state[controlArea][attributeName];
}

const addSinglePointToStoreAttribute = (controlArea, attributeName, attributePartName, point) => {
  const commitData = {
    attributeName: attributeName,
    attributePartName: attributePartName,
    value: point,
  }
  store.commit(`${controlArea}/addToAttribute`, commitData);
}

const getRandomValue = () => {
  const signMinus = Math.round(Math.random()) > 0.5;
  const sign = signMinus ? -1 : 1;
  return Math.round(Math.random() * sign * 1000);
}

const addPointsToStoreAttribute = (controlArea, attributeName, labels) => {
  const currentTime = new Date().getTime();
  for(let i=0; i<labels.length; i+=1) {
    const value = getRandomValue();
    const point = [currentTime, value];
    addSinglePointToStoreAttribute(controlArea, attributeName, labels[i], point);
  }
}

const notify = (notification) => {
  Vue.notify({
    duration: notification.duration || 5000,
    type: notification.type,
    title: notification.title,
  });
}

export {
  colors,
  jsonCopy,
  constructSignalsData,
  getStoreValue,
  addPointsToStoreAttribute,
  notify,
}
