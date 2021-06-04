var slider = document.getElementById('pageviews');
var output = document.getElementById('value');
var price = document.getElementById('price');
var discountToggle = document.getElementById('m/y-toggle');
var priceFloat;

// returns the price according to the value of slider
getPriceValue = (sv) => { 
  // sv stands for slider.value
  if (sv >= 10 && sv <= 50) {
    priceFloat = "8.00";
  } else if (sv > 50 && sv <= 100) {
    priceFloat = "12.00";
  } else if (sv > 100 && sv <= 500) {
    priceFloat = "16.00";
  } else if (sv > 500 && sv < 1000) {
    priceFloat = "24.00";
  } else if (sv == 1000) {
    priceFloat = "36.00";
  }
  
  return priceFloat;
}

// Apllies a 25% discount
discount = (n) => {
  n = parseFloat(n);
  let i = n * 25 / 100;
  
  n = n - i;
  return n.toFixed(2);
}

// Checks whether the value of slider has reached 1 Million or not
million = (n) => {
  if (n == 1000) {
    n = 1 + "M";
  } else {
    n = n + "K";
  }
  return n;
}

// changes the pageviews text to current value of slider
slider.onchange = () => {
  output.innerHTML = million(slider.value);
}

slider.onmousemove = () => {
  // changes pageviews text and the price text to current values
  output.innerHTML = million(slider.value);
  priceFloat = getPriceValue(slider.value);

  // returns discounted price if the discount button is toggled
  if (discountToggle.checked == true) {
    priceFloat = discount(priceFloat)
  }

  price.innerHTML = `$${priceFloat}`;

  // Applies the progress color to slider
  var x = Math.floor((slider.value / 1000) * 100);
  var color = 'linear-gradient(90deg, hsl(174, 77%, 80%) ' + x + '%, hsl(224, 65%, 95%) ' + x + '%)';
  slider.style.background = color;
}

// Applies the 25% discount on price when the discount button is toggled
discountToggle.onclick = () => {
  if (discountToggle.checked == true) {
    priceFloat = discount(priceFloat);
  } else if (discountToggle.checked == false) {
    priceFloat = getPriceValue(slider.value)
  }
  price.innerHTML = `$${priceFloat}`;
}