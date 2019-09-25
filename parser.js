
const fs = require('fs');
const moment = require ('moment');
var datalength;
var datachunk;
var timecodes;
var timeString;
var timeArray;
var links;
var posts;
var postline;
var postText;
//this is where I hold each post STRING in an array
var postArray = [];
//this is one long string that we keep adding post text to:
var postString;


//<--------------------- PROGRAM BEGINS ---------------------------------------->
//REMEMBER TO CALL TERMINAL FROM THIS FILE'S DIRECTORY OTHERWISE IT WON'T FIND THE DATA
const dataUrl = "./post_data.json";
let data = fs.readFileSync(dataUrl);
data = JSON.parse(data);

//Get the length of our data Object
datalength = Object.keys(data).length;
//console.log(datalength);


//SORTING THE OBJECTS BY TIMECODE

for (i=0; i<datalength; i++) {
  datachunk = Object.values(data[i]);
  //THIS IS HOW TO GET THE POSTS
  posts = datachunk[1];
  postline = posts[0];
  //*THIS IS HOW TO GET THE TIMECODES
  timecodes = datachunk[0];
  timeString = moment. unix(timecodes).format('YYYY-MM-DD');
  timeArray = timeString.split('-');
  //Separate posts by given DATE - select each index for given year/month/day
  //CURRENTLY SET TO ONLY READ DATA FROM MARCH 2011
  if ((timeArray[0] == '2011') && (timeArray[1]=='09')){
    //console.log(timeArray);
    if (typeof postline == 'object'){
      if (postline.hasOwnProperty('post')){
        postText = postline.post;
        //add the post to my post postArray
        //postArray.push('\n');
        postArray.push(postText+"\n");
        postArray.push('\n');


      }
    }
  }

  //THIS GETS ALL POSTS WITH YOUTUBE LINKS
  links = datachunk[2];

};

//console.log(post);

//turning my posts into a STRING

postString= postArray.join('\r');
console.log(postString);

//console.log(postArray);
// //WRITING TO A TEXT FILE
fs.writeFile('./ParsedPosts/parsed_output_September_2011.txt', postString, (err)=>{
  if (err) throw err;
  console.log('This file has been saved!');
});
