'use strict';

const metricRadioEl = document.getElementById('metric-radio');
const imperialRadioEl = document.querySelector('.radio2');
const heightInputEl = document.querySelector('.height-input');
const weightInputEl = document.querySelector('.weight-input');
const bmiResultNEl = document.querySelector('.bmi-result-number');
const bmiResultEl = document.querySelector('.bmi-results');

let mtrsqr;
let weight;

const bmiMetric = function () {
  metricRadioEl.addEventListener('click', () => {
    if (metricRadioEl.value === 'metric-radio' && metricRadioEl?.checked)
      metricRadioEl.setAttribute('checked', '');
    imperialRadioEl.removeAttribute('checked');
    console.log('hello met');
  });

  heightInputEl.addEventListener('input', function () {
    let height = Number(heightInputEl.value);
    mtrsqr = Math.abs(Math.pow(height / 100, 2));
  });

  weightInputEl.addEventListener('input', function () {
    bmiResultEl.innerHTML = '';

    weight = Number(weightInputEl.value);
    const bmi = new Intl.NumberFormat('en-GB', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(weight / mtrsqr);

    const bmiReport = function () {
      if (bmi <= 18.5) {
        return 'Your BMI suggests you’re underweight and possibly malnourished';
      } else if (bmi > 18.5 && bmi <= 24.9) {
        return `Your BMI suggests you are within a healthy weight range for young and middle-aged adults`;
      } else if (bmi > 25.0 && bmi <= 29.9) {
        return `Your BMI suggest you are overweight`;
      } else return `Your BMI suggest you are Obese`;
    };
    const bmiRange = function () {
      if (bmi <= 18.5) {
        return 'Below 18.5kg';
      } else if (bmi > 18.5 && bmi <= 24.9) {
        return `18.5kgs - 24.9kgs`;
      } else if (bmi > 25.0 && bmi <= 29.9) {
        return `25.0 - 29.9kg`;
      } else return `Over 30kg`;
    };
    const html = `
      <div>
        <p class="bmi-result-subheading">Your BMI is...</p>
        <h1 class="heading-primary bmi-result-number">${bmi}</h1>
      </div>
      <p class="bmi-result-text">
       ${bmiReport()} <br />
        <strong>${bmiRange()}</strong> .
      </p>
    `;

    bmiResultEl.insertAdjacentHTML('afterbegin', html);
    bmiResultEl.classList.replace('bmi-result2', 'bmi-result');
    setTimeout(() => {
      heightInputEl.value = weightInputEl.value = '';
      weightInputEl.blur();
    }, 5000);
  });
};

bmiMetric();

imperialRadioEl.addEventListener('click', () => {
  if (imperialRadioEl.value === 'imperial-radio' && imperialRadioEl?.checked) {
    metricRadioEl.removeAttribute('checked');
    imperialRadioEl.setAttribute('checked', '');
    console.log('hi there');
  }
});
