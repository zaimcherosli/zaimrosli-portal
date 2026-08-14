export async function onRequest(context) {
  const url = new URL(context.request.url);
  const assetUrl = new URL('/properties.html', url.origin);
  return context.env.ASSETS.fetch(assetUrl);
}
