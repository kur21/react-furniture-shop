// domain/.netlify/functions/products
const dotenv = require('dotenv')
dotenv.config()

const Airtable = require('airtable-node')
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN })
	.base(process.env.AIRTABLE_BASE)
	.table(process.env.AIRTABLE_TABLE)

exports.handler = async (event, context, cb) => {
	try {
		const res = await airtable.list({ maxRecords: 200 })
		const products = res.records.map((product) => {
			const { id, fields } = product
			const { name, price, colors, company, description, category, shipping, featured, images } = fields
			const { url } = images[0]
			return {
				id,
				name,
				price,
				image: url,
				featured,
				colors,
				company,
				description,
				category,
				shipping,
			}
		})
		return {
			statusCode: 200,
			body: JSON.stringify(products)
		}
	} catch (error) {
		console.log(error)
		return {
			statusCode: 500,
			body: 'There was an error',
		}
	}
}
