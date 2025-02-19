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
            SELECT ROWID, CREATEDTIME,status, MODIFIEDTIME, Title, description FROM Tasks
        `).then((rows) => rows.map((row) => ({
            id: row.Tasks.ROWID,
            createdTime: row.Tasks.CREATEDTIME,
            modifiedTime: row.Tasks.MODIFIEDTIME,
            status: row.Tasks.status,
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
        const { title, description } = req.body;
        const { catalyst } = res.locals;
        const table = catalyst.datastore().table('Tasks');

        const record = await table.insertRow({
            Title: title,
            description: description,
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


// PUT API. Contains the logic to Update a task.
app.put('/:ROWID', async (req, res) => {
    try {
        const { ROWID } = req.params;
        const { title, description,status } = req.body;
        const { catalyst } = res.locals;

        
        if (isNaN(ROWID)) {
            return res.status(400).send({
                status: 'failure',
                message: 'Invalid ROWID. It must be a number.'
            });
        }
        
        if (!title || !description) {
            return res.status(400).send({
                status: 'failure',
                message: 'Both title and description are required.'
            });
        }
        
        const updatedData = {
            ROWID: ROWID,
            title,
            description,
            status
        };
        const table = catalyst.datastore().table('Tasks');
        const updatedRow = await table.updateRow(updatedData)

        res.status(200).send({
            status: 'success',
            data: {
                updatedRow
            }
        });
        
    } catch (err) {
        console.log(err,"original error");
        res.status(500).send({
            status: 'failure',
            message: "We're unable to process the request."
        });
    }
});

app.delete('/:ROWID', async (req, res) => {
    try {
        const { ROWID } = req.params;
        const { title, description } = req.body;
        const { catalyst } = res.locals;

        if(isNaN(ROWID)) {
            return res.status(400).send({
                status: 'failure',
                message: 'Invalid ROWID. It must be a number'
            })
        }

        const table = catalyst.datastore().table('Tasks');
        const updatedRow = await table.deleteRow(ROWID, title, description);
        res.status(200).send({
            status: 'success',
            data: {
                updatedRow
            }
        })
    } catch (error) {
        console.log(err)
        res.status(500).send({
            status: 'failure',
            message: err.message || "We'are unable to process the request."
        })
    }
});

module.exports = app;