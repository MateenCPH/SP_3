function MealInstructions({ instructions }) {
  if (!instructions) {
    return <p className="text-base">No instructions found</p>;
  }

  const steps = instructions.split(/(?=\d+\.\s)/).filter(Boolean);

  return (
    <div>
      <ol>
        {steps.map((step, index) => (
          <li key={index} className="text-base">
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default MealInstructions;
