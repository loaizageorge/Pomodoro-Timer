$(document).ready(function () {
    var minutes = 25;
    var seconds =00;
    var countDown = function(){
        if(seconds==0 && minutes==0){
            alert("Break Time!");
            clearInterval(setIntervalID);
        } else if(seconds==0 && minutes!=0){
            minutes--;
            seconds = 59;
            
        } else{
            seconds--;
        }
        
        formatTimer(minutes,seconds);
        //$("#timer").html(minutes+":"+seconds);
            
    };
      
    
    formatTimer(minutes,seconds);
    
      var setIntervalID = setInterval(countDown,1000);
    
});

function formatTimer(minutes,seconds){
    if(minutes<10 && seconds<10){
         $("#timer").html("0"+minutes+":"+"0"+seconds);
    }else if(minutes<10){
         $("#timer").html("0"+minutes+":"+seconds);
    }else if(seconds<10){
         $("#timer").html(minutes+":"+"0"+seconds);
    }else{
     $("#timer").html(minutes+":"+seconds);
    }
}
