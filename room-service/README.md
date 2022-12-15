# Szablon dla serwisów Hotelu

## Wymagania
- Node 19.2.0
- npm 8.19.3

## Struktura
```
|
├── docs 1.
├── Dockerfile 2.
├── package.json 3.
└── src
    ├── config 4.
    │   └── db 4.1
    ├── framework 5.
    │   └── middlewares 5.1
    │       └── withAuth 5.1.1
    ├── schemas 6.
    ├── server 7.
    │   ├── routes 7.1 
    │   └── router.js 7.2
    ├── services 8.
    ├── http 9.
    │   └── internalFetcher 9.1 
    ├── utils 10.
    │   ├── genericErrorResponse 10.1 
    │   ├── mongooseErrorResponse 10.2 
    │   └── roles 10.3 
    └── index.js 11.
```

1. Dokumentacja api
2. Konfiguracja kontynera serwisu.
3. Konfiguracja paczki js'owej.
4. Pliki konfiguracyjne
   1. Plik do połączenia z bazą
5. Folder zawierający wszelkiego rodzaju modyfikacje czy pipe dla frameworka
   1. Folder z tzw. middlewarami, czyli funkcje, które są wykonywane między requestem a logiką
      1. Middleware wymuszający autoryzację. Podajemy jako argument minimalną rolę, w razie niespełnienia warunku, użytkownik otrzymuję błąd 403
6. Schemy do mongoose
7. Pliki serwerowe
   1. Endpointy do serwisów. Każdy folder to inny endpoint. Np routes/health to request na URL/health
   2. Konfiguracja routera
8. Logika biznesowa
9. Zapytania http
   1. Fetcher do zapytań http międzyserwisowych
10. Narzędzia pomocnicze
    1. Generyczna funkcja tworząca reponse błędu.
    2. Funkcja do przechwytywania błędu mongoose i zwrócenie go jako błąd do użytkownika
    3. Enum z rolami w systemie
11. Entry point serwera. Zawiera start serwera.