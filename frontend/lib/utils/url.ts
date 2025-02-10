export function getURL() {
  const isDevelopment = process.env.NODE_ENV === "development";
  console.log("Environment:", isDevelopment ? "Development" : "Production");

  let url = isDevelopment
    ? process.env.NEXT_PUBLIC_SITE_URL_LOCAL // Development URL
    : process.env.NEXT_PUBLIC_SITE_URL; // Production URL

  console.log("Initial URL:", url);

  // Fallback to localhost if no URL is set
  if (!url) {
    console.log("No URL found, falling back to localhost");
    url = "http://localhost:3000";
  }

  // Make sure to include `https://` when not localhost
  url = url.includes("localhost") ? url : url.replace("http://", "https://");
  console.log("URL after HTTPS check:", url);

  // Make sure to include trailing `/`
  // url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  console.log("Final URL with trailing slash:", url);

  return url;
}

export function getAbsoluteURL(path: string) {
  const baseUrl = getURL();
  const fullUrl = `${baseUrl}${path.startsWith("/") ? path.slice(1) : path}`;
  console.log("Generated absolute URL:", fullUrl);
  return fullUrl;
}
