loc = {
  lat: "No Permission",
  lng: "No Permission",
  speed: "No Permission",
  altitude: "Sea Level",
};

$(document).ready(function () {
  $(window).scroll(function () {
    // sticky navbar on scroll script
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    // scroll-up button show/hide script
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  // slide-up script
  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    // removing smooth scroll on slide-up button click
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").click(function () {
    // applying again smooth scroll on menu items click
    $("html").css("scrollBehavior", "smooth");
  });

  // toggle menu/navbar script
  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  // typing text animation script
  var typed = new Typed(".typing", {
    strings: [
      "Web Developer",
      "Android Developer",
      "Mentor",
      "Open Source Contributor",
      "Action on Google Developer",
      "Freelancer",
      "AI Enthusiast",
      "Front End Enthusiast",
      "UI Designer",
      "Photographer",
      "Technical Writer",
      "Cloud Computing Enthusiast",
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  var typed = new Typed(".typing-2", {
    strings: [
      "Web Developer",
      "Flutter Developer",
      "Mentor",
      "Open Source Contributor",
      "Freelancer",
      "AI Enthusiast",
      "Front End Enthusiast",
      "UI Designer",
      "Photographer",
      "Technical Writer",
      "Author",
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  // owl carousel script
  $(".carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: false,
      },
    },
  });

  let schedule_meet = document.getElementById("schedule-meet");
  schedule_meet.addEventListener("click", function () {
    let calendar = document.getElementById("calendar");
    if (calendar.hidden) {
      calendar.hidden = !calendar.hidden;
      schedule_meet.innerHTML = `<i class="fa-solid fa-xmark fa-xl" style="color: #ffffff;"></i>`;
    } else {
      calendar.hidden = !calendar.hidden;
      schedule_meet.innerText = "Schedule a Meetup";
    }
  });
});

async function postContactInfo(name, email, phone, subject, msg) {
  // console.log("Data to be Sent", name, email, phone, subject, msg);
  var contact_form = document.getElementById("contact_form");
  var msg_txt = document.getElementById("message_txt");
  var contact_status = document.getElementById("contact_status");
  let url =
    "https://script.google.com/macros/s/AKfycbw_03cHc0LqEgwfKzD_d5LsvCIDw0ppGgYzIyMuH9UmGBlQcHyvi4W-mVlKumqb1EiqHg/exec";

  let date = new Date().toLocaleDateString();
  loc_string = JSON.stringify(loc);

  let obj = {
    name: name,
    email: email,
    phone: phone,
    subject: subject,
    msg: msg,
    loc: loc_string,
    local_date: date,
  };
  try {
    const upload = fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
    });
    upload
      .then((r) => r.text())
      .then((data) => {
        console.log(JSON.parse(data));
        contact_form.reset();
        contact_form.hidden = true;
        msg_txt.hidden = true;
        contact_status.hidden = false;
        return JSON.parse(data);
      });
  } catch (err) {
    console.log("Error: ", err);
  }
}

// Experiences
console.clear();

const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");

const applyOverlayMask = (e) => {
  const overlayEl = e.currentTarget;
  const x = e.pageX - cardsContainer.offsetLeft;
  const y = e.pageY - cardsContainer.offsetTop;

  overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndex = cards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (cardIndex >= 0) {
      overlay.children[cardIndex].style.width = `${width}px`;
      overlay.children[cardIndex].style.height = `${height}px`;
    }
  });
});

const initOverlayCard = (cardEl) => {
  const overlayCard = document.createElement("div");
  overlayCard.classList.add("card");
  overlay.append(overlayCard);
  observer.observe(cardEl);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask);
