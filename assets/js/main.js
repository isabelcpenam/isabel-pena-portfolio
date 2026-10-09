



// Project Slider
var projectSlider = document.querySelector(".project-slider");
var swiper = projectSlider ? new Swiper(projectSlider, {
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
}) : null;



// Testimonial
var testimonialSlider = document.querySelector(".testimonial-slider");
var swiper2 = testimonialSlider ? new Swiper(testimonialSlider, {
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
}) : null;


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

  if (projectNumber === 3) {
    return {
      title: 'Swimwear Website Concept',
      category: 'Web Design'
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

function getProjectThumbnail(projectNumber) {
  if (projectNumber === 2) {
    return 'https://pub-dd5b24c34c3b4eed838f8b9eaa2c9873.r2.dev/2v2-project-2.webp';
  }

  if (projectNumber === 3) {
    return 'https://pub-dd5b24c34c3b4eed838f8b9eaa2c9873.r2.dev/v3project-3.webp';
  }

  return getProjectImage(projectNumber);
}

document.querySelectorAll('.projects-page .project-slider-box, .project-slider .project-slider-box').forEach(function(card, index) {
  var projectNumber = index + 1;
  if (projectNumber > 9) {
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
    projectImage.src = getProjectThumbnail(projectNumber);
    projectImage.alt = projectMetadata.title;
  }

  card.querySelectorAll('a[href="project-detail.html"]').forEach(function(link) {
    link.href = 'project-detail.html?project=' + projectNumber;
  });
});

document.querySelectorAll('.project-slider .swiper-slide').forEach(function(slide) {
  var slideCards = slide.querySelectorAll('.project-slider-box');
  slide.hidden = Array.prototype.every.call(slideCards, function(card) {
    return card.hidden;
  });
});

if (swiper) {
  swiper.update();
}

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

  document.querySelectorAll('.project-two-only').forEach(function(content) {
    content.hidden = projectNumber !== 2;
  });
  document.querySelectorAll('.project-three-only').forEach(function(content) {
    content.hidden = projectNumber !== 3;
  });
  document.querySelectorAll('.placeholder-default-only').forEach(function(content) {
    content.hidden = projectNumber === 2;
  });

  var nonSpiritHeroImage = document.querySelector('.project-details-hero-wrap.non-spirit-bound-only .project-details-hero-img img');
  if (nonSpiritHeroImage) {
    nonSpiritHeroImage.src = getProjectImage(projectNumber);
    nonSpiritHeroImage.alt = projectMetadata.title;
    nonSpiritHeroImage.hidden = projectNumber === 2;
  }

  var podcastHeroVideoPair = document.querySelector('.podcast-hero-video-pair');
  if (podcastHeroVideoPair) {
    podcastHeroVideoPair.hidden = projectNumber !== 2;
  }

  var swimwearSiteScreen = document.querySelector('.swimwear-site-screen');
  var swimwearSiteFrame = swimwearSiteScreen && swimwearSiteScreen.querySelector('iframe');
  if (swimwearSiteScreen && swimwearSiteFrame) {
    var swimwearSiteDocument = swimwearSiteScreen.querySelector('.swimwear-site-document');
    var fitSwimwearSite = function() {
      var frameDocument = swimwearSiteFrame.contentDocument;
      if (!frameDocument || !frameDocument.documentElement || !swimwearSiteScreen.clientWidth) {
        return;
      }

      var frameWidth = 1200;
      var scale = Math.min(1, swimwearSiteScreen.clientWidth / frameWidth);
      var contentHeight = Math.max(
        frameDocument.documentElement.scrollHeight,
        frameDocument.body ? frameDocument.body.scrollHeight : 0
      );

      frameDocument.documentElement.style.overflowX = 'hidden';
      swimwearSiteFrame.style.width = frameWidth + 'px';
      swimwearSiteFrame.style.height = contentHeight + 'px';
      swimwearSiteFrame.style.transform = 'scale(' + scale + ')';
      swimwearSiteDocument.style.height = contentHeight * scale + 'px';
    };

    swimwearSiteFrame.addEventListener('load', fitSwimwearSite);
    new ResizeObserver(fitSwimwearSite).observe(swimwearSiteScreen);
    if (swimwearSiteFrame.contentDocument.readyState === 'complete') {
      fitSwimwearSite();
    }
  }

  document.querySelectorAll('.spirit-bound-only').forEach(function(section) {
    section.hidden = projectNumber !== 1;
  });
  document.querySelectorAll('.non-spirit-bound-only').forEach(function(section) {
    section.hidden = projectNumber === 1;
  });
  document.querySelectorAll('.project-two-only').forEach(function(content) {
    content.hidden = projectNumber !== 2;
  });
  document.querySelectorAll('.placeholder-default-only').forEach(function(content) {
    content.hidden = projectNumber === 2;
  });

  var relatedProjectCards = document.querySelectorAll('.project-detail-page .project-area .project-col-3 .project-slider-box');
  if (relatedProjectCards.length) {
    var availableProjects = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      .filter(function(candidateProject) {
        return candidateProject !== projectNumber;
      });

    for (var shuffleIndex = availableProjects.length - 1; shuffleIndex > 0; shuffleIndex--) {
      var swapIndex = Math.floor(Math.random() * (shuffleIndex + 1));
      var projectToSwap = availableProjects[shuffleIndex];
      availableProjects[shuffleIndex] = availableProjects[swapIndex];
      availableProjects[swapIndex] = projectToSwap;
    }

    relatedProjectCards.forEach(function(card, index) {
      var relatedProjectNumber = availableProjects[index];
      if (relatedProjectNumber === undefined) {
        card.hidden = true;
        return;
      }

      card.hidden = false;
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
