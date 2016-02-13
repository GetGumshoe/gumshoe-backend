// var sites = [strava,facebook,linkedin,athlinks,twitter]
var fullClient = retinaSDK.FullClient("9d562520-d285-11e5-8378-4dad29be0fab")
// fullClient.getRetinas(callback)
// var strava =require('strava-v3')
$(document).ready(function(){
  // console.log("Hit!")
  // $("form").submit(hitSites)
  // console.log(fullClient)
  // console.log(fullClient.getIamge({expressions: [{text: "the time has come the walrus said to speak of many things. Of seals and ships and sealing wax of cabbages and kings"}]}))
  var compareExample = [
{ "or": [
{ "text": facebook}]},
{ "sub": [
{"text": linkedin}
]}]
  // console.log(img)
  fullClient.compareImage({expressions: compareExample}, appendImg)
  fullClient.getContextsForExpressions({expressions: compareExample}, appendContext)
})
function appendImg(img){
  // console.log("hit")
  // $("body").append("Test!")
  $("body").append( "<img id='compare' src='data:image/jpeg;base64,"+ img +"'/>")

}
// function hitSites(e){
//   var formData = ($(this).serializeArray())
//   var query = formData[0].value
//   console.log(query)
//   e.preventDefault()
//   // console.log(sites)
//   for( var i = 0; i < sites.length; i++){
//     sites[i](query)
//   }
// }

function appendContext(context){
  console.log(context)
  var first = context[0].map( y => y.context_label )
  var second = context[1].map( y =>  y.context_label )
  console.log(first)
  console.log(second)
}

// function strava(query){
//   api_key = "46e68b0d85ca9a30881a167f2cfa053623218c1c"

// }
// function facebook(query){
//   console.log(query)
//   $.get("https://github.com/search?q=time", function(r){console.log(r)})

// }
// function linkedin(query){
//   console.log(query)

// }
// function athlinks(query){
//   // console.log(query)
//   console.log(query)
//   var formattedQ = query.split(" ").join("%20")

//   $.get("https://www.api.athlinks.com/Result/Search#!athlete/"+formattedQ, function(response){
//     console.log(response)
//   })

// }

// function twitter(query) {
//   console.log(query)
//   // body...
// }
