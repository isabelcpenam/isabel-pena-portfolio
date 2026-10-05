



// Project Slider
var swiper = new Swiper(".project-slider", {
    spaceBetween: 18,
    slidesPerView: 3,
    speed: 1500,
    loop: false,
    navigation: {
        nextEl: ".project-button-next",
        prevEl: ".project-button-prev",
    },
    breakpoints: {
      809: {
        slidesPerView: 1
      },
      1200: {
        slidesPerView: 3
      }
    }
});



// Testimonial
var swiper2 = new Swiper(".testimonial-slider", {
    spaceBetween: 18,
    slidesPerView: 2,
    loop: false,
    speed: 1500,
    slidesPerGroup: 2,
    grabCursor: false,
    mousewheelControl: false,
    pauseOnMouseEnter: false,
    navigation: {
        nextEl: ".testimonial-button-next",
        prevEl: ".testimonial-button-prev",
    },
    breakpoints: {
      525: {
        slidesPerView: 1
      },
      809: {
        slidesPerView: 1
      },
      1200: {
        slidesPerView: 2
      }
    }
});


// Gallery
// var swiper2 = new Swiper(".gallery-slider", {
//     spaceBetween: 18,
//     slidesPerView: 4,
//     loop: true,
//     speed: 1500,
//     slidesPerGroup: 1,
//     grabCursor: false,
//     mousewheelControl: false,
//     pauseOnMouseEnter: false,
//     navigation: {
//         nextEl: ".gallery-button-next",
//         prevEl: ".gallery-button-prev",
//     },
//     breakpoints: {
//       525: {
//         slidesPerView: 1
//       },
//       768: {
//         slidesPerView: 3
//       },
//       1200: {
//         slidesPerView: 4
//       }
//     }
// });


if ($('#datetime').length) {
  // set a variable
  var today = moment().format('dddd, D MMMM, YYYY');
  
  document.querySelector('#datetime').textContent = today;
}


if ($('#current-time').length) {
  // set a variable
  var currentTime = moment().format("HH:mm");
  
  document.querySelector('#current-time').textContent = currentTime;
}

function getProjectLabel(projectNumber) {
  if (projectNumber === 1) {
    return 'Spirit Bound';
  }

  var lastTwoDigits = projectNumber % 100;
  var suffix = lastTwoDigits >= 11 && lastTwoDigits <= 13
    ? 'th'
    : ({ 1: 'st', 2: 'nd', 3: 'rd' }[projectNumber % 10] || 'th');

  return projectNumber + suffix + ' Project';
}

document.querySelectorAll('.projects-page .project-slider-box, .project-slider .project-slider-box').forEach(function(card, index) {
  var projectNumber = index + 1;
  var projectTitle = card.querySelector('.project-content h3');

  if (projectTitle) {
    projectTitle.textContent = getProjectLabel(projectNumber);
  }

  card.querySelectorAll('a[href="project-detail.html"]').forEach(function(link) {
    link.href = 'project-detail.html?project=' + projectNumber;
  });
});

var projectDetailTitle = document.querySelector('#project-detail-title');
if (projectDetailTitle) {
  var requestedProject = Number(new URLSearchParams(window.location.search).get('project'));
  var projectNumber = Number.isInteger(requestedProject) && requestedProject >= 1 && requestedProject <= 15
    ? requestedProject
    : 1;
  var projectLabel = getProjectLabel(projectNumber);

  projectDetailTitle.textContent = projectLabel;
  document.querySelector('#project-detail-name').textContent = projectLabel;

  var spiritBoundDiagrams = document.querySelector('.spirit-bound-diagrams');
  if (spiritBoundDiagrams) {
    spiritBoundDiagrams.hidden = projectNumber !== 1;
  }
}

const humbergMenu = document.querySelector('.humberg-menu');
const sidebarMenu = document.querySelector('.sticky-sidebar');

humbergMenu.addEventListener('click', function() {
  sidebarMenu.classList.toggle('active-nav');
});


