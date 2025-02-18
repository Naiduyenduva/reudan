const express = require('express');
const catalystSDK = require('zcatalyst-sdk-node');
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
	const catalyst = catalystSDK.initialize(req);
	res.locals.catalyst = catalyst;
	next();
});


app.get('/all', async (req, res) => {
    try {
        const { catalyst } = res.locals;
        const zcql = catalyst.zcql();

        // Fetch all tasks with Title and description
        const todoItems = await zcql.executeZCQLQuery(`
            SELECT ROWID, Title, description FROM Tasks
        `).then((rows) => rows.map((row) => ({
            id: row.Tasks.ROWID,
            title: row.Tasks.Title,
            description: row.Tasks.description
        })));

        res.status(200).send({
            status: 'success',
            data: todoItems
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({
            status: 'failure',
            message: err.message || "We're unable to process the request."
        });
    }
});



// POST API. Contains the logic to create a task

app.post('/add', async (req, res) => {
    try {
        const { title, description } = req.body; // Extract title and description
        const { catalyst } = res.locals;
        const table = catalyst.datastore().table('Tasks');

        // Insert a new row into the Tasks table
        const record = await table.insertRow({
            Title: title,  // Ensure correct column name
            description: description
        });

        res.status(200).send({
            status: 'success',
            data: {
                todoItem: {
                    id: record.ROWID,
                    title,
                    description
                }
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({
            status: 'failure',
            message: err.message || "We're unable to process the request."
        });
    }
});



// DELETE API. Contains the logic to delete a task.
app.delete('/:ROWID', async (req, res) => {
	try {
		const { ROWID } = req.params;
		const { catalyst } = res.locals;
		if (isNaN(ROWID)) {
            return res.status(400).send({
                status: 'failure',
                message: 'Invalid ROWID. It must be a number.'
            });
        }
		const table = catalyst.datastore().table('Tasks');
		await table.deleteRow(ROWID);
		res.status(200).send({
			status: 'success',
			data: {
				todoItem: {
					id: ROWID
				}
			}
		})
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: 'failure',
			message: "We're unable to process the request."
		});
	}
});
module.exports = app;