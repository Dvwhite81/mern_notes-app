const express = require('express');
const User = require('../models/user');

const userRouter = express.Router();

// Get user by token
userRouter.get('/:token', async (req, res) => {
  const { token } = req.params;

  const userExists = await User.findOne({ token: token });

  if (!userExists) {
    return res.json({
      success: false,
      message: 'No user found with that token',
    });
  }

  res.json({
    success: true,
    message: 'Found user by token successfully',
    user: userExists,
  });
});

// Get user notes
userRouter.get('/:username/notes', async (req, res) => {
  const { username } = req.params;

  const userExists = await User.findOne({ username: username });

  if (!userExists) {
    return res.json({
      success: false,
      message: 'No user found with that username',
    });
  }
  console.log('backend userExists.notes:', userExists.notes);
  res.json({
    success: true,
    notes: userExists.notes,
  });
});

// User save note
userRouter.post('/:username/notes', async (req, res) => {
  console.log('req.body:', req.body);

  const { username } = req.params;

  const userExists = await User.findOne({ username: username });

  if (!userExists) {
    return res.json({
      success: false,
      message: 'No user found with that username',
    });
  }

  const { note } = req.body;
  const { notes } = userExists;
  console.log('backend userExists:', userExists);
  console.log('backend notes:', notes);
  console.log('backend note', note);

  userExists.notes = [...notes, note];
  const updatedUser = await userExists.save();

  if (updatedUser) {
    return res.json({
      success: true,
      message: 'Saved note successfully',
      newNote: note,
      notes: updatedUser.notes,
    });
  } else {
    return res.json({
      success: false,
      message: 'Error saving note',
    });
  }
});

// User remove saved note
userRouter.put('/:username/notes', async (req, res) => {
  const { username } = req.params;

  const userExists = await User.findOne({ username: username });

  if (!userExists) {
    return res.json({
      success: false,
      message: 'No user found with that username',
    });
  }

  const note = req.body;
  const { notes } = userExists;

  userExists.notes = notes.filter((r) => r.uri !== note.uri);
  const updatedUser = await userExists.save();

  if (updatedUser) {
    return res.json({
      success: true,
      message: 'Deleted note successfully',
      notes: updatedUser.notes,
    });
  } else {
    return res.json({
      success: false,
      message: 'Error deleting note',
    });
  }
});

module.exports = userRouter;
