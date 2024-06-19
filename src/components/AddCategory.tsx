import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { categories } from '../atoms';
import styled from 'styled-components';

interface IForm {
  newCategory: string;
}

export default function AddCategory() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [category, setCategory] = useRecoilState(categories);

  const onValid = ({ newCategory }: IForm) => {
    setCategory([...category, newCategory]);
    setValue('newCategory', '');
  };

  return (
    <Wrapper>
      <span>Create a new Category</span>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          placeholder='Add new category'
          {...register('newCategory', { required: true })}
        />
        <button>Add</button>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 10px;
`

const Form = styled.form`
  margin: 5px;
`;
