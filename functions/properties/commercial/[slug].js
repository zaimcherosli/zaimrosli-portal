export async function onRequest(context) {
  const url = new URL(context.request.url);
  const assetUrl = new URL('/property-detail.html', url.origin);
  return context.env.ASSETS.fetch(assetUrl);
}
