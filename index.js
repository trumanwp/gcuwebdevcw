//calculator

let job;
let gross;
let timeframe;
let hours;
let tax ;
let nirate;
let form;

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

}