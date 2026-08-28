const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/*
  ==========================================================
  MAFIA STATE RP - ELENCO DELLE ATTIVITÀ
  ==========================================================
  QUI PUOI AGGIUNGERE / MODIFICARE LE ATTIVITÀ DEL SERVER.

  Esempio:
  {
    nome: "Vice Bar",
    zona: "Downtown",
    descrizione: "Il punto di ritrovo della notte.",
    immagine: "images/bar-01.jpg"
  }

  Se non hai ancora immagini, lascia immagine: "".
*/
const directoryData = {
  mafie: {
    titolo: "MAFIE",
    descrizione: "Le famiglie criminali che si contendono potere, territorio e affari.",
    elementi: [
      { nome: "Famiglia 01", zona: "Los Santos", descrizione: "Organizzazione criminale — inserisci qui la descrizione.", immagine: "" },
      { nome: "Famiglia 02", zona: "Los Santos", descrizione: "Organizzazione criminale — inserisci qui la descrizione.", immagine: "" }
    ]
  },

  gang: {
    titolo: "GANG",
    descrizione: "Le gang della città, la loro zona e la loro storia.",
    elementi: [
      { nome: "Gang 01", zona: "Los Santos", descrizione: "Inserisci qui la descrizione della gang.", immagine: "" },
      { nome: "Gang 02", zona: "Los Santos", descrizione: "Inserisci qui la descrizione della gang.", immagine: "" }
    ]
  },

  officine: {
    titolo: "OFFICINE",
    descrizione: "Le officine dove nascono, rinascono e si modificano i veicoli della città.",
    elementi: [
      { nome: "Officina 01", zona: "Los Santos", descrizione: "Inserisci qui la descrizione dell'officina.", immagine: "" },
      { nome: "Officina 02", zona: "Los Santos", descrizione: "Inserisci qui la descrizione dell'officina.", immagine: "" }
    ]
  },

  bar: {
    titolo: "BAR",
    descrizione: "I locali della città: ritrovi, serate ed eventi.",
    elementi: [
      { nome: "Vice Bar", zona: "Downtown", descrizione: "Il punto di ritrovo della notte.", immagine: "" },
      { nome: "Black Lounge", zona: "Vinewood", descrizione: "Un locale esclusivo nel cuore della città.", immagine: "" },
      { nome: "Bar 03", zona: "Los Santos", descrizione: "Inserisci qui la descrizione del locale.", immagine: "" }
    ]
  },

  ristoranti: {
    titolo: "RISTORANTI",
    descrizione: "I ristoranti che animano la scena gastronomica della città.",
    elementi: [
      { nome: "Ristorante 01", zona: "Los Santos", descrizione: "Inserisci qui la descrizione del ristorante.", immagine: "" },
      { nome: "Ristorante 02", zona: "Los Santos", descrizione: "Inserisci qui la descrizione del ristorante.", immagine: "" }
    ]
  }
};

const modal = document.getElementById('categoryModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const directoryGrid = document.getElementById('directoryGrid');

function openCategory(category) {
  const data = directoryData[category];
  if (!data || !modal) return;

  modalTitle.textContent = data.titolo;
  modalDescription.textContent = data.descrizione;

  if (!data.elementi.length) {
    directoryGrid.innerHTML = '<div class="directory-empty">Nessuna attività inserita al momento.</div>';
  } else {
    directoryGrid.innerHTML = data.elementi.map(item => {
      const image = item.immagine
        ? `<img src="${item.immagine}" alt="${item.nome}" onerror="this.parentElement.innerHTML='FOTO IN ARRIVO'">`
        : 'FOTO IN ARRIVO';

      return `
        <article class="directory-card">
          <div class="directory-image">${image}</div>
          <div class="directory-body">
            <span class="directory-tag">${data.titolo}</span>
            <h3>${item.nome}</h3>
            <p>${item.descrizione}</p>
            <span class="directory-zone">📍 ${item.zona}</span>
          </div>
        </article>
      `;
    }).join('');
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCategory() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', () => openCategory(card.dataset.category));
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCategory(card.dataset.category);
    }
  });
});

document.querySelectorAll('[data-close-modal]').forEach(button => {
  button.addEventListener('click', closeCategory);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeCategory();
});
