function init(){



const button = document.getElementById("add-mo-session");
const overlay = document.getElementById("overlay");


button.addEventListener('click', function(){

    //button should not be displayed in overlay mode, just plain site below the overlay
    button.style.display = "none";

    //create overlay on button click
        overlay.style.display = "flex";
        overlay.style.cursor = "pointer";

    //querie all cards and its child elements to prevent following blurr function from being apllied on them
        const allCardsArray = Array.from(document.querySelectorAll('div.card, div.card-color, div.card-sub-container, div.card-headline, div.card-subtext, strong'));
        console.log(allCardsArray);

    //disables cursor to indicate to the user that clicking here has no effect
        allCardsArray.forEach(element =>{
            element.addEventListener('mouseover', function(){
                element.style.cursor = "default";
            })
        })





        //escape through overlay, normalize pointer and re-insert the add button
        overlay.addEventListener('click', function(event){
            //check that event target is outside the card elements
            const eventTarget = event.target;
            console.log(eventTarget);
            const isEventargetInCardArray = allCardsArray.includes(eventTarget);
            console.log(isEventargetInCardArray);
    
            if(!isEventargetInCardArray){
                overlay.style.display = "none";
                overlay.style.cursor = "default";
                button.style.display = "block";
            }
        }); 
        
    });

}
