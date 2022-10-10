const postOne = [
  {title : "Post one", body: "Java script"},
  {title : "Post two ", body : "Node js"}
  ]
  function getPost(){
      setTimeout(()=>{
          let outPut = '';
          postOne.forEach((post, index)=>{
              outPut += `<li>${post.title}</li>`;
          });
          console.log(outPut)
      }, 1000)
  }
getPost();