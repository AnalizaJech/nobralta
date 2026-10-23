# Entorno Laravel — verificado el 21 de octubre de 2026

## Instalado y comprobado

- PHP **8.5.12**, Windows x64 NTS VS17. Runtime nuevo `C:\tools\php-8.5.12`; también se actualizó la ruta anterior `C:\tools\php85` para que el PHP ya resuelto por la terminal esté parchado.
- Copia anterior íntegra: `C:\tools\php85-backup-2026-10-21`. Configuración original y PATH de usuario anteriores en `docs/entorno`.
- Extensiones: bcmath, ctype, curl, DOM/XML, fileinfo, filter, gd, hash, intl, mbstring, openssl, PDO, pdo_mysql, pdo_sqlite, sqlite3, tokenizer, zip y otras incluidas. SQLite permite iniciar desarrollo sin instalar un servicio de base de datos.
- Composer **2.10.3** en `C:\Users\JORGE\AppData\Local\NobraltaTools\composer.phar`. `composer diagnose`, auditoría propia y auditoría global sin avisos conocidos al consultar. La instalación protegida antigua de ProgramData permanece; usa el lanzador del proyecto para seleccionar la actualizada.
- Laravel Installer **5.25.3**, requisitos globales comprobados.
- Node **22.14.0**, npm **11.19.0**, Git **2.48.1** ya presentes. El frontend actual compila con este runtime. Revisar actualizaciones de Node al pasar a un entorno público.

Doble clic en **TERMINAL-LARAVEL.cmd** abre una terminal con PHP nuevo, Composer nuevo y Laravel Installer al principio del PATH para esa terminal.

Comprobaciones desde la raíz:

```powershell
php -v
.\composer.cmd --version
.\composer.cmd diagnose
.\composer.cmd global check-platform-reqs
```

## Parches PHP relevantes

El 21/10/2026 PHP publicó **8.5.12 / 8.4.27 / 8.3.36 / 8.2.35** para dos vulnerabilidades críticas:

- **CVE-2026-109618**: corrupción durante manejo de memoria agotada con datos internos parcialmente inicializados.
- **CVE-2026-109619**: estado global obsoleto que puede sobrevivir a la memoria que lo respaldaba y reutilizarse en otro request.

El aviso afecta instalaciones que atienden solicitudes web. No se abrió ningún servidor PHP público durante esta tarea. Se actualizó la rama 8.5 existente a su parche publicado, sin saltar a un release candidate.

Antecedente: **CVE-2024-4577**, inyección de argumentos en PHP-CGI sobre Windows en configuraciones afectadas. PHP 8.3.8 documentó su parche inicial en junio de 2024. No equivale a decir que todo uso CLI de PHP en Windows tenga ese vector. Los parches posteriores de la rama siguen siendo necesarios.

Fuentes oficiales consultadas:

- https://www.php.net/archive/2026.php#2026-10-21-5
- https://www.php.net/index.php (aviso del 21/10/2026)
- https://www.php.net/downloads.php?os=windows
- https://www.php.net/ChangeLog-8.php#8.3.8
- https://news-web.php.net/php.announce/429
- https://getcomposer.org/download/
- https://laravel.com/framework/docs/13.x/installation

ZIP oficial PHP x64 NTS descargado y SHA256 contrastado con PHP.net:
`2ab242af38d76bdf417cde5ec048b1bcd76a5a40f39a3d15d5f046f38571c477`.
El instalador Composer se contrastó por SHA384 con https://composer.github.io/installer.sig antes de ejecutarlo.

Actualizar PHP no garantiza la seguridad de una aplicación: Laravel, dependencias, autorización, archivos privados, despliegue y configuración tendrán sus propios controles. No se afirmó que el prototipo haya pasado una auditoría de seguridad de producción.

## Para mañana: crear la aplicación, no ejecutado hoy

Laravel 13 requiere PHP >=8.3. PHP 8.5.12 satisface ese requisito. Crear en una carpeta **backend** nueva, sin sustituir este frontend:

```powershell
cd C:\Users\JORGE\Desktop\Proyecto
.\composer.cmd create-project laravel/laravel backend "^13.0"
```

Antes de ejecutar, confirmar que backend no existe. Alternativa desde TERMINAL-LARAVEL.cmd: `laravel new backend` para elegir starter y base de datos interactivamente.

Recomendación de arquitectura: monolito Laravel modular, sin separar servicios/API por necesidad del prototipo. Reutilizar tokens, estilos, assets y componentes; decidir Blade/Livewire o Inertia/React al crear el proyecto según SEO y experiencia final. La autorización, pedidos y saldos deben trasladarse al servidor; no migrar localStorage como mecanismo de seguridad ni inventario.

No se creó aplicación Laravel ni base de datos real en esta sesión.
