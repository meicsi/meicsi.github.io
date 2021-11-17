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

window.addEventListener("load", function (e) {
	swiper = new Swiper(".swiper-container", {
		loop: false,
		pagination: {
			el: ".swiper-pagination",
			type: "bullets",
		},
	});
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

	clickSwipe(swiper);
});

const swipeDown = document.getElementById("swipe-down");
const intro = document.getElementById("intro");
const loader = document.getElementById("loader");
const symbolMoto = document.getElementById("symbol-moto");
const moto = document.querySelector(".moto-container");
const symbol = document.querySelector(".symbol");

var introClicked = false;

function introComplete() {
	nav.style.opacity = 1;
	// Animate nav links
	for (let link of links) {
		link.classList.add("is-active");
	}
	if (window.innerWidth < breakpointSm) {
		navToggle.click();
	}

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
	symbolMoto.classList.add("is-active");
	moto.classList.add("is-active");
	TweenMax.to(symbol, 0.4, {
		autoAlpha: 1,
		ease: Power1.easeInOut,
	});
}

function introScene() {
	setSizes();
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
	if (introClicked == false && introEnabled) {
		introScene();
		introClicked = true;
	}
});

function cursorCallback() {
	document.addEventListener("wheel", function () {
		if (introClicked == false && introEnabled) {
			introScene();
			introClicked = true;
		}
	});
}

document.addEventListener("DOMContentLoaded", function () {
	setTimeout(function () {
		if (introClicked == false && introEnabled) {
			introScene();
			introClicked = true;
		}
	}, 3000);
});

const breakpointSm = 860;
const links = document.querySelectorAll("[data-set]");
const sectionTitle = document.querySelector(".header__section-title");
var scrollReseted = false;
var swiper;
const textsToSplit = document.querySelectorAll(
	"[data-ani='text-reveal'], [data-set='text-reveal'], [data-swipe='text-reveal-on-swipe']"
);
const animations = document.querySelectorAll("[data-ani]");
const introEnabled = true;

window.addEventListener("resize", function () {
	setSizes();
});

// Scroll to top on load
window.onbeforeunload = function () {
	window.scrollTo(0, 0);
};

splitText(textsToSplit);

window.addEventListener("load", function (e) {
	toggleNav();

	toggleServicesText();

	scrollToSection();

	if (introEnabled) {
		document.querySelector(".header__logo-a").style.display = "none";
		logo.classList.remove("is-animating");
		sectionTitle.classList.remove("is-scrolled");
		sectionTitle.style.opacity = 0;
		navToggle.style.opacity = 0;
		navToggle.style.display = "none";
		body.classList.add("no-scroll");
		header.classList.remove("is-scrolled");
		nav.classList.remove("is-scrolled");
		main.style.opacity = 0;
		headerBackdrop.style.opacity = 0;
		backdropClone.style.opacity = 0;
		nav.style.opacity = 0;
		indicator.style.opacity = 0;
		intro.style.display = "block";
		loader.style.display = "block";
		body.style.opacity = "1";

		TweenMax.to(loader, 0.4, {
			autoAlpha: 1,
			ease: Power1.easeInOut,
			onComplete: initCursor,
		});
		symbolMoto.style.display = "block";
	} else {
		// Animate nav links
		for (let link of links) {
			link.classList.add("is-active");
		}
	}

	window.addEventListener("scroll", function () {
		observeSectionsScroll(navLinks);
		observeAnimationsScroll(animations);
		if (window.scrollY > 0 && scrollReseted == false && introEnabled) {
			sectionsScrolled();
		}
		observeFooterScroll(document.querySelector("footer"));
	});
});

function scrollAnimationComplete() {
	sectionTitle.classList.add("is-scrolled");
}

function scrollAnimation() {
	var sa = new TimelineMax();

	sa.to(backdropClone, 0.3, {
		autoAlpha: 1,
		delay: -0.3,
	});
	sa.to(sectionTitle, 0.3, {
		autoAlpha: 1,
		delay: 0.3,
	});
	sa.to(indicator, 0.3, {
		autoAlpha: 1,
		delay: -0.3,
		onComplete: scrollAnimationComplete,
	});
	sa.to(main, 0.3, {
		autoAlpha: 1,
		delay: -0.3,
	});
	sa.to(headerBackdrop, 0, {
		autoAlpha: 1,
		delay: -0.3,
	});
	sa.play();
	header.classList.add("is-scrolled");
	if (window.innerWidth < breakpointSm) {
		navToggle.style.display = "block";
	}

	document.querySelector(".header__logo-a").style.display = "block";
	document.querySelector(".header__logo-b").style.width = "88%";
}

