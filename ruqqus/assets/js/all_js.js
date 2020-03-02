// 2FA toggle modal

$('#2faModal').on('hidden.bs.modal', function () {

  var box = document.getElementById("2faToggle");
  
  if (box.checked) {
    box.checked = false;
  } else {
    box.checked = true;
  }

});

//email change

// Show confirm password field when user clicks email box

$('#new_email').on('input', function () {

    var id = document.getElementById("email-password");
    var id2 = document.getElementById("email-password-label");
    var id3 = document.getElementById("emailpasswordRequired");

    id.classList.remove("d-none");
    id2.classList.remove("d-none");
    id3.classList.remove("d-none");

});


// comment collaps

// Toggle comment collapse

collapse_comment = function(comment_id) {

	var comment = "comment-" + comment_id;

	document.getElementById(comment).classList.toggle("collapsed");

};

//Commenting form

// Expand comment box on focus, hide otherwise

$('.comment-box').focus(function (event) {
    event.preventDefault();

    $(this).parent().parent().addClass("collapsed");

});


/*
$('.comment-box').blur(function () {
    event.preventDefault();

    $(this).parent().parent().removeClass("collapsed");
});

*/

// Comment edit form

toggleEdit=function(id){
    comment=document.getElementById("comment-text-"+id);
    form=document.getElementById("comment-edit-"+id);
    box=document.getElementById('edit-box-comment-'+id);
    actions = document.getElementById('comment-' + id +'-actions');

    comment.classList.toggle("d-none");
    form.classList.toggle("d-none");
    actions.classList.toggle("d-none");
    autoExpand(box);
}

// Post edit form

togglePostEdit=function(id){

    body=document.getElementById("post-body");
    form=document.getElementById("edit-post-body-"+id);
    box=document.getElementById("post-edit-box-"+id);

    body.classList.toggle("d-none");
    form.classList.toggle("d-none");
    autoExpand(box);
}

//comment modding
function removeComment(post_id) {
url="/api/ban_comment/"+post_id

callback=function(){
document.getElementById("comment-"+post_id+"-only").classList.add("banned");

button=document.getElementById("moderate-"+post_id);
button.onclick=function(){approveComment(post_id)};
button.innerHTML="approve"
}
post(url, callback, "Unable to remove post at this time. Please try again later.")
}

function approveComment(post_id) {
url="/api/unban_comment/"+post_id

callback=function(){
document.getElementById("comment-"+post_id+"-only").classList.remove("banned");

button=document.getElementById("moderate-"+post_id);
button.onclick=function(){removeComment(post_id)};
button.innerHTML="remove"
}

post(url, callback, "Unable to approve post at this time. Please try again later.")
}

function distinguishModComment(post_id) {
url="/api/distinguish_comment/"+post_id

callback=function(){
document.getElementById("comment-"+post_id+"-only").classList.add("distinguish-mod");

button=document.getElementById("distinguish-"+post_id);
button.onclick=function(){undistinguishModComment(post_id)};
button.innerHTML="undistinguish"
}

post(url, callback, "Unable to distinguish comment at this time. Please try again later.")
}

function undistinguishModComment(post_id) {
url="/api/undistinguish_comment/"+post_id

callback=function(){
document.getElementById("comment-"+post_id+"-only").classList.remove("distinguish-mod");

button=document.getElementById("distinguish-"+post_id);
button.onclick=function(){distinguishModComment(post_id)};
button.innerHTML="distinguish"
}
post(url, callback, "Unable to undistinguish comment at this time. Please try again later.")
}

function distinguishAdminComment(post_id) {
url="/api/distinguish_comment/"+post_id

callback=function(){
document.getElementById("comment-"+post_id+"-only").classList.add("distinguish-admin");

button=document.getElementById("distinguish-"+post_id);
button.onclick=function(){undistinguishAdminComment(post_id)};
button.innerHTML="undistinguish"
}
post(url, callback, "Unable to distinguish comment at this time. Please try again later.")
}

function undistinguishAdminComment(post_id) {
url="/api/undistinguish_comment/"+post_id

callback=function(){
document.getElementById("comment-"+post_id+"-only").classList.remove("distinguish-admin");

button=document.getElementById("distinguish-"+post_id);
button.onclick=function(){distinguishAdminComment(post_id)};
button.innerHTML="distinguish"
}
post(url, callback, "Unable to undistinguish post at this time. Please try again later.")
}

//comment replies

// https://stackoverflow.com/a/42183824/11724748

