var notes_container = document.querySelector(".notes-container");
var notes = document.querySelectorAll(".input-box");

function take_notes(){
    //when add note button is clicked this function will get executed
    var note = document.createElement("p");
    note.className = "input-box";
    note.setAttribute("contenteditable","true");
    var delete_btn = document.createElement("img");
    delete_btn.src = "images/delete.png";
    //now we have to append these tags into our div
    notes_container.appendChild(note).appendChild(delete_btn);
    save_data();
}

//when delete button is clicked,  it should delete the note
notes_container.addEventListener("click", function(event){
    if(event.target.tagName === "IMG"){
        event.target.parentElement.remove();
    save_data();
    }
    else if(event.target.tagName === "P"){
        //when something is written in input box it gets saved
        notes = document.querySelectorAll(".input-box");
        notes.forEach(ele => {
            ele.onkeyup = function(){
                save_data();
            } 
        });
    }
});
//to save data in local storage we use this function
function save_data(){
    localStorage.setItem("notes", notes.innerHTML);
    localStorage.setItem("data", notes_container.innerHTML);
}
function show_list(){
    notes.innerHTML = localStorage.getItem("notes");
    notes_container.innerHTML = localStorage.getItem("data");
} // used to show data when browser is refreshed or opened once more
document.addEventListener("keydown", event =>{
    //used to get a new line when enter is clicked 
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
function delete_all(){
    var opt = confirm("Do you want to delete all your saved noted?!!!");
    console.log(opt);
    if(opt == true){
        localStorage.clear();
        javascript:location.reload(true);
    }
}
show_list();
