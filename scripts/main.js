const expertise = document.getElementById("expertise");

function clickSwipe(swiper) {
	expertise.addEventListener("click", function (event) {
		swiper.slideNext();
	});
}

// set the starting position of the cursor outside of the screen
let clientX = window.innerWidth / 2;
let clientY = window.innerHeight / 2;
const cursor = document.querySelector(".cursor");

const followCursor = () => {
	// add listener to track the current mouse position
	document.addEventListener("mousemove", (e) => {
		clientX = e.clientX;
		clientY = e.clientY;
		cursor.classList.add("is-transitioning");
	});
	initHovers();
	// TweenMax.to(loader, 0.5, {
	// 	autoAlpha: 0,
	// });
};

const initCursor = () => {
	// transform the cursor to the current mouse position
	// use requestAnimationFrame() for smooth performance
	const render = () => {
		TweenMax.set(cursor, {
			x: clientX,
			y: clientY,
		});

		requestAnimationFrame(render);
	};
	requestAnimationFrame(render);
	cursorCallback();
};

// initCursor();

const initHovers = () => {
	const linkMouseEnter = (e) => {
		cursor.classList.add("is-hovering");
	};

	const linkMouseLeave = () => {
		cursor.classList.remove("is-hovering");
	};

	const expertiseMouseEnter = (e) => {
		cursor.classList.add("is-swiping");
	};

	const expertiseMouseLeave = () => {
		cursor.classList.remove("is-swiping");
	};

	const linkItems = document.querySelectorAll("a");
	linkItems.forEach((item) => {
		item.addEventListener("mouseenter", linkMouseEnter);
		item.addEventListener("mouseleave", linkMouseLeave);
	});

	const expertise = document.getElementById("expertise");
	expertise.addEventListener("mouseenter", expertiseMouseEnter);
	expertise.addEventListener("mouseleave", expertiseMouseLeave);
};

const swipeDown = document.getElementById("swipe-down");
const intro = document.getElementById("intro");
const loader = document.getElementById("loader");
const symbolMoto = document.getElementById("symbol-moto");
const moto = document.querySelector(".moto-container");
const symbol = document.querySelector(".symbol");

var introClicked = false;

function introComplete() {
	let m1r = "moc.isciem@ofni";
	let m2r = "moc.isciem@sreerac";
	let m1 = m1r.split("").reverse().join("");
	let m2 = m2r.split("").reverse().join("");
	let m1E = document.getElementById("m1");
	let m2E = document.getElementById("m2");
	m1E.innerHTML = m1;
	m2E.innerHTML = m2;
	m1E.setAttribute("href", "mailto:" + m1);
	m2E.setAttribute("href", "mailto:" + m2);

	ms = Array.prototype.concat.apply(m1E, m2E);

	splitText(ms);

	document.getElementsByTagName("body")[0].classList.remove("no-scroll");
	scrollToSection();
	symbolMoto.classList.add("is-active");
	for (let link of links) {
		link.classList.add("is-active");
	}
	moto.classList.add("is-active");
	TweenMax.to(symbol, 0.4, {
		autoAlpha: 1,
		ease: Power1.easeInOut,
	});
}

function introScene() {
	var tl = new TimelineMax();

	tl.to(swipeDown, 0.5, {
		x: 0,
		y: "0",
		ease: Power1.easeInOut,
		onComplete: followCursor,
	});

	tl.to(cursor, 0.5, {
		autoAlpha: 1,
		ease: Power1.easeInOut,
		delay: -0.4,
	});

	tl.to(loader, 0.5, {
		color: "white",
		delay: -0.4,
		ease: Power1.easeInOut,
	});

	tl.to(loader, 0.5, {
		autoAlpha: 0,
		delay: -0.2,
		ease: Power1.easeInOut,
	});

	tl.to(swipeDown, 0.5, {
		x: 0,
		y: "100%",
		ease: Power1.easeInOut,
	});

	tl.to(intro, 1, {
		x: 0,
		y: "100%",
		ease: Power1.easeInOut,
		delay: -1,
		onComplete: introComplete,
	});

	tl.play();
}

window.addEventListener("click", function () {
	if (introClicked == false) {
		introScene();
		introClicked = true;
	}
});

function cursorCallback() {
	document.addEventListener("wheel", function () {
		if (introClicked == false) {
			introScene();
			introClicked = true;
		}
	});
}

// import Swiper from "swiper";
// import Swiper styles
// import "swiper/swiper-bundle.css";

const breakpointSm = 768;
const links = document.querySelectorAll("[data-set]");

var scrollReseted = false;

window.addEventListener("resize", function () {
	setSizes();
});

// Scroll to top on load
window.onbeforeunload = function () {
	window.scrollTo(0, 0);
};

