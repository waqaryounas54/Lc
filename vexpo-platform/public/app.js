let token = null;
const statusEl = document.getElementById('status');
const eventsEl = document.getElementById('events');

document.getElementById('btnRegister').onclick = async () => {
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const res = await fetch('/api/register', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, email, password })});
  const data = await res.json();
  statusEl.textContent = JSON.stringify(data, null, 2);
};

document.getElementById('btnLogin').onclick = async () => {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const res = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password })});
  const data = await res.json();
  if (data.token) {
    token = data.token;
    statusEl.textContent = 'Logged in';
    eventsEl.style.display = 'block';
  } else {
    statusEl.textContent = JSON.stringify(data, null, 2);
  }
};

document.getElementById('btnLoadEvents').onclick = async () => {
  const res = await fetch('/api/events');
  const data = await res.json();
  document.getElementById('eventsPre').textContent = JSON.stringify(data, null, 2);
};

document.getElementById('btnCreateEvent').onclick = async () => {
  const name = document.getElementById('evName').value;
  const description = document.getElementById('evDesc').value;
  const startAt = document.getElementById('evStart').value;
  const endAt = document.getElementById('evEnd').value;
  const res = await fetch('/api/events', { method:'POST', headers:{'Content-Type':'application/json','Authorization': 'Bearer ' + token}, body: JSON.stringify({ name, description, startAt, endAt })});
  const data = await res.json();
  document.getElementById('eventsStatus').textContent = JSON.stringify(data, null, 2);
};