import React from 'react'

const Register = () => {
  return (
    <>
        <h1>Registro</h1>
        <form>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Registrarse</button>
        </form>
    </>
  )
}

export default Register;
