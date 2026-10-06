



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

  document.title = 'Isabel Pena - ' + projectLabel;
  projectDetailTitle.textContent = projectLabel;
  document.querySelector('#project-detail-name').textContent = projectLabel;

  document.querySelectorAll('.spirit-bound-only').forEach(function(section) {
    section.hidden = projectNumber !== 1;
  });
  document.querySelectorAll('.non-spirit-bound-only').forEach(function(section) {
    section.hidden = projectNumber === 1;
  });

  var relatedProjectCards = document.querySelectorAll('.project-detail-page .project-area .project-col-3 .project-slider-box');
  if (relatedProjectCards.length) {
    var availableProjects = [];
    for (var candidateProject = 1; candidateProject <= 15; candidateProject++) {
      if (candidateProject !== projectNumber) {
        availableProjects.push(candidateProject);
      }
    }

    for (var shuffleIndex = availableProjects.length - 1; shuffleIndex > 0; shuffleIndex--) {
      var swapIndex = Math.floor(Math.random() * (shuffleIndex + 1));
      var projectToSwap = availableProjects[shuffleIndex];
      availableProjects[shuffleIndex] = availableProjects[swapIndex];
      availableProjects[swapIndex] = projectToSwap;
    }

    var projectCategories = [
      'Game Design', 'Web Development', 'Brand Marketing', 'SEO', 'Social Media',
      'Robotic Automation', 'Ux Design', 'Web Development', 'Brand Marketing',
      'SEO', 'Social Media', 'Robotic Automation', 'Ux Design', 'Web Development',
      'Brand Marketing'
    ];

    relatedProjectCards.forEach(function(card, index) {
      var relatedProjectNumber = availableProjects[index];
      var relatedProjectLabel = getProjectLabel(relatedProjectNumber);
      var projectImage = card.querySelector('.project-img img');

      card.querySelector('.project-content h3').textContent = relatedProjectLabel;
      card.querySelector('.project-content p').textContent = projectCategories[relatedProjectNumber - 1];
      projectImage.src = 'https://pub-dd5b24c34c3b4eed838f8b9eaa2c9873.r2.dev/project-' + relatedProjectNumber + '.webp';
      projectImage.alt = relatedProjectLabel;

      card.querySelectorAll('a').forEach(function(link) {
        link.href = 'project-detail.html?project=' + relatedProjectNumber;
      });
    });
  }
}

const humbergMenu = document.querySelector('.humberg-menu');
const sidebarMenu = document.querySelector('.sticky-sidebar');

humbergMenu.addEventListener('click', function() {
  sidebarMenu.classList.toggle('active-nav');
});

