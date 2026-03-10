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
      { value: "14", label: "Aktywni użytkownicy" },
      { value: "3", label: "Wnioski oczekujące" },
      { value: "2", label: "Relacje B2B do review" }
    ],
    companyCard: {
      title: "Dane firmy",
      rows: [
        "Nazwa: Zegger Partner Sp. z o.o.",
        "NIP: 000-000-00-00",
        "Status umowy: Aktywna",
        "Kod dołączenia: ZEGGER-B2B-21A7"
      ],
      adminDetails: [
        { label: "Osoba kontaktowa główna", value: "Anna Kowalska" },
        { label: "Telefon", value: "+48 601 224 889" },
        { label: "E-mail", value: "anna.kowalska@zegger-partner.pl" },
        { label: "Adres główny", value: "Siedziba - Warszawa" }
      ],
      locations: [
        {
          type: "Siedziba",
          address: "ul. Przemysłowa 12, 02-220 Warszawa",
          note: "Biuro zarządu i administracja",
          isPrimary: true,
          actions: ["Edytuj", "Ustaw jako główny", "Archiwizuj"]
        },
        {
          type: "Oddział handlowy",
          address: "ul. Handlowa 7, 61-888 Poznań",
          note: "Obsługa klientów regionu zachodniego",
          isPrimary: false,
          actions: ["Edytuj", "Ustaw jako główny", "Archiwizuj"]
        },
        {
          type: "Magazyn",
          address: "ul. Składowa 4, 05-800 Pruszków",
          note: "Wydania i kompletacja zamówień",
          isPrimary: false,
          actions: ["Edytuj", "Ustaw jako główny", "Archiwizuj"]
        },
        {
          type: "Produkcja",
          address: "ul. Fabryczna 31, 44-100 Gliwice",
          note: "Linia powłok i cięcie profili",
          isPrimary: false,
          actions: ["Edytuj", "Ustaw jako główny", "Archiwizuj"]
        }
      ],
      actions: ["Edytuj dane firmy", "Dodaj adres", "Regeneruj kod dołączenia"]
    },
    relationsCard: {
      title: "Role i relacje",
      relationModel: "Producent -> Partner -> Handlowiec",
      currentRole: "Administrator firmy",
      relationStatus: "Aktywna współpraca B2B (2 relacje oczekujące)",
      linkedCompanies: ["Delta Fence", "Nova Garden", "BramaTech"],
      relationRecords: [
        { company: "Delta Fence", type: "Partner handlowy", owner: "Anna Kowalska", status: "Aktywna", action: "Zobacz" },
        { company: "Nova Garden", type: "Relacja dystrybucyjna", owner: "Michał Lis", status: "Oczekuje review", action: "Zobacz" },
        { company: "BramaTech", type: "Powiązanie serwisowe", owner: "Karolina Nowak", status: "Weryfikacja", action: "Zobacz" }
      ],
      actions: ["Dodaj relację A->B", "Zaproś użytkownika"]
    },
    teamTable: {
      title: "Zespół i dostępy",
      columns: ["Imię i nazwisko", "Rola", "Status", "Zakres dostępu", "Przypisana lokalizacja", "Ostatnia aktywność", "Akcje"],
      rows: [
        {
          name: "Anna Kowalska",
          role: "Sales Admin",
          status: "Aktywny",
          scope: "Pełny panel ofert",
          location: "Siedziba - Warszawa",
          lastActivity: "Dzisiaj 09:14",
          actions: ["Edytuj", "Uprawnienia", "Zawieś"]
        },
        {
          name: "Michał Lis",
          role: "Handlowiec",
          status: "Aktywny",
          scope: "Oferty i komunikator",
          location: "Oddział handlowy - Poznań",
          lastActivity: "Dzisiaj 08:41",
          actions: ["Edytuj", "Uprawnienia", "Zawieś"]
        },
        {
          name: "Karolina Nowak",
          role: "Handlowiec",
          status: "Oczekuje",
          scope: "Weryfikacja konta",
          location: "Oddział handlowy - Poznań",
          lastActivity: "Wczoraj 15:20",
          actions: ["Akceptuj", "Odrzuć"]
        },
        {
          name: "Jan Wrona",
          role: "Handlowiec regionalny",
          status: "Nowy",
          scope: "Leady i oferty region północ",
          location: "Magazyn - Pruszków",
          lastActivity: "Dzisiaj 10:22",
          actions: ["Akceptuj", "Odrzuć"]
        },
        {
          name: "Magda Zielińska",
          role: "Operator katalogu",
          status: "Weryfikacja",
          scope: "Biblioteka produktów",
          location: "Produkcja - Gliwice",
          lastActivity: "Dzisiaj 08:03",
          actions: ["Edytuj", "Uprawnienia"]
        },
        {
          name: "Piotr Lewandowski",
          role: "Analityk sprzedaży",
          status: "Zawieszony",
          scope: "Raporty i podgląd ofert",
          location: "Siedziba - Warszawa",
          lastActivity: "Wczoraj 12:47",
          actions: ["Edytuj", "Uprawnienia"]
        }
      ]
    },
    actionQueue: {
      title: "Kolejka akcji",
      items: [
        {
          title: "Zaproś nowego handlowca",
          text: "Przygotuj rolę regionalną i zakres katalogu dla Jan Wrona.",
          status: "Pilne",
          badge: "Pilne",
          action: "Otwórz"
        },
        {
          title: "Potwierdź relację B2B",
          text: "Delta Fence czeka na dostęp do biblioteki i panelu ofert.",
          status: "Oczekuje",
          badge: "Dziś",
          action: "Przejdź"
        },
        {
          title: "Zweryfikuj uprawnienia operatora",
          text: "Magda Zielińska wymaga akceptu dostępu do importu CSV/XLSX.",
          status: "Nowe",
          badge: "Review",
          action: "Sprawdź"
        }
      ]
    },
    joinRequests: {
      title: "Wnioski o dołączenie",
      items: [
        {
          subject: "Jan Wrona",
          text: "Wniosek o dołączenie jako handlowiec regionalny (woj. pomorskie).",
          type: "Użytkownik",
          status: "Oczekuje",
          actions: ["Zobacz", "Akceptuj", "Odrzuć"]
        },
        {
          subject: "BramaTech Sp. z o.o.",
          text: "Wniosek o utworzenie profilu firmy i dostęp administracyjny do oddziału handlowego.",
          type: "Firma",
          status: "Nowe",
          actions: ["Zobacz", "Akceptuj", "Odrzuć"]
        },
        {
          subject: "Delta Fence -> Zegger Partner",
          text: "Wniosek o aktywację relacji B2B dla wspólnej obsługi oferty i biblioteki.",
          type: "Relacja B2B",
          status: "Weryfikacja",
          actions: ["Zobacz", "Akceptuj", "Odrzuć"]
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
      connectionStatus: "Połączono",
      sheetName: "Cennik_2026_Master",
      recordCount: "1,694 rekordy",
      lastSync: "10 min temu",
      deltaVsLocal: "12 zmian względem local",
      actions: ["Edytuj źródło", "Wymuś sync", "Historia sync"]
    },
    localCard: {
      title: "Katalog lokalny",
      metrics: [
        { label: "Aktywne rekordy", value: "148" },
        { label: "Draft / do publikacji", value: "6" },
        { label: "Archiwalne", value: "22" },
        { label: "Konflikty", value: "2" }
      ],
      actions: ["Dodaj produkt", "Import CSV/XLSX"]
    },
    pipeline: {
      title: "Pipeline danych",
      steps: [
        { key: "import", label: "Import", count: 12, active: false },
        { key: "validation", label: "Walidacja", count: 8, active: true },
        { key: "merge", label: "Scalanie", count: 4, active: false },
        { key: "publish", label: "Publikacja", count: 6, active: false }
      ],
      summary: [
        { label: "Do publikacji", value: "6" },
        { label: "Konflikty SKU", value: "2" },
        { label: "Braki danych", value: "5" },
        { label: "Ostatni import", value: "10 min temu" }
      ],
      info: [
        "6 rekordów oczekuje na publikację",
        "2 konflikty SKU wymagają decyzji"
      ],
      action: "Przejdź do walidacji"
    },
    issues: {
      title: "Problemy danych",
      items: [
        {
          title: "Konflikt SKU",
          text: "OGR-3D-2500 ma rozbieżną cenę między Google i Local.",
          status: "Konflikt",
          action: "Zobacz konflikt"
        },
        {
          title: "Brakujące dane",
          text: "5 rekordów bez kategorii w imporcie z 10:12.",
          status: "Review",
          action: "Uzupełnij dane"
        },
        {
          title: "Oczekuje publikacji",
          text: "6 rekordów po walidacji czeka na decyzję publikacji.",
          status: "Do publikacji",
          action: "Publikuj zmiany"
        }
      ]
    },
    workspace: {
      title: "Merged workspace danych",
      bulkActionsLabel: "Akcje masowe:",
      bulkActions: ["Publikuj zaznaczone", "Archiwizuj zaznaczone"],
      rows: [
        {
          sku: "OGR-3D-2500",
          name: "Panel 3D 2500",
          category: "Ogrodzenia",
          priceNet: "129.00",
          source: "Google",
          status: "Konflikt SKU",
          alignment: "Różnica",
          lastChange: "Dzisiaj 09:42",
          actions: ["Edytuj", "Konflikty"]
        },
        {
          sku: "SLP-60x40",
          name: "Słupek 60x40",
          category: "Akcesoria",
          priceNet: "38.00",
          source: "Local",
          status: "Do publikacji",
          alignment: "Local override",
          lastChange: "Dzisiaj 08:15",
          actions: ["Edytuj", "Publikuj"]
        },
        {
          sku: "RAL-7016",
          name: "Lakier RAL 7016",
          category: "Dodatki",
          priceNet: "12.00",
          source: "Google",
          status: "Aktywny",
          alignment: "Zgodny",
          lastChange: "Wczoraj 17:24",
          actions: ["Podgląd", "Edytuj"]
        },
        {
          sku: "BRM-SEG-220",
          name: "Segment bramy 220",
          category: "Bramy",
          priceNet: "279.00",
          source: "Local",
          status: "Archiwalny",
          alignment: "Local override",
          lastChange: "Wczoraj 11:03",
          actions: ["Podgląd", "Edytuj"]
        },
        {
          sku: "AKC-MNT-12",
          name: "Mocowanie M12",
          category: "Akcesoria",
          priceNet: "8.90",
          source: "Google",
          status: "Do publikacji",
          alignment: "Zgodny",
          lastChange: "2 godz. temu",
          actions: ["Edytuj", "Publikuj"]
        }
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
