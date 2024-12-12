document.addEventListener("DOMContentLoaded", () => {
  // Enlace de la API de Rick and Morty
  const apiEndpoint = "https://rickandmortyapi.com/api/episode"; 

  fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      const apiDataDiv = document.getElementById("api-data");
      data.results.forEach(episode => {
        const episodeDiv = document.createElement("div");
        episodeDiv.classList.add('movie'); 

        const titleWithImage = `<h3><img src="https://rickandmortyapi.com/api/character/avatar/${episode.id}.jpeg" alt="Rick and Morty Logo" style="height:30px; vertical-align:middle;"> ${episode.name}</h3>`;
        
        episodeDiv.innerHTML = `
          ${titleWithImage}
          <p>${episode.episode}</p>
          <p>Fecha de lanzamiento: ${episode.air_date}</p>
        `;
        apiDataDiv.appendChild(episodeDiv);
      });
    })
    .catch(error => console.error("Error al consumir la API:", error));

  // Validación , envío del formulario
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    let isValid = true;

    // Validación del nombre (solo letras, mínimo 3 caracteres, máximo 20 caracteres)
    if (!/^[a-zA-Z\s]{3,20}$/.test(name)) {
      isValid = false;
      document.getElementById("name-error").textContent = "El nombre debe contener solo letras y tener entre 3 y 20 caracteres.";
    } else {
      document.getElementById("name-error").textContent = "";
    }

    // Validación del email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      isValid = false;
      document.getElementById("email-error").textContent = "Por favor, ingrese un correo electrónico válido.";
    } else {
      document.getElementById("email-error").textContent = "";
    }

    // Validación del mensaje (mínimo 10 caracteres, máximo 200 caracteres)
    if (message.length < 10 || message.length > 200) {
      isValid = false;
      document.getElementById("message-error").textContent = "El mensaje debe tener entre 10 y 200 caracteres.";
    } else {
      document.getElementById("message-error").textContent = "";
    }

    if (isValid) { // Enviar el formulario usando fetch 
     fetch('https://tu-servidor.com/submit-form', {
       method: 'POST', 
       headers: { 
       'Content-Type': 'application/json'
       },
      body: JSON.stringify({ name, email, message })
      }) 
     .then(response => response.json()) 
     .then(data => { document.getElementById("form-feedback").textContent = "Formulario enviado con éxito."; 
     form.reset(); 
     }) .catch(error => {
     document.getElementById("form-feedback").textContent = "Hubo un error al enviar el formulario. Inténtalo nuevamente."; 
     console.error('Error:', error); 
     });
      } else { 
     document.getElementById("form-feedback").textContent = "Por favor, corrija los errores en el formulario.";
    }
   });
   });
