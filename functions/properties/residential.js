export async function onRequest(context) {
  const url = new URL(context.request.url);
  const assetUrl = new URL('/properties?category=Residential', url.origin);
  return context.env.ASSETS.fetch(assetUrl);
}
