
var productList=[];

var modelList ={};

$(function(){

    //console.log(modelList);
    $.getJSON("package.json",function(data){
        $.each(data, function( index , product){
                productList.push(product);
                modelList[product.id]=0;
        })


        loadStore();
        paint(modelList,productList);
    })

})


function paint(modelList, productList){

    var productPlace = $('#productPlace');
    productPlace.text("");

    var totalInCart =0;
    for( var i in productList){

        totalInCart+=modelList[i];

        var append = $(`
         <div class="col-sm-4">
            <div class="card" >
                <a href="http://placeholder.com"><img class=" card-image-top img-fluid " src="http://via.placeholder.com/459x350?text=${productList[i].name}" ></a>
                <div class="card-block">

                <h4 class="card-title">${productList[i].name}</h4>
            <div class="row">
                <div class="col-lg-3">
                    <p>Rs. ${productList[i].price} </p>
                </div>
                <div class="col-lg-5" >
                    <button class="btn btn-primary btn-sm"  data-id="${productList[i].id}" onclick="addToCart(event)">Add To Cart</button>
                </div>
                <div class="col-lg-4">
                    <p> <b>${modelList[i]}</b> In Cart</p>
                </div>
        </div>
        </div>
        </div>

        </div>`)

       productPlace.append(append);
    }

    $('.badge').text(totalInCart);


}

function addToCart(event){

   var tempId = event.target.getAttribute("data-id");
   modelList[tempId]++;

   saveToStore(modelList);
   loadStore();

   paint(modelList,productList);
}

function saveToStore(modelList){
    localStorage.setItem("storeList",JSON.stringify(modelList));
}
function loadStore(){
     var temp = localStorage.getItem("storeList");
        if(temp === null){
            return;
        }

     modelList = JSON.parse(temp);
}