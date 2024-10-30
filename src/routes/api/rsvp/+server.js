import {
	GOOGLE_SERVICE_ACCOUNT_TYPE,
	GOOGLE_PROJECT_ID,
	GOOGLE_PRIVATE_KEY_ID,
	GOOGLE_PRIVATE_KEY,
	GOOGLE_CLIENT_EMAIL,
	GOOGLE_CLIENT_ID,
	GOOGLE_AUTH_URI,
	GOOGLE_TOKEN_URI,
	GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
	GOOGLE_CLIENT_X509_CERT_URL
} from '$env/static/private';
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
	credentials: {
		type: GOOGLE_SERVICE_ACCOUNT_TYPE,
		project_id: GOOGLE_PROJECT_ID,
		private_key_id: GOOGLE_PRIVATE_KEY_ID,
		private_key: GOOGLE_PRIVATE_KEY,
		client_email: GOOGLE_CLIENT_EMAIL,
		client_id: GOOGLE_CLIENT_ID,
		auth_uri: GOOGLE_AUTH_URI,
		token_uri: GOOGLE_TOKEN_URI,
		auth_provider_x509_cert_url: GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
		client_x509_cert_url: GOOGLE_CLIENT_X509_CERT_URL
	},
	scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

export async function POST({ request }) {
	const { data } = await request.json();
	const sheets = google.sheets({ version: 'v4', auth });
	const spreadsheetId = '17qFnm8OJEXvB_LTAsjmhB57y2pTl-LxQ8Wm0znIs6iQ';
	const range = 'RSVP!A1';
	console.log(JSON.parse(GOOGLE_SERVICE_ACCOUNT_JSON).private_key);

	try {
		// Iterate over each name and append it as a separate row
		for (const name of data.names) {
			await sheets.spreadsheets.values.append({
				spreadsheetId,
				range,
				valueInputOption: 'RAW',
				requestBody: {
					values: [[name, data.response, data.dietary, data.song, data.notes]]
				}
			});
		}
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
}
