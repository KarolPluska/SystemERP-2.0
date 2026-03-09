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
    title: "Launcher wejścia do narzędzi",
    text: "To nie jest dashboard kart - to szybki punkt wejścia do modułów roboczych i decyzji dnia.",
    chips: [
      "Priorytet: Oferty",
      "Tryb: Dzień roboczy",
      "Focus: Inbox i komunikacja"
    ],
    primaryModules: [
      {
        key: "offers",
        category: "Moduł główny",
        title: "Panel Ofertowy",
        text: "Legacy moduł 1:1. W ETAPIE 2 osadzamy go bez zmiany wyglądu, logiki i flow.",
        tags: ["Kalkulacje", "Pozycje", "PDF"],
        cta: "Otwórz"
      },
      {
        key: "company",
        category: "Organizacja",
        title: "Firma i Użytkownicy",
        text: "Role, relacje A-B i kontrola dostępu zespołu handlowego.",
        tags: ["Role", "Relacje", "Onboarding"],
        cta: "Otwórz"
      },
      {
        key: "library",
        category: "Dane",
        title: "Biblioteka Produktów",
        text: "Kontrola sync, scalania i publikacji katalogu produktowego.",
        tags: ["Import", "Walidacja", "Publikacja"],
        cta: "Otwórz"
      },
      {
        key: "chat",
        category: "Komunikacja",
        title: "Komunikator",
        text: "Wątki ofertowe i szybkie decyzje zespołu handlowego.",
        tags: ["Wątki", "Decyzje", "Statusy"],
        cta: "Otwórz"
      }
    ],
    priorities: [
      {
        title: "2 oferty wymagają decyzji",
        text: "Delta Fence i Nova Garden czekają na finał."
      },
      {
        title: "Nowy wniosek o dołączenie",
        text: "Jan Wrona - handlowiec regionalny."
      },
      {
        title: "Sync biblioteki zakończony",
        text: "6 zmian oczekuje na publikację."
      }
    ],
    inboxCard: {
      title: "Powiadomienia",
      text: "Czytelne centrum alertów i wydarzeń.",
      cta: "Otwórz"
    }
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
