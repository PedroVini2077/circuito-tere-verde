// Detecta automaticamente se está no PC ou celular
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : 'http://10.0.0.21:5000/api';

console.log('🔗 API URL:', API_URL); // Para debug

function getToken() {
    return localStorage.getItem('token');
}

function setToken(token) {
    localStorage.setItem('token', token);
}

function clearAuth() {
    localStorage.removeItem('token');
}

function showAlert(message, type) {
    const container = document.getElementById('alertContainer');
    if (!container) return;
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    container.appendChild(alert);
    setTimeout(() => alert.remove(), 5000);
}

async function checkAuth() {
    const token = getToken();
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        return data.success ? data.data : null;
    } catch {
        clearAuth();
        return null;
    }
}