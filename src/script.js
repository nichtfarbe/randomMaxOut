function init(){



const button = document.getElementById("add-mo-session");
const overlay = document.getElementById("overlay");

button.addEventListener('click', function(e){
    e.stopPropagation();
    //general test for querie functioning DELETE ME
    console.log("I found you");

    //button should not be displayed in overlay mode, just plain site below the overlay
    button.style.display = "none";

    //create overlay on button click
        overlay.style.display = "flex";
        overlay.style.cursor = "pointer";
    });

    //escape through overlay
    overlay.addEventListener('click', function(e){
        e.stopPropagation();
        overlay.style.display = "none";
        overlay.style.cursor = "default";
        button.style.display = "block";
})


}
