var stephanie=[]
var xander = []
var fullClient = retinaSDK.FullClient("9d562520-d285-11e5-8378-4dad29be0fab")
$(document).ready(function(){
  getLink()
  getStephanieFacebook()
  getXanderFacebook()
  getXanderLinkedIn()
  compare()
  // getTokens()
})
function appendImg(img){
    $("body").append( "<img id='compare' src='data:image/jpeg;base64,"+ img +"'/>")
}

function getLink(){
  $.get("scraped/amuttican.json", function(response){
    response["results"]["collection1"].map( tweet => stephanie.push(tweet["twitter"]))
  fullClient.getImage({expression: {"text": stephanie.join()}}, appendImg)
})}

function compare(){

  $.get("scraped/XPSON.json", function(response){
    response["results"]["collection1"].map( tweet => xander.push(tweet["twitter"]))
    fullClient.compareImage({expressions: [{"text": stephanie.join(" ")}, {"text": xander.join(" ")}]}, appendImg)
  })
}

function getStephanieFacebook(){
  $.get("scraped/smhfb.json", function(response){
    addFBData(response, stephanie)
  })
}
function getXanderFacebook(){
  $.ajax({url: "scraped/xpFB.json"})
  .done(function(response){addFBData(response, xander)})
}
function getXanderLinkedIn(){
  $.ajax({url: "xpLN.json"})
  .done(function(response){
    addLNData(response, xander)
  })
}
function getStephanieLinkedIn(){
  $.ajax({url: "scraped/smhLN.json"})
  .done(function(response){
    addLNData(response, stephanie)
  })
}
function log(response){
  console.log(response)

}
function addLNData(lndata, person) {
  person.push(lndata.summary)
  console.log(lndata)
  lndata.threePastPositions.values.map(job => person.push(job.summary))
  lndata.volunteer.volunteerExperiences.values.map(job => person.push(job.role))
  try {lndata.threeCurrentPositions.values.map(job => person.push(job.summary))}
  catch (e){}
  console.log(person)
}

function addFBData(fbdata, person) {
  // console.log(fbdata)
  var person = person
  fbdata.likes.data.map( like => person.push(like.name))
  person.push(fbdata.about)
  fbdata.feed.data.map( post => post.message ? person.push(post.message) : person )
  fbdata.books.data.map( book => person.push(book.name))

  fbdata.music.data.map( artist => person.push( artist.name ))
  // console.log(fbdata)
  // console.log(person)
}

function saveToJson(response){
  JSON.strigify(response)
}

