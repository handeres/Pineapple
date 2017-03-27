#Pineapple
Eine auf NativeScript und Angular 2 basierende App für die Kommunikation von Kindergarten Lehrpersonen und den Eltern der Kinder.

#Installation NativeScript und Android Emulation

 1. Vorgängig überprüfen, ob auf dem Rechner die VTx (BIOS) eingeschaltet ist
 2. Falls Hyper-V installiert ist, muss dieser deinstalliert werden. Ansonsten kann der intelhaxm-android Treiber, welcher die Hardwarebeschleunigung für den Android Emulator nutzt, nicht installiert werden.
 3. Sämtliche Programme auf dem Rechner schliessen und einen Command-Prompt aufrufen (Admin Modus)
 4. Folgenden Befehl im Command-Prompt ausführen: @powershell -NoProfile -ExecutionPolicy Bypass -Command `"iex ((new-object net.webclient).DownloadString('https://raw.githubusercontent.com/NativeScript/nativescript-cli/production/setup/native-script.ps1'))"`
 5. Mit "A" Bestätigen, damit nicht ständig nachgefragt wird
 6. Nach der Installation muss der Benutzer auf dem Rechner abgemeldet und wieder angemeldet werden, damit die Änderungen aktiv werden. Ich empfehle hier einen Neustart
 7. NativeScript via npm installieren: npm install nativescript -g
 8. Testen der NativeScript Installation mit: tsc --version

#Erstellen einer AVD (Android Virtual Device)
- Siehe Word Dokument `docs/erstellen_einer_avd.docx`

#Build and Test
- Für Client:   `[Projektpfad]/Pineapple/src/client> npm install`
- Für Server:   `[Projektpfad]/Pineapple/src/server> npm install`

#Starten der Android Emulation
- `[Projektpfad]/Pineapple/src/client> tns run android`

#Unit Test
- Unit Test auf dem Server: `[Projektpfad]/Pineapple/src/server> npm test`
- Clientseitig sind mit NativeScript und Angular 2 derzeit leider keine Unit Test möglich
