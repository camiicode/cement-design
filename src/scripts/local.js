document.addEventListener("DOMContentLoaded", () => {
				
  const BASE_URL = "https://cement-design.doodrix.com/";
  const PREFIX_RE = /^\/(?:Wweb|shop)(?:\/|$)/;

  const fixPath = (p) => {
    if(!p) return p;
    if (PREFIX_RE.test(p)) {
      return BASE_URL.replace(/\/&/, '') + '/' + p.replace(/^\/+/, '');
    }
    return p;
  };

  // Specify any type of element, pls include in final script this path
  const replaceCssUrls = (text) => {
    return text.replace(/url\((['"]?)(\/(?:web|shop)[^'")]+)\1\)/g, (m, q, path) => {
      return `url(${q}${fixPath(path)}${q})`;
    });
  };

  const fixAttributes = (el) => {

    // Src
    if (el.hasAttribute && el.hasAttribute('src')) {
      const v = el.getAttribute('src');
      if (v && PREFIX_RE.test(v)) el.setAttribute('src', fixPath(v));
    }

    // Href
    if (el.hasAttribute && el.hasAttribute('href')) {
      const v = el.getAttribute('href');
      if (v && PREFIX_RE.test(v)) el.setAttribute('href', fixPath(v));
    }

    // srcset
    if (el.hasAttribute && el.hasAttribute('srcset')) {
      const v = el.getAttribute('srcset');
      if (v) {
        const newVal = v.split(',')
        .map(part => {
          part = part.trim();

          // Replace just that URL's thatinitialize with "/web" or "/shop"
          return part.replace(/^(\/(?:web|shop)[^\s,]+)/, m => fixPath(m));
        })

        .join(', ');
        if (newVal !== v) el.setAttribute('srcset', newVal);
      }
    }

  }
  
});