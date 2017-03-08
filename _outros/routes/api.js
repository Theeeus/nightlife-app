var express = require('express')
var router = express.Router()
var ProfileController = require('../controllers/ProfileController')
var TeamController = require('../controllers/TeamController')
var StadiumController = require('../controllers/StadiumController')
var controllers = {
	profile: ProfileController,
	team: TeamController,
	stadium: StadiumController
}


router.get('/:resource/:id', function(req, res, next) {
	var resource = req.params.resource
	var id = req.params.id

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid Resource Request'
		})

		return
	}

	controller.getById(id, function(err, result){
		if (err){ // something went wrong
			res.json({
				confirmation:'fail',
				message: 'Not Found'
			})
			return
		}

		res.json({
			confirmation: 'success',
			result: result
		})

		return
	})
});

router.get('/:resource', function(req, res, next) {
	var resource = req.params.resource
	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid Resource Request'
		})

		return
	}

	controller.get(req.query, function(err, results){
		if (err){ // something went wrong
			res.json({
				confirmation:'fail',
				message: err
			})
			return
		}

		res.json({
			confirmation:'success',
			results: results
		})

		return
	})
});


router.post('/:resource', function(req, res, next) {
	var resource = req.params.resource

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid Resource Request'
		})

		return
	}

	controller.post(req.body, function(err, result){
		if (err){ // something went wrong
			res.json({
				confirmation:'fail',
				message: err
			})
			return
		}

		res.json({
			confirmation:'success',
			result: result
		})

		return
	})
});

router.put('/:resource/:id', function(req, res, next) {
	var resource = req.params.resource
	var id = req.params.id

	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid Resource Request'
		})

		return
	}

	controller.put(id, req.body, function(err, result){
		if (err){ // something went wrong
			res.json({
				confirmation:'fail',
				message: err
			})
			return
		}

		res.json({
			confirmation:'success',
			result: result
		})

		return
	})


});

module.exports = router;