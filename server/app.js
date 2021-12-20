
import express from 'express';
import cors from 'cors';
import { default as mongodb } from 'mongodb';
import dotenv from "dotenv";
dotenv.config();

const MongoClient = mongodb.MongoClient;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//npm i mongodb
// 몽고DB와 연결시키고 연결되면 port가 돌아갈 수 있도록 만들었다.
let db;




MongoClient.connect('mongodb+srv://jun:1234@cluster0.zjit4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
(error, client)=>{
    if(error){
        console.log(error);
    }else{
        db = client.db('NFTSTORAGE');
        app.listen(process.env.PORT || 80000,()=>{
            console.log('DB연결성공 and port구동중!');
        })
    }  
})
//test/
app.get('/',(req,res)=>{
    res.send('제발!!12345')
})
app.post('/test1',(req,res)=>{
  const id = req.body.id;
  console.log(id);
  res.send('성공!')
})

//metadata를 생성해서 DB에 저장하는 메서드를 생성시켜보자.
const input = {
  name: '',
  external_url: '',
  description : '',
  chain: '',
  type: '',
  imgURI : ''
};

function inputMeta(name,external,description,chain,type,imgURI,sale,price){
  input.name = name
  input.external_url = external
  input.description = description
  input.chain = chain
  input.type = type
  input.imgURI = imgURI
  input.sale = sale
  input.price = price;
}


app.post('/create',(req,res)=>{

  //프론트에서 전달받은 Meta데이터값은 함수를 작성하여 묵어서 처리했다.
  // 그 이외 account는 따로 변수를 만들어서 받아서 처리하자.
     const account = req.body.account
     const tokenId = req.body.tokenId 
     inputMeta(
       req.body.name,
       req.body.external_url,
       req.body.description,
       req.body.chain,
       req.body.type,
       req.body.imgURI,
       req.body.sale,
       req.body.price
       )

       console.log(input);

       //DB에 이미 한번 저장이 되어있는 지 확인하자  -- 저장되어있으면 update, 새로운사람이면 insertOne을 진행하자.
        //account:[[tokenId,type],[tokenId,type],[tokenId,type]....]
        //2. {type : {toeknId:metadata}}
       
       if(account !== undefined){
        db.collection('NFTPOST').find({'account':account}).toArray((error,result)=>{
          
          if(result[0] !== undefined){
            console.log(1);
            //DB에 이미 한번 저장이 되어있는 상태면 추가해주는 쿼리를 날린다.
            db.collection('NFTPOST').update({account: account},{"$push" :{"tokenIds":{"tokenId":tokenId,'type':input.type}},
            
          });
          //metadata저장하는 쿼리
              db.collection('Types').insertOne({type:input.type,data:{account:account,tokenId:tokenId,metadata:input}}) 
              //res.send('tokenId && metadata input success')
          }else{
             //처음이라면 저장해주자.
                db.collection('NFTPOST').insertOne({account:account,tokenIds:[{tokenId:tokenId,type:input.type}]},(error,result)=>{
                 console.log(result);
                 });
          //metadata저장하는 쿼리
             db.collection('Types').insertOne({type:input.type,data:{account:account,tokenId:tokenId,metadata:input}})
             //res.send('tokenId && metadata input success')
          }
        })
       }
        res.send('success');

})




//메타데이터를 보내주는 작업이 끝!! 
app.get('/erc721/:tokenId',(req,res)=>{
     let tokenId = req.params.tokenId;
     console.log(tokenId);
    
     db.collection('Types').find({'data.tokenId':tokenId}).toArray((error,result)=>{
      console.log(result);
      if(error) console.log(error);
      if(result){
        res.send(result[0].data.metadata);
      }
    })
      res.send('loading fail');
})



//소유권이전으로인해서 특정 값을 삭제하고 삭제 후 특정 계정에 값을 옮겨주는 작업.
function deleteSeller(seller,tokenId){
  db.collection('NFTPOST').update( 
    {
        "account" : seller
    } ,
    {
      "$pull" : {
            "tokenIds":{"tokenId":Number(tokenId)} 
      }
    }
  )
 }

 function changeOwner(seller, buyer){
  db.collection('Types').update( 
    {
        "data.account" : seller
    } ,
    {
      "$set" : {
            "data.account": buyer
      }
    }
  )
  
 }

app.post('/buy',(req,res)=>{
    
 const buyer = req.body.buyer.toLowerCase();
 const seller = req.body.seller.toLowerCase();
 const tokenId = req.body.tokenId;
 const type = req.body.type;



 



//buyer의 Db에 tokenId를 추가시킨다.
if(buyer !== undefined){
  db.collection('NFTPOST').find({'account':buyer}).toArray((error,result)=>{
   
    if(result[0] !== undefined){
      deleteSeller(seller,tokenId);
      changeOwner(seller,buyer)
      //DB에 이미 한번 저장이 되어있는 상태면 추가해주는 쿼리를 날린다.
      db.collection('NFTPOST').update({account: buyer},{"$push" :{"tokenIds":{"tokenId":Number(tokenId),'type':type}},
    });
    
    }else{
       //처음이라면 저장해주자.
       deleteSeller(seller,tokenId);
      changeOwner(seller,buyer)
          db.collection('NFTPOST').insertOne({account:buyer,tokenIds:[{tokenId:Number(tokenId),type:type}]},(error,result)=>{
           console.log(result);
  });
    }
  })
 }

 res.send('success');

// db.collection('NFTPOST').update( 
//   {
//       "tokenIds.tokenId" : '1'
//   } ,
//   {
//     "$set" : {
//           "tokenIds.$.tokenId":"5" 
//     }
//   }
//   ,(err,result)=>{
//     console.log(result);
//   })




//  db.collection('NFTPOST').find({tokenIds:{$elemMatch:{'tokenId':'5','type':'c'}}}).toArray((error,result)=>{
//   console.log(result);
//   if(error) console.log(error);
//   if(result){
//     res.send(result);
//   }
// })

})


app.get('/Main',(req,res)=>{
  db.collection('Types').find({}).toArray((err,result)=>{
    console.log(result[0].data.tokenId);
    res.send(result);
  })
})


app.post('/mypage',(req,res)=>{

  
  const account = req.body.account
  

  console.log(account);
  
  const change = account.toLowerCase();
  console.log(change);
  
  const mypageData = [];
  db.collection('NFTPOST').find({account:change}).toArray((err,result)=>{
   

    if(result[0] !== undefined){


    for(let i=0; i<result[0].tokenIds.length; i++){
           mypageData.push(result[0].tokenIds[i].tokenId)
    }

    const sendData = [];

    for(let i=0; i<mypageData.length; i++){
      db.collection('Types').find({'data.tokenId':mypageData[i]}).toArray((err,result)=>{
       sendData.push(...result);
      })
    }

    setTimeout(()=>{
     res.send(sendData)
    },1000)
    
  }else{
    res.send([]);
  }
  })



})
