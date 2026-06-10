// 1. Importar as ferramentas de segurança da Google (Via Script/CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 2. ⚠️ COLA AQUI AS TUAS CHAVES QUE COPIASTE DO FIREBASE
const firebaseConfig = {
   apiKey: "AIzaSyAWaRPM6MswWA7gDZiyInuAmAC333RWCrg",
  authDomain: "ab-informatica-solutions.firebaseapp.com",
  projectId: "ab-informatica-solutions",
  storageBucket: "ab-informatica-solutions.firebasestorage.app",
  messagingSenderId: "569361421220",
  appId: "1:569361421220:web:723f827a621b58faf0a731"
};

// 3. Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 4. Controlar o formulário de Login do teu site
const loginForm = document.getElementById("login-form");
const errorMsg = document.getElementById("error-msg");
const btnEntrar = document.getElementById("btn-entrar");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Impede a página de recarregar
        
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        
        btnEntrar.textContent = "A verificar...";
        btnEntrar.disabled = true;
        errorMsg.style.display = "none";

        // Faz o login seguro nos servidores da Google
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Se der certo, entra no painel!
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                // Se falhar (senha errada, etc.), mostra o aviso vermelho
                console.error("Erro:", error.message);
                errorMsg.style.display = "block";
                btnEntrar.textContent = "Entrar no Painel";
                btnEntrar.disabled = false;
            });
    });
}