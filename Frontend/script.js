document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const data = { email, password };

  try {
    const response = await fetch('http://localhost:8080/api/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });


    const result = await response.json();
    localStorage.setItem('token', result.token);
    alert('Inicio de sesión exitoso.');
    if (response.ok) {
      window.location.href = "http://localhost:3000/opcion1/";
    }
  } catch (error) {
    alert('Error en el inicio de sesión. Por favor, inténtalo de nuevo.');
  }
});
