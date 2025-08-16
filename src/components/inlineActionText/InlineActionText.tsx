import type React from "react";

/**
 * InlineActionText displays a line of text with an action button, useful for prompts or inline actions.
 *
 * @component
 *
 * @example
 * <AuthActionText
 *   mainText="Don't have an account?"
 *   buttonText="Sign Up"
 *   buttonAction={() => navigate('/signup')}
 * />
 *
 * @param {Object} props - The component props.
 * @param {string} props.mainText - The main text to display before the button.
 * @param {string} props.buttonText - The text displayed on the action button.
 * @param {() => void} props.buttonAction - Callback function triggered when the button is clicked.
 * @returns {JSX.Element} The rendered component.
 */
interface InlineActionTextProps {
  mainText: string;
  buttonText: string;
  buttonAction: () => void;
}

export const InlineActionText: React.FC<InlineActionTextProps> = ({
  mainText,
  buttonText,
  buttonAction,
}) => {
  return (
    <p className="text-md text-gray-600 flex gap-1 mt-4">
      {mainText}
      <button
        type="button"
        onClick={buttonAction}
        className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
      >
        {buttonText}
      </button>
    </p>
  );
};