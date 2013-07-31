<pre><code>              __  .__                                                          
 __ _________/  |_|__| _____   ____             ___________  _______  __ ____  
|  |  \____ \   __\  |/     \_/ __ \   ______  / ___\_  __ \/  _ \  \/ // __ \ 
|  |  /  |_> >  | |  |  Y Y  \  ___/  /_____/ / /_/  >  | \(  <_> )   /\  ___/ 
|____/|   __/|__| |__|__|_|  /\___  >         \___  /|__|   \____/ \_/  \___  >
      |__|                 \/     \/         /_____/                        \/ </code></pre>

An [Uptime](https://github.com/fzaninotto/uptime) plugin that sends notifications to the [Grove.io](http://grove.io) IRC service. Supports sending each of Uptime's notice types to a list of Grove channels.

Installation
============

Download and install the node package.

```bash
$ npm install uptime-grove
```

To enable the plugin, place the following in ./plugins/index.js

```javascript
exports.init = function() {
  require('uptime-grove').init();
}
```

Then configure the plugin with your Uptime site. Here is an example.

```yaml
grove:
  event:
    up:
      - 'ieuPAr8UIQ24NAeqV1r9s0pHBHR7RTL9wq'
    down:
      - 'ieuPAr8UIQ24NAeqV1r9s0pHBHR7RTL9wq'
    paused:
    restarted:
  dashboardUrl: 'http://localhost:8082'
```

Much respect due
================

This code is derived from Paul Dixon's [uptime-webhooks](https://github.com/mintbridge/uptime-webhooks).
