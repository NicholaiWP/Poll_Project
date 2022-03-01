
const API_KEY = "";

/*
https://api.pollsapi.com/v1/create/poll
<Poll>
Question: string - The question/title of the Poll
identifier: string - Can be used to pass in custom identifier, eg - user id, email, etc.
data: object - A flexible data field to store any meta data with each option
<option>
text: string - String to store the option's text
data: object - A flexible data field to store any meta data with each option
*/
function createPoll(identifier, data){
    //Get input from user
    var question = document.getElementById('question').value;
    var option1 = document.getElementById('option1').value; 
    var option2 = document.getElementById('option2').value;
 
    //create DOM elements
     var dataDiv = document.createElement("div");
     document.body.append(dataDiv);
     var dataText = document.createElement("p");
     dataDiv.appendChild(dataText);
  

       //create poll object
       var pollMetaData = {"metaData": data}
       var input1 = {"text": option1};
       var input2 = {"text": option2};
       var options = [input1, input2];
    
        var pollData = {
             "question":question,
             "identifier": identifier,
             "data": pollMetaData,
             "options":options
       };
     console.log(pollData);
    
 var url = "https://api.pollsapi.com/v1/create/poll";
 
 var xhr = new XMLHttpRequest();
 xhr.open("POST", url);
 
 xhr.setRequestHeader("content-type", "application/json");
 xhr.setRequestHeader("api-key", API_KEY);
 
 
    xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
       if(xhr.status === 200){
           console.log(xhr.status);
           console.log(xhr.responseText);
          var success = document.createTextNode(" You Successfully created a new poll! ");
          dataText.appendChild(success);       
       }
       else{
          return;
       }
       
    }};
 
     //convert to json, so it can be sent using XMLHttpResponse
     let text = JSON.stringify(pollData);
             var dataToSend = `${text}`;
             xhr.send(dataToSend);
             dataText.innerHTML = text;
    
 }

//https://api.pollsapi.com/v1/get/poll/{poll_id}
function getPollById(poll_id){
   var url = "https://api.pollsapi.com/v1/get/poll/" + poll_id;

   var xhr = new XMLHttpRequest();
   xhr.open("GET", url);

   xhr.setRequestHeader("content-type", "application/json");
   xhr.setRequestHeader("api-key", API_KEY);
  
   xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) { 
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};
 
   xhr.send();
}

//https://api.pollsapi.com/v1/get/polls?offset=0&limit=25
 function getAllPolls(offsetVal, limitVal){
    var url = "https://api.pollsapi.com/v1/get/polls?offset=" + offsetVal + "&limit=" + limitVal;
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("api-key", API_KEY);
    
    xhr.onreadystatechange = function () {
       if (xhr.readyState === xhr.DONE) {
          console.log(xhr.status);
          if(xhr.status === 200){
             console.log(JSON.parse(xhr.responseText)); 
          }
       }};
    
    xhr.send();
    }

//https://api.pollsapi.com/v1/get/polls-with-identifier/{identifier}?offset=0&limit=25
function getPollsByIdentifier(identifier, offsetVal, limitVal){
var url = "https://api.pollsapi.com/v1/get/polls-with-identifier/" + identifier + "?offset=" + offsetVal + "&limit=" + limitVal;

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("api-key", API_KEY);

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

xhr.send();
}

 //POST
 //https://api.pollsapi.com/v1/create/vote
 function CreateVote(poll_id, option_id, identifier){
    var url = "https://api.pollsapi.com/v1/create/vote";
 
 var xhr = new XMLHttpRequest();
 xhr.open("POST", url);
 
 xhr.setRequestHeader("content-type", "application/json");
 xhr.setRequestHeader("api-key", API_KEY);
 
 xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
       console.log(xhr.status);
       console.log(xhr.responseText);
    }};
 
 var dataObj = 
   {
       "poll_id": poll_id,
       "option_id": option_id,
       "identifier": identifier
   };
 
   var dataToSend = `${dataObj}`;
    xhr.send(dataToSend);
 }

//https://api.pollsapi.com/v1/get/vote/{vote_id}
function GetVoteById(voteId){
    var url = "https://api.pollsapi.com/v1/get/vote/" + voteId;
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("api-key", API_KEY);
    
    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};
    
    xhr.send();
}


//https://api.pollsapi.com/v1/get/votes/{poll_id}?offset=0&limit=25
//There is a max limit of 100, so even if you pass ?limit=150  it will only send at max 100.
function getAllVotesOnPoll(poll_id, offsetVal, limitVal){
var url = "https://api.pollsapi.com/v1/get/votes/" + poll_id + "?offset=" + offsetVal + "&limit=" + limitVal;

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("api-key", API_KEY);

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

xhr.send();
}

//Identifier can be a userId
//https://api.pollsapi.com/v1/get/votes-with-identifier/{identifier}?offset=0&limit=25
//You can pass in offset & limit to fetch votes in bulk as pages. 
//There is a max limit of 100, so even if you pass ?limit=150  it will only send at max 100.
function getAllVotesWithIdentifier(identifier){
var url = "https://api.pollsapi.com/v1/get/votes-with-identifier/" + identifier;

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("api-key", API_KEY);

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

xhr.send();
}

//vote id is string, but any currently
//https://api.pollsapi.com/v1/remove/vote
function removeVote(vote_id){

      if(vote_id !== null || vote_id !== undefined){
      if(typeof(vote_id) === "string" || vote_id instanceof String){
         var url = "https://api.pollsapi.com/v1/remove/vote";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);
         
         xhr.setRequestHeader("content-type", "application/json");
         xhr.setRequestHeader("api-key", API_KEY);
         
         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};
         
         var dataObj = 
            {
               "vote_id": vote_id
            };
            
            var dataToSend = `${dataObj}`;
               xhr.send(dataToSend);
         }
         else{
            return;
         }
      }
      else{
         return;
      }

}
//https://api.pollsapi.com/v1/remove/poll
function removePoll(poll_id){

   if(poll_id !== null || poll_id !== undefined){
      if(typeof(poll_id) === "string" || poll_id instanceof String){
         var url = "https://api.pollsapi.com/v1/remove/poll";
      
         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);
         
         xhr.setRequestHeader("content-type", "application/json");
         xhr.setRequestHeader("api-key", API_KEY);
         
         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};
         
            var dataObj = 
            {
                "poll_id": poll_id,
            };
          
            var dataToSend = `${dataObj}`;
             xhr.send(dataToSend);
         
         xhr.send(data);
      }
      else{
         return;
      }
   }
   else{
      return;
   }
    
}
