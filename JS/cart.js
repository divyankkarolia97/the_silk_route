
var productList=[];

var modelList ={};

$(function(){

    $.getJSON("package.json",function(data){
        $.each(data, function( index , product){
            productList.push(product);
            modelList[product.id]=0;
        })

        loadStore();
        paintTable(modelList,productList);
    })

})

function paintTable(modelList,productList){

    var summary = $('#storeSum');
    var totalSum=0;
    summary.text("");
    for(i in productList){
        if( modelList[i] ===0){
            continue;
        }
        var append = $(`
                
                <tr >
                
                <td> ${parseInt(i)+1}</td>
                
                <td> ${productList[i].name}</td>
                
                <td>${productList[i].price}</td>
                
                <td data-id="${i}"> <i class="fa fa-plus-square" onclick="addItem(event)" aria-hidden="true"></i>  ${modelList[i]} <i class="fa fa-minus-square" onclick="deleteItem(event)" aria-hidden="true"></i>  </td>
                
                <td>${productList[i].price*(modelList[i])}</td>
            
                </tr>


`)
        totalSum+=((productList[i].price)*modelList[i])
        summary.append(append);
    }

    var append=$(`
    <tr >
        <td colspan="4"><b>TOTAL:</b></td>
        <td>${totalSum}</td>
    </tr>
`)
    summary.append(append);

}

function loadStore() {
    var temp = localStorage.getItem("storeList");
    if (temp === null) {
        return;
    }
     modelList = JSON.parse(temp);

}

function saveToStore(modelList){
    localStorage.setItem("storeList",JSON.stringify(modelList));
}


function addItem(event){
    var id = event.target.parentNode.getAttribute("data-id");
    modelList[id]++;
    saveToStore(modelList);
    loadStore();
    paintTable(modelList,productList);

}

function deleteItem(event) {
    var id = event.target.parentNode.getAttribute("data-id");
    modelList[id]--;
    saveToStore(modelList);
    loadStore();
    paintTable(modelList,productList);

}
