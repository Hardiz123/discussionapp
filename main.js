function get(x) {
    return document.getElementById(x);
}
var text =[];
localStorage.setItem('text',JSON.stringify(text));
console.log(localStorage)
var question_text;
var subject_text;

function addQuestion() {
    question_text = get('question-area').value;
    subject_text = get('subject').value;
    get('questions').innerHTML="";
    var l = {
        text:question_text,
        subject:subject_text,
        comments:[]
    }
    text.push(l);
    for(var i=0;i<text.length;i++){
        var div = document.createElement('button');
        div.innerHTML= "<h2>"+text[i].subject+"</h2>";
        div.innerHTML += "<p id='question_list_text'>"+text[i].text+"</p>" ;
        div.className = "questions";
        div.setAttribute('id',text[i].subject);
        div.addEventListener('click',getData);
        get('questions').appendChild(div);
    }
    get('question-area').value='';
    get('subject').value='';
};


function addnewQuestion() {
    get('right-body').innerHTML='';
    var bodytextright = "<h2>Welcome to Discussion Portal !</h2>"+
    "<p style='font-weight: 600;'> Enter a Subject and Question to Get started</p>"+
    "<input type='text' placeholder='Subject' id='subject'><br>"+
    "<br>"+
    "<textarea name='Question-area' id='question-area' cols='120' rows='10'></textarea>"+
    "<br>"+
    "<button id='submit-question' onclick='addQuestion()' class='btn btn-primary' style='float: right;'>Submit</button>"
    
    get('right-body').innerHTML = bodytextright;
}


function getData() {
    var question_texts;
    var text_comments;
    console.log(this.id);
    for(var i=0;i<text.length;i++){
        if(this.id == text[i].subject){
            // text.splice(i,1);
            question_texts=text[i].text;
            text_comments = text[i].comments;
            get('right-body').innerHTML = "<div class='response-list' id='responses-lists'>hey</div><br>";
            console.log(text_comments);
            
        }
    }
    replyQuestion(this.id, question_texts, text_comments);
    showResponses(text_comments);
}

function replyQuestion(heading,about,comments) {
    get('right-body').innerHTML='';
    
    var question_text = document.createElement('h3');
    question_text.innerHTML="Question";
    get('right-body').appendChild(question_text);
    get('right-body').innerHTML+="<div class='left-header1'>"
    +heading+
    "<p id='question_list_text'>"+about+"</p>"+
    "</div><br>"+"<button class='btn btn-primary' style='float: right;' onclick='resolve("+heading+")'>Resolve</button><br><br>"+
    "<br><h3>Response</h3>"+
    "<div class='response-list' id='responses-lists'></div><br>"+
    "<h3>Add Response</h3>"+
    "<input type='text' placeholder='Enter Name' id='response-person-name'>"+
          "<br>"+
          "<textarea name='Response-area'placeholder='Enter Comment' id='response-area' cols='120' rows='6'></textarea>"+
          "<br>"+
          "<button id='submit-response' onclick='addResponse("+heading+")' class='btn btn-primary' style='float: right;'>Submit</button>"


}

function resolve(heading) {
    for(var i=0;i<text.length;i++){
        if(heading.id==text[i].subject){
            get(heading.id).remove();
            text.splice(i,1);
        }
    }
    addnewQuestion();
};

function filterQuestions() {
    var input = get('inputsearch');
    var filter = input.value.toUpperCase();
    var li = document.getElementsByClassName('questions');
    for(var i=0;i<li.length;i++){
        var a = li[i].getElementsByTagName("h2")[0];
        var txtValue = a.textContent || a.innerText;
        if(txtValue.toUpperCase().indexOf(filter) > -1){
            li[i].style.display="";
        }else{
            li[i].style.display="none";
            
        }

    }
}
function addResponse(heading) {
    var username= get('response-person-name').value;
    var usercomment= get('response-area').value;
    var comment={
        Uname : username,
        Ucomment: usercomment
    };
    get('response-person-name').value='';
    get('response-area').value='';
    console.log(heading.id);

    for(var i=0;i<text.length;i++){
        if(heading.id===text[i].subject){
            text[i].comments.push(comment);
            console.log(text[i].comments);
            showResponses(text[i].comments);
        }
    }
}

function showResponses(commentslist) {
    get('responses-lists').innerHTML='';
    for(var i=0;i<commentslist.length;i++){
        var div = document.createElement('div');
        div.innerHTML = "<h3>"+commentslist[i].Uname+"</h3>";
        div.innerHTML += "<p id='question_list_text'>"+commentslist[i].Ucomment+"</p>" ;
        div.className = "question";
        
        get('responses-lists').appendChild(div);
    }
};