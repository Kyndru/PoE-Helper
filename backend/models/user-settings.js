const mongoose = require('mongoose');

const userSettingsSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    poeAccountName: { type: String }
});

module.exports = mongoose.model('UserSettings', userSettingsSchema);
