export default function (theme: string) {
  const headScript = document.querySelector("#currentTheme");
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = `/css/themes/${theme}.css`;
  link.id = "nextTheme";
  link.onload = () => {
    if (headScript) {
      headScript.remove();
    }
    link.id = "currentTheme";
  };
  document.head.appendChild(link);
  updateFavicon();
}
