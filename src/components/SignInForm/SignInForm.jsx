import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { signIn } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';

import styles from '../../css-styling/sign-in.module.css'

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/cocktails');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className={styles.signinPage}>
    <div className={styles.scrollableWrapper}>
      <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Sign In</h1>
      <p className={styles.formTitle}>{message}</p>
      <form autoComplete='off' onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
          <label className={styles.label} htmlFor='email'>Username:</label>
          <input                
            className={styles.input} 
            type='text'
            autoComplete='off'
            id='username'
            value={formData.username}
            name='username'
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
        <label className={styles.label} htmlFor='password'>Password:</label>
          <input
            className={styles.input} 
            type='password'
            autoComplete='off'
            id='password'
            value={formData.password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button className={styles.addButton}>Sign In</button>
          <button className={styles.submitButton} onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
      </div>
    </div>
    </main>
  );
};

export default SignInForm;