/*
function toggleDropdown(e) {
    const _d = $(e.target).closest('.dropdown'),
        _m = $('.dropdown-menu', _d);
    setTimeout(function () {
        const shouldOpen = e.type !== 'click' && _d.is(':hover');
        _m.toggleClass('show', shouldOpen);
        _d.toggleClass('show', shouldOpen);
        $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
    }, e.type === 'mouseleave' ? 150 : 0);
}

// Display profile card on hover

$('body')
    .on('mouseenter mouseleave', '.user-profile', toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);

// Toggle comment collapse

$(".toggle-collapse").click(function (event) {
    event.preventDefault();

    var id = $(this).parent().attr("id");

    document.getElementById(id).classList.toggle("collapsed");
});
*/
// Reply to parent comment

function addReplyForm(commentId, postId) {

    var id = "reply-to-" + commentId;

    document.getElementById(id).innerHTML = '<div class="comment-write collapsed child"> <form id="reply-to-t3_'+commentId+'" action="/api/comment" method="post" class="input-group"> <input type="hidden" name="formkey" value="'+formkey()+'"> <input type="hidden" name="parent_fullname" value="t3_'+commentId+'"> <input type="hidden" name="submission" value="'+postId+'"> <textarea name="body" form="reply-to-t3_'+commentId+'" class="comment-box form-control rounded" id="reply-form" aria-label="With textarea" placeholder="Add your comment..." rows="3"></textarea> <div class="comment-format"> <small class="format pl-0"><i class="fas fa-bold" aria-hidden="true" onclick="makeReplyBold()" data-toggle="tooltip" data-placement="bottom" title="Bold"></i></small> <small class="format"><i class="fas fa-italic" aria-hidden="true" onclick="makeReplyItalics()" data-toggle="tooltip" data-placement="bottom" title="Italicize"></i></small> <small class="format"><i class="fas fa-quote-right" aria-hidden="true" onclick="makeReplyQuote()" data-toggle="tooltip" data-placement="bottom" title="Quote"></i></small> <small class="format"><i class="fas fa-link" aria-hidden="true"></i></small> <a href="javascript:void(0)" onclick="delReplyForm(\''+commentId+'\')" class="btn btn-link text-muted ml-auto cancel-form">Cancel</a> <button form="reply-to-t3_'+commentId+'" class="btn btn-primary ml-2">Comment</button> </div> </form> </div>';

}

    // Removes reply form innerHTML on click

function delReplyForm(commentId) {

    var id = "reply-to-" + commentId;

    document.getElementById(id).innerHTML = '';

};

//Autoexpand textedit comments

var autoExpand = function (field) {

	// Reset field height
	field.style.height = 'inherit';

	// Get the computed styles for the element
	var computed = window.getComputedStyle(field);

	// Calculate the height
	var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
	             + parseInt(computed.getPropertyValue('padding-top'), 10)
	             + field.scrollHeight
	             + parseInt(computed.getPropertyValue('padding-bottom'), 10)
	             + parseInt(computed.getPropertyValue('border-bottom-width'), 10)
		     + 32;

	field.style.height = height + 'px';

};

document.addEventListener('input', function (event) {
	if (event.target.tagName.toLowerCase() !== 'textarea') return;
	autoExpand(event.target);
}, false);

//dark mode

function switch_css() {
  css = document.getElementById("css-link");
  dswitch = document.getElementById("dark-switch");

  if (css.href.endsWith("/assets/style/main.css")) {
    post("/settings/dark_mode/1",
      callback=function(){
        css.href="/assets/style/main_dark.css";
        dswitch.classList.remove("fa-toggle-off");
        dswitch.classList.add("fa-toggle-on");
      }
    );
  }
  else {
    post("/settings/dark_mode/0",
      callback=function(){
        css.href="/assets/style/main.css";
        dswitch.classList.remove("fa-toggle-on");
        dswitch.classList.add("fa-toggle-off");
      }
    );
  }
}

// Delete Post

delete_postModal = function(id) {

  // Passed data for modal

  document.getElementById("deletePostButton").onclick = function() {  

    this.innerHTML='<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Deleting post';  
    this.disabled = true; 
    post('/delete_post/' + id,
      callback = function() {

        location.reload();
      }
      )
  }

};

// Delete Comment

delete_commentModal = function(id) {

  // Passed data for modal

  document.getElementById("deleteCommentButton").onclick = function() {  

    this.innerHTML='<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Deleting comment';  
    this.disabled = true; 
    post('/delete/comment/' + id,
      callback = function() {

        location.reload();
      }
      )
  }

};

