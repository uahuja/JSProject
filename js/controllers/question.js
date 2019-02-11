
window.addEventListener("load",init);

function init(){
    displayCount();
    bindEvents();
    
}

const deleteRecords=()=>
    printRecords(questionOperation.deleteRecords());


function printRecords(questions){
    document.querySelector("#question").innerHTML = "";
    questions.forEach(question=>print(question));
    displayCount();
}

function displayCount(){
    document.querySelector("#total").innerText = questionOperation.questions.length;
    document.querySelector("#mark").innerText = questionOperation.markCount();
    document.querySelector("#unmark").innerText = questionOperation.unMarkCount();


}
function bindEvents(){
    document.querySelector("#add").addEventListener("click",addQuestion);
    document.querySelector("#delete").addEventListener("click",deleteRecords);
    document.querySelector("#search").addEventListener("click", searchRecords);
    document.querySelector("#load").addEventListener("click", loadRecords);
    document.querySelector("#sortby").addEventListener("change",doSort);
    document.querySelector("#sort").addEventListener("click",showHide);
}

function loadRecords(){
    printRecords(questionOperation.questions);
}
function searchRecords(){
    var id = document.querySelector("#qID").value;
    printRecords(questionOperation.searchRecords(id));
}

function showHide(){
    var div = document.querySelector("#sortDiv");
    div.classList.toggle("hide");
}
function doSort(){
   var sortBy = this.value; 
   printRecords(questionOperations.sort(sortBy,'A'));
}

function addQuestion(){
    var questionObject = new Question();
    for(let key in questionObject){
       if(key == "markForDelete"){
           continue;
       }
       questionObject[key] =  document.querySelector("#"+key).value ;
    }
    questionOperation.add(questionObject);
    print(questionObject);
    displayCount();
   // var id = document.querySelector("#id").value;
    //var name = document.querySelector("#name").value;
}
function print(question){
        var index=0;
        var tbody=document.querySelector("#question");
        var tr = tbody.insertRow();
        for(let key in question){
            if(key == "markForDelete"){
                continue;
            }
            tr.insertCell(index).innerText = question[key];
            index++;
        }
        var td = tr.insertCell(index);
        td.appendChild(createIcon("fas fa-trash-alt mr-2", toggleMark,question.id));
        td.appendChild(createIcon("fas fa-edit", editMark,question.id));

    }

function toggleMark(){
    var questionId= this.getAttribute("qid");
    console.log("Mark Toggle Call ",this.getAttribute("qid"));
    console.log("This is ",this);
    var tr = this.parentNode.parentNode;
    //tr.className="alert-danger";
    tr.classList.toggle("alert-danger");
    questionOperation.mark(questionId);
    displayCount();

}
function editMark(){
    console.log("inside edit");
}
function createIcon(className,fn,id){
    
    var i = document.createElement("i");
    i.className=className;
    i.addEventListener("click",fn);
    i.setAttribute("qid" , id);
    return i;
}

function unHook(){
    document.querySelector("#add").removeEventListener("click");
}