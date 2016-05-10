var timelineWidth = 0;
var panelWidth = 0;
var firstRun = true;
var totalPanels = 0;
var currentPanel = 0;

$(document).ready(function(){
    // redefine panel width; search and find width of each panel
    panelWidth = $('.timeline .panel').width();
    // redefine timeline width; search and find timeline width
    timelineWidth = $('.timeline').width();
    
    totalPanels = $('.timeline .panel').length; //find total number of panels
    
    
    // run position adjusmtent
    adjustLayout();
    
    // check window size every 1 sec
    setInterval(checkWindowSize, 1000);
});


function adjustLayout(){
    // find each panel and calculate its position across the timeline
    $('.timeline .panel').each(function(index){
        // calculate new variable for each panel that is found
        var newX = panelWidth * index;
        // assign new position property to each panel
        $(this).css('left', newX+'px');
        
        // generate navigation for each panel
        var newLabel = $(this).find('.label').html();  // search for the label within panel
        $('.timeline nav').append('<a href="#">'+newLabel+'</a>');  // add link using label content from each panel
    });
    
    // find current panel after navigation is generated
    currentPanel = $('.timeline nav a:last-child()').index();
    
    // run Nav animation
    activateNavigation();
}

function activateNavigation(){
    $('.timeline nav a').on('click', function(){ // when the timeline nav link is clicked
        currentPanel = $(this).index(); // reset the current panel
        timelineWidth = $('.timeline').width(); // check timeline width
        
        $('.timeline nav a').removeClass('selected'); // reassign selected state to nav link that was clicked
        $(this).addClass('selected');
        
        var timelineOffset = (timelineWidth - panelWidth) * .5; // move selected panel to center of screen
        var newPosition = ((currentPanel * panelWidth) * -1) + timelineOffset;
        $('.panel_slider').animate({left:newPosition+'px'}, 1000); // animate panel slider
        
        // animate background image  
        var backgroundWidth = $('.timeline .background_slider img').width();
        var moveAmount = (backgroundWidth - timelineWidth) / totalPanels;
        if( currentPanel != 0 ) {
            var multiplier = currentPanel + 1;
        } else {
            var multiplier = 0;
        }
        var newBackgroundPosition = (moveAmount * multiplier) * -1;
        $('.background_slider img.background').animate({left:newBackgroundPosition+'px'}, 1000);
        
    });
}

function checkWindowSize(){
    var newTimelineWidth = $('.timeline').width();
    
    // recenter panel after changing browser size
    if (newTimelineWidth > 500 && timelineWidth > 500){
        // do nothing
    } else if (newTimelineWidth < 500 && timelineWidth < 500){
        // do nothing
    } else {
        if(newTimelineWidth > 500 && timelineWidth < 500){
            firstRun = true;
        }
    }
    
    timelineWidth = newTimelineWidth;
    
    if( firstRun == true ){
        $('.timeline nav a:nth-child('+(currentPanel+1)+')').trigger('click');
        firstRun = false;
    }
}


// 1. Adjust layout
// 2. Generate navigation labels
// 3. Set all variables, including current panel
// 4. Animate navigation positioning