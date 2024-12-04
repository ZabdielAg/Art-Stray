  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then((registration) => {
        console.log('Service Worker registrado con éxito: ', registration);
      }).catch((error) => {
        console.log('Error al registrar el Service Worker: ', error);
      });
    });
  }






document.addEventListener("DOMContentLoaded", () => {
  const contactButton = document.getElementById("contact-button");
  const chatModal = document.getElementById("chat-modal");
  const closeChatButton = document.getElementById("close-chat");

  let isCompact = false;
  let timeout;

  // Function to switch to compact mode
  const switchToCompact = () => {
    contactButton.classList.add("compact");
    isCompact = true;
  };

  // Reset compact mode when the user interacts with the button
  const resetCompactMode = () => {
    if (isCompact) {
      contactButton.classList.remove("compact");
      isCompact = false;
    }
    clearTimeout(timeout);
    timeout = setTimeout(switchToCompact, 5000); // Switch to compact after 5 seconds
  };

  // Function to make the button follow the scroll
  window.addEventListener("scroll", () => {
    let maxY = document.documentElement.scrollHeight - window.innerHeight;
    let scrollY = window.scrollY;

    // Ensure the button moves in sync with the scroll
    contactButton.style.position = "fixed";
    contactButton.style.bottom = `${Math.max(20, maxY - scrollY)}px`;
  });

  // Mostrar el chat con animación al hacer clic en el botón
  contactButton.addEventListener("click", () => {
    chatModal.style.display = "block";

     const buttonRect = contactButton.getBoundingClientRect();

    // Ajustar posición del chat para coincidir con el botón
    chatModal.style.position = "absolute";
    chatModal.style.top = `${buttonRect.top}px`;
    chatModal.style.left = `${buttonRect.left}px`;
    
    // Añadir la clase de animación para mostrar el chat
    setTimeout(() => {
      chatModal.classList.add("show-chat");
    }, 10); // Pequeño retraso para aplicar la animación
  });

  // Cerrar el chat
  closeChatButton.addEventListener("click", () => {
    chatModal.classList.remove("show-chat");
    setTimeout(() => {
      chatModal.style.display = "none";
    }, 300); 
  });

  // Reset the compact mode when hovering over the button
  contactButton.addEventListener("mouseenter", resetCompactMode);

  // Close chat modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (!chatModal.contains(event.target) && !contactButton.contains(event.target)) {
      chatModal.classList.remove("show-chat");
      setTimeout(() => {
        chatModal.style.display = "none";
      }, 300);
    }
  });

  contactButton.addEventListener("click", () => {
    // Animación para ocultar el botón
    contactButton.style.transition = "opacity 0.3s ease";
    contactButton.style.opacity = "0";

    setTimeout(() => {
      contactButton.style.display = "none"; // Ocultar el botón después de la animación

      // Animación para mostrar el chat
      chatModal.style.display = "block";
      chatModal.style.opacity = "0"; // Iniciar opaco
      chatModal.style.transform = "scale(0.8)"; // Iniciar con un tamaño reducido
      setTimeout(() => {
        chatModal.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        chatModal.style.opacity = "1"; // Mostrar completamente
        chatModal.style.transform = "scale(1)"; // Escalar a su tamaño completo
      }, 10);
    }, 300); // Tiempo suficiente para que termine la animación del botón
  });

  // Cerrar el chat con animación y mostrar el botón
  closeChatButton.addEventListener("click", () => {
    // Animación para ocultar el chat
    
    chatModal.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    chatModal.style.opacity = "0";
    chatModal.style.transform = "scale(0.8)"; // Reducir tamaño durante la salida

    setTimeout(() => {
      chatModal.style.display = "none"; // Ocultar después de la animación

      // Animación para mostrar el botón
      contactButton.style.display = "block";
      setTimeout(() => {
        contactButton.style.transition = "opacity 0.3s ease";
        contactButton.style.opacity = "1"; // Volver a mostrar el botón
      }, 10);
    }, 300); // Tiempo suficiente para que termine la animación del chat
  });

  
});



