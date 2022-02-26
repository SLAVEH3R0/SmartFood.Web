import React, { useEffect, useState } from 'react';
import { ICategory } from '../../models/ICategory';
import api from '../../services/api';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    api
      .get('/categories')
      .then((response) => setCategories(response.data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>CategoryList</h1>

      {categories.map((category: ICategory) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <p>{category.id}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
