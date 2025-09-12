import { useState } from 'react';
import Logo from '../img/PlayCourt.png';
import api from '../api/apis';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData({
          ...formData,
          [name]: value,
        });
    
        setErrors({
          ...errors,
          [name]: '',
        });
    };

    const validate = () => {
        const newErrors = {};
    
        if (!formData.email) {
          newErrors.email = 'Este campo es obligatorio';
        } 
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'El correo no es válido';
        }
    
        if (!formData.password) {
            newErrors.password = 'Este campo es obligatorio';
        } 
    
        return newErrors;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
          
        } else {
            try {
                const client = await api.post('token/', formData);

                sessionStorage.setItem("access_token", client.data.access);
                sessionStorage.setItem("refresh_token", client.data.refresh);

                alert('¡Sesión iniciada!');
                navigate('/');

            } catch (err) { 
                if (err.response) {
                    setServerError(err.response.data.detail)
                    console.log('Error: ' + err.response.data.detail);
                    
                } else {
                    console.log('Error de conexión con el servidor.');
                };
            };
        };
    };

    return(
        <header>
            <section className='bg-login h-[100vh] flex items-center justify-center p-4'>
                <div className="flex flex-col items-center justify-center mx-auto rounded-lg bg-white px-8 py-10 w-full md:w-auto">

                    <img src={Logo} className='h-14 mb-6' alt="NexusCraft" />
                    <h2 className='mb-6 text-2xl font-bold'>Inicio de sesión</h2>

                    <form onSubmit={handleSubmit} className='md:w-80 w-full'>

                        <div className="w-auto">
                            <label className="block text-sm font-medium text-black">Correo Electrónico <b className='text-red-500'>*</b></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`mt-1 focus:border-blue-600 block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="mt-4 w-auto">
                            <label className="block text-sm font-medium text-black">Contraseña <b className='text-red-500'>*</b></label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`mt-1 focus:border-blue-600 block w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                        
                        <p className="text-red-500 text-sm mt-3">{serverError}</p>

                        <div className='flex flex-col justify-center items-center mt-8'>
                            <button type='submit' className='bg-blue-600 hover:bg-blue-700 hover:duration-300 duration-300 hover:scale-[105%] transition hover:transition inline-flex justify-center items-center py-3 px-5 text-sm text-center w-full md:w-72 text-white font-semibold rounded-lg'>Iniciar sesión</button>
                        </div>
                    </form>
                </div>
            </section>
        </header>
    );
};

export default LoginPage;