function sectionsScrolled() {
	// main.style.opacity = 1;
	nav.classList.add("is-scrolled");
	symbolMoto.classList.remove("is-active");
	TweenMax.to(symbol, 0.4, {
		autoAlpha: 0,
		ease: Power1.easeInOut,
	});
	logo.classList.add("is-animating");

	// observeAnimationsScroll(animations);
	scrollAnimation();
	scrollReseted = true;
}

const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".header__nav-toggle");
const navLinks = document.getElementsByClassName("nav__link");
const sectionTitleText = document.querySelector(".header__section-title-text");
const sectionTitleIcon = document.querySelector(".header__section-title-icon");
const main = document.getElementsByTagName("main")[0];

function toggleNav() {
	navToggle.addEventListener("click", function (event) {
		this.classList.toggle("is-active");
		nav.classList.toggle("is-active");
		sectionTitle.classList.toggle("is-active");
		sectionTitleText.classList.toggle("is-hidden");
		sectionTitleIcon.classList.toggle("is-hidden");
		document.body.classList.toggle("is-locked");
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

				if (href == "#about") {
					sectionsScrolled();
				}
				sectionsScrolled();
				// If target is expertise reset slider
				if (href == "#expertise") {
					swiper.slideTo(0, 0);
				}
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
					navToggle.classList.remove("is-active");
					sectionTitle.classList.remove("is-active");
					sectionTitleText.classList.remove("is-hidden");
					sectionTitleIcon.classList.remove("is-hidden");
					document.body.classList.remove("is-locked");
				}
				sectionTitleText.querySelector.innerHTML = href.substring(1);
			},
			false
		);
	}
}

const headerBackdrop = document.querySelector(".header__backdrop");
const backdropClone = document.querySelector(".backdrop-clone");
const backdrops = [headerBackdrop, backdropClone];
const logo = document.querySelector(".header__logo");
const indicator = document.querySelector(".nav__indicator");
const body = document.getElementsByTagName("body")[0];

const servicesTexts = document.querySelectorAll(".services-list__text");

function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return rect.top >= 0 && rect.top < window.innerHeight;
}

function switchImage(i) {
	backdrops.forEach(function (backdrop) {
		backdrop
			.querySelectorAll(`.${backdrop.className}-image`)
			.forEach((backdropImage) =>
				backdropImage.classList.remove("is-active")
			);
		backdrop
			.querySelector(`.${backdrop.className}-image--${i}`)
			.classList.add("is-active");
	});
}

function observeSectionsScroll(navLinks) {
	for (let section of dataSections) {
		if (isInViewport(section)) {
			// Set section title
			sectionTitleText.innerHTML = section.id;
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
				navIndicator.style.width = "calc(20% - 40px)";
				switchImage(1);
			} else if (section.id == "services") {
				navIndicator.style.width = "calc(40% - 30px)";
				switchImage(2);
			} else if (section.id == "expertise") {
				navIndicator.style.width = "calc(60% - 10px)";
				switchImage(3);
			} else if (section.id == "careers") {
				navIndicator.style.width = "calc(80% - 10px)";
				switchImage(4);
			} else if (section.id == "contact") {
				navIndicator.style.width = "100%";
				switchImage(5);
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
	for (let servicesText of servicesTexts) {
		if (isInViewport(servicesText)) {
			servicesText.classList.add("is-scrolled");
		} else {
			servicesText.classList.remove("is-scrolled");
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
	for (let section of sections) {
		if (window.innerWidth >= breakpointSm) {
			section.style.minHeight = `${sectionHeight}px`;
		} else {
			section.style.minHeight = `${sectionHeight}px`;
			section.style.height = "auto";
		}
	}

	// backdrop.style.top = `${headerHeight}px`;
	if (scrollReseted === false) {
		// indicator.style.opacity = 0;
		// backdrop.style.opacity = 0;
	}

	if (window.innerWidth < breakpointSm) {
		nav.style.height = `${sectionHeight}px`;
		nav.style.top = `${headerHeight}px`;
	} else {
		nav.style.height = "auto";
		nav.style.top = "auto";
	}
}

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
