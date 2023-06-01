document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('loginButton');

  loginButton.addEventListener('click', function() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          if (response.success) {
            const jwt = response.jwt;
            const decodedToken = parseJwt(jwt);
            const welcomeMessage = decodedToken.hiddenText;
            alert(welcomeMessage);
          } else {
            alert('Usuario o contraseña incorrectos');
          }
        } else {
          alert('Error en la solicitud');
        }
      }
    };

    xhr.send(JSON.stringify({ username, password }));
  });
});

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
