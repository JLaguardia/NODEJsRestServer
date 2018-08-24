'use strict';

var mongoose = require('mongoose'),
	_File = mongoose.model('Files');

exports.listAllFiles = function(req, res){
	console.log('sending response to ' + req.ip + ' | ' + req.hostname);
	_File.find({}, function(err, file){
		if(err)
			res.send('error');
		res.json(file);
		console.log('file sent: ' + file);
	});
};

exports.createFile = function(req, res){
	// res.json({message: 'No longer implmented. Use Socketio instead.'})
	var newFile = new _File(req.body);
	// newFile.
	newFile.save(function(err, file){
		if(err)
			res.send(err);
		res.json(file);
	});
};

exports.readFile = function(req, res){
	_File.findById(req.params.taskId, function(err, file){
		if(err)
			res.send(err);
		res.json(file);
	});
};

exports.updateFile = function(req, res){
	_File.findOneAndUpdate({_id: req.params.fileId}, req.body, {new: true}, function(err, file){
		if(err)
			res.send(err);
		res.json(file);
	});
};

exports.deleteFile = function(req, res){
	_File.remove({
		_id: req.params.fileId
	}, function(err, file){
		if(err)
			res.send(err);
		res.json({ message: 'File successfully deleted.'});
	});
};
