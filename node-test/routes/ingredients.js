var express = require('express');
var uuid = require('uuid');
var lodash = require('lodash');
// grab the images model
var Ingredients = require('../schema/ingredient');
var router = express.Router();

const testUsername = "testUser"


/* GET favorite images. */
router.get('/all', async function (req, res) {

    var sortedIngredients = [];
    var userIngredients = await Ingredients.findOne({ username: testUsername }).exec();
    if (userIngredients && userIngredients.ingredients) {
        var currentFirst = lodash.filter(userIngredients.ingredients, { 'head': true })[0];
        sortedIngredients.push(currentFirst);

        while (currentFirst.next !== null) {
            currentFirst = lodash.filter(userIngredients.ingredients, { 'refId': currentFirst.next })[0];
            sortedIngredients.push(currentFirst);
        }
        res.send(sortedIngredients);
    } else {
        res.send([]);
    }
});

router.post('/add', async function (req, res, next) {

    var newIngredient = {
        refId: uuid.v4(),
        name: req.body.name,
        head: true,
        next: null
    };
    var userIngredients = await Ingredients.findOne({ username: testUsername }).exec();

    if (userIngredients && userIngredients.ingredients) {
        var currentFirst = lodash.filter(userIngredients.ingredients, { 'head': true })[0];
        newIngredient.next = currentFirst.refId;

        //update the existing head link
        var result1 = await Ingredients.update(
            { username: testUsername, 'ingredients.refId': currentFirst.refId, },
            {
                $set: { 'ingredients.$.head': false, },
            },
            (err, result) => {
                if (err) {
                    console.log({ error: 'Unable to update ingredients.', err });
                } else {
                    console.log("List updated: ", result);
                }
            }
        );

        //add new ingredient and make as the head
        var result2 = await Ingredients.updateOne(
            { username: testUsername },
            {
                $addToSet: { 'ingredients': newIngredient }
            },
            (err, result) => {
                if (err) {
                    console.log({ error: 'Unable to update ingredients.', err });
                } else {
                    console.log("New ingredient added: ", result);
                }
            }
        );
    } else {
        var newEntry = Ingredients({
            username: testUsername,
            ingredients: [newIngredient],
            created_at: new Date()
        });
        newEntry.save(function (err) {
            if (err) throw err;
            console.log('List created!');
        });
    }
    res.send(newIngredient);
});

router.post('/move', async function (req, res) {

    var userIngredients = await Ingredients.findOne({ username: testUsername }).exec();
    if (userIngredients && userIngredients.ingredients) {
        var from = lodash.filter(userIngredients.ingredients, { 'refId': req.body.from.refId })[0];
        var to = lodash.filter(userIngredients.ingredients, { 'refId': req.body.to.refId })[0];
        var isOptUp = req.body.optUp;

        if (from.head === true) {
            await removeFirst(from, to);
            console.log("removeFirst")
        }
        else if (from.next === null) {
            await removeLast(from, to);
            console.log("removeLast")
        } else {
            await removeMiddle(from, to);
            console.log("removeMiddle")
        }

        if (isOptUp) {
            if (to.head === true) {
                await insertFirst(from, to);
                console.log("insertFirst")
            } else {
                await insertBefore(from, to);
                console.log("insertBefore")
            }
        } else {
            if (to.next === null) {
                await insertLast(from, to);
                console.log("insertLast")
            } else {
                await insertAfter(from, to);
                console.log("insertAfter")
            }
        }
    }
    res.send([]);
});

const removeFirst = async (from) => {
    var result0 = await Ingredients.update(
        { username: testUsername, 'ingredients.refId': from.refId, },
        {
            $set: {
                'ingredients.$.head': false,
            },
        },
        (err, result) => {
            if (err) {
                console.log({ error: 'Unable to update ingredients.', err });
            } else {
                console.log("List updated: ", result);
            }
        }
    );
    var result1 = await Ingredients.update(
        { username: testUsername, 'ingredients.refId': from.next, },
        {
            $set: {
                'ingredients.$.head': true,
            },
        },
        (err, result) => {
            if (err) {
                console.log({ error: 'Unable to update ingredients.', err });
            } else {
                console.log("List updated: ", result);
            }
        }
    );
    return result1;
}

