# Example Plugin:


```js
// my plugin.js

let pluginApi: any;

// Plugins have an init function which receives a register function from web editor.
export function init(register: Function) {
    
    // register the plugin with web editor and receive the plugin api
    pluginApi = register({
        name: "My awesome Plugin",

        // category for plugin browser
        category: "WEATHER",

        // plugin tags for search
        tags: ["weather", "METAR", "environment"],

        // which apis does this plugin need, requires user consent
        apis: ["weather"]
    })
    
    
}
// Plugins have an onClick function which is called when the plugin is clicked in the editor plugin list.

export function onClick(event: Event) {
    console.log("my plugin was clicked", event);
    
    // example. you can also load weather from live weather services
    const myWeather = { "atmosphere_type": 0, "clouds": { "base": 300, "density": 0, "iprecptns": 0, "thickness": 200 }, "cyclones": [], "dust_density": 0, "enable_dust": false, "enable_fog": false, "fog": { "thickness": 0, "visibility": 0 }, "groundTurbulence": 0, "name": "Winter, clean sky", "qnh": 759.46, "season": { "temperature": 20 }, "type_weather": 0, "visibility": { "distance": 80000 }, "wind": { "at2000": { "dir": 232, "speed": 3.6078 }, "at8000": { "dir": 236, "speed": 4.1232 }, "atGround": { "dir": 221, "speed": 3.6078 } } }
    
    // change the mission weather settings
    pluginApi.setWeather(myWeather);
}
```