const textsToSplit = document.querySelectorAll(
	"[data-ani='text-reveal'], [data-set='text-reveal'], [data-swipe='text-reveal-on-swipe']"
);

splitText(textsToSplit);

window.addEventListener("load", function (e) {
	const swiper = new Swiper(".swiper-container", {
		loop: true,
		pagination: {
			el: ".swiper-pagination",
			type: "bullets",
		},
	});

	setSizes();

	toggleNav();

	toggleServicesText();

	clickSwipe(swiper);

	swiper.on("slideChange", function () {
		let notAnis = swiper.el.querySelectorAll(
			"[data-swipe='text-reveal-on-swipe']"
		);
		for (let notAni of notAnis) {
			notAni.classList.remove("is-active");
		}
		let anis = swiper.slides[swiper.activeIndex].querySelectorAll(
			"[data-swipe='text-reveal-on-swipe']"
		);
		for (let ani of anis) {
			ani.classList.add("is-active");
		}
	});

	TweenMax.to(loader, 0.4, {
		autoAlpha: 1,
		ease: Power1.easeInOut,
		onComplete: initCursor,
	});

	window.addEventListener("scroll", function () {
		observeSectionsScroll(navLinks);
		observeAnimationsScroll(animations);
		if (window.scrollY > 0 && scrollReseted == false) {
			sectionsScrolled();
		}
		observeFooterScroll(document.querySelector("footer"));
	});
});

const animations = document.querySelectorAll("[data-ani]");

function scrollAnimationComplete() {
	header.classList.add("is-scrolled");
}

function scrollAnimation() {
	var sa = new TimelineMax();

	sa.to(headerBackdrop, 0.3, {
		autoAlpha: 1,
	});
	sa.to(backdrop, 0.3, {
		autoAlpha: 1,
		ease: Power1.easeInOut,
		delay: 0.3,
	});
	sa.to(indicator, 0.3, {
		autoAlpha: 1,
		ease: Power1.easeInOut,
		delay: -0.3,
		onComplete: scrollAnimationComplete,
	});
	sa.play();

	document.querySelector(".header__logo-a").style.display = "block";
	document.querySelector(".header__logo-b").style.width = "88%";
}

function sectionsScrolled() {
	nav.classList.add("is-scrolled");
	symbolMoto.classList.remove("is-active");
	TweenMax.to(symbol, 0.4, {
		autoAlpha: 0,
		ease: Power1.easeInOut,
	});
	symbolMoto.classList.add("is-scrolled");
	main.classList.add("is-active");
	body.classList.add("is-active");
	indicator.classList.add("is-active");
	logo.classList.add("is-animating");
	observeAnimationsScroll(animations);
	scrollAnimation();
	scrollReseted = true;
}

const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".header__nav-toggle");
const navLinks = document.getElementsByClassName("nav__link");
const sectionTitle = document.querySelector(".header__section-title-text");
const main = document.getElementsByTagName("main")[0];

function toggleNav() {
	navToggle.addEventListener("click", function (event) {
		this.classList.toggle("is-active");
		nav.classList.toggle("is-active");
	});
}

function scrollToSection() {
	for (let navLink of navLinks) {
		navLink.addEventListener(
			"click",
			function (event) {
				// Prevent default behaviour
				event.preventDefault();
				// Get the anchor
				let href = navLink.getAttribute("href");
				// Get the section
				let section = document.getElementById(href.substring(1));
				// Calculate distance to section
				let sectionDistance =
					window.pageYOffset + section.getBoundingClientRect().top;
				// Scroll window distance to section
				window.scroll({
					top: sectionDistance - headerHeight,
					behavior: "smooth",
				});
				// If mobile
				if (window.innerWidth < breakpointSm) {
					// Hide nav
					nav.classList.remove("is-active");
					navToggle.classList.toggle("is-active");
				}
				sectionTitle.querySelector.innerHTML = href.substring(1);
			},
			false
		);
	}
}

const headerBackdrop = document.querySelector(".header__backdrop");
const logo = document.querySelector(".header__logo");
const indicator = document.querySelector(".nav__indicator");
const body = document.getElementsByTagName("body")[0];

function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return rect.top >= 0 && rect.top < window.innerHeight - 200;
}