//Email verification text

function emailVerifyText() {

  document.getElementById("email-verify-text").innerHTML = "Verification email sent! Please check your inbox.";

}

//flagging
// Flag Comment

report_commentModal = function(id, author, board) {

  document.getElementById("comment-author").textContent = author;

  var offtopic = document.getElementById('report-comment-to-guild-dropdown-option')
  offtopic.innerHTML= 'This comment is off-topic for +' + board;
  offtopic.disabled=true;

    document.getElementById("reportCommentButton").onclick = function() {

      this.innerHTML='<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Reporting comment';
      this.disabled = true;
      post('/api/flag/comment/' + id,
        callback = function() {

          document.getElementById("reportCommentFormBefore").classList.add('d-none');
          document.getElementById("reportCommentFormAfter").classList.remove('d-none');
        }
        )
    }

};

$('#reportCommentModal').on('hidden.bs.modal', function () {

  var button = document.getElementById("reportCommentButton");

  var beforeModal = document.getElementById("reportCommentFormBefore");
  var afterModal = document.getElementById("reportCommentFormAfter");

  button.innerHTML='Report comment';
  button.disabled= false;
  afterModal.classList.add('d-none');

  if ( beforeModal.classList.contains('d-none') ) {
    beforeModal.classList.remove('d-none');
  }

});


// Flag Submission

report_postModal = function(id, author, board) {

  document.getElementById("post-author").textContent = author;

  offtopic=document.getElementById('report-post-to-guild-dropdown-option');
  offtopic.innerHTML= 'This post is off-topic for +' + board;

  if (board=='general') {
    offtopic.disabled=true;
  }
  else {
    offtopic.disabled=false;
  }

  selectbox=document.getElementById('report-type-dropdown');
  selectbox.value='reason_not_selected';

  submitbutton=document.getElementById("reportPostButton");
  submitbutton.disabled=true;

    submitbutton.onclick = function() {

      this.innerHTML='<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Reporting post';
      this.disabled = true;

      var xhr = new XMLHttpRequest();
      xhr.open("POST", '/api/flag/post/'+id, true);
      var form = new FormData()
      form.append("formkey", formkey());

      dropdown=document.getElementById("report-type-dropdown");
      form.append("report_type", dropdown.options[dropdown.selectedIndex].value);

      xhr.withCredentials=true;

      xhr.onload=function() {
        document.getElementById("reportPostFormBefore").classList.add('d-none');
        document.getElementById("reportPostFormAfter").classList.remove('d-none');
      };

      xhr.onerror=function(){alert(errortext)};
      xhr.send(form);

    }
};

$('#reportPostModal').on('hidden.bs.modal', function () {

  var button = document.getElementById("reportPostButton");

  var beforeModal = document.getElementById("reportPostFormBefore");
  var afterModal = document.getElementById("reportPostFormAfter");

  button.innerHTML='Report post';
  button.disabled= false;

  afterModal.classList.add('d-none');

  if ( beforeModal.classList.contains('d-none') ) {
    beforeModal.classList.remove('d-none');
  }

});

//enlarge thumbs
// Enlarge submissionlisting thumbnail

enlarge_thumb = function(post_id) {

	document.getElementById(post_id).classList.toggle("enlarged");

};

//iOS webapp stuff

        $(function(document,navigator,standalone) {
            // prevents links from apps from oppening in mobile safari
            // this javascript must be the first script in your <head>
            if ((standalone in navigator) && navigator[standalone]) {
                var curnode, location=document.location, stop=/^(a|html)$/i;
                document.addEventListener('click', function(e) {
                    curnode=e.target;
                    while (!(stop).test(curnode.nodeName)) {
                        curnode=curnode.parentNode;
                    }
                    // Condidions to do this only on links to your own app
                    // if you want all links, use if('href' in curnode) instead.
                    if('href' in curnode && ( curnode.href.indexOf('http') || ~curnode.href.indexOf(location.host) ) ) {
                        e.preventDefault();
                        location.href = curnode.href;
                    }
                },false);
            }
        })(document,window.navigator,'standalone');


//KC easter egg

