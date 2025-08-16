
/**
 * DividerWithText is a horizontal divider with centered text.
 * Useful for visually separating sections in forms or pages.
 *
 * @component
 *
 * @example
 * <DividerWithText text="or" />
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to display in the center of the divider.
 * @returns {JSX.Element} The rendered divider component.
 */

interface DividerWithTextProps {
  text: string;
}

export const DividerWithText: React.FC<DividerWithTextProps> = ({ text }) => {
  return (
    <div className="flex items-center w-80">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="p-3 text-gray-500 text-md">{text}</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  );
};