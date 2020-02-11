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
    
    const userSettings = new UserSettings({
        creator: req.userData.userId,
        poeAccountName: ''
      });
    
      post.save().then(createdPost => {
        res.status(201).json({
          message: 'Settings added successfully',
          post: {
            ...createdPost,
            id: createdPost._id
          }
        });
      }).catch(error => {
        res.status(500).json({
          message: 'Creating a post failed!'
        })
      });

    res.status(500).json({
        message: 'Not Implemented yet!'
    })

    res.status(500).json({
        message: 'Not Implemented yet!'
    })
  };
