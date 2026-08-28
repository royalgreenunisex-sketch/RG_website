/* ---------- rotating hero headline ---------- */
  const words = ["royal experts", "signature style", "everyday glow", "bridal ready"];
  let wi = 0;
  const rotatorEl = document.getElementById('rotatorWord');
  setInterval(() => {
    wi = (wi + 1) % words.length;
    rotatorEl.style.opacity = 0;
    setTimeout(() => { rotatorEl.textContent = words[wi]; rotatorEl.style.opacity = 1; }, 260);
  }, 2600);
  rotatorEl.style.transition = 'opacity .25s ease';

  /* ---------- services tabs ---------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');
  function activateTab(name){
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    panels.forEach(p => p.classList.toggle('active', p.dataset.panel === name));
  }
  tabBtns.forEach(btn => btn.addEventListener('click', () => activateTab(btn.dataset.tab)));
  document.querySelectorAll('[data-tab-target]').forEach(el => {
    el.addEventListener('click', (e) => {
      if(el.getAttribute('href') === '#services'){ activateTab(el.dataset.tabTarget); }
    });
  });

  /* ---------- booking wizard ---------- */
  const overlay = document.getElementById('bookingModal');
  const openers = [document.getElementById('openBooking'), document.getElementById('openBooking2'), document.getElementById('openBooking3')];
  const closer = document.getElementById('closeBooking');
  const steps = document.querySelectorAll('.wstep');
  const progressFill = document.getElementById('progressFill');
  const stepLabel = document.getElementById('stepLabel');
  const backBtn = document.getElementById('wBack');
  const nextBtn = document.getElementById('wNext');
  const TOTAL = 5;
  let current = 1;
  let data = { branch:'', category:'', date:'', time:'', name:'', phone:'' };

  function openModal(e){ if(e) e.preventDefault(); overlay.classList.add('open'); current = 1; renderStep(); }
  openers.forEach(o => o && o.addEventListener('click', openModal));
  closer.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', (e) => { if(e.target === overlay) overlay.classList.remove('open'); });

  document.querySelectorAll('#branchChoices .choice-btn').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('#branchChoices .choice-btn').forEach(x=>x.classList.remove('selected'));
    b.classList.add('selected'); data.branch = b.dataset.value;
  }));
  document.querySelectorAll('#categoryChoices .choice-btn').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('#categoryChoices .choice-btn').forEach(x=>x.classList.remove('selected'));
    b.classList.add('selected'); data.category = b.dataset.value;
  }));

  function renderStep(){
    steps.forEach(s => s.style.display = (parseInt(s.dataset.step) === current) ? 'block' : 'none');
    progressFill.style.width = (current/TOTAL*100) + '%';
    stepLabel.textContent = `Step ${current} of ${TOTAL}`;
    backBtn.style.visibility = current === 1 ? 'hidden' : 'visible';
    nextBtn.textContent = current === TOTAL ? 'Send via WhatsApp' : 'Next';

    if(current === 5){
      data.date = document.getElementById('wDate').value;
      data.time = document.getElementById('wTime').value;
      data.name = document.getElementById('wName').value;
      data.phone = document.getElementById('wPhone').value;
      const rows = [
        ['Branch', data.branch || '—'],
        ['Service', data.category || '—'],
        ['Date', data.date || '—'],
        ['Time', data.time || '—'],
        ['Name', data.name || '—'],
        ['Phone', data.phone || '—'],
      ];
      document.getElementById('summaryBlock').innerHTML = rows.map(r =>
        `<div class="summary-line"><span>${r[0]}</span><span>${r[1]}</span></div>`
      ).join('');
    }
  }

  backBtn.addEventListener('click', () => { if(current > 1){ current--; renderStep(); } });
  nextBtn.addEventListener('click', () => {
    if(current < TOTAL){ current++; renderStep(); return; }
    // final step -> send to WhatsApp
    let msg = `Hi Royal Green, I'd like to book an appointment.\n`;
    msg += `Branch: ${data.branch}\nService: ${data.category}\n`;
    if(data.date) msg += `Date: ${data.date}\n`;
    if(data.time) msg += `Time: ${data.time}\n`;
    msg += `Name: ${data.name}\nPhone: ${data.phone}\n`;
    const waNumber = data.branch.startsWith('Unisex') ? '918056256979' : '918489828218';
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    overlay.classList.remove('open');
  });