function observeSectionsScroll(navLinks) {
	for (let section of dataSections) {
		if (isInViewport(section)) {
			// Set section title
			sectionTitle.innerHTML = section.id;
			// Deactivate all links
			for (let navLink of navLinks) {
				navLink.classList.remove("is-active");
			}
			// Activate selected link
			document
				.querySelector(`a[href*="#${section.id}"]`)
				.classList.add("is-active");

			let navIndicator = document.querySelector(".nav__indicator");

			if (section.id == "about") {
				navIndicator.style.width = "calc(20% - 60px)";
				headerBackdrop
					.querySelectorAll(".header__backdrop-image")
					.forEach((backdrop) =>
						backdrop.classList.remove("is-active")
					);
				headerBackdrop
					.querySelector(".header__backdrop-image--1")
					.classList.add("is-active");
			} else if (section.id == "services") {
				headerBackdrop
					.querySelectorAll(".header__backdrop-image")
					.forEach((backdrop) =>
						backdrop.classList.remove("is-active")
					);
				navIndicator.style.width = "calc(40% - 60px)";
				headerBackdrop
					.querySelector(".header__backdrop-image--2")
					.classList.add("is-active");
			} else if (section.id == "expertise") {
				headerBackdrop
					.querySelectorAll(".header__backdrop-image")
					.forEach((backdrop) =>
						backdrop.classList.remove("is-active")
					);
				navIndicator.style.width = "calc(60% - 60px)";
				headerBackdrop
					.querySelector(".header__backdrop-image--3")
					.classList.add("is-active");
			} else if (section.id == "careers") {
				headerBackdrop
					.querySelectorAll(".header__backdrop-image")
					.forEach((backdrop) =>
						backdrop.classList.remove("is-active")
					);
				navIndicator.style.width = "calc(80% - 60px)";
				headerBackdrop
					.querySelector(".header__backdrop-image--4")
					.classList.add("is-active");
			} else if (section.id == "contact") {
				headerBackdrop
					.querySelectorAll(".header__backdrop-image")
					.forEach((backdrop) =>
						backdrop.classList.remove("is-active")
					);
				navIndicator.style.width = "calc(100% - 60px)";
				headerBackdrop
					.querySelector(".header__backdrop-image--5")
					.classList.add("is-active");
			}
		}
	}
}

function observeAnimationsScroll(animations) {
	for (let animation of animations) {
		if (isInViewport(animation)) {
			animation.classList.add("is-active");
		} else {
			animation.classList.remove("is-active");
		}
	}
}

function observeFooterScroll(footer) {
	const footerRect = footer.getBoundingClientRect();
	if (footerRect.top < window.innerHeight) {
		footer.classList.add("is-scrolled");
	} else {
		footer.classList.remove("is-scrolled");
	}
}

function toggleServicesText() {
	const servicesListIcons = document.getElementsByClassName(
		"services-list__item"
	);

	for (let servicesListIcon of servicesListIcons) {
		servicesListIcon.addEventListener("mouseover", function (event) {
			for (let servicesListIcon of servicesListIcons) {
				servicesListIcon
					.querySelector(".services-list__text")
					.classList.remove("is-active");
			}
			if (window.innerWidth >= breakpointSm) {
				this.querySelector(".services-list__text").classList.add(
					"is-active"
				);
				document
					.querySelectorAll(".icon-animation")
					.forEach(function (animation) {
						animation.classList.remove("is-animating");
					});
			}
		});
		servicesListIcon.addEventListener("mouseout", function (event) {
			if (window.innerWidth >= breakpointSm) {
				this.querySelector(".services-list__text").classList.remove(
					"is-active"
				);
				document
					.querySelectorAll(".icon-animation")
					.forEach(function (animation) {
						animation.classList.add("is-animating");
					});
			}
		});
	}
}

const header = document.getElementsByTagName("header")[0];
const sections = document.getElementsByTagName("section");
const dataSections = document.querySelectorAll("[data-section]");
const backdrop = document.querySelector(".backdrop");
var windowHeight;
var headerHeight;
var sectionHeight;

function setSizes() {
	windowHeight = window.innerHeight;
	headerHeight = header.offsetHeight;
	sectionHeight = windowHeight - headerHeight;

	backdrop.style.top = `${headerHeight}px`;
	if (scrollReseted === false) {
		indicator.style.opacity = 0;
		backdrop.style.opacity = 0;
	}

	for (let section of sections) {
		if (window.innerWidth >= breakpointSm) {
			// section.style.minHeight = "auto";
			// section.style.height = "100%";
			section.style.minHeight = `${sectionHeight}px`;
		} else {
			section.style.minHeight = `${sectionHeight}px`;
			section.style.height = "auto";
		}
		// section.style.top = `${headerHeight}px`;
	}
	if (window.innerWidth < breakpointSm) {
		nav.style.height = `${sectionHeight}px`;
		nav.style.top = `${headerHeight - 68}px`;
	} else {
		nav.style.height = "auto";
		nav.style.top = "auto";
	}
}

function setNavHeight() {}

function splitText(texts) {
	for (let text of texts) {
		let splitText = text.innerHTML.replace(
			/([^\s()[\]{}"]+)/g,
			"<span><span>$1</span></span>"
		);
		text.innerHTML = splitText.replace(
			"<span><span><br></span></span>",
			"<br>"
		);
	}
}
