export default function DarkModeImage({ light, dark, alt }) {
  return (
    <picture>
      <source srcSet={dark} media="(prefers-color-scheme: dark)" />
      <img src={light} alt={alt} />
    </picture>
  );
}
