import * as dat from 'dat.gui';
import * as cookie from './cookie';
const ftKeyname = 'feature_toggles';

class FeatureToggle {

    constructor() {
        this.gui = null;
        this.toggleListFolder = null;
    }

    initGui () {
        this.gui = new dat.GUI({
            name: 'Feature toggle GUI'
        });
        this.addToggleFolder();
        this.addToggleInput();
    }

    addToggleFolder () {
        this.toggleListFolder = this.gui.addFolder('Feature toggles');
        this.toggleListFolder.open();
        const ftToggleNames = this.getToggles();
        const ftToggleCookies = {};
        ftToggleNames.forEach((toggle) => {
            ftToggleCookies[toggle] = !!cookie.getCookie(toggle);
        });
        ftToggleNames.forEach(property => {
            this.toggleListFolder
                .add(ftToggleCookies, property)
                .onChange((value) => {
                    this.saveToggleOption(value, property);
                });
        });
    }

    addToggleInput () {
        const f = this.gui.addFolder('Add Toggle');
        f.open();
        const toggleInput = {name: ''};
        f.add(toggleInput, 'name')
            .onFinishChange(value => {
                console.log("On finish", value);
                this.addToggle(value);
                this.toggleListFolder.updateDisplay();
            });
    }

    getToggles () {
        const ftList = localStorage.getItem(ftKeyname);
        return JSON.parse(ftList) || [];
    }

    addToggle (property) {
        const propertyValue = "1";
        const ftToggleNames = this.getToggles();
        if (!ftToggleNames.includes(property)) {
            ftToggleNames.push(property);
            localStorage.setItem(ftKeyname, JSON.stringify(ftToggleNames));
            cookie.createCookie(property, propertyValue, 30);
        }
    }

    saveToggleOption (value, property) {
        this.addToggle(property, value);
        if (value) {
            cookie.createCookie(property, value, 30);
        } else {
            cookie.deleteCookie(property);
        }
    }
}

const featureToggle = new FeatureToggle();
featureToggle.initGui();