const removeLast = async (from) => {
    var result0 = await Ingredients.update(
        { username: testUsername, 'ingredients.next': from.refId, },
        {
            $set: {
                'ingredients.$.next': null,
            },
        },
        (err, result) => {
            if (err) {
                console.log({ error: 'Unable to update ingredients.', err });
            } else {
                console.log("List updated: ", result);
            }
        }
    );
    return result0;
}

const removeMiddle = async (from) => {
    var result0 = await Ingredients.update(
        { username: testUsername, 'ingredients.next': from.refId, },
        {
            $set: {
                'ingredients.$.next': from.next,
            },
        },
        (err, result) => {
            if (err) {
                console.log({ error: 'Unable to update ingredients.', err });
            } else {
                console.log("List updated: ", result);
            }
        }
    );
    return result0;
}

const insertFirst = async (from, to) => {
    var result1 = await Ingredients.update(
        { username: testUsername, 'ingredients.refId': from.refId, },
        {
            $set: {
                'ingredients.$.next': to.refId,
                'ingredients.$.head': true,
            },
        },
        (err, result) => {
            if (err) {
                console.log({ error: 'Unable to update ingredients.', err });
            } else {
                console.log("List updated: ", result);
            }
        }
    );
    var result1 = await Ingredients.update(
        { username: testUsername, 'ingredients.refId': to.refId, },
        {
            $set: {
                'ingredients.$.head': false,
            },
        },
        (err, result) => {
            if (err) {
                console.log({ error: 'Unable to update ingredients.', err });
            } else {
                console.log("List updated: ", result);
            }
        }
    );
    return result1;
}

const insertBefore = async (from, to) => {
    var result0 = await Ingredients.update(
        { username: testUsername, 'ingredients.next': to.refId, },
        {
            $set: {
                'ingredients.$.next': from.refId,
            },
        },
        (err, result) => {
            if (err) {
                console.log({ error: 'Unable to update ingredients.', err });
            } else {
                console.log("List updated: ", result);
            }
        }
    );
    var result1 = await Ingredients.update(
        { username: testUsername, 'ingredients.refId': from.refId, },
        {
            $set: {
                'ingredients.$.next': to.refId,
            },
        },
        (err, result) => {
            if (err) {
                console.log({ error: 'Unable to update ingredients.', err });
            } else {
                console.log("List updated: ", result);
            }
        }
    );
    return result1;
}

const insertLast = async (from, to) => {
    var result0 = await Ingredients.update(
        { username: testUsername, 'ingredients.refId': from.refId, },
        {
            $set: {
                'ingredients.$.next': null,
            },
        },
        (err, result) => {
            if (err) {
                console.log({ error: 'Unable to update ingredients.', err });
            } else {
                console.log("List updated: ", result);
            }
        }
    );
    var result1 = await Ingredients.update(
        { username: testUsername, 'ingredients.refId': to.refId, },
        {
            $set: {
                'ingredients.$.next': from.refId,
            },
        },
        (err, result) => {
            if (err) {
                console.log({ error: 'Unable to update ingredients.', err });
            } else {
                console.log("List updated: ", result);
            }
        }
    );
    return result1;
}

const insertAfter = async (from, to) => {
    var result0 = await Ingredients.update(
        { username: testUsername, 'ingredients.refId': to.refId, },
        {
            $set: {
                'ingredients.$.next': from.refId,
            },
        },
        (err, result) => {
            if (err) {
                console.log({ error: 'Unable to update ingredients.', err });
            } else {
                console.log("List updated: ", result);
            }
        }
    );
    var result1 = await Ingredients.update(
        { username: testUsername, 'ingredients.refId': from.refId, },
        {
            $set: {
                'ingredients.$.next': to.next,
            },
        },
        (err, result) => {
            if (err) {
                console.log({ error: 'Unable to update ingredients.', err });
            } else {
                console.log("List updated: ", result);
            }
        }
    );
    return result1;
}

module.exports = router;
