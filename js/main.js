'use strict';

// ------------------------------------------------------- VARIABLES //

// SECTIONS // 

let $body; 
let $intro;

let $heroSection;
let $heroSectionLi;

let $aboutMeSection;
let $image;

let $bioSection;

let $skillsSection;
let $skillsContentPercent;

let $contactSection;

// HEADINGS //

let $aboutMeSectionHeading;
let $bioSectionHeading;
let $skillsSectionHeading;
let $contactSectionHeading;

// NAV // 

let $navBar;
let $navA;
let $navBarUl;
let $burgerMenuButton;

// MENU - LINKS //

let $aboutMeA;
let $bioA;
let $skillsA;
let $contactA;

// SPANS //

let $introSpan;
let $descriptionSpan;
let $skillsSectionSpan;

// ELEMENTS - CHANGES ON SCROLL // 

let $elementChangePositionAboutMeSection;
let $elementChangePositionBioSection;
let $elementChangePositionSkillsSection;
let $scrollFollower;


// ------------------------------------------------------- INITIALIZE FUNCTIONS //

const initialize = () => {
    prepareDomElements();
    prepareDomEvents();
};

// ------------------------------------------------------- PREPARE DOM ELEMENTS //

const prepareDomElements = () => { 
    // SECTIONS // 

    $body = document.querySelector('body');
    $intro = document.querySelector('.intro');

    $heroSection = document.querySelector('.heroSection');
    $heroSectionLi = document.querySelectorAll('.heroSection__li');

    $aboutMeSection = document.querySelector('.aboutMeSection');
    $image = document.querySelector('.image');

    $bioSection = document.querySelector('.bioSection');

    $skillsSection = document.querySelector('.skillsSection');
    $skillsContentPercent = document.querySelectorAll('.skillsContent__div--percent');

    $contactSection = document.querySelector('.contactSection');

    // HEADINGS //

    $aboutMeSectionHeading = document.querySelector('.aboutMeSection__heading');
    $bioSectionHeading = document.querySelector('.bioSection__heading');
    $skillsSectionHeading = document.querySelector('.skillsSection__heading');
    $contactSectionHeading = document.querySelector('.contactSection__heading');

    // NAV // 

    $navBar = document.querySelector('.nav');
    $navA = document.querySelectorAll('.nav__a');
    $navBarUl = document.querySelector('.nav__ul');
    $burgerMenuButton = document.querySelector('.burgerMenuBtn');

    // MENU - LINKS //

    $aboutMeA = document.querySelector('.aboutMeA');
    $bioA = document.querySelector('.bioA');
    $skillsA = document.querySelector('.skillsA');
    $contactA = document.querySelector('.contactA');

    // SPANS //

    $introSpan = document.querySelector('.intro__span');
    $descriptionSpan = document.querySelector('.description__span');
    $skillsSectionSpan = document.querySelectorAll('.skillsSection__span');

    // ELEMENTS - CHANGES ON SCROLL // 

    $elementChangePositionAboutMeSection = document.querySelectorAll('.elementChangePosition--aboutMeSection');
    $elementChangePositionBioSection = document.querySelectorAll('.elementChangePosition--bioSection');
    $elementChangePositionSkillsSection = document.querySelectorAll('.elementChangePosition--skillsSection');
    $scrollFollower = document.querySelector('.scrollFollower');
    
};

// ------------------------------------------------------- PREPARE DOM EVENTS //

const prepareDomEvents = () => {
    window.addEventListener('scroll', () => {
        changeHeadingStyle($heroSection, $aboutMeSectionHeading);
        changeHeadingStyle($aboutMeSection, $bioSectionHeading);
        changeHeadingStyle($bioSection, $skillsSectionHeading);
        changeHeadingStyle($skillsSection, $contactSectionHeading);
        changePercentSkillsWidth($skillsSectionHeading, $skillsContentPercent);
        changeNavBarPadding($navBar);
        changeNavBarButtonColor($aboutMeSectionHeading, $aboutMeA, $aboutMeSection);
        changeNavBarButtonColor($bioSectionHeading, $bioA, $bioSection);
        changeNavBarButtonColor($skillsSectionHeading, $skillsA, $skillsSection);
        changeNavBarButtonColor($contactSectionHeading, $contactA, $contactSection);
        changeSpanColor($aboutMeSectionHeading, $descriptionSpan);
        changeImageWidth($aboutMeSectionHeading, $image);
        changeElementVerticalPosition($aboutMeSection, $elementChangePositionAboutMeSection);
        changeElementVerticalPosition($bioSection, $elementChangePositionBioSection);
        changeElementVerticalPosition($skillsSection, $elementChangePositionSkillsSection);
        changeElementHorizontalFromRightPosition($aboutMeSectionHeading, $elementChangePositionAboutMeSection);
        changeElementHorizontalFromLefttPosition($bioSectionHeading, $elementChangePositionBioSection);
        scrollFollowing($scrollFollower, $body);
    });

    window.addEventListener('mouseover', () => {
        introAnimation($heroSectionLi, $introSpan);
        $intro.style.zIndex = '0';
    });

    $intro.addEventListener('touchstart', () => {
        introAnimation($heroSectionLi, $introSpan);
        $intro.style.zIndex = '0';
    });

    $burgerMenuButton.addEventListener('click', () => {
        burgerMenuAnimation($navBarUl, $burgerMenuButton);
    });
    
    $navA.forEach((e) => {
        e.addEventListener('click', () => {
            burgerMenuButtonLiAnimation($navBarUl, $burgerMenuButton);
        });
    });
    
    window.addEventListener('resize', () => {
        if(window.innerWidth >= 992) {
            burgerMenuAnimationWindowResize($navBarUl, $burgerMenuButton);
        };
    });
};

