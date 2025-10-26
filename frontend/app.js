let tg = window.Telegram.WebApp;

tg.expand();
tg.enableClosingConfirmation();

async function startAuth() {
    const phone = document.getElementById('phone').value;
    const api_id = document.getElementById('api_id').value;
    const api_hash = document.getElementById('api_hash').value;
    
    if (!phone || !api_id || !api_hash) {
        showStatus('Please fill all fields', 'error');
        return;
    }
    
    showStatus('Sending code...', 'info');
    
    try {
        const response = await fetch('/api/start_auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Telegram-Init-Data': tg.initData
            },
            body: JSON.stringify({ phone, api_id, api_hash })
        });
        
        const data = await response.json();
        data.success ? showStatus('Code sent!', 'success') : showStatus('Error: ' + data.error, 'error');
        
    } catch (error) {
        showStatus('Network error', 'error');
    }
}

function showStatus(message, type) {
    document.getElementById('status').innerHTML = `<div class="status ${type}">${message}</div>`;
}