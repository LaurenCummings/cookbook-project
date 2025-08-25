import { useState } from "react";

const CreatePage = () => {
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
  });
  return <div>CreatePage</div>;
};

export default CreatePage;
