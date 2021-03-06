# Die Konferenz App

## Anwendungsbereich?

Diese Anwendung soll dafür gedacht sein für den Teilnehmer einer Konferenz sich seine Konferenz optimal Planen zu können. 

 * Sie soll eine PWA sein, um auch Offline zu funktionieren.
 * Sie soll für beliebige Konferenzen verwendet werden können.
 * Sie soll kein Backend benötigen, sie braucht nur die Daten.
 * Sie soll keine Benutzeranmeldung erfordern.

## Was soll sie nicht sein?

Eine Planungs Anwendung mit der man aus Veranstaltersicht die Konferenz plant. 

Das wie und womit man eine Konferenz plant gibt es schon Software für und viele machen es auf unterschiedliche Weise. Wenn man aus einem vorhandenn System die Daten rausnimmt und für diese App hier aufbereitet ist man schon fertig.

Auch ohne eine Anwendung wäre es sogar möglich einfach die Daten irgendwo manuell zu erzeugen und statisch dort abzulegen wo die Anwendung zugriff hat. Und schon hat man eine komfortable Konferenz App.

Jedoch kann sich ein anderes Projekt entwickeln mit dem man die Sessions aus Veranstaltersicht Planen kann, und dann die Daten entsprechend aufbereitet. Oder es können Konverter geschrieben werden die aus vorhandenen SaaS oder eigenen Lösungn die Daten aufbereitet. 

## Technologien

* VueJS als SPA Framework (hat die Abstimmung ergeben)
* Keine fetten CSS Framework oder Control Libraries

## Im Internet

Sie ist schon im Internet Deployd, testet sie und file issues
https://vue-conference-app.azurewebsites.net

# Wie man sie zum entwickeln zu laufen bekommt

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
