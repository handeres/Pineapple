# CAS FEE 2016/2017 Projekt 2
![Pineapple](https://github.com/handeres/Pineapple/blob/master/src/client/app/App_Resources/Android/drawable-hdpi/pineappledocu.png)

Eine auf NativeScript und Angular 2 basierende App für die Kommunikation von Kindergarten Lehrpersonen und den Eltern der Kinder.

# Installation NativeScript und Android Emulation

 1. Vorgängig überprüfen, ob auf dem Rechner die VTx (BIOS) eingeschaltet ist
 2. Falls Hyper-V installiert ist, muss dieser deinstalliert werden. Ansonsten kann der intelhaxm-android Treiber, welcher die Hardwarebeschleunigung für den Android Emulator nutzt, nicht installiert werden.
 3. Sämtliche Programme auf dem Rechner schliessen und einen Command-Prompt aufrufen (Admin Modus)
 4. Folgenden Befehl im Command-Prompt ausführen:
    `@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://raw.githubusercontent.com/NativeScript/nativescript-cli/production/setup/native-script.ps1'))"`
 5. Mit `"A"` Bestätigen, damit nicht ständig nachgefragt wird
 6. Nach der Installation muss der Benutzer auf dem Rechner abgemeldet und wieder angemeldet werden, damit die Änderungen aktiv werden. Hier einen Neustart durchführen
 7. NativeScript via npm installieren: `npm install nativescript -g`
 8. Testen der NativeScript Installation mit: `tsc --version`

# Erstellen einer AVD (Android Virtual Device)
- Siehe Word Dokument `docs/erstellen_einer_avd.docx`

# Achtung!
- Im Netzwerk der HSR kann nicht auf die MongoDB connteded werden. Es wird vom Server eine Exception geworfen.
- Vorschlag: Handy Hotspot einrichten

# Build and Test
- Für Client:   `[Projektpfad]/Pineapple/src/client> npm install`
- Für Server:   `[Projektpfad]/Pineapple/src/server> npm install`

# Starten des Servers
- `[Projektpfad]/Pineapple/src/server> node index.js`

# Starten der Android Emulation (Client)
- `[Projektpfad]/Pineapple/src/client> tns run android`

# Unit Test
- Starten der Unit Test auf dem Server: `[Projektpfad]/Pineapple/src/server> npm test`
- Clientseitig sind mit NativeScript und Angular 2 derzeit leider keine Unit Test möglich

# Bedienungsanleitung
- Die erste Vorgehensweise mit der App sind in der Bedienungsanleitung beschrieben. `[Projektpfad]/docs/Bedienungsanleitung Pineapple App.docx`

# User Experience Test
- Den User Experience Test hat ein Arbeitskollege durchgeführt. Fotos in Word Dokument. `[Projektpfad]/docs/User Experience Test.docx`

# Vorhandene Login für schnellen Einstieg
- Organisation
    E-Mail: org@org.ch
    Passwort: 123456
- Eltern
    E-Mail: parent@parent.ch
    Passwort: 123456

# Dokumentation des Source Code mit Compodoc
- Offline: `[Projektpfad]/Pineapple/src/client/documentation/index.html`
- Online: `http://127.0.0.1:3333/static/index.html` wenn Server über index.js gestartet wurde. Nur für Abgabe. Würde nicht produktiv eingesetzt werden.

# Probleme
- PDF PlugIn funktioniert derzeit nicht mit NativeScript und Angular 2. Der Stundenplan wurde deshalb online in App integriert.
- Clientseitig sind mit NativeScript und Angular 2 derzeit leider keine Unit Test möglich. Unit Test auf Server wurden mit mocha und chai erstellt.
- Beim Plug In nativescript-imagepicker mussten wir dependencies manuell anpassen, damit diese mit dem Plug In  nativescript-telerik-ui-pro funktioniert. Deshalb wurde das Plug In nativescript-imagepicker eingecheckt.
- Bild Cropper PlugIn funktioniert derzeit nicht mit NativeScript und Angular 2

# Geplante Erweiterungen der App und Website
- Kommunikation unter den Lehrpersonen mit einem Chat innherhalb einer Schule/Kindergarten
- Kommunikation unter den Lehrpersonen von verschiedenen Schulen
- Kommunikation unter den Lehrpersonen und den Eltern der Schulkinder/Kindergartenkinder
- Zeitmanagement der Lehrpersonen. Was muss wann welches Kind tun z.B. Logopädie
- Livestream/Activitystream/Pinnwand von Bilder der Klassen für die Eltern
- Reporting für z.B. Statistiken. Stundenplan, Abwesenheit
- Klassenverwaltung für Kinder und Eltern. Eintragen von Eigernschaften der Kinder wie Medikamentenabgabe, Allergien usw.
- Bevorstehende Ereignisse können den Eltern kommuniziert werden. Die Lehrpersonen können die Ereignisse verwalten
- Abwesenheiten von Kindern können von den Eltern zu den Lehrpersonen kommunziert werden
- Ausdrucken von Listen wie z.B. Klassenliste, Wochenplan, Jahresevents
- Website für das Verwalten der Schule/Kindergarten, Klassenräume, Lehrpersonen, Klassen und Eltern. 
- Plattform für Ideen Austausch unter den Lehrpersonen. Themenmappen, Bastelanleitungen usw.
- Plattform für Lieferanten, welche ihre Produkte anbieten können

