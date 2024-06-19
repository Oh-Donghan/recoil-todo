import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from '../atoms';
import styled from "styled-components";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((prev) => [
      { text: toDo, id: Date.now(), category: category },
      ...prev,
    ]);
    // 제출후 input창 비우기 (인풋창 이름, 값)
    setValue('toDo', '');
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register('toDo', {
            required: 'Please write a to do',
          })}
          placeholder='Write a to do'
        />
        <button>Add</button>
      </form>
    </Wrapper>
  );
}

export default CreateToDo;

const Wrapper = styled.div`
  
`

/*
  useRecoilState는 useRecoilValue(atom을 불러올때)와 useSetRecoilState(atom을 수정할때)를 합친것이다
  const [toDos, setToDos] = useRecoilState(toDoState);
  const value = useRecoilValue(toDoState);
  const modFn = useSetRecoilState(toDoState);
*/
