import React from "react";

export function Assets({ assets }: Pick<HtmlProps, "assets">) {
  if (!assets) return null;
  return (
    <>
      {assets?.main ? (
        <script type="module" crossOrigin={""} src={assets.main} />
      ) : null}
      {assets?.imports?.map((imp) => (
        <link key={imp} rel="modulepreload" crossOrigin={""} href={imp} />
      ))}
      {assets?.css?.map((css) => (
        <link key={css} rel="stylesheet" crossOrigin={""} href={css} />
      ))}
    </>
  );
}
