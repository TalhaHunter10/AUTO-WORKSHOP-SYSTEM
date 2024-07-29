const Button = ({ text, onClick, style }) => {
  return (
    <button
      onClick={onClick}
      className={`button font-semibold btext rounded-md ${style}`}
    >
      {text}
    </button>
  );
};

export default Button;
