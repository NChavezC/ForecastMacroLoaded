function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="border border-stone-700 text-stone-700 bg-white px-4 py-2 mx-4 rounded-lg transition duration-300 hover:bg-blue-800 hover:text-white"
    >
      {children}
    </button>
  );
}

export default Button;
