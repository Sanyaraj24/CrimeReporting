import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

// Add CORS middleware
app.use(
	'/*',
	cors({
		origin: '*',
		allowMethods: ['POST', 'GET', 'OPTIONS'],
		allowHeaders: ['Content-Type'],
		exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
		maxAge: 600,
	})
);

app.get('/', (c) => {
	return c.json({ message: 'Welcome to Crime Reporting API' });
});

//POST METHOD TO POST CRIME FOMR
app.post('/submit-report', async (c) => {
	try {
		//console.log('Received request');
		const data = await c.req.json();
		//console.log('Received data:', data);

		// Required Fields
		const requiredFields = [
			'title',
			'description',
			'incident_date',
			'address',
			'district',
			'landmark',
			'pincode',
			'crime_type',
			'severity_level',
		];

		// Check for missing required fields
		const missingFields = requiredFields.filter((field) => !data[field]);
		if (missingFields.length > 0) {
			console.log('Missing fields:', missingFields);
			return c.json(
				{
					success: false,
					error: `Missing required fields: ${missingFields.join(', ')}`,
				},
				400
			);
		}

		// Validate date format
		const dateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(.\d{3})?Z)?$/;
		if (!dateRegex.test(data.incident_date)) {
			console.log('Invalid date format:', data.incident_date);
			return c.json(
				{
					success: false,
					error: 'Invalid date format. Use YYYY-MM-DD or ISO format',
				},
				400
			);
		}

		// Ensure DB is available
		if (!c.env.DB) {
			console.error('Database connection not found');
			return c.json(
				{
					success: false,
					error: 'Database connection not found',
				},
				500
			);
		}

		// Insert into database
		const { success, error, meta } = await c.env.DB.prepare(
			`INSERT INTO crime_reports (
        title, description, incident_date, address, district, landmark, pincode,
        crime_type, severity_level, latitude, longitude, weapon_used, estimated_loss,
        num_victims, victim_injury_level, victim_age_range, victim_gender, num_suspects,
        suspect_description, suspect_vehicle_description, suspect_direction_of_travel,
        num_witnesses, physical_evidence_description, reporter_contact, is_anonymous,
		image_urls
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`
		)
			.bind(
				data.title,
				data.description,
				data.incident_date,
				data.address,
				data.district,
				data.landmark,
				data.pincode,
				data.crime_type,
				data.severity_level,
				data.latitude,
				data.longitude,
				data.weapon_used,
				data.estimated_loss,
				data.num_victims,
				data.victim_injury_level,
				data.victim_age_range,
				data.victim_gender,
				data.num_suspects,
				data.suspect_description,
				data.suspect_vehicle_description,
				data.suspect_direction_of_travel,
				data.num_witnesses,
				data.physical_evidence_description,
				data.reporter_contact,
				data.is_anonymous,
				JSON.stringify(data.image_urls || [])
			)
			.run();

		if (!success) {
			console.error('Database insertion failed:', error);
			return c.json(
				{
					success: false,
					error: 'Failed to insert report into database',
					details: error,
				},
				500
			);
		}

		console.log('Database insertion successful:', meta);

		// Return success response
		return c.json({
			success: true,
			message: 'Crime report successfully submitted',
			result: {
				reportId: meta.last_row_id, // Use meta.last_row_id for D1
				timestamp: new Date().toISOString(),
			},
		});
	} catch (error) {
		console.error('Error processing request:', error.stack || error);
		return c.json(
			{
				success: false,
				error: 'Internal server error',
				details: error.message,
				timestamp: new Date().toISOString(),
			},
			500
		);
	}
});

//GET TO FETCH ALL CRIME REPORTS--------CRIME FEED
app.get('/crime-feed', async (c) => {
	try {
		if (!c.env.DB) {
			console.log('Database connection not found');
			return c.json(
				{
					success: false,
					error: 'Database connection not found',
				},
				500
			);
		}
		const result = await c.env.DB.prepare('SELECT * FROM crime_reports ORDER BY incident_date DESC').all();

		return c.json({
			success: true,
			count: result.results.length,
			data: result.results,
		});
	} catch (error) {
		console.log('Error while fetching crime reports', error.stack || error);
		return c.json(
			{
				success: false,
				error: 'Internal Server error',
				details: error.message,
			},
			500
		);
	}
});

//API REQUEST TO POST THE USERS INFORMATION ON DATABASE--
app.post('/add-user', async (c) => {
	try {
		const { id, name, email, phone, photo_url, location, pincode } = await c.req.json();
		if (!c.env.DB) {
			console.error('Database connection not found');
			return c.json({ success: false, error: 'Database connection not found' }, 500);
		}
		// Upsert: update if exists, insert if not
		const result = await c.env.DB.prepare(
			`INSERT INTO users (
			  id, name, email, phone, photo_url, location, pincode
			) VALUES (?, ?, ?, ?, ?, ?, ?)
			ON CONFLICT(id) DO UPDATE SET
			  name = excluded.name,
			  email = excluded.email,
			  phone = excluded.phone,
			  photo_url = excluded.photo_url,
			  location = excluded.location,
			  pincode = excluded.pincode`
		)
			.bind(
				id || email, // Use email as ID if no id provided
				name || '', // Default empty name if not provided
				email,
				phone || null,
				photo_url || null,
				location || null,
				pincode || null
			)
			.run();

		return c.json({
			success: true,
			message: 'User profile saved/updated',
			userId: id || email,
		});
	} catch (error) {
		console.error('User profile save error:', error);
		return c.json(
			{
				success: false,
				error: 'Failed to save user',
				details: error.message,
			},
			500
		);
	}
});

//FETCH USERS DETAIL TO DISPLAY ON DASHBOARD-----
// FETCH USER DETAILS TO DISPLAY ON DASHBOARD
app.get('/get-user', async (c) => {
	const id = c.req.query('id');

	// Validate ID
	if (!id) {
		return c.json(
			{
				success: false,
				error: 'Missing user ID',
			},
			400
		);
	}

	try {
		// Prepare and execute the query
		const query = c.env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(id);
		const user = await query.first();

		if (!user) {
			return c.json(
				{
					success: false,
					error: 'User not found',
				},
				404
			);
		}

		// Return successful response
		return c.json({
			success: true,
			data: user,
		});
	} catch (err) {
		console.error('Database error:', err);
		return c.json(
			{
				success: false,
				error: err.message || 'Failed to fetch user details',
			},
			500
		);
	}
});

// GET TO FETCH SINGLE CRIME REPORT BY ID
app.get('/get-crime/:id', async (c) => {
	try {
		// Extract ID from route parameters
		const id = c.req.param('id');

		// Validate ID
		if (!id || isNaN(Number(id))) {
			return c.json(
				{
					success: false,
					error: 'Invalid crime report ID',
				},
				400
			);
		}

		// Check database connection
		if (!c.env.DB) {
			console.log('Database connection not found');
			return c.json(
				{
					success: false,
					error: 'Database connection not found',
				},
				500
			);
		}

		// Query database for single report
		const result = await c.env.DB.prepare('SELECT * FROM crime_reports WHERE id = ?').bind(id).first();

		if (!result) {
			return c.json(
				{
					success: false,
					error: 'Crime report not found',
				},
				404
			);
		}

		// Return successful response
		return c.json({
			success: true,
			data: result,
		});
	} catch (error) {
		console.log('Error while fetching crime report', error.stack || error);
		return c.json(
			{
				success: false,
				error: 'Internal Server error',
				details: error.message,
			},
			500
		);
	}
});
export default app;
