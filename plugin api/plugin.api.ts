import { defineStore } from 'pinia'

// from core api, not directly accessible by plugin api
import { FileStore } from './file'
const fileStore = FileStore();

/* 
 * Plugins receive an instance of PluginStore after they register themselves.
 * They can perform changes to the mission file, read files from the .miz or add their own files.
 */
export const PluginStore = defineStore('plugin', {
    state: () => {
        return {
            permissions: []
        }
    },
    actions: {
        setWeather(weatherJson: any) {
            // do checks here
            fileStore.json.weather = weatherJson;
        },
        setDate(dateJson: any) {
            // do checks here
            fileStore.json.date = dateJson;
        },
        setGoals(goalsJson: any) {
            // do checks here
            fileStore.json.goals = goalsJson;
        },
        setFile(fileName: string, content: any) {
            // do checks here
            fileStore.setFile(fileName, content);
        },
    },
    getters: {
        weather: () => fileStore.json.weather,
        date: () => fileStore.json.date,
        goals: () => fileStore.json.goals,
        getFile: () => (fileName: string) => fileStore.getFile(fileName),
    }
})



