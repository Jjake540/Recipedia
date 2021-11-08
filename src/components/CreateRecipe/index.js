import React, { useState, useEffect } from 'react';
import {
  addDoc,
  collection,
  Timestamp,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { auth, db } from '../../firebase-config';

function CreateRecipe() {
  const [title, setTitle] = useState('');
  const [readyInMinutes, setReadyInMinutes] = useState(0);
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'recipes'),
      where('uid', '==', auth.currentUser.uid)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let recipesArray = [];
      querySnapshot.forEach((doc) => {
        recipesArray.push({ ...doc.data(), id: doc.id });
      });
      setRecipes(recipesArray);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'recipes'), {
      uid: auth.currentUser.uid,
      title,
      readyInMinutes,
      ingredients,
      instructions,
      createdAt: Timestamp.fromDate(new Date()),
    });
    setTitle('');
    setReadyInMinutes(0);
    setIngredients('');
    setInstructions('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          placeholder='Recipe title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='number'
          name='readyInMinutes'
          id='readyInMinutes'
          value={readyInMinutes}
          placeholder='Total of preparation and cooking time in minutes'
          onChange={(e) => setReadyInMinutes(e.target.value)}
        />
        <input
          type='text'
          name='ingredients'
          id='ingredients'
          value={ingredients}
          placeholder='Ingredients, i.e. chicken, potatoes, etc'
          onChange={(e) => setIngredients(e.target.value)}
        />
        <input
          type='text'
          name='instructions'
          id='instructions'
          value={instructions}
          placeholder='Cooking instructions'
          onChange={(e) => setInstructions(e.target.value)}
        />
        <button>Save</button>
      </form>
      {recipes.map((recipe) => (
        <li key={recipe.id}>{recipe.title}</li>
      ))}
    </div>
  );
}

export default CreateRecipe;
