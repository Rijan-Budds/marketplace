import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (formData.password !== formData.confirmPassword) {
          setErrorMessage('Passwords do not match.');
          setSuccessMessage('');
          return;
        }
      
        try {
          const res = await fetch("http://localhost:3001/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password
            }),
          });
      
          const data = await res.json();
      
          if (res.ok) {
            setSuccessMessage(data.message);
            setErrorMessage('');
            setTimeout(() => {
              navigate("/login");
            }, 1000);
          } else {
            setErrorMessage(data.message);
            setSuccessMessage('');
          }
        } catch (err) {
          setErrorMessage("Something went wrong");
          setSuccessMessage('');
        }
      };
      

    return (
        <form className='form-container' onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    id='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id='password'
                    name='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input 
                    type="password"
                    id='confirmPassword' 
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>

            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            {successMessage && <p className='success-message'>{successMessage}</p>}

            <button type='submit' className='submit-button'>Register</button>
            <button type="button" onClick={() => navigate("/login")}>Already have an account?</button>
        </form>
    );
}
