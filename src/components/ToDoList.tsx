import { useRecoilState, useRecoilValue } from 'recoil';
import {
  IToDo,
  categories,
  categoryState,
  toDoSelector,
  toDoState,
} from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';
import AddCategory from './AddCategory';
import styled from 'styled-components';

function TodoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const catArr = useRecoilValue(categories);

  const todo = useRecoilValue(toDoState);
  console.log(todo);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as unknown as IToDo['category']);
  };

  return (
    <Wrapper>
      <Title>To Dos</Title>
      <hr />
      <AddCategory />
      <Container>
        <span>Make a To Dos</span>
        <Selector value={category} onInput={onInput}>
          {catArr.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </Selector>
        <CreateToDo />
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Container>
    </Wrapper>
  );
}

export default TodoList;

const Wrapper = styled.div`
  width: 500px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 32px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Selector = styled.select`
  width: 100px;
  margin: 5px;
`