
declare global {
  type PageProps = ThemeStaticDataReturn<
    ValidRoute,
    {
      title: true;
      description: true;
      url: true;
      contentType: true;
      published: true;
      updated: true;
      category: true;
      tags: true;
      twitter: true;
      image: true;
      favicons: true;
      pathInfo: ["theme"];
    }
  >;
}
export { };