$(function(){
    var kKeys = [];
    function Kpress(e){
        kKeys.push(e.keyCode);
        if (kKeys.toString().indexOf("38,38,40,40,37,39,37,39,66,65") >= 0) {
            $(this).unbind('keydown', Kpress);
            kExec();
        }
    }
    $(document).keydown(Kpress);
});
function kExec(){
   $('body').append ('<iframe width="0" height="0" src="https://www.youtube.com/embed/xoEEOrTctpA?rel=0&amp;controls=0&amp;showinfo=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
   $('a').addClass('ruckus');
   $('p').addClass('ruckus');
   $('img').addClass('ruckus');
   $('span').addClass('ruckus');
   $('button').addClass('ruckus');
   $('i').addClass('ruckus');
   $('input').addClass('ruckus');
};

//Post kick

kick_postModal = function(id) {

  document.getElementById("kickPostButton").onclick = function() {

    this.innerHTML='<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>kicking post';
    this.disabled = true;
    post('/api/flag/post/' + id,
      callback = function() {

        location.reload();
      }
      )
  }
};

$('#kickPostModal').on('hidden.bs.modal', function () {

  var button = document.getElementById("kickPostButton");

  var beforeModal = document.getElementById("kickPostFormBefore");
  var afterModal = document.getElementById("kickPostFormAfter");

  button.innerHTML='kick post';
  button.disabled= false;

  afterModal.classList.add('d-none');

  if ( beforeModal.classList.contains('d-none') ) {
    beforeModal.classList.remove('d-none');
  }

});

//POST

function post(url, callback, errortext) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  var form = new FormData()
  form.append("formkey", formkey());
  xhr.withCredentials=true;
  xhr.onload=callback
  xhr.onerror=function(){alert(errortext)}
  xhr.send(form);
}

// sub/unsub

toggleSub=function(){
  document.getElementById('button-unsub').classList.toggle('d-none');
  document.getElementById('button-sub').classList.toggle('d-none');
  document.getElementById('button-unsub-modal').classList.toggle('d-none');
  document.getElementById('button-sub-modal').classList.toggle('d-none');
  document.getElementById('button-unsub-mobile').classList.toggle('d-none');
  document.getElementById('button-sub-mobile').classList.toggle('d-none');
}


//Admin post modding
function removePost(post_id) {
url="/api/ban_post/"+post_id

callback=function(){
document.getElementById("post-"+post_id).classList.add("banned");

var button=document.getElementById("moderate-post-"+post_id);
button.onclick=function(){approvePost(post_id)};
button.classList.remove("removeDropdownItem");
button.classList.add("approveDropdownItem");
button.innerHTML='<i class="fas fa-clipboard-check"></i>Approve'
}
post(url, callback, "Unable to remove post at this time. Please try again later.")
}

function approvePost(post_id) {
url="/api/unban_post/"+post_id

callback=function(){
document.getElementById("post-"+post_id).classList.remove("banned");

var button=document.getElementById("moderate-post-"+post_id);
button.onclick=function(){removePost(post_id)};
button.classList.remove("approveDropdownItem");
button.classList.add("removeDropdownItem");
button.innerHTML='<i class="fas fa-trash-alt"></i>Remove'
}

post(url, callback, "Unable to approve post at this time. Please try again later.")
}

//Element deleter

function deleteElement(eid) {
	x=document.getElementById(eid)
	x.parentElement.removeChild(x)

}

// Progress bar

window.onload = function() {

	pBar = document.getElementById('progressbar');
	score = document.getElementById('score-percent');

	var upsNum = +document.getElementById('p-ups').innerHTML;
	var downsNum = +document.getElementById('p-downs').innerHTML;

	var sum = upsNum + downsNum;

	var val = (Math.floor((upsNum / sum) * 100));

	// console log var val for troubleshooting

	console.log(val);

	score.innerHTML = val + "% upvoted";

	pBar.style.width = val + "%";

	// Set background color of progress bar based on score

	if (val < 50) {
		pBar.classList.remove("bg-upvote");
		pBar.classList.add("bg-downvote");
	}
}


//Signup js
// Display username and password requirements on input

$('#password-register').on('input', function () {

    var charCount = document.getElementById("password-register").value;
    var id = document.getElementById("passwordHelpRegister");
    var successID = document.getElementById("passwordHelpSuccess");

    console.log(charCount.length);

    if (charCount.length >= 8) {
        id.classList.add("d-none");
        successID.classList.remove("d-none");
    }
    else {
        id.classList.remove("d-none");
        successID.classList.add("d-none");
    };

});

// Check username length, special chars

