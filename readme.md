# Car Tracker

## Wymagania

- [Node.js](https://nodejs.org/en/) w wersji `>=12`

## Instalacja

1. Pobierz to repozytorium i rozpakuj pliki w folderze
2. Uruchom wiersz poleceń i wejdź nią do katalogu z programem (`cmd.exe` na Windowsie)
3. Zainstaluj zależności uruchamiająć polecenie `npm install`
4. Program jest gotowy do działania

## Uruchomienie

Aby uruchomić program należy wykonać polecenie `npm start` z poziomu wiersza poleceń. Nie należy zamykać okna konsoli, inaczej program zostanie przerwany.

Program zapisuje lokalizację pojazdów do pliku `result.txt`, gdy plik istnieje, dane są do niego dopisywane. Aby zresetować dane, wystarczy usunąć ten plik.

Aktualizacja danych odbywa się co **15 minut**, a dokładniej o każdej wielokrotności 15 minuty godziny (czyli np. 8:00, 8:15, 8:30 i 8:45)

### Result.txt

Plikiem wynikowym jest plik typu **CSV** (wartości są rozdzielone przecinkami). Instniejące kolumny to kolejno:

- Data pobrania informacji
- Identyfikator pojazdu
- Numer rejestracyjny
- Typ pojazdu: `CAR`, `SCOOTER` lub `SMALL_SCOOTER`
- Nazwa pojazdu
- Szerokość geograficzna - **latitude**
- Wysokość geograficzna - **longitude**
