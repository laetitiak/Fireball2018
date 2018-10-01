var scoreu1 = 0;
var scoreu2 = 0;
var blocku1 = 0;
var fireu1 = 0;
var blocku2 = 0;
var fireu2 = 0;
var u1status = "";
var u2status = "";

function pageload(){
  document.getElementById("btnfire1").disabled = true;
  document.getElementById("btnblock1").disabled = true;
  document.getElementById("btncharge1").disabled = true;
  document.getElementById("gameactions").style.display = "none";
}

function showscore(){
    document.getElementById("u1scoretxt").innerHTML = scoreu1;  
    document.getElementById("u2scoretxt").innerHTML = scoreu2; 
}


function start(){
    blocku1 = 0;
    fireu1 = 0;
    blocku2 = 0;
    fireu2 = 0;
    u1status = "";
    u2status = "";
    document.getElementById("btnfire1").disabled = false;
    document.getElementById("btnblock1").disabled = false;
    document.getElementById("btncharge1").disabled = false;
    hidevariable();
    showscore();
    document.getElementById("result").innerHTML = "";
    document.getElementById("txt1").value = "";
    document.getElementById("txt2").value = "";
    hidestart();
    showbuttons();

}

function hidestart(){
   document.getElementById("start").style.display = "none";
}

function showstart(){
  document.getElementById("start").style.display = "block";
}

function showbuttons(){
   document.getElementById("gameactions").style.display = "block";
}

function hidebuttons(){
  document.getElementById("gameactions").style.display = "none";
}

function endgame(){
    document.getElementById("btnfire1").disabled = true;
    document.getElementById("btnblock1").disabled = true;
    document.getElementById("btncharge1").disabled = true;
    showvariable();
    showscore();
    showstart();
    hidebuttons();
}

function play(actionU1, actionU2) {
    u1status = "";
    u2status = "";
    // first check that user 1 and user 2 are allowed to play these actions
    // if both user1 and user2 are not allowed to play then they both lose the game is over
    if ((actionallowed ("U1", actionU1)===false) && (actionallowed ("U2", actionU2)===false))
    {
        resultat = "Both Users Lost"
    }
    // if user1 is allowed to play and user2 is not allowed to play then user1 wins
     if ((actionallowed ("U1", actionU1)===true) && (actionallowed ("U2", actionU2)===false))
    {
        resultat = "U1wins"
    }

    // if user2 is allowed to play and user1 is not allowed to play then user2 wins
     if ((actionallowed ("U1", actionU1)===false) && (actionallowed ("U2", actionU2)===true))
    {
        resultat = "U2wins"
    }

    // if both user1 and user2 are allowed to play then call the whowins function to check who wins
    if ((actionallowed ("U1", actionU1)===true) && (actionallowed ("U2", actionU2)===true))
    {
        resultat =  whowins(actionU1, actionU2);
    } 

    writeresult (resultat);
    if ((resultat=="U1wins")||(resultat=="U2wins")||(resultat=="both Users Lost")){
        endgame();
    }

}

function whowins(actionU1, actionU2) {
    if (actionU1=="fire"){
        if (actionU2=="fire"){
            fireu1--;fireu2--;
            return "tie"}
        if (actionU2=="block"){
            fireu1--;blocku2--;
            return "tie"}
        if (actionU2=="charge"){
            fireu1--;
            fireu2=fireu2+3;
            blocku2=blocku2+3;
            return "U1wins"}
    }
    else {
        if (actionU1=="block"){
            if (actionU2=="fire"){
                blocku1--; fireu2--;
                return "tie"}
            if (actionU2=="block"){
                blocku1--; blocku2--;
                return "tie"}
            if (actionU2=="charge"){
                blocku1--;
                fireu2=fireu2+3;
                blocku2=blocku2+3;
                return "tie"}
        }
        else {
            if (actionU1=="charge"){
                if (actionU2=="fire"){
                    fireu1=fireu1+3;
                    blocku1=blocku1+3;
                    fireu2--;
                    return "U2wins"}
                if (actionU2=="block"){
                    fireu1=fireu1+3;
                    blocku1=blocku1+3;
                    blocku2--;
                    return "tie"}
                if (actionU2=="charge"){
                    fireu1=fireu1+3;
                    blocku1=blocku1+3;
                    fireu2=fireu2+3;
                    blocku2=blocku2+3;
                    return "tie"}
            }   
        }
    }
}

function actionallowed (user,action){
    if (user=="U1") {
        if (action=="fire" && fireu1===0){
            u1status = "User 1 cannot fire!!!";
            return false;
        }
         if (action=="block" && blocku1===0){
            u1status="User 1 cannot block!!!";
            return false;
         }
    }
    if (user=="U2") {
        if (action=="fire" && fireu2===0){
            u2status="User 2 cannot fire!!!";
            return false;
        }
         if (action=="block" && blocku2===0){
            u2status="User 1 cannot block!!!";
            return false;
         }
    }
    return true;
}

function computerdecidesaction(){
    possiblecomputerchoices=[];
    possiblecomputerchoices.push("charge");
    if (fireu2>0){
            possiblecomputerchoices.push("fire");
        }
    if (blocku2>0){
            possiblecomputerchoices.push("block");
    }

    // ramdompickedindex est la valeur l'index de l'element tire au sort. La valeur tiree au sort est entre 0 et le nombre d'elements du tableau moins 1
    ramdompickedindex = Math.floor(Math.random() * possiblecomputerchoices.length);
    document.getElementById('txt2').value=possiblecomputerchoices[ramdompickedindex];
}


function writeresult(resultat){
    if (resultat=="U2wins"){
        document.getElementById("result").innerHTML = "Computer wins the game";
        scoreu2++;
    }
     if (resultat=="U1wins")
        {
          document.getElementById("result").innerHTML = "You win the game"; 
            scoreu1++;
        }
    if (resultat=="both Users Lost")
        {
          document.getElementById("result").innerHTML = "Noody wins the game";  
        }

}

function showvariable(){
     document.getElementById("fireu1span").innerHTML = fireu1;
     document.getElementById("blocku1span").innerHTML = blocku1;
     document.getElementById("fireu2span").innerHTML = fireu2;
     document.getElementById("blocku2span").innerHTML = blocku2;
     document.getElementById("U1statustxt").innerHTML = u1status;
     document.getElementById("U2statustxt").innerHTML = u2status;

}

function hidevariable(){
     document.getElementById("fireu1span").innerHTML = "";
     document.getElementById("blocku1span").innerHTML = "";
     document.getElementById("fireu2span").innerHTML = "";
     document.getElementById("blocku2span").innerHTML = "";
     document.getElementById("U1statustxt").innerHTML = "";
     document.getElementById("U2statustxt").innerHTML = "";
}
