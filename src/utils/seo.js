export function setSEO(title) {
  document.title = `${title} | Dream Mode`;

  const meta = document.querySelector("meta[name='description']");

  if (meta) {
    meta.setAttribute(
      "content",
      "Dream Mode - Premium AI E-Commerce Platform"
    );
  }
}
