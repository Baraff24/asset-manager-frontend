# Asset Manager Frontend

Benvenuti nel repository del **Frontend** per il sistema di IT Asset Management, parte del progetto "IT Asset Flow". Questo sistema è stato progettato per semplificare la gestione delle risorse IT aziendali, ottimizzando costi e operazioni, con una forte attenzione alla sicurezza e alla scalabilità.

## Tecnologie Utilizzate

- **React**: Framework per la creazione di interfacce utente reattive e modulari.
- **TypeScript**: Per una gestione tipizzata e sicura del codice.
- **Tailwind CSS**: Framework CSS utility-first per un design moderno e responsivo.
- **Axios**: Per le chiamate API verso il backend.

## Funzionalità Principali

- Visualizzazione e gestione delle risorse IT (hardware e software).
- Dashboard intuitiva per il monitoraggio delle risorse.
- Interfaccia utente responsiva per l'accesso su desktop e dispositivi mobili.
- Integrazione sicura con il backend tramite autenticazione Bearer Token.

## Requisiti di Sistema

- **Node.js**: >= 16.0.0
- **npm**: >= 7.0.0

## Installazione

Segui questi passaggi per eseguire l'applicazione in locale:

1. Clona il repository:
   ```bash
   git clone https://github.com/Baraff24/asset-manager-frontend.git
   cd asset-manager-frontend
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Avvia l'applicazione:
   ```bash
   npm start
   ```

   L'app sarà disponibile su `http://localhost:3000`.
   Oppure l'app è disponibile su `https://frontend.raffaelegrieco.it`.

## Architettura

Il frontend segue un'architettura modulare:

- **Componenti UI**: Progettati con React e TypeScript.
- **Gestione Stile**: Tailwind CSS per uno stile modulare e personalizzabile.
- **Routing**: Gestito da React Router.
- **Chiamate API**: Axios per interagire con il backend.

### Struttura del Progetto

```plaintext
src/
├── components/         # Componenti riutilizzabili
├── pages/              # Pagine principali (es. Dashboard, Login)
├── services/           # Gestione API e logica business
├── styles/             # Configurazioni personalizzate per Tailwind
├── utils/              # Funzioni di utilità
└── index.tsx           # Punto di ingresso dell'app
```

## Licenza

Questo progetto è rilasciato sotto la licenza MIT. Consulta il file [LICENSE](LICENSE) per ulteriori dettagli.

---

**Autori:**
- Roberto Inverni
- Raffaele Grieco
- Giuseppe Rubino
