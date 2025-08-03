import session from "express-session";
import betterSqlite3Session from "express-session-better-sqlite3";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// Ścieżka względna do bazy danych sesji
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "../../database/sessions.db");

// Inicjalizacja bazy danych SQLite
const sessDb = new Database(dbPath);

// Konfiguracja SQLite jako store sesji
const SqliteStore = betterSqlite3Session(session, sessDb);

// Eksport gotowego middleware sesji
export default session({
	store: new SqliteStore(),
	secret: "WebDev", // Wersja demonstracyjna; w aplikacji produkcyjnej należy używać zmiennych środowiskowych
	resave: true,
	saveUninitialized: false,
	rolling: true,
	unset: "destroy",
	proxy: true,
	cookie: {
		maxAge: 600000, // 10 minut
		httpOnly: false, // Ustawienie dopuszczające dostęp JS z przeglądarki (należy ostrożnie używać)
	},
});
