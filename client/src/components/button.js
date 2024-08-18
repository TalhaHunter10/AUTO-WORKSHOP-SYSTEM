const Button = ({ text, onClick, style }) => {
  return (
    <button onClick={onClick} className={`button ${style}`}>
      {text}
    </button>
  );
};

export default Button;
