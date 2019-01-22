let endpointHost;
if (process.env.NODE_ENV === "production") {
	endpointHost = "https://pylos.jeanpierre.moe/api";
} else {
	endpointHost = "http://localhost:8000/api";
}
const endpoint = {
	login: `${endpointHost}/login`,
	register: `${endpointHost}/register`
};

export {
	endpoint
};
