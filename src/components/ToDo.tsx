import { useSetRecoilState } from 'recoil';
import { Categories, IToDo, toDoState } from '../atoms';
import styled from "styled-components";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((prev) => {
      // 수정하기 1. 타겟의 경로 찾기 (인덱스 번호로 찾기)
      const targetIndex = prev.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as unknown as IToDo['category'] };
      
      return [...prev.slice(0, targetIndex), newToDo, ...prev.slice(targetIndex + 1)];
    });
  };

  const deleteToDo = () => {
    setToDos((prev) => prev.filter(todo => todo.id !== id));
  }

  return (
    <List>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button onClick={deleteToDo}>Delete</button>
    </List>
  );
}

export default ToDo;

const List = styled.li`
  list-style: none;
  margin: 5px 0 0;
  span {
    margin-right: 10px;
  }
  button {
    margin: 0 0 2px 0;
    background-color: #fff;
    cursor: pointer;
    &:hover {
      background-color: #2f3640;
      color: #9c88ff;
      border: 1px solid #9c88ff;
    }
  }
`