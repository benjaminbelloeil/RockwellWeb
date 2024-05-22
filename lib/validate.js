export default function login_validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
      }
    if (!values.password) {
        errors.password = 'Required';
    }

      return errors;

}

export function signup_validate(values) {
    const errors = {};

    if (!values.username) {
        errors.username = 'Required';
      } else if (values.username.includes (' ')) {
        errors.username = 'Invalid username';
      } else if (values.username.length < 3 || values.username.length > 20) {
        errors.username = 'Must be at least 3 characters and less than 20 characters';
      }
    
    if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

    if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = 'Must be at least 8 characters and less than 20 characters';
      } else if (values.password.includes(' ')) {
        errors.password = 'Password cannot contain spaces';
      }

    if(!values.cPassword) {
        errors.cPassword = 'Required';
      } else if (values.cPassword !== values.password) {
        errors.cPassword = 'Password does not match';
      } else if (values.cPassword.includes(' ')) {
        errors.cPassword = 'Password cannot contain spaces';
      }

        return errors;
}