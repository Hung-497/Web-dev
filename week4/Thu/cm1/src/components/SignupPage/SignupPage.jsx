import { useState } from 'react';
import "./SignupPage.css";

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nationality, setNationality] = useState('');
  const [emailok, setEmailok] = useState(Boolean);
  const [passok, setPassok] = useState(Boolean);
  const [passcok, setPasscok] = useState(Boolean);
  const [nationalityok, setNationalityok] = useState(Boolean);
  const validateEmail = value => {
    setEmail(value);
    if (value.match(/^\S+@\S+\.\S+$/) != null) {
      document.getElementById('email').style.color = 'green';
      setEmailok(true);
    } else {
      setEmailok(false);
      document.getElementById('email').style.color = 'red';
    }
    validateSubmit(emailok,passok,passcok,nationalityok);
  }
  const validatePassword = value => {
    setPassword(value);
    if (value.match(/[A-Z]/) && value.match(/[a-z]/) && value.match(/[0-9]/) != null) {
      document.getElementById('password').style.color = 'green';
      setPassok(true);
    } else {
      setPassok(false);
      document.getElementById('password').style.color = 'red';
    }
    validateConfirm(confirmPassword);
  }
  const validateConfirm = value => {
    setConfirmPassword(value);
    if (value == password) {
      setPasscok(true);
      document.getElementById('confirmPassword').style.color = 'green';
    } else {
      setPasscok(false);
      document.getElementById('confirmPassword').style.color = 'red';
    }
    validateSubmit(emailok,passok,passcok,nationalityok);
  }
  const validateNationality = value => {
    setNationality(value);
    setNationalityok(true);
    validateSubmit(emailok,passok,passcok,true);
  }
  const validateSubmit = (em, p, c, n) => {
    if (em == true && p == true && c == true && n == true) {
      document.getElementById('submit').style.display = 'inline-block';
    } else {
      document.getElementById('submit').style.display = 'none';
    }
  }
  const onSubmit = e => {
    e.preventDefault();
    const contactUsInformation = {
      email,
      password,
      confirmPassword,
      nationality,
      submittedOn: new Date()
    };
    switch (contactUsInformation.nationality) {
      case 'fi': document.getElementById('greeting').innerHTML = 'Moi!'; document.getElementById('email-adress').innerHTML = `Sähköpostiosoitteesi on ${contactUsInformation.email}`; break;
      case 'en': document.getElementById('greeting').innerHTML = 'Hello!'; document.getElementById('email-adress').innerHTML = `Your email is ${contactUsInformation.email}`; break;
      case 'de': document.getElementById('greeting').innerHTML = 'Hallo!'; document.getElementById('email-adress').innerHTML = `Deine E-Mail-Adresse lautet ${contactUsInformation.email}`; break;
      case 'fr': document.getElementById('greeting').innerHTML = 'Bonjour!'; document.getElementById('email-adress').innerHTML = `Votre adresse e-mail est ${contactUsInformation.email}`; break;
    }


    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setNationality('');
    setEmailok(false);
    setPassok(false);
    setPasscok(false);
    setNationalityok(false);
  };
  return (
    <div>
      <h2>SignupPage</h2>
      
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input id='email' type='text' onChange={e => validateEmail(e.target.value)} value={email} required/>
        </div>
        <div>
          <label htmlFor='password'>Password: (must contain a lowercase letter, uppercase letter and a number)</label>
          <input id='password' type='password' onChange={e => validatePassword(e.target.value)} value={password} required/>
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm Password: (must match password)</label>
          <input id='confirmPassword' type='password' onChange={e => validateConfirm(e.target.value)} value={confirmPassword} required/>
        </div>
        <div>
          <label htmlFor='nationality'>Nationality:</label>
          <select
            name='nationality'
            onChange={e => validateNationality(e.target.value)}
            value={nationality}
            required
          >
            <option value='' disabled>
              Select a nationality...
            </option>
            <option>fi</option>
            <option>en</option>
            <option>de</option>
            <option>fr</option>
          </select>
        </div>
        <p>(Please provide all fields with valid data for the submission button to appear)</p>
        <button id='submit'>Submit</button>
      </form>
      <div id='userText'>
        <p id='greeting'></p>
        <p id='email-adress'></p>
      </div>
    </div>
  );
}

export default SignupPage;