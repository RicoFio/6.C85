console.log("IT’S ALIVE!");

// function $$ (selector, context = document) {
// 	return Array.from(context.querySelectorAll(selector));
// }

// let navLinks = $$('nav a');

// let currentLink = navLinks.find(
// 	a => a.host === location.host && a.pathname === location.pathname
// );
// currentLink?.classList.add('current');

let pages = {
	"": "Home",
	"projects/": "Projects",
	"cv/": "CV",
	"contact/": "Contact",
	"https://github.com/ricofio": "GitHub",
}

let nav = document.createElement('nav');
document.body.prepend(nav);

const ARE_WE_HOME = document.documentElement.classList.contains("home");

for (let url in pages) {
	let title = pages[url];
	url = ARE_WE_HOME || url.startsWith("https") ? url : "../" + url;

	let a = document.createElement('a');
	a.href = url;
	a.textContent = title;
	nav.append(a);

	if (a.host === location.host && a.pathname === location.pathname) {
		a.classList.add('current');
	}
	if (a.host != location.host) {
		a.setAttribute('target', '_blank');
	}
}

document.body.insertAdjacentHTML("afterbegin", `
<label class="color-scheme">
	Theme:
	<select>
		<option value="light dark">Auto</option>
		<option value="light">Light</option>
		<option value="dark">Dark</option>
	</select>
</label>`
);

let select = document.querySelector('select');

if ("colorScheme" in localStorage) {
	select.value = localStorage.colorScheme;
	document.documentElement.style.setProperty("color-scheme", select.value);
}

select.addEventListener("input", function (event) {
	document.documentElement.style.setProperty("color-scheme", event.target.value);
	localStorage.colorScheme = event.target.value;
})
