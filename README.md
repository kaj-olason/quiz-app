# quiz-app

## Om quizen
Detta är en quiz med möjlighet för att välja bland flera quiz. Varje fråga i quizen går på tid, nedräkning från 10 sekunder. 
Innan du börjar ditt quiz-spel blir du tillfrågat ditt namn ifall det är första gången du spelar i din webbläsare, i annat fall får ditt namn en välkomnande text. 
För varje fråga tilldelas du en poäng. Är tiden ute, så går spelet automatiskt till nästa fråga. Du blir ombedd att skynda dig när de är bara 5 sekunder kvar. 
När spelet sedan är slut kommer du till resultatsidan där du får se din poäng samt maxpoäng. 

Där vill vi också få tillägga att tekniskt sett byggdes det även in en array i ett objekt som funktionsmässigt samlar upp information som själva frågan, rätta svaret på frågan, det svaret som spelaren valde efter spelets gång, och även spelarens namn och skickas vidare till resultatsidan. 
Dessvärre fanns det inte tid för att med den informationen i behåll bygga en mer utförlig resultatsida.

## Självreflektion i vårt arbete
Vi har dessvärre stött på en smärre bugg i vårt project. Vi är övertygade om att de rör sig om ett index-fel (räknare som håller reda på var i quizen vi är), där de loopas igen en gång för mycket gällande en funktionsdel i quizen till skillnad mot vad andra delar behöver för att fungera korrekt.
Vi kan se bestämt fördelaktigt att mera strategiskt lägga tid på att planera och organisera vår kod bättre, för exempelvis sedan få det lättare att felsöka och hitta lösning på eventuella buggar som uppstår.

Quizen live kan ni se [här](https://chas-quiz-app.netlify.app/)

