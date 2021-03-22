
const closeIcon = document.getElementById("close-icon");
const openIcon = document.getElementById("open-icon");
const navbar = document.querySelector(".navbar");
const heroImg = document.getElementById("hero-image");

window.onresize = () => {
    if (window.innerWidth >= 750) {
        openIcon.style.display = "none";
        closeIcon.style.display = "none";
        navbar.style.display = "block";
    } else {
        navbar.style.display = "none";
        openIcon.style.display = "inline-block";
    }
}

$("nav ul li").click( function() {
    if (window.innerWidth <= 750) {
        $(".navbar").hide();
        $("#open-icon").show()
        $("#close-icon").hide()
    }
});

openIcon.onclick = () => {
    navbar.style.display = "block";
    openIcon.style.display = "none";
    closeIcon.style.display = "inline-block";
}
closeIcon.onclick = () => {
    navbar.style.display = "none";
    closeIcon.style.display = "none";
    openIcon.style.display = "inline-block";
}

$(".hire").click( function() {
    $(".modal").fadeIn()
});
$(".close-icon").click( function() {
    $(this).parent().fadeOut();
});

$(".hire-form").submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize()
    $.post("/hire", data, ()=> {
        $("#par1").html("I'm delighted to be offered a job from " + $(".hirename").val() + "!");
        $("#par2").html("I will respond in the shortest time-frame through " + $(".hiremail").val() + ".");
        $(".form-hire").fadeOut( function () {
            $(".thanks").fadeIn();
        });
    })
});



$(".message-form").submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize()
    $.post("/messages", data, ()=> {
        $("div.message-container").fadeOut();
        $("h1.response").html("Thanks for the message " + $(".sender").val() + "!");
        $("p.response").hide();
    });
});

