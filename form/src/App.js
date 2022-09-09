import "./App.css";
import { Formik } from "formik";
import { useState } from "react";

function App() {
  const [inpName, setInpName]= useState("inpNormal")
  const [inpEmail, setInpEmail]= useState("inpNormal")
  const [inpPassword, setInpPassword]= useState("inpNormal")
  return (
    <div className="App">
      <h1>Formulario</h1>
      <Formik
      
        initialValues={{ name:"",email: "", password: "" }}
        validate={(values) => {
          
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
            
          } else if (values.name.length < 4) {
            errors.name = 'El nombre debe tener por lo menos 4 caracteres';
            
          }
          
          if (!values.email) {
            errors.email = "Required";
            
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            
          ) {
            errors.email = "Ingrese una Dirección valida, ejemplo@ejemplo.com";
            
          }
          
          if (!values.password) {
            errors.napasswordme = 'Required';
            
          } else if (values.password.length < 6) {
            errors.password = 'La contraseña debe tener 6 caracteres';
            
          }
          
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className="formik1" onSubmit={handleSubmit}>
            
            <label htmlFor="name">Name</label>
            <input className={inpName}
              id="name"
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {(errors.name && touched.name)? (setInpName("inpError"),<p className="error">{errors.name}</p>): <></>}
             
            <label htmlFor="email">Email</label>
            <input className={inpEmail}
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            
            {(errors.email && touched.email)? (setInpEmail("inpError"),<p className="error">{errors.email}</p>): <></>}
            <label htmlFor="password">Password</label>
            <input className={inpPassword}
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {(errors.password && touched.password)? (setInpPassword("inpError"),<p className="error">{errors.password}</p>): <></>}
            <button type="submit" disabled={isSubmitting}>
              Create User
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default App;
