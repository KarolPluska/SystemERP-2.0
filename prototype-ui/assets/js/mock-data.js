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
          "Oferta #4821 - Delta Fence czeka na akceptację rabatu.",
          "Oferta #4818 - Nova Garden wymaga potwierdzenia terminu."
        ],
        cta: "Przejdź do ofert"
      },
      {
        key: "chat",
        title: "Nowe rozmowy / wiadomości",
        count: "4",
        items: [
          "Wątek Oferta #4821 - 3 nowe wiadomości od opiekuna klienta.",
          "Wiadomość od produkcji - korekta terminu realizacji."
        ],
        cta: "Otwórz Komunikator"
      },
      {
        key: "inbox",
        title: "Alerty / synchronizacja / błędy",
        count: "3",
        items: [
          "Sync biblioteki: 1 konflikt SKU wymaga ręcznej decyzji.",
          "Alert systemowy: 2 rekordy oczekują na ponowną walidację."
        ],
        cta: "Przejdź do Powiadomień"
      }
    ],
    continueItems: [
      { label: "Ostatnia oferta", value: "#4821 - Delta Fence" },
      { label: "Ostatnia rozmowa", value: "Wątek: Oferta #4821" },
      { label: "Ostatnia firma / klient", value: "Nova Garden Sp. z o.o." },
      { label: "Ostatnia akcja biblioteki", value: "Sync cennika zakończony 10 min temu" }
    ],
    quickActions: [
      { key: "offers", label: "Otwórz Panel Ofertowy" },
      { key: "chat", label: "Otwórz Komunikator" },
      { key: "inbox", label: "Otwórz Powiadomienia" },
      { key: "company", label: "Dodaj użytkownika" },
      { key: "library", label: "Wymuś sync biblioteki" }
    ],
    inboxEvents: [
      { title: "Klient zaakceptował warunki", text: "Oferta #4809 przechodzi do finalnego PDF." },
      { title: "Nowy wniosek o dołączenie", text: "Jan Wrona czeka na zatwierdzenie roli handlowca." },
      { title: "Sync biblioteki zakończony", text: "6 zmian gotowych do publikacji po review." },
      { title: "Oferta gotowa do PDF", text: "Oferta #4821 oznaczona jako gotowa do wysyłki." }
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
      { value: "14", label: "Aktywni użytkownicy" },
      { value: "3", label: "Wnioski oczekujące" },
      { value: "2", label: "Relacje B2B do review" }
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
      rows: [
        "Model: Producent -> Partner -> Handlowiec",
        "Rola aktualna: Administrator firmy",
        "Powiązane firmy: Delta Fence, Nova Garden"
      ],
      actions: ["Dodaj relację A->B", "Zaproś użytkownika"]
    },
    teamTable: {
      title: "Zespół i dostępy",
      columns: ["Imię i nazwisko", "Rola", "Status", "Zakres", "Ostatnia aktywność", "Akcje"],
      rows: [
        ["Anna Kowalska", "Sales Admin", "Aktywny", "Pełny panel ofert", "Dzisiaj 09:14", "Edytuj / Zawieś"],
        ["Michał Lis", "Handlowiec", "Aktywny", "Oferty i komunikator", "Dzisiaj 08:41", "Edytuj / Uprawnienia"],
        ["Karolina Nowak", "Handlowiec", "Oczekuje", "Weryfikacja konta", "Wczoraj 15:20", "Zatwierdź / Odrzuć"]
      ]
    },
    actionQueue: {
      title: "Kolejka akcji",
      items: [
        "Zaproś nowego handlowca - przygotuj rolę i ograniczenia katalogu.",
        "Potwierdź relację B2B - Delta Fence czeka na dostęp do biblioteki."
      ]
    },
    joinRequests: {
      title: "Wnioski o dołączenie",
      items: [
        "Jan Wrona - prośba o dołączenie jako handlowiec regionalny.",
        "Magda Zielińska - prośba o rolę operatora katalogu."
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
