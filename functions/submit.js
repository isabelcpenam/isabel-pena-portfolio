export async function onRequestPost({ request, env }) {
	try {
		const formData = await request.formData();
		const name = formData.get('name')?.toString().trim();
		const email = formData.get('email')?.toString().trim();
		const message = formData.get('message')?.toString().trim();

		if (!name || !email || !message) {
			return Response.json(
				{
					error: 'Name, email, and message are required.',
					message: 'Name, email, and message are required.',
				},
				{ status: 400 },
			);
		}

		if (!env.RESEND_API_KEY) {
			return Response.json(
				{
					error: 'Email service is not configured.',
					message: 'Email service is not configured.',
				},
				{ status: 500 },
			);
		}

		const resendResponse = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.RESEND_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: 'onboarding@resend.dev',
				to: ['isabelcpenam@gmail.com'],
                reply_to: email,
				subject: `Portfolio contact from ${name}`,
				reply_to: email,
				text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
			}),
		});

		if (!resendResponse.ok) {
			const errorDetails = await resendResponse.text();
			console.error('Resend API error:', errorDetails);

			return Response.json(
				{
					error: 'Unable to send your message.',
					message: 'Unable to send your message.',
				},
				{ status: 502 },
			);
		}

		return Response.json({
			success: true,
			message: 'Your message was sent successfully.',
		});
	} catch (error) {
		console.error('Contact form error:', error);

		return Response.json(
			{
				error: 'Unable to process your message.',
				message: 'Unable to process your message.',
			},
			{ status: 500 },
		);
	}
}