// ------------------------------------------------------- FUNCTIONS //

const changeHeadingStyle = (section, heading) => {
    if(section.getBoundingClientRect().top < 0) {
        heading.style.height = `${section.getBoundingClientRect().top*-1/2}px`;
        heading.style.top = `${section.getBoundingClientRect().top*1/2}px`;
    } else {
        heading.style.height = '0';     
        heading.style.top = '0';     
    };
    
    if(heading.getBoundingClientRect().top < 72) {
        heading.style.backgroundColor = '#FF69B4';
        heading.style.color = '#F9F9F9';
    } else {
        heading.style.backgroundColor = '#323330';
        heading.style.color = '#FF69B4';
    };

    if(heading.offsetHeight > 20) {
        heading.style.zIndex = '1';
        heading.style.textShadow = '.2rem .2rem rgb(150, 54, 97)';
    } else {
        heading.style.zIndex = '-1';
        heading.style.textShadow = '.2rem .2rem transparent';
    }
};

const changePercentSkillsWidth = (heading, percent) => {
    if(heading.getBoundingClientRect().top < 72) {
        percent.forEach(e => {
            e.style.width = e.dataset.percent;
        });
    } else {
        percent.forEach(e => {
            e.style.width = '10%';
        });
    };
};

const changeNavBarPadding = (nav) => {
    if(window.pageYOffset > 72) {
        nav.style.padding = '1rem 2rem';
    } else {
        nav.style.padding = '2rem 2rem';
    };
};

const changeNavBarButtonColor = (heading, navA, section) => {
    if(heading.getBoundingClientRect().top <= 72 && section.getBoundingClientRect().bottom > 150) {
        navA.classList.add('sectionActive');   
    } else { 
        navA.classList.remove('sectionActive');   
    };
};

const changeSpanColor = (heading, span) => {
    if(heading.getBoundingClientRect().top < 72) {
        span.style.color = '#F0DB4F';
    };
};

const changeImageWidth = (heading, image) => {
    if(heading.getBoundingClientRect().top < 72) {
        image.style.width = '100%';
    } else {
        image.style.width = '0';
    };
};

const changeElementVerticalPosition = (section, element) => { 
    if(section.getBoundingClientRect().top < -250) {
        element.forEach((e) => {
            e.style.top = `${section.getBoundingClientRect().top/2}%`;
        });
    } else {
        element.forEach((e) => {
            e.style.top = '50%';
        });
    };
};

const changeElementHorizontalFromRightPosition = (heading, element) => { 
    if(heading.getBoundingClientRect().top < 72) {
        element.forEach((e) => {
            e.style.left = '50%';
        });
    } else {
        element.forEach((e) => {
            e.style.left = '150%';
        });
    };
};

const changeElementHorizontalFromLefttPosition = (heading, element) => { 
    if(heading.getBoundingClientRect().top < 72) {
        element.forEach((e) => {
            e.style.left = '50%';
        });
    } else {
        element.forEach((e) => {
            e.style.left = '-150%';
        });
    };
};

const introAnimation = (heroSectionLi, heroSectionSpan) => { 
    heroSectionLi.forEach((e) => {
        e.style.width = '100%';
        e.style.color = '#F9F9F9';
        e.style.textShadow = '2px 2px rgb(150, 54, 97)';
    });

    heroSectionSpan.style.color = '#F0DB4F';
};

const burgerMenuAnimation = (navBarUl, burgerMenuButton) => {
    navBarUl.classList.toggle('burgerMenuActive');
    burgerMenuButton.classList.toggle('burgerMenuBtn--active');
};

const burgerMenuButtonLiAnimation = (navBarUl, burgerMenuButton) => {
    navBarUl.classList.remove('burgerMenuActive');
    navBarUl.classList.add('burgerMenuNonActive');
    burgerMenuButton.classList.remove('burgerMenuBtn--active');
};

const burgerMenuAnimationWindowResize = (navBarUl, burgerMenuButton) => {
    navBarUl.classList.remove('burgerMenuActive');
    navBarUl.classList.add('burgerMenuNonActive');
    burgerMenuButton.classList.remove('burgerMenuBtn--active');
};

const scrollFollowing = (scrollFollower, body) => {
    let width = body.offsetWidth;
    let height = body.offsetHeight;
    let offset = window.pageYOffset;
    let percentH = (offset * 100 / height);
    scrollFollower.style.width = `${percentH * 1.45}%`;
    
    if(scrollFollower.offsetWidth < width / 4) {
        scrollFollower.style.backgroundColor = '#F9F9F9';
        scrollFollower.style.boxShadow = '2px 2px rgb(150, 54, 97)';
    } else if(scrollFollower.offsetWidth < width / 2) {
        scrollFollower.style.backgroundColor = '#F0DB4F';
        scrollFollower.style.boxShadow = '2px 2px rgb(150, 54, 97)';
    } else if(scrollFollower.offsetWidth < width) {
        scrollFollower.style.backgroundColor = '#323330';
        scrollFollower.style.boxShadow = '2px 2px rgb(150, 54, 97)';
    } else {
        scrollFollower.style.backgroundColor = '#FF69B4';
        scrollFollower.style.boxShadow = '2px 2px transparent';
    }
};

// ------------------------------------------------------- DOM CONTENT LOADED //

document.addEventListener('DOMContentLoaded', initialize);

// ------------------------------------------------------- COLORS PALETTE //

/*

#F0DB4F = $yellow;
#323330 = $grey;
#FF69B4 = $pink;
#F9F9F9 = $white;

*/