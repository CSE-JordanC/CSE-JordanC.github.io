//button click example
document.getElementById("btn-show-message").onclick = ()=>{
    document.getElementById("p-message").innerHTML = "Hi Portia";
};

//link click example
//e is the event (Clicking)
//e.curentTarget is the element the event was perfomed on (the link)
document.getElementById("a-click").onclick = (e) => {
    e.preventDefault(); //not go to the llinks destination
    e.currentTarget.innerHTML = "CLICKED";
};