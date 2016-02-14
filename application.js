var stephanie=[]
var xander = []
var maps = {}
var fullClient = retinaSDK.FullClient("9d562520-d285-11e5-8378-4dad29be0fab")
var liteClient = retinaSDK.LiteClient("9d562520-d285-11e5-8378-4dad29be0fab")
$(document).ready(function(){
  getInfo()
  window.setTimeout(compare, 1000)

})

var reallyGetInfo = getInfo()

function getInfo(){
    getStephanieFacebook()
    getXanderFacebook()
    getXanderLinkedIn()
    getStephanieLinkedIn()
    getSMHTwitter()
    getXTwitter()
  }

function appendImg(img){
  // console.log(img)
    $("body").append( "<img id='compare' src='data:image/jpeg;base64,"+ img +"'/>")
}

function getSMHTwitter(){
  $.get("scraped/amuttican.json", function(response){
    response["results"]["collection1"].map( tweet => stephanie.push(tweet["twitter"]))
    return true
  })
}

function getXTwitter(){
  $.get("scraped/XPSON.json", function(response){
    response["results"]["collection1"].map( tweet => xander.push(tweet["twitter"]) )
    return true
  })
}

function compare(){
  getXPmap()
  getSMHmap()
  compareBulk()
  // $.get("scraped/XPSON.json", function(response){
    // response["results"]["collection1"].map( tweet => xander.push(tweet["twitter"]))
    fullClient.compareImage({expressions: [{"text": stephanie.join(" ")}, {"text": xander.join(" ")}]}, function(img){
      maps.comparison = img
    })
  // })
}

function getStephanieFacebook(){
  $.get("smhfb.json", function(response){
    addFBData(response, stephanie)
    return true
  })

}
function getXanderFacebook(){
  $.ajax({url: "xpFB.json"})
  .done(function(response){addFBData(response, xander)})
    return true
}
function getXanderLinkedIn(){
  $.ajax({url: "xpLN.json"})
  .done(function(response){
    addLNData(response, xander)
    return true
  })
}
function getStephanieLinkedIn(){
  $.ajax({url: "smhLN.json"})
  .done(function(response){
    addLNData(response, stephanie)
    return true
  })
}

function log(response){
  console.log(response)

}
function addLNData(lndata, person) {
  person.push(lndata.summary)
  // console.log(lndata.threeCurrentPositions.values)
  lndata.threePastPositions.values.map(job => person.push(job.summary))
  lndata.volunteer.volunteerExperiences.values.map(job => person.push(job.role))
  try {lndata.threeCurrentPositions.values.map(job => person.push(job.summary))}
  catch (e){}
  // console.log(person)
}

function addFBData(fbdata, person) {
  // console.log(fbdata)
  var person = person
  fbdata.likes.data.map( like => person.push(like.name))
  person.push(fbdata.about)
  fbdata.feed.data.map( post => post.message ? person.push(post.message) : person )
  fbdata.books.data.map( book => person.push(book.name))

  fbdata.music.data.map( artist => person.push( artist.name ))

}

function getXPmap(){
  fullClient.getImage({expression: {"text": xander.join()}}, addToMapsX)
}

function getSMHmap(){
  fullClient.getImage({expression: {"text": stephanie.join()}}, addToMapsS)
}

function addToMapsX(img){
    maps.xander = img
}
function addToMapsS(img){
    maps.stephanie = img
}

function compareBulk(){
  c1=[]
  c2=[]
  // xander.map(text => c1.push({"text": text}))
  // stephanie.map(text => c2.push({"text": text}))
  fullClient.getKeywordsForText({"text": xander.join(" ")}, function(response){
    response.map( term => c1.push({"term": term}))
    fullClient.getKeywordsForText({"text": stephanie.join(" ")}, function(response){
      response.map( term => c2.push({"term": term}))
      console.log(c1)
      console.log(c2)
    })
  })
}

function addAllImgs(){
  appendImg(maps.xander)
  appendImg(maps.stephanie)
  appendImg(maps.comparison)
}


