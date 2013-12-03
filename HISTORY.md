0.1.0 / 2013.12.03
-------------------

* Updated libraries versions
  - commander (~1.1.1 -> ~2.1.0)
  - consolidate (~0.9.0 -> ~0.10.0)
  - express (~3.2.0 -> ~3.4.6)
  - fs-extra (~0.6.0 -> ~0.8.1)
  - jade (~0.29.0 -> ~0.35.0)
  - mincer (~0.4.5 -> ~0.5.12)
  - node-sass (0.5.2 -> ~0.7.0)
  - request (~2.20.0 -> ~2.27.0)
* Jade version 0.31.0 deprecated implicit text only support for scripts and styles.
* Added library prompt (commander removed confirm & prompt methods)
* Explicit flush response for SSE (connect 2.10.0)


0.0.10 / 2013.07.10
-------------------

* Fixed `node-sass` version to 0.5.2


0.0.9 / 2013.07.09
------------------

* Merge fidgety's PL to stick `node-sass` version to 0.5.2


0.0.8 / 2013.07.04
------------------

* Fixed stderr redirection to log file
* Fixed `winston` configuration
* Fixed cli support for job files in coffeescript


0.0.7 / 2013.06.12
------------------

* Refactor to use `winston` logging
* Fixed dameonize stdio redirection


0.0.6 / 2013.05.29
------------------

* Fixed support for coffee job files
* Fixed dameonize stdio redirection


0.0.5 / 2013.05.17
------------------

* Use js native milliseconds when updating data on widgets


0.0.4 / 2013.05.15
------------------

* Possibility to write jobs in coffeescript


0.0.3 / 2013.05.11
------------------

* Updated `node-sass` version, re-enabled widgets animations
* Updated FontAwesome assets to version 3.0.2
* Support for process daemonize


0.0.2 / 2013.05.02
------------------

* Added ability to install widgets from zipballs
* Added ability to add custom stylesheets
* Merge original PL #115 (Added suffix option for number widget)


0.0.1 / 2013.04.26
------------------
* First release
