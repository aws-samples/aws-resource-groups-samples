const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = (event, context, callback) => {
    const getPattern = RegExp("/beer/.+");
    if (getPattern.test(event.path) && event.httpMethod === "GET") {
        handleGetBeer(event, callback)
    } else if (event.path === "/beer" && event.httpMethod === "PUT") {
        handlePutBeer(event, callback)
    } else {
        response(400, "Bad request", callback)
    }
};

function handleGetBeer(event, callback) {
    if (!isBeerNameValid(event.pathParameters.name)){
        response(400, "Bad request: beer name must be an alphanumeric string (max 40 characters).", callback)
    } else {
        const entry = {
            TableName: "Beers",
            Key: {
                BeerName: event.pathParameters.name,
            },
        };

        dynamoDb.get(entry, (error, result) => {
            if (error) {
                console.error(error);
                response(500, "Internal server error", callback);
            } else if (Object.entries(result).length === 0) {
                response(404, "Beer does not exist", callback);
            } else {
                response(200, "My favorite beer is: " + result.Item.BeerName, callback);
            }
        });
    }
}

function handlePutBeer(event, callback) {
    const data = JSON.parse(event.body);
    if (!isBeerNameValid(data.name)) {
        response(400, "Bad request: beer name must be an alphanumeric string (max 40 characters).", callback)
    } else {
        const entry = {
            TableName: "Beers",
            Item: {
                BeerName: data.name,
            },
        };

        dynamoDb.put(entry, (error) => {
            if (error) {
                console.error(error);
                response(500, "Internal server error", callback);
            } else {
                response(200, "Added favorite beer: " + data.name, callback);
            }
        });
    }
}

function response(statusCode, message, callback) {
    callback(null, {
        "statusCode": statusCode,
        "body": JSON.stringify({
            message: message,
        })
    });
}

function isBeerNameValid(name) {
    const alphanumericPattern = RegExp("^[a-zA-Z0-9]{1,40}$");
    return typeof name === "string" && alphanumericPattern.test(name)
}