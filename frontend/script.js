const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : 'http://10.0.0.21:5000/api';

console.log('🔗 API URL:', API_URL);

// USAR sessionStorage ao invés de localStorage
// sessionStorage limpa ao fechar aba/navegador
function getToken() {
    return sessionStorage.getItem('token');
}

function setToken(token) {
    sessionStorage.setItem('token', token);
}

function clearAuth() {
    sessionStorage.removeItem('token');
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
        
        if (!data.success) {
            clearAuth();
            return null;
        }
        
        return data.data;
    } catch {
        clearAuth();
        return null;
    }
}