// domain/.netlify/functions/single-product
const dotenv = require('dotenv')
dotenv.config()

const Airtable = require('airtable-node')
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN })
	.base(process.env.AIRTABLE_BASE)
	.table(process.env.AIRTABLE_TABLE)

exports.handler = async (event, context, cb) => {
	const { id } = event.queryStringParameters
	if (id) {
		try {
			const res = await airtable.retrieve(id)
			if (res.error) return { statusCode: 404, body: 'No product with ' + id }
			const product = { id: res.id, ...res.fields }
			return {
				statusCode: 200,
				body: JSON.stringify(product),
			}
		} catch (error) {
			return {
				statusCode: 500,
				body: 'Server Error',
			}
		}
	}
  
	return {
		statusCode: 400,
		body: 'Please provide product id',
	}
}
