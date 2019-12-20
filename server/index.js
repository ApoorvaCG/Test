
var fs = require('fs');
const express = require('express');
var request = require('request-promise');

const app = express();
const port = 5000;

app.get("/",async(req,res)=>{
 let {num} = req.query;
 let txt = await getTextData();

 if(txt.status==1)
 {
  //  console.log("qwerty",num)
   let data = await test(num,txt.txt);
   res.send(data);
 }
 else
 {
   res.send("Error");
 }

})


app.listen(port,(req,res)=>{
  console.log("port running at : "+port)
})

async function test(num,txt)
{
    let found = new Array();
    let Obj = Array();
    var linesArray = txt;//fs.readFileSync('text.txt');//

    var res = linesArray.toString().split(' ');

    let N = num;

    res.map((a,i)=>{

    let b = res.filter(function(value){
          if(value==a)
          {
            return true;
          }
      
      }).length                       

      if(found.indexOf(a)==-1)
      {
        found.push(a);
        Obj.push({
          freq:b,
          item:a
        })
      }
})

  Obj.sort((a,b)=> b.freq - a.freq)   

  console.log(N, " times item in array->",found,Obj);
  return Obj.splice(0,N);

 }


 




async function getTextData (){
  
  try {
    let d = await request('https://terriblytinytales.com/test.txt');
    return {status:1,txt:d};
  } catch (error) {
    return {status:-1,txt:''};
  }

}
