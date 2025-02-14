function Dropdown({ options, state, setState }) {
  return (
    <select value={state} onChange={(e) => setState(e.target.value)}>
      {options.map((option, index) => (
        <option value={option} key={index}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
