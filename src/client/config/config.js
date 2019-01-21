const endpointPort = ":8000";

const endpointHost = `http://localhost${endpointPort}`;

const endpoint = {
	getIntents: `${endpointHost}/api/getIntents`,
	getApps: `${endpointHost}/api/getApps`,
	getSamples: `${endpointHost}/api/getSamples`,
	train: `${endpointHost}/api/train`,
	login: `${endpointHost}/login`,
	refreshIntent: `${endpointHost}/api/refreshIntent`
};

const headers = [ "value", "samplesNumber", "efficacity", "lastUpdate" ];

const SAMPLESNUMBER = "samplesNumber";
const VALUE = "value";
const LASTUPDATE = "lastUpdate";
const EFFICACITY = "efficacity";
const NEXTINTENTSET = "nextIntentSet";
const PREVINTENTSET = "prevIntentSet";

const samplesNumberTriggerWarning = 20;
/* si il le nombre de samples est inférieur à ce seuil, il sera affiché en italique
(classe css custom dans app.css) */
const efficacityScoreTriggerWarning = 0.5;
/* si le score d'efficacité est inférieur à ce seuil, il sera affiché en rouge
(classe css custom dans app.css) */

export {
	endpoint,
	headers,
	SAMPLESNUMBER,
	VALUE,
	LASTUPDATE,
	EFFICACITY,
	PREVINTENTSET,
	NEXTINTENTSET,
	samplesNumberTriggerWarning,
	efficacityScoreTriggerWarning
};
