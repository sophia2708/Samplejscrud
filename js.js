//alphabets validation]
function onlyAlphabet(event, input) {
    debugger;
            var charCode = event.which || event.keyCode;

            if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode==32 ||  charCode === 8) {
                return true; // Allow uppercase and lowercase letters, and Backspace
            } else {
                event.preventDefault();
                return false; // Block other characters, including spaces
            }
        }

//numbers validation
function onlyNumbers(event,input){
    var charCode = event.which || event.keyCode;

    if((charCode>=48 && charCode<=57) || (charCode==8)){
        return true;
    }else{
        event.preventDefault();
        return false;
    }
}

var selectedRow=null;

//show alerts
function showAlert(message,className){
    const div=document.createElement("div");
    div.className=`alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container=document.querySelector(".container");
    const main=document.querySelector(".main");
    container.insertBefore(div,main);

    setTimeout(()=>document.querySelector(".alert").remove(),3000);
}

//clear all fields
function clearFields(){
    document.querySelector("#firstName").value="";
    document.querySelector("#lastName").value="";
    document.querySelector("#rno").value="";
}

//add data
document.querySelector("#student-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    //get form values
    const firstName=document.querySelector("#firstName").value;
    const lastName=document.querySelector("#lastName").value;
    const rno=document.querySelector("#rno").value;
    //validate 
    if(firstName==""|| lastName==""|| rno==""){
        showAlert("Please fill in all fields","danger");
    }else{
        if(selectedRow==null){
            const list=document.querySelector("#student-list");
            const row=document.createElement("tr");

            row.innerHTML=`
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${rno}</td>
            <td>
             <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
             <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            </td>
            `;
            list.appendChild(row);
            selectedRow=null;
            showAlert("Student Added!","success");
        }
        else{
            selectedRow.children[0].textContent=firstName;
            selectedRow.children[1].textContent=lastName;
            selectedRow.children[2].textContent=rno;
            selectedRow=null;
            showAlert("Student Info Edited!","info");
        }
        clearFields();
    }

});

//edit data
document.querySelector("#student-list").addEventListener("click",(e)=>{
    target=e.target;
    if(target.classList.contains("edit")){
        selectedRow=target.parentElement.parentElement;
        document.querySelector("#firstName").value=selectedRow.children[0].textContent;
        document.querySelector("#lastName").value=selectedRow.children[1].textContent;
        document.querySelector("#rno").value=selectedRow.children[2].textContent;
    }
});

//delete data
document.querySelector("#student-list").addEventListener("click",(e)=>{
    target=e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted","danger");
    }
})