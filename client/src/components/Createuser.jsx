import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Createuser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !age) {
      toast.error('All fields are required');
      return;
    }

    axios.post('mern-authentication-app-chi.vercel.app/user/createuser', { name, email, age })
      .then(() => {
        toast.success('User created successfully');
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    navigate && (
      <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
        <div className='bg-white p-3 rounded w-25 m-5'>
          <h2>Create User</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder='Enter Name'
                name='name'
                value={name}
                className='form-control rounded-0'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="Email">
                <strong>Email</strong>
              </label>
              <input
                type="Email"
                placeholder='Enter Email'
                name='Email'
                value={email}
                className='form-control rounded-0'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="age">
                <strong>Age</strong>
              </label>
              <input
                type="number"
                placeholder='Enter age'
                name='age'
                value={age}
                className='form-control rounded-0'
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <button type='submit' className='btn btn-success w-100'>Add Data</button>
          </form>
        </div>
      </div>
    )
  );
};

export default Createuser;
