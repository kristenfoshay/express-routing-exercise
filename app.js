const express = require('express');
const ExpressError = require('./expressError');
const app = express();

app.get('/mean', (req, res, next) => {
	try {
		let input = req.query.input;
        if (!req.query.input) {
            throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
          }

		const inputArray = input.split(',').map((item) =>
			parseInt(item, 10));
        console.log(inputArray);
        console.log(aNumber(inputArray));
        console.log(aNumber(["1","2","3"]));
		if (!aNumber(inputArray)) {
			throw new ExpressError('Please only input numbers.', 400);
		}

		const response = {
			operation : 'mean',
			value     : getMean(inputArray)
		};
		return res.json(response);
	} catch (error) {
		return next(error);
	}
});

app.get('/median', (req, res, next) => {
	try {
		let input = req.query.input;
        if (!req.query.input) {
            throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
          }
          
		const inputArray = input.split(',').map(function(item) {
			return parseInt(item, 10);
		});
		if (!aNumber(inputArray)) {
			throw new ExpressError('Please only input numbers.', 400);
		}

		const response = {
			operation : 'median',
			value     : getMedian(inputArray)
		};
		return res.json(response);
	} catch (error) {
		return next(error);
	}
});

app.get('/mode', (req, res, next) => {
	try {
		let input = req.query.input;
        if (!req.query.input) {
            throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
          }
          
		const inputArray = input.split(',').map(function(item) {
			return parseInt(item, 10);
		});
		if (!aNumber(inputArray)) {
			throw new ExpressError('Please only input numbers.', 400);
		}

		const response = {
			operation : 'mode',
			value     : getMode(inputArray)
		};
		return res.json(response);
	} catch (error) {
		return next(error);
	}
});

app.get('/all', (req, res, next) => {
	try {
		let input = req.query.input;
        if (!req.query.input) {
            throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
          }
          
		const inputArray = input.split(',').map(function(item) {
			return parseInt(item, 10);
		});
		if (!aNumber(inputArray)) {
			throw new ExpressError('Please only input numbers.', 400);
		}
		const response = {
			operation : 'all',
			mean      : getMean(inputArray),
			median    : getMedian(inputArray),
			mode      : getMode(inputArray)
		};
		return res.send(response);
	} catch (error) {
		return next(error);
	}
});

function aNumber(array) {
    return array.every(element => {
      return !isNaN(element);
    });
  }

// https://bobbyhadz.com/blog/javascript-check-if-array-contains-only-numbers

function getMean(array) {
    let total = 0;
	for (let i = 0; i < array.length; i++) {
		total += array[i];
	}
	return total / array.length;
}

function getMedian(array) {
	const mid = Math.floor(array.length / 2),
		nums = [ ...array ].sort((a, b) => a - b);
	return array.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

//https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-88.php

function getMode(array) {
	const mode = {};
	let max = 0,
		count = 0;

	for (let i = 0; i < array.length; i++) {
		const item = array[i];

		if (mode[item]) {
			mode[item]++;
		}
		else {
			mode[item] = 1;
		}

		if (count < mode[item]) {
			max = item;
			count = mode[item];
		}
	}

	return max;
}

//https://vhudyma-blog.eu/mean-median-mode-and-range-in-javascript/#Mode

app.use((req, res, next) => {
	const error = new ExpressError('Page not found', 404);
	next(error);
});

app.use(function(error, req, res, next) {
	let status = error.status || 500;
	let message = error.msg;

	return res.status(status).json({
		error : { message, status }
	});
});

app.listen(3000, () => {
	console.log('Server started on Port 3000');
});

// https://github.com/productioncoder/express-error-handling/blob/master/error/api-error-handler.js

// https://github.com/academind/node-restful-api-tutorial/commit/81ad2b7f1cad7dc49012df4b3ad548b53b999969
