const UserSettings = require('../models/user-settings');

exports.getSettings = (req, res, next) => {
    const userId = req.userData.userId;

    UserSettings.findOne({ _id: userId }).then(settings => {
        res.status(200).json({
            settings
        });
    }, error => {
        res.status(500).json({
            message: 'Couldn\'t fetch settings'
        })
    });
  };
  
  exports.saveSettings = (req, res, next) => {
    const userId = req.userData.userId;
    const poeAccountName = req.body.poeAccountName;
    const settingsId = req.body.id;
    
    const userSettings = new UserSettings({
        _id: settingsId,
        creator: userId,
        poeAccountName: poeAccountName
      });

    if (settingsId) {
        UserSettings.updateOne({ _id: settingsId }, userSettings).then(result => {
            res.status(200).json({
                message: 'Settings updated!'
            });
        });  
    }
    else {
        userSettings.save().then(createdSettings => {
          res.status(201).json({
            message: 'Settings added successfully',
            settings: createdSettings
          });
        }).catch(error => {
          res.status(500).json({
            message: 'Creating a setting failed!'
          })
        });
    }
  };
