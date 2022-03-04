import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import { ICategory } from '../../models/ICategory';
import api from '../../services/api';

interface IProps {
  show: boolean;
  onClose: () => void;
}

interface IFormValues {
  name: string;
  preparationTime: number;
  servings: number;
  ingredients: string;
  description: string;
  category: ICategory;
}

const schema = yup.object({
  name: yup.string().required('Name is required'),
  preparationTime: yup
    .number()
    .required('Preparation time is required')
    .min(1, 'Preparation time must be greater than 0'),
  servings: yup
    .number()
    .required('Servings is required')
    .min(1, 'Servings must be greater than 0')
    .max(100, 'Servings must be less than 100'),
  description: yup.string().required('Description is required'),
  ingredients: yup.string().required('Ingredients are required'),
});

const RecipeForm: React.FC<IProps> = ({ show, onClose }: IProps) => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });
  const categoryId = useWatch({ control, name: 'category.id' });

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    await api
      .get('/categories')
      .then((response) => {
        setCategories(response.data);
        if (response.data.lenght > 0) {
          setValue('category.id', response.data[0].id);
        }
      })
      .catch((err) => console.error(err));
  };

  const onSubmit: SubmitHandler<IFormValues> = (data: IFormValues) => {
    if (data.category.id) {
      const categoryName = categories.find((category) => category.id === data.category.id)?.name;
      if (categoryName) {
        data.category.name = categoryName;
      }
    }
    console.log(data);
    onClose();
  };

  return (
    <Modal show={show}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Modal.Title>Add Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <Form.Control type="text" {...field} isInvalid={errors.name !== undefined} />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </>
              )}
            />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Time (m)</Form.Label>
              <Controller
                name="preparationTime"
                control={control}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="number"
                      {...field}
                      isInvalid={errors.preparationTime !== undefined}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.preparationTime?.message}
                    </Form.Control.Feedback>
                  </>
                )}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Servings</Form.Label>
              <Controller
                name="servings"
                control={control}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="number"
                      {...field}
                      isInvalid={errors.servings !== undefined}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.servings?.message}
                    </Form.Control.Feedback>
                  </>
                )}
              />
            </Form.Group>
          </Row>
          {categories.length > 0 && (
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Controller
                name="category.id"
                control={control}
                render={({ field }) => (
                  <Form.Select {...field}>
                    {categories.map((category: ICategory) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                    <option value="">Add new category ...</option>
                  </Form.Select>
                )}
              />
            </Form.Group>
          )}
          {(categoryId === '' || categories.length === 0) && (
            <Form.Group className="mb-3">
              <Form.Label>New Category</Form.Label>
              <Controller
                name="category.name"
                control={control}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="text"
                      {...field}
                      isInvalid={errors.category?.name !== undefined}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.category?.name?.message}
                    </Form.Control.Feedback>
                  </>
                )}
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Form.Control type="text" {...field} />}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ingredients</Form.Label>
            <Controller
              name="ingredients"
              control={control}
              render={({ field }) => <Form.Control as="textarea" rows={3} {...field} />}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RecipeForm;
