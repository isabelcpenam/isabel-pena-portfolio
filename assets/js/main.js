



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

var hiddenProjectNumbers = [10, 11, 12, 13, 14, 15];

function isHiddenProjectNumber(projectNumber) {
  return hiddenProjectNumbers.indexOf(projectNumber) !== -1;
}

function getProjectMetadata(projectNumber) {
  if (projectNumber === 1) {
    return {
      title: 'Spirit Bound',
      category: 'Game Design'
    };
  }

  if (projectNumber === 2) {
    return {
      title: 'Podcast Booking Experience',
      category: 'UI/UX Design'
    };
  }

  var lastTwoDigits = projectNumber % 100;
  var suffix = lastTwoDigits >= 11 && lastTwoDigits <= 13
    ? 'th'
    : ({ 1: 'st', 2: 'nd', 3: 'rd' }[projectNumber % 10] || 'th');

  return {
    title: projectNumber + suffix + ' Project',
    category: 'Web Development'
  };
}

function getProjectLabel(projectNumber) {
  return getProjectMetadata(projectNumber).title;
}

function getProjectImage(projectNumber) {
  if (projectNumber === 1) {
    return 'https://pub-dd5b24c34c3b4eed838f8b9eaa2c9873.r2.dev/project-1-v1.webp';
  }

  return 'https://pub-dd5b24c34c3b4eed838f8b9eaa2c9873.r2.dev/project-' + projectNumber + '.webp';
}

document.querySelectorAll('.projects-page .project-slider-box, .project-slider .project-slider-box').forEach(function(card, index) {
  var projectNumber = index + 1;
  if (isHiddenProjectNumber(projectNumber)) {
    card.hidden = true;
    return;
  }

  var projectMetadata = getProjectMetadata(projectNumber);
  var projectTitle = card.querySelector('.project-content h3');
  var projectCategory = card.querySelector('.project-content p');
  var projectImage = card.querySelector('.project-img img');

  if (projectTitle) {
    projectTitle.textContent = projectMetadata.title;
  }

  if (projectCategory) {
    projectCategory.textContent = projectMetadata.category;
  }

  if (projectImage) {
    projectImage.src = getProjectImage(projectNumber);
    projectImage.alt = projectMetadata.title;
  }

  card.querySelectorAll('a[href="project-detail.html"]').forEach(function(link) {
    link.href = 'project-detail.html?project=' + projectNumber;
  });
});

var projectDetailTitle = document.querySelector('#project-detail-title');
if (projectDetailTitle) {
  var requestedProject = Number(new URLSearchParams(window.location.search).get('project'));
  var projectNumber = Number.isInteger(requestedProject) && requestedProject >= 1 && requestedProject <= 15 && !isHiddenProjectNumber(requestedProject)
    ? requestedProject
    : 1;
  var projectMetadata = getProjectMetadata(projectNumber);

  document.title = 'Isabel Pena - ' + projectMetadata.title;
  projectDetailTitle.textContent = projectMetadata.title;
  document.querySelector('#project-detail-name').textContent = projectMetadata.title;

  var projectCategoryLabel = document.querySelector('.project-detail-top.non-spirit-bound-only .project-top-content span');
  if (projectCategoryLabel) {
    projectCategoryLabel.textContent = projectMetadata.category;
  }

  var nonSpiritHeroImage = document.querySelector('.project-details-hero-wrap.non-spirit-bound-only .project-details-hero-img img');
  if (nonSpiritHeroImage) {
    nonSpiritHeroImage.src = getProjectImage(projectNumber);
    nonSpiritHeroImage.alt = projectMetadata.title;
  }

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
      if (candidateProject !== projectNumber && !isHiddenProjectNumber(candidateProject)) {
        availableProjects.push(candidateProject);
      }
    }

    for (var shuffleIndex = availableProjects.length - 1; shuffleIndex > 0; shuffleIndex--) {
      var swapIndex = Math.floor(Math.random() * (shuffleIndex + 1));
      var projectToSwap = availableProjects[shuffleIndex];
      availableProjects[shuffleIndex] = availableProjects[swapIndex];
      availableProjects[swapIndex] = projectToSwap;
    }

    relatedProjectCards.forEach(function(card, index) {
      var relatedProjectNumber = availableProjects[index];
      var relatedProjectMetadata = getProjectMetadata(relatedProjectNumber);
      var projectImage = card.querySelector('.project-img img');

      card.querySelector('.project-content h3').textContent = relatedProjectMetadata.title;
      card.querySelector('.project-content p').textContent = relatedProjectMetadata.category;
      projectImage.src = getProjectImage(relatedProjectNumber);
      projectImage.alt = relatedProjectMetadata.title;

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

