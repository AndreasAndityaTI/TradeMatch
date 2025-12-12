import TradeMatchAPI from './api-client.js';

const api = new TradeMatchAPI();

async function ensureAuth() {
  const ok = await api.checkAuth();
  if (!ok) {
    window.location.href = '/pages/login.html';
    return false;
  }
  return true;
}

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  children.forEach(c => { if (typeof c === 'string') node.appendChild(document.createTextNode(c)); else if (c) node.appendChild(c); });
  return node;
}

async function loadProducts() {
  const list = document.getElementById('productsList');
  try {
    const data = await api.browseProducts({ limit: 30 });
    list.innerHTML = '';
    if (!data.products || data.products.length === 0) {
      list.innerHTML = '<p class="muted">No products found.</p>';
      return;
    }

    data.products.forEach(p => {
      const node = el('div', { class: 'product' });
      const title = el('div', {}, `${p.title} ${p.price ? '— ' + p.price : ''}`);
      const desc = el('div', { class: 'muted' }, p.description || '');
      const owner = el('div', { class: 'muted' }, `Seller: ${p.username || p.full_name || '—'}`);
      const btn = el('button', { class: 'btn btn-primary' }, 'Express Interest');
      btn.addEventListener('click', async () => {
        btn.disabled = true;
        try {
          const otherUserId = p.user_id ?? p.userId ?? p.userId;
          await api.createMatch(otherUserId, p.id, 'interest');
          alert('Interest expressed — check My Matches.');
          loadMatches();
        } catch (err) {
          alert('Failed to create match: ' + err.message);
        } finally { btn.disabled = false; }
      });

      node.appendChild(title);
      node.appendChild(desc);
      node.appendChild(owner);
      node.appendChild(btn);
      list.appendChild(node);
    });
  } catch (err) {
    list.innerHTML = `<p class="error-message">Error loading products: ${err.message}</p>`;
  }
}

async function loadMatches() {
  const list = document.getElementById('matchesList');
  try {
    const profile = await api.getProfile();
    const meId = profile.user.id;
    const data = await api.getMatches();
    list.innerHTML = '';
    if (!data.matches || data.matches.length === 0) {
      list.innerHTML = '<p class="muted">You have no matches yet.</p>';
      return;
    }

    data.matches.forEach(m => {
      const node = el('div', { class: 'product' });
      const otherId = (m.user_id_1 === meId) ? m.user_id_2 : m.user_id_1;
      const otherName = m.matched_user || m.matched_user_name || m.username || 'User';
      const title = el('div', {}, `Match with ${otherName} — status: ${m.status}`);
      const info = el('div', { class: 'muted' }, `Product: ${m.product_title || m.product || m.product_id || ''}`);

      node.appendChild(title);
      node.appendChild(info);

      // If current user is the owner (user_id_1) and match is pending, allow accept/reject
      const amOwner = m.user_id_1 === meId;
      if (m.status === 'pending' && amOwner) {
        const accept = el('button', { class: 'btn btn-primary' }, 'Accept');
        const reject = el('button', { class: 'btn btn-ghost' }, 'Reject');
        accept.addEventListener('click', async () => {
          accept.disabled = true; reject.disabled = true;
          try { await api.updateMatchStatus(m.id, 'accepted'); loadMatches(); } catch (e) { alert(e.message); } finally { accept.disabled = false; reject.disabled = false; }
        });
        reject.addEventListener('click', async () => {
          accept.disabled = true; reject.disabled = true;
          try { await api.updateMatchStatus(m.id, 'rejected'); loadMatches(); } catch (e) { alert(e.message); } finally { accept.disabled = false; reject.disabled = false; }
        });
        node.appendChild(accept);
        node.appendChild(reject);
      }

      list.appendChild(node);
    });
  } catch (err) {
    list.innerHTML = `<p class="error-message">Error loading matches: ${err.message}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  if (!(await ensureAuth())) return;
  await loadProducts();
  await loadMatches();
});
