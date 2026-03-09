window.ZGS_MOCK_DATA = {
  brand: {
    name: "ZEGGER ERP",
    subtitle: "Workspace handlowy"
  },

  navigation: {
    desktopTabs: [
      { key: "start", label: "Start" },
      { key: "offers", label: "Panel Ofertowy" },
      { key: "company", label: "Firma i Użytkownicy" },
      { key: "library", label: "Biblioteka Produktów" },
      { key: "chat", label: "Komunikator" },
      { key: "inbox", label: "Powiadomienia" }
    ],
    utility: [
      { key: "chat", label: "Komunikator" },
      { key: "inbox", label: "Powiadomienia" },
      { key: "account", label: "Konto" }
    ],
    mobileDock: [
      { key: "start", label: "Start" },
      { key: "offers", label: "Oferty" },
      { key: "chat", label: "Chat" },
      { key: "inbox", label: "Inbox" }
    ]
  },

  auth: {
    heroTitle: "Wejście do systemu",
    heroText: "Zaloguj się, utwórz konto firmy albo dołącz kodem zespołu.",
    infoCards: [
      {
        title: "Panel Ofertowy 1:1",
        text: "Sprawdzony workflow ofert pozostaje bez zmian."
      },
      {
        title: "Szybki start pracy",
        text: "Po wejściu od razu otwierasz potrzebne moduły."
      },
      {
        title: "Desktop i mobile",
        text: "Ten sam rytm pracy, dopracowany pod urządzenie."
      }
    ],
    tabs: [
      {
        key: "login",
        label: "Logowanie",
        button: "Wejdź do ERP",
        fields: [
          { key: "email", label: "E-mail służbowy", placeholder: "np. handel@zegger.pl" },
          { key: "password", label: "Hasło", placeholder: "Wpisz hasło" }
        ],
        options: [
          { key: "remember", label: "Zapamiętaj sesję" },
          { key: "forgot", label: "Nie pamiętam hasła" }
        ]
      },
      {
        key: "company-register",
        label: "Nowa firma",
        button: "Utwórz konto firmy",
        fields: [
          { key: "company_name", label: "Nazwa firmy", placeholder: "np. Zegger Partner Sp. z o.o." },
          { key: "nip", label: "NIP", placeholder: "000-000-00-00" },
          { key: "company_address", label: "Adres firmy", placeholder: "np. ul. Przemysłowa 12, Warszawa" },
          { key: "contact_name", label: "Osoba kontaktowa", placeholder: "Imię i nazwisko" },
          { key: "email", label: "E-mail", placeholder: "biuro@firma.pl" },
          { key: "phone", label: "Telefon", placeholder: "+48 000 000 000" },
          { key: "password", label: "Hasło", placeholder: "Ustaw hasło" }
        ]
      },
      {
        key: "join-company",
        label: "Dołącz do firmy",
        button: "Dołącz do firmy",
        fields: [
          { key: "join_code", label: "Kod dołączenia", placeholder: "np. ZEGGER-AB12-CD34" },
          { key: "first_name", label: "Imię", placeholder: "Imię" },
          { key: "last_name", label: "Nazwisko", placeholder: "Nazwisko" },
          { key: "email", label: "E-mail", placeholder: "twoj@email.pl" },
          { key: "phone", label: "Telefon", placeholder: "+48 000 000 000" },
          { key: "password", label: "Hasło", placeholder: "Ustaw hasło" }
        ]
      }
    ]
  },

  launcher: {
    title: "Centrum pracy",
    subtitle: "Dzisiaj",
    text: "Zobacz sprawy wymagające decyzji, nowe wiadomości i zadania operacyjne.",
    priorityBlocks: [
      {
        key: "offers",
        title: "Oferty do decyzji",
        count: "2",
        items: [
          { text: "Oferta #4821 - rabat 8% do potwierdzenia.", status: "pilne", time: "2 min temu" },
          { text: "Oferta #4818 - termin dostawy do decyzji.", status: "oczekuje", time: "dziś" }
        ],
        cta: "Przejdź do ofert"
      },
      {
        key: "chat",
        title: "Nowe rozmowy / wiadomości",
        count: "4",
        items: [
          { text: "Wątek #4821 - 3 nowe wiadomości od opiekuna.", status: "nowe", time: "2 min temu" },
          { text: "Produkcja: korekta terminu realizacji.", status: "oczekuje", time: "dziś" }
        ],
        cta: "Otwórz Komunikator"
      },
      {
        key: "inbox",
        title: "Alerty / synchronizacja / błędy",
        count: "3",
        items: [
          { text: "Sync biblioteki: konflikt SKU do review.", status: "pilne", time: "dziś" },
          { text: "Alert systemowy: 2 rekordy po walidacji.", status: "nowe", time: "wczoraj" }
        ],
        cta: "Przejdź do Powiadomień"
      },
      {
        key: "offers",
        title: "Oferty wymagające akceptu",
        count: "3",
        items: [
          { text: "Oferta #4830 - potwierdź marżę dla klienta.", status: "pilne", time: "2 min temu" },
          { text: "Oferta #4827 - decyzja o terminie wysyłki.", status: "oczekuje", time: "dziś" }
        ],
        cta: "Otwórz oferty do decyzji"
      },
      {
        key: "chat",
        title: "Nowe wiadomości handlowe",
        count: "5",
        items: [
          { text: "Klient Nova Garden dosłał korektę specyfikacji.", status: "nowe", time: "dziś" },
          { text: "Dział produkcji czeka na potwierdzenie zakresu.", status: "oczekuje", time: "dziś" }
        ],
        cta: "Przejdź do rozmów"
      },
      {
        key: "inbox",
        title: "Alerty systemowe i sync",
        count: "2",
        items: [
          { text: "Walidacja cennika: 1 pozycja wymaga korekty.", status: "oczekuje", time: "dziś" },
          { text: "Import zakończony z ostrzeżeniem metadanych.", status: "nowe", time: "wczoraj" }
        ],
        cta: "Zobacz alerty"
      }
    ],
    continueItems: [
      { key: "offers", label: "Ostatnia oferta", value: "#4821 - Delta Fence", status: "pilne", time: "2 min temu" },
      { key: "chat", label: "Ostatnia rozmowa", value: "Wątek: Oferta #4821", status: "nowe", time: "dziś" },
      { key: "company", label: "Ostatnia firma / klient", value: "Nova Garden Sp. z o.o.", status: "oczekuje", time: "dziś" },
      { key: "library", label: "Ostatnia akcja biblioteki", value: "Sync cennika zakończony", status: "nowe", time: "wczoraj" }
    ],
    quickActions: [
      { key: "offers", label: "Otwórz Panel Ofertowy", priority: "primary" },
      { key: "chat", label: "Otwórz Komunikator", priority: "primary" },
      { key: "inbox", label: "Otwórz Powiadomienia", priority: "secondary" },
      { key: "company", label: "Dodaj użytkownika", priority: "secondary" },
      { key: "library", label: "Wymuś sync biblioteki", priority: "secondary" }
    ],
    inboxEvents: [
      { title: "Klient zaakceptował warunki", text: "Oferta #4809 przechodzi do finalnego PDF.", status: "nowe", time: "2 min temu" },
      { title: "Nowy wniosek o dołączenie", text: "Jan Wrona czeka na zatwierdzenie roli handlowca.", status: "oczekuje", time: "dziś" },
      { title: "Sync biblioteki zakończony", text: "6 zmian gotowych do publikacji po review.", status: "nowe", time: "dziś" },
      { title: "Oferta gotowa do PDF", text: "Oferta #4821 oznaczona jako gotowa do wysyłki.", status: "pilne", time: "wczoraj" }
    ]
  },

  offerPanel: {
    title: "Panel Ofertowy",
    subtitle: "Moduł legacy 1:1",
    hostNote: "W ETAPIE 2 osadzamy istniejący działający Panel Ofertowy bez przebudowy jego wnętrza.",
    zones: [
      {
        title: "Główna przestrzeń legacy",
        text: "Tu trafia realny, istniejący Panel Ofertowy 1:1."
      },
      {
        title: "Prawy panel kontekstowy",
        text: "Status klienta, historia, szybkie akcje i informacje pomocnicze."
      },
      {
        title: "Dolna sekcja robocza",
        text: "Tabela pozycji, podsumowania i eksport PDF zgodnie z obecnym flow."
      }
    ]
  },

  companyUsers: {
    stats: [
      { value: "14", label: "Aktywni użytkownicy", hint: "2 logowania w ostatnich 15 min", status: "nowe" },
      { value: "3", label: "Wnioski oczekujące", hint: "1 decyzja wymagana do 16:00", status: "oczekuje" },
      { value: "2", label: "Relacje B2B do review", hint: "1 blokuje zaproszenie handlowca", status: "pilne" }
    ],
    companyCard: {
      title: "Dane firmy",
      rows: [
        "Nazwa: Zegger Partner Sp. z o.o.",
        "NIP: 000-000-00-00",
        "Adres: ul. Przemysłowa 12, Warszawa",
        "Status umowy: Aktywna"
      ],
      actions: ["Edytuj dane firmy", "Regeneruj kod dołączenia"]
    },
    relationsCard: {
      title: "Role i relacje",
      workflow: [
        {
          label: "Aktywne relacje",
          value: "3 powiązania B2B",
          detail: "Model: Producent -> Partner -> Handlowiec",
          status: "aktywne"
        },
        {
          label: "Zaproszenia wysłane",
          value: "2 oczekujące",
          detail: "Delta Fence, Nova Garden",
          status: "oczekuje"
        },
        {
          label: "Wnioski do decyzji",
          value: "1 pilny przypadek",
          detail: "Brak przypisanej roli dla nowego handlowca",
          status: "pilne"
        }
      ],
      actions: ["Zarządzaj relacjami", "Wyślij zaproszenie"]
    },
    teamTable: {
      title: "Zespół i dostępy",
      columns: ["Imię i nazwisko", "Rola", "Status", "Zakres", "Ostatnia aktywność", "Akcje"],
      rows: [
        {
          name: "Anna Kowalska",
          role: "Sales Admin",
          status: "Aktywny",
          scope: "Pełny panel ofert",
          lastActivity: "Dzisiaj 09:14",
          actions: [
            { label: "Edytuj", tone: "neutral" },
            { label: "Uprawnienia", tone: "neutral" },
            { label: "Zawieś", tone: "danger" }
          ]
        },
        {
          name: "Michał Lis",
          role: "Handlowiec",
          status: "Aktywny",
          scope: "Oferty i komunikator",
          lastActivity: "Dzisiaj 08:41",
          actions: [
            { label: "Edytuj", tone: "neutral" },
            { label: "Uprawnienia", tone: "neutral" },
            { label: "Reset hasła", tone: "neutral" }
          ]
        },
        {
          name: "Karolina Nowak",
          role: "Handlowiec",
          status: "Oczekuje",
          scope: "Weryfikacja konta",
          lastActivity: "Wczoraj 15:20",
          actions: [
            { label: "Zatwierdź", tone: "primary" },
            { label: "Odrzuć", tone: "danger" }
          ]
        }
      ]
    },
    actionQueue: {
      title: "Kolejka akcji",
      items: [
        {
          title: "Zaproszenie handlowca - region Północ",
          text: "Przygotuj rolę i ograniczenia katalogu przed wysyłką zaproszenia.",
          status: "oczekuje",
          time: "dziś 14:30",
          cta: "Otwórz zadanie"
        },
        {
          title: "Potwierdzenie relacji B2B - Delta Fence",
          text: "Firma czeka na aktywację dostępu do biblioteki produktowej.",
          status: "pilne",
          time: "dziś",
          cta: "Przejdź do relacji"
        }
      ]
    },
    joinRequests: {
      title: "Wnioski o dołączenie",
      items: [
        {
          title: "Jan Wrona",
          meta: "Rola: Handlowiec regionalny",
          text: "Prośba o dołączenie do oddziału Warszawa.",
          status: "nowe",
          time: "2 min temu",
          cta: "Zweryfikuj wniosek"
        },
        {
          title: "Magda Zielińska",
          meta: "Rola: Operator katalogu",
          text: "Wniosek wymaga przypisania zakresu katalogowego.",
          status: "oczekuje",
          time: "dziś",
          cta: "Nadaj zakres"
        }
      ]
    }
  },

  library: {
    stats: [
      { value: "1,842", label: "Pozycje łącznie" },
      { value: "6", label: "Zmiany do publikacji" },
      { value: "10 min", label: "Ostatni sync" }
    ],
    sourceCard: {
      title: "Źródło Google Sheets",
      rows: [
        "Arkusz: Cennik_2026_Master",
        "Ostatni sync: 10 min temu",
        "Status: Połączono i aktualne"
      ],
      actions: ["Edytuj źródło", "Wymuś sync", "Historia sync"]
    },
    localCard: {
      title: "Katalog lokalny",
      rows: [
        "Pozycji lokalnych: 148",
        "Zmiany oczekujące: 6",
        "Status: Gotowe do scalania"
      ],
      actions: ["Dodaj produkt", "Import CSV/XLSX"]
    },
    pipeline: {
      title: "Pipeline danych",
      steps: ["Import", "Walidacja", "Scalanie", "Publikacja"],
      text: "Zmiany przechodzą przez pipeline z kontrolą konfliktów SKU i cen."
    },
    workspace: {
      title: "Merged workspace danych",
      columns: ["SKU", "Nazwa", "Kategoria", "Cena netto", "Źródło", "Status", "Akcje"],
      rows: [
        ["OGR-3D-2500", "Panel 3D 2500", "Ogrodzenia", "129.00", "Google", "Aktywny", "Edytuj / Archiwizuj"],
        ["SLP-60x40", "Słupek 60x40", "Akcesoria", "38.00", "Local", "Do publikacji", "Edytuj / Publikuj"],
        ["RAL-7016", "Lakier RAL 7016", "Dodatki", "12.00", "Google", "Aktywny", "Podgląd / Konflikty"]
      ]
    }
  },

  messenger: {
    title: "Komunikator zespołowy",
    threadList: [
      { title: "Oferta #4821", text: "Nowy komentarz od opiekuna klienta.", active: true },
      { title: "Zespół handlowy", text: "Update cennika na poniedziałek." },
      { title: "Produkcja", text: "Termin dostawy przesunięty o 1 dzień." },
      { title: "Serwis terenowy", text: "Pytanie o konfigurację słupków." }
    ],
    activeThread: {
      title: "Oferta #4821 - Delta Fence",
      badge: "Status: Wysyłka PDF",
      messages: [
        "Anna: Proszę potwierdzić rabat dla klienta Delta Fence.",
        "Michał: Potwierdzone - 8%, oferta gotowa do wysyłki.",
        "System: PDF oferty #4821 został wygenerowany.",
        "Anna: Wysyłam klientowi i oznaczam task jako zamknięty."
      ],
      composerPlaceholder: "Pole szybkiej odpowiedzi",
      composerActions: ["Dodaj załącznik", "Wyślij"],
      decisionsTitle: "Ostatnie decyzje",
      decisions: [
        "Rabat 8% zaakceptowany przez Sales Admin.",
        "PDF wygenerowany i przekazany do klienta.",
        "Termin follow-up: dzisiaj 16:30."
      ]
    },
    contextPanel: {
      title: "Kontekst sprawy",
      rows: [
        "Klient: Delta Fence",
        "Opiekun: Anna Kowalska",
        "Wartość oferty: 42 180 PLN",
        "Termin decyzji: dzisiaj 16:30"
      ],
      tasks: [
        "Potwierdź warunki płatności.",
        "Przekaż status do produkcji."
      ]
    }
  },

  notifications: {
    title: "Centrum powiadomień",
    filters: ["Wszystkie", "Nieprzeczytane", "Oferty", "Firma", "System"],
    summaries: [
      {
        title: "14 powiadomień dzisiaj",
        text: "5 wymaga akcji handlowca."
      },
      {
        title: "3 alerty krytyczne",
        text: "2 oferty + 1 błąd synchronizacji."
      },
      {
        title: "Obieg alertów",
        text: "Oferty krytyczne trafiają do Sales Admin i opiekuna klienta. Alert systemowy bez akcji zamyka się automatycznie po 24h. Wnioski firmowe eskalują się po 8h bez odpowiedzi."
      }
    ],
    timeline: [
      {
        group: "Dzisiaj",
        items: [
          { title: "Oferta #4821", text: "Klient zaakceptował warunki handlowe." },
          { title: "Biblioteka Produktów", text: "Sync arkusza zakończony powodzeniem." },
          { title: "Komunikator", text: "Zespół handlowy oznaczył konwersację jako pilną." }
        ]
      },
      {
        group: "Wczoraj",
        items: [
          { title: "Firma i Użytkownicy", text: "Nowy wniosek o dołączenie od Jan Wrona." },
          { title: "System", text: "Zaplanowano okno serwisowe na sobotę 22:00." },
          { title: "Panel Ofertowy", text: "3 oferty oznaczone jako gotowe do wysyłki." }
        ]
      }
    ]
  }
};
