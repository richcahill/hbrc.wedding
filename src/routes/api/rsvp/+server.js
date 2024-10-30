import { GOOGLE_SERVICE_ACCOUNT_JSON } from '$env/static/private';
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
	credentials: JSON.parse(GOOGLE_SERVICE_ACCOUNT_JSON),
	scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

export async function POST({ request }) {
	const { data } = await request.json();
	const sheets = google.sheets({ version: 'v4', auth });
	const spreadsheetId = '17qFnm8OJEXvB_LTAsjmhB57y2pTl-LxQ8Wm0znIs6iQ';
	const range = 'RSVP!A1';

	try {
		// Iterate over each name and append it as a separate row
		for (const name of data.names) {
			await sheets.spreadsheets.values.append({
				spreadsheetId,
				range,
				valueInputOption: 'RAW',
				requestBody: { values: [[name, data.response, data.notes]] }
			});
		}
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
}