$('#username-register').on('input', function () {

    var charCount = document.getElementById("username-register").value;
    var id = document.getElementById("usernameHelpRegister");
    var successID = document.getElementById("usernameHelpSuccess");

    var ruqqusAPI = 'https://www.ruqqus.com/api/is_available/' + charCount;

    if (charCount.length >= 5) {

    $.getJSON(ruqqusAPI, function(result) {
        $.each(result, function(i, field) {
          if (field == false) {
            id.innerHTML = '<span class="form-text font-weight-bold text-danger mt-1">Username already taken :(';
        }
    });
    });

}

    if (!/[^a-zA-Z0-9_$]/.test(charCount)) {
    // Change alert text
    id.innerHTML = '<span class="form-text font-weight-bold text-success mt-1">Username is a-okay!';

    if (charCount.length < 5) {
      id.innerHTML = '<span class="form-text font-weight-bold text-muted mt-1">Username must be at least 5 characters long.';
  }
  else if (charCount.length > 25) {
      id.innerHTML = '<span class="form-text font-weight-bold text-danger mt-1">Username must be 25 characters or less.';
  }
}
else {
    id.innerHTML = '<span class="form-text font-weight-bold text-danger mt-1">No special characters or spaces allowed.</span>';
};

});

// Search Icon
// Change navbar search icon when form is in focus, active states

$(".form-control").focus(function () {
    $(this).prev('.input-group-append').removeClass().addClass('input-group-append-focus');
    $(this).next('.input-group-append').removeClass().addClass('input-group-append-focus');
});

$(".form-control").focusout(function () {
    $(this).prev('.input-group-append-focus').removeClass().addClass('input-group-append');
    $(this).next('.input-group-append-focus').removeClass().addClass('input-group-append');
});

//spinner effect

$(document).ready(function() {
	$('#login').submit(function() {
      // disable button
      $("#login_button").prop("disabled", true);
      // add spinner to button
      $("#login_button").html(
        `<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Signing in`
      );
    });
});

$(document).ready(function() {
	$('#signup').submit(function() {
      // disable button
      $("#register_button").prop("disabled", true);
      // add spinner to button
      $("#register_button").html(
        `<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Registering`
      );
    });
});

$(document).ready(function() {
	$('#submitform').submit(function() {
      // disable button
      $("#create_button").prop("disabled", true);
      // add spinner to button
      $("#create_button").html(
        `<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Creating post`
      );
    });
});

// Sidebar collapsing

// Desktop

if (localStorage.sidebar_pref == 'collapsed') {

	document.getElementById('sidebar-left').classList.add('sidebar-collapsed');
  
}

toggle_sidebar_collapse = function() {

	// Store Pref
	localStorage.setItem('sidebar_pref', 'collapsed');

	document.getElementById('sidebar-left').classList.toggle('sidebar-collapsed');

}

toggle_sidebar_expand = function() {

	// Remove Pref
	localStorage.removeItem('sidebar_pref');

	document.getElementById('sidebar-left').classList.toggle('sidebar-collapsed');

}


//Voting



