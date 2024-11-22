//calculator

let job;
let gross;
let timeframe;
let hours;
let tax ;
let nirate;
let form;
let hourly;
let weekly;
let monthly;
let annually;
let taxdeduct;
let nideduct;
let takehome;
let time;

let resultbox = document.getElementById('calcresult');
const submitButton = document.querySelector(".submit");

submitButton.onclick = function(e){
    e.preventDefault();

    let form = document.forms["calc"];
    console.log(form)

    let job = form.elements["user_job"].value;
    let gross = form.elements["user_gross"].value;
    let timeframe = form.elements["user_timeframe"].value;
    let hours = form.elements["user_hours"].value;
    let tax = form.elements["user_tax"].value;
    let nirate = form.elements["user_ni"].value;

    console.log(job);
    console.log(gross);
    console.log(timeframe);
    console.log(hours);
    console.log(tax);
    console.log(nirate);

    console.log(resultbox);

    taxdeduct = gross * (tax/100);
    nideduct = gross * (nirate/100);
    takehome = gross - taxdeduct - nideduct;

    if (timeframe == "hourly"){
        hourly = takehome;
        weekly = takehome * hours;
        monthly = weekly * 4;
        annually = monthly * 12;
        time = "hour";
    } else if (timeframe == "weekly"){
        hourly = takehome / hours;
        weekly = takehome;
        monthly = takehome * 4;
        annually = monthly * 12;
        time = "week";
    } else if (timeframe == "monthly"){
        monthly = takehome;
        weekly = monthly / 4;
        hourly = weekly / hours;
        annually = monthly * 12;
        time = "month";
    } else if (timeframe == "yearly"){
        annually = takehome;
        monthly = takehome /12;
        weekly = monthly / 4;
        hourly = weekly / hours;
        time = "year";
    }


    
    hourly = hourly.toFixed(2);
    weekly = weekly.toFixed(2);
    monthly = monthly.toFixed(2);
    annually = annually.toFixed(2);

    
    console.log(timeframe)
    resultbox.innerHTML += `Job : ${job} <br> 
    Working ${hours} hours a week for a gross pay of £${gross} per ${time} with ${tax}% Tax and ${nirate}% NI results in a take-home pay of: <br> 
    £${hourly} per Hour <br> 
    £${weekly} per Week <br> 
    £${monthly} per Month <br> 
    £${annually} Per Year
    <br>
    <hr>`;
    resultbox.style.display = 'block';

    console.log(resultbox);
    
};

