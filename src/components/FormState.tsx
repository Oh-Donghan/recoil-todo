import { useForm } from 'react-hook-form';
import styled from 'styled-components';

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

// React Hook Form을 사용한 경우
function FormState() {
  const {
    // input 등록하기
    register,
    handleSubmit,
    // formState에서 에러객체 가져오기
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: '@naver.com',
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        'password1',
        { message: 'Password are not the same.' },
        { shouldFocus: true }
      );
    }
    // setError('extraError', { message: 'Server offline.' });
  };
  console.log(errors);

  return (
    <div>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: 'Only naver.com emails allowed',
            },
          })}
          placeholder='Email'
        />
        <span>{errors.email?.message}</span>
        <input
          {...register('firstName', {
            required: 'write here',
            validate: {
              noNico: (value) =>
                value.includes('nico') ? 'no nicos allowed' : true,
              noNick: (value) =>
                value.includes('nick') ? 'no nicks allowed' : true,
            },
          })}
          placeholder='First Name'
        />
        <span>{errors.firstName?.message}</span>
        <input
          {...register('lastName', { required: 'write here' })}
          placeholder='Last Name'
        />
        <span>{errors.lastName?.message}</span>
        <input
          {...register('username', { required: 'write here', minLength: 10 })}
          placeholder='Username'
        />
        <span>{errors.username?.message}</span>
        <input
          {...register('password', { required: 'write here', minLength: 5 })}
          placeholder='Password'
        />
        <span>{errors.password?.message}</span>
        <input
          {...register('password1', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Your password is too short.',
            },
          })}
          placeholder='Password1'
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </Form>
    </div>
  );
}

export default FormState;

const Form = styled.form`
  margin: 70px auto 0;
  max-width: 380px;
  display: flex;
  flex-direction: column;
`;

// React Hook Form 을 사용하지 않은경우 (로그인 형식을 만들려면 더많은 input과 state가 필요하다)
// export default function TodoList() {
//   const [toDo, setToDo] = useState('');
//   const [toDoError, setToDoError] = useState('');
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDoError('');
//     setToDo(value);
//   };

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoError('To do should be longer');
//       }
//     console.log('submit');
//   }

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder='Write a to do' />
//         <button>Add</button>
//         {' '}{toDoError !== '' ? toDoError : null}
//       </form>
//     </div>
//   );
// }
