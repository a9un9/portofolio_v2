import { useEffect, useState } from 'react';

const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100; // Speed of typing and deleting
    const currentText = text || ''; // Default to empty string if no text is provided

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }

      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 3000); // Pause for 3 seconds after typing
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, [displayText, isDeleting, text]);

  return (
    <p className="typing-effect">{displayText}</p>
  );
};

export default TypingEffect;
