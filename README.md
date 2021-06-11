## App, Project Setup
Abrimos el programa ejecutor de comandos: 
```
cmd
```

Accedemos al directorio donde queremos clonar la APP: 
```
cd "/ruta/directorio/app"
```
Clonamos el repositorio de Git: 
```
git clone https://github.com/MemeGeneratorJCJM/App
```

Accedemos a la carpeta clonada: 
```
cd App
```
#Setup de Cordova y plugins
Añadimos las plataformas donde se ejecutará la App: 
```
cordova platform add browser/android
```

Añdimos el plugin que gestiona la cámara:
```
cordova plugin add cordova-plugin-camera
````

Añdimos el plugin del gestor de ficheros de cordova:
```
cordova plugin add cordova-plugin-file
```
Añdimos el plugin del selector de ficheros:
```
cordova plugin add cordova-plugin-custom-filechooser
```
Añdimos el plugin que gestiona permisos en el sistema android:
```
cordova plugin add cordova-plugin-android-permissions
```

Añdimos el plugin que gestiona el dispositivo en el que estamos
```
cordova plugin add cordova-plugin-device
```
Ejecutar la App:
```
cordova run browser //Ejecución en el navegador web
cordova run android //Ejecución en el emulador android
cordova run android --device //Ejecución en un dispositivo android conectado
```

Con esto la aplicacción de MemeGenerator ya estaría funcionando
