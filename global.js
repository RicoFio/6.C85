console.log("IT’S ALIVE!");

let pages = [
	{url: "", title: "Home"},
    {url: "cv/", title: "CV"},
	{url: "projects/", title: "Projects"},
	{url: "contact/", title: "Contact"},
    {url: "https://github.com/ricofio", title: "GitHub"},
];

let nav = document.createElement("nav");
document.body.prepend(nav);

const ARE_WE_HOME = document.documentElement.classList.contains("home");

for (let p of pages) {
	let url = p.url;
	let title = p.title;

    url = !ARE_WE_HOME && !url.startsWith("http") ? "../" + url : url;
    
    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;
    nav.append(a);

    a.classList.toggle("current", a.host === location.host && a.pathname === location.pathname);

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

function setColorScheme(colorScheme) {
    document.documentElement.style.setProperty("color-scheme", colorScheme);
}

select.addEventListener("input", function (event) {
	console.log("color scheme changed to", event.target.value);
    localStorage.colorScheme = event.target.value
    setColorScheme(event.target.value);
});

if ("colorScheme" in localStorage) {
	select.value = localStorage.colorScheme;
	setColorScheme(select.value)
}

let form = document.querySelector('form');

form?.addEventListener("submit", function (event) {
    event.preventDefault()
    let data = new FormData(form);
    for (let [name, value] of data) {
        // TODO build URL parameters here
        //console.log(name, value);
        //console.log(name, encodeURIComponent(value));
        //form.action = 'mailto:smpeter@mit.edu';
        // Start building the URL
        var url = form.action + '?';
        var queryParams = [];
        // Iterate over form elements
        var formElements = form.elements;
        for (var i = 0; i < formElements.length; i++) {
            var element = formElements[i];
            if (element.name && element.value) {
                queryParams.push(encodeURIComponent(element.name) + '=' + encodeURIComponent(element.value));
            }
        }
        // Concatenate all query parameters
        url += queryParams.join('&');

        // Redirect to the constructed URL
        window.location.href = url;

    }
});








