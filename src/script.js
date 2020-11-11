function init(){



var button = document.getElementById("add-mo-session");


button.addEventListener('click', function(){
    //general test for querie functioning DELETE ME
    console.log("I found you");

    //button should not be displayed in overlay mode, just plain site below the overlay
    button.parentElement.removeChild(button);

    //create overlay on button click
    document.getElementById("overlay").style.display = "block";

    //unhide card flex container
    document.getElementById("card-flex-container").style.visibility = "visible";

    
    });
}
