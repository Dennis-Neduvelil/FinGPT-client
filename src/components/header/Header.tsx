
/**
 * Header component that displays either a text heading or an image logo.
 *
 * @component
 *
 * @example
 * // Usage with text
 * <Header text="Welcome" />
 *
 * @example
 * // Usage with image
 * <Header src="/assets/logo.png" />
 *
 * @param {Object} props - The component props.
 * @param {string} [props.text] - The heading text to display.
 * @param {string} [props.src] - The image source URL to display as logo.
 * @returns {JSX.Element} The rendered header component.
 */

type HeaderProps =
  | { text: string; src?: never }
  | { src: string; text?: never };

export const Header: React.FC<HeaderProps> = ({ src, text }) => {
  return (
    <div className="mx-4 my-2 cursor-pointer">
      {text ? (
        <h1 className="font-medium text-xl">{text}</h1>
      ) : (
        <img className="h-[30px]" src={src} alt="Header logo" />
      )}
    </div>
  );
};
