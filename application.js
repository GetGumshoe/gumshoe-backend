var fullClient = retinaSDK.FullClient("9d562520-d285-11e5-8378-4dad29be0fab")
$(document).ready(function(){
  getLink()
  compare()
  // getTokens()
})
function appendImg(img){
    $("body").append( "<img id='compare' src='data:image/jpeg;base64,"+ img +"'/>")
}

function getLink(){
  tweets=[]
  $.get("scraped/amuttican.json", function(response){
    response["results"]["collection1"].map( tweet => tweets.push(tweet["twitter"]))
  fullClient.getImage({expression: {"text": tweets.join()}}, appendImg)
})}

function compare(){
  tweets2 = []
  $.get("scraped/XPSON.json", function(response){
    response["results"]["collection1"].map( tweet => tweets2.push(tweet["twitter"]))
    fullClient.compareImage({expressions: [{"text": tweets.join(" ")}, {"text": tweets2.join(" ")}]}, appendImg)
  })
}

// function getTokens(){
//   fullClient.getSimilarTermsForExpression({expression: {"text": tweets[0]}}, log)
// }
function log(response){
  console.log(response)
}
// function appendContext(context){
//   console.log(context)
//   var first = context[0].map( y => y.context_label )
//   var second = context[1].map( y =>  y.context_label )
//   console.log(first)
//   console.log(second)
// }