function vote(post_id, direction) {
url="/api/vote/post/"+post_id+"/"+direction;

callback=function(){
thing = document.getElementById("post-"+post_id);
uparrow1=document.getElementById("post-"+post_id+"-up");
downarrow1=document.getElementById("post-"+post_id+"-down");
scoreup1=document.getElementById("post-"+post_id+"-score-up");
scorenone1=document.getElementById("post-"+post_id+"-score-none");
scoredown1=document.getElementById("post-"+post_id+"-score-down");

thing2=document.getElementById("voting-"+post_id+"-mobile")
uparrow2=document.getElementById("arrow-"+post_id+"-mobile-up");
downarrow2=document.getElementById("arrow-"+post_id+"-mobile-down");
scoreup2=document.getElementById("post-"+post_id+"-score-mobile-up");
scorenone2=document.getElementById("post-"+post_id+"-score-mobile-none");
scoredown2=document.getElementById("post-"+post_id+"-score-mobile-down");

if (direction=="1") {
thing.classList.add("upvoted");
thing.classList.remove("downvoted");
uparrow1.onclick=function(){vote(post_id, 0)};
downarrow1.onclick=function(){vote(post_id, -1)};
scoreup1.classList.remove("d-none");
scorenone1.classList.add("d-none");
scoredown1.classList.add("d-none");

thing2.classList.add("upvoted");
thing2.classList.remove("downvoted");
uparrow2.onclick=function(){vote(post_id, 0)};
downarrow2.onclick=function(){vote(post_id, -1)};
scoreup2.classList.remove("d-none");
scorenone2.classList.add("d-none");
scoredown2.classList.add("d-none");
}
else if (direction=="-1"){
thing.classList.remove("upvoted");
thing.classList.add("downvoted");
uparrow1.onclick=function(){vote(post_id, 1)};
downarrow1.onclick=function(){vote(post_id, 0)};
scoreup1.classList.add("d-none");
scorenone1.classList.add("d-none");
scoredown1.classList.remove("d-none");

thing2.classList.remove("upvoted");
thing2.classList.add("downvoted");
uparrow2.onclick=function(){vote(post_id, 1)};
downarrow2.onclick=function(){vote(post_id, 0)};
scoreup2.classList.add("d-none");
scorenone2.classList.add("d-none");
scoredown2.classList.remove("d-none");

}
else if (direction=="0"){
thing.classList.remove("upvoted");
thing.classList.remove("downvoted");
uparrow1.onclick=function(){vote(post_id, 1)};
downarrow1.onclick=function(){vote(post_id, -1)};
scoreup1.classList.add("d-none");
scorenone1.classList.remove("d-none");
scoredown1.classList.add("d-none");

thing2.classList.remove("upvoted");
thing2.classList.remove("downvoted");
uparrow2.onclick=function(){vote(post_id, 1)};
downarrow2.onclick=function(){vote(post_id, -1)};
scoreup2.classList.add("d-none");
scorenone2.classList.remove("d-none");
scoredown2.classList.add("d-none");

}
}

post(url, callback, "Unable to vote at this time. Please try again later.");
}


function vote_comment(comment_id, direction) {
url="/api/vote/comment/"+ comment_id +"/"+direction;

callback=function(){
thing = document.getElementById("comment-"+ comment_id+"-actions");
uparrow1=document.getElementById("comment-"+ comment_id +"-up");
downarrow1=document.getElementById("comment-"+ comment_id +"-down");
scoreup1=document.getElementById("comment-"+ comment_id +"-score-up");
scorenone1=document.getElementById("comment-"+ comment_id +"-score-none");
scoredown1=document.getElementById("comment-"+ comment_id +"-score-down");

if (direction=="1") {
thing.classList.add("upvoted");
thing.classList.remove("downvoted");
uparrow1.onclick=function(){vote_comment(comment_id, 0)};
downarrow1.onclick=function(){vote_comment(comment_id, -1)};
scoreup1.classList.remove("d-none");
scorenone1.classList.add("d-none");
scoredown1.classList.add("d-none");
}
else if (direction=="-1"){
thing.classList.remove("upvoted");
thing.classList.add("downvoted");
uparrow1.onclick=function(){vote_comment(comment_id, 1)};
downarrow1.onclick=function(){vote_comment(comment_id, 0)};
scoreup1.classList.add("d-none");
scorenone1.classList.add("d-none");
scoredown1.classList.remove("d-none");
}
else if (direction=="0"){
thing.classList.remove("upvoted");
thing.classList.remove("downvoted");
uparrow1.onclick=function(){vote_comment(comment_id, 1)};
downarrow1.onclick=function(){vote_comment(comment_id, -1)};
scoreup1.classList.add("d-none");
scorenone1.classList.remove("d-none");
scoredown1.classList.add("d-none");
}
}

post(url, callback, "Unable to vote at this time. Please try again later.");
}

// Yank Post

yank_postModal = function(id, author, comments, points, title, author_link, domain, timestamp) {

  // Passed data for modal

  document.getElementById("post-author-url").innerText = author;

  document.getElementById("post-comments").textContent = comments;

  document.getElementById("post-points").textContent = points;

  document.getElementById("post-title").textContent = title;

  document.getElementById("post-author-url").href = author_link;

  document.getElementById("post-domain").textContent = domain;

  document.getElementById("post-timestamp").textContent = timestamp;
  
  document.getElementById("yank-post-form").action="/mod/take/"+id;

  document.getElementById("yankPostButton").onclick = function() {  

    this.innerHTML='<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Yanking post';  
    this.disabled = true; 
    document.getElementById("yank-post-form").submit();
  }

};

//yt embed

function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

var myUrl = $('#embedURL').text();

myId = getId(myUrl);

$('#ytEmbed').html('<iframe width="100%" height="475" src="//www.youtube.com/embed/' + myId + '" frameborder="0" allowfullscreen></iframe>');
