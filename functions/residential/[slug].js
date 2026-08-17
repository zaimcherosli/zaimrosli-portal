export async function onRequest(context) {
  const url = new URL(context.request.url);
  const targetSlug = context.params.slug;
  if (!targetSlug) return Response.redirect(`${url.origin}/properties`, 301);
  return Response.redirect(`${url.origin}/property/${targetSlug}`, 301);
}
