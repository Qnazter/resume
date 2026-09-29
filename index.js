const root = document.documentElement;
const icon = document.getElementById("theme-icon");

function applyTheme(theme) {
  root.setAttribute("data-bs-theme", theme);
  icon.textContent = theme === "dark" ? "☀︎" : "⏾";
}

let saved = null;
try {
  saved = localStorage.getItem("color-theme");
} catch (e) {}
applyTheme(saved || "dark");

document.getElementById("theme-toggle").addEventListener("click", () => {
  const next = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("color-theme", next);
  } catch (e) {}
});

const typingTitle = document.querySelector("#typing-title span");
const fullTitle = "Hi, I'm Pannarat";
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!reducedMotion) {
  typingTitle.textContent = "";
  const typeTitle = (characterIndex = 0) => {
    typingTitle.textContent = fullTitle.slice(0, characterIndex);

    if (characterIndex < fullTitle.length) {
      window.setTimeout(() => typeTitle(characterIndex + 1), 90);
      return;
    }

    window.setTimeout(eraseTitle, 1600);
  };

  const eraseTitle = (characterIndex = fullTitle.length) => {
    typingTitle.textContent = fullTitle.slice(0, characterIndex);

    if (characterIndex > 0) {
      window.setTimeout(() => eraseTitle(characterIndex - 1), 50);
      return;
    }

    window.setTimeout(typeTitle, 500);
  };

  typeTitle();
}
