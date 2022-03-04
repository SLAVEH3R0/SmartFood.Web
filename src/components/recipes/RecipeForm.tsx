import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { ICategory } from '../../models/ICategory';
import api from '../../services/api';

interface IProps {
  show: boolean;
  onClose: () => void;
}

const RecipeForm: React.FC<IProps> = ({ show, onClose }: IProps) => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    await api
      .get('/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Modal show={show}>
      <Form>
        <Modal.Header>
          <Modal.Title>Add Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Time (m)</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Servings</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select>
              <option value="">Choose a category</option>
              {categories.map((category: ICategory) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
              <option>Add new category ...</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Category</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control as="textarea" rows={3} />
